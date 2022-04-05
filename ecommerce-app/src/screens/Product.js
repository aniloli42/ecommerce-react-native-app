import { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Pressable,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { spacing } from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { BackButton, Sizes } from "../components";
import { firebaseDB } from "../../firebase";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { useUserContext } from "../context/UserContext";

const { width } = Dimensions.get("window");

const Product = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  const [product, setProduct] = useState(null);
  const [chooseSize, setChooseSize] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firebaseDB, "products", productId),
      (doc) => {
        setProduct({ id: doc.id, ...doc.data() });
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (product == null) return;
    if (product?.type !== "Ring") return;

    setChooseSize(product.sizes[0]);
  }, [product]);

  const handleSize = (value) => {
    setChooseSize(value);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View style={styles.backButtonWrapper}>
        <BackButton callback={() => navigation.goBack()} />
      </View>

      {/* Product Details */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.productDetailScrollWrapper}
        contentContainerStyle={styles.productDetailWrapper}
      >
        {/* Product Images */}
        <Animated.FlatList
          data={product?.images}
          keyExtractor={(_, index) => index}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item }} style={styles.productImage} />
            </View>
          )}
          contentContainerStyle={styles.imageScrollWrapper}
          horizontal
          scrollEnabled
          pagingEnabled
          scrollEventThrottle={10}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {product?.images?.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View key={i} style={styles.animatedDot(opacity)} />
            );
          })}
        </View>

        <View style={styles.titlePriceWrapper}>
          <Text style={[fonts.medium, styles.productTitle]}>
            {product?.product}
          </Text>

          <Text style={[fonts.regular, styles.productPrice]}>
            Rs. {product?.price}
          </Text>
        </View>

        {product?.desc && (
          <View style={styles.descWrapper}>
            <Text style={[fonts.regular, styles.descText]}>{product.desc}</Text>
          </View>
        )}
        {product?.stock === true ? (
          <>
            {product?.type === "Ring" && product?.sizes?.length !== 0 && (
              <>
                {/* Product Sizes */}
                <Text style={[fonts.regular, styles.productSizeTitle]}>
                  Sizes
                </Text>

                <FlatList
                  keyExtractor={(_, index) => index}
                  data={product?.sizes}
                  horizontal={true}
                  renderItem={({ item }) => {
                    return (
                      <Sizes
                        size={item}
                        chooseSize={chooseSize}
                        handleSize={handleSize}
                      />
                    );
                  }}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.productSizesScrollWrapper}
                />
              </>
            )}
            <View style={styles.buttonWrapper}>
              <Pressable style={[styles.buyNowButton, styles.button]}>
                <Text style={[fonts.medium, styles.buttonText]}>Buy Now</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.buttonWrapper}>
            <Text style={[fonts.regular, styles.outOfStockText]}>
              Sorry, Product is out of stock.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  backButtonWrapper: {
    padding: spacing.min,
    backgroundColor: colors.white,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  imageScrollWrapper: {
    height: 350,
  },
  imageWrapper: {
    backgroundColor: colors.lightGray,
    height: 350,
    width: width,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  productImage: {
    width: width,
    height: "100%",
  },
  productDetailScrollWrapper: {
    flexGrow: 0,
    flexShrink: 1,
  },
  productDetailWrapper: {
    paddingBottom: spacing.max,
  },
  descWrapper: {
    margin: spacing.min,
    marginBottom: 0,
  },
  descText: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  titlePriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.min * 0.35,
    paddingHorizontal: spacing.min,
  },
  productTitle: {
    fontSize: 20,
    color: colors.tintBrown,
    textAlignVertical: "bottom",
  },
  productPrice: {
    color: colors.mediumGray,
    fontSize: 18,
  },

  productSizeTitle: {
    fontSize: 16,
    marginTop: spacing.max,
    paddingHorizontal: spacing.min,
  },
  productSizesScrollWrapper: {
    paddingVertical: spacing.min,
    paddingHorizontal: spacing.min,
  },
  buttonWrapper: {
    paddingHorizontal: spacing.min,
    marginTop: spacing.min * 1.25,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.min,
    borderRadius: 50,
  },
  buyNowButton: {
    backgroundColor: colors.tintBrown,
    marginTop: spacing.min,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    textAlignVertical: "bottom",
  },

  animatedDot: (opacity) => ({
    opacity,
    height: 10,
    width: 10,
    backgroundColor: colors.tintBrown,
    margin: 8,
    borderRadius: 5,
  }),
  outOfStockText: {
    fontSize: 16,
    color: "red",
  },
});

export default Product;
