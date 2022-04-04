import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ionic from "react-native-vector-icons/Ionicons";
import { spacing } from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { BackButton, Sizes } from "../components";

const productImage = require("../../assets/IMG_8616.jpeg");
const productImage2 = require("../../assets/IMG_8633.jpeg");

const ProductSizes = [
  { id: 0, size: 2 },
  { id: 1, size: 4 },
  { id: 2, size: 6 },
];

const Product = () => {
  const navigation = useNavigation();

  const [chooseSize, setChooseSize] = useState(0);

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
        {/* Image */}
        <Image source={productImage2} style={styles.productImage} />

        <View style={styles.titlePriceWrapper}>
          <Text style={[fonts.medium, styles.productTitle]}>Product 1</Text>

          <Text style={[fonts.regular, styles.productPrice]}>Rs. 480</Text>
        </View>

        {/* Product Sizes */}
        <Text style={[fonts.medium, styles.productSizeTitle]}>Sizes</Text>

        <FlatList
          keyExtractor={(item) => item.id}
          data={ProductSizes}
          horizontal={true}
          renderItem={({ item }) => (
            <Sizes {...item} chooseSize={chooseSize} handleSize={handleSize} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productSizesScrollWrapper}
        />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={[styles.addToCartButton, styles.button]}>
            <Text style={[fonts.medium, styles.buttonText]}>Add To Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buyNowButton, styles.button]}>
            <Text style={[fonts.medium, styles.buttonText]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
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
  productImage: {
    width: "100%",
    height: 360,
    resizeMode: "cover",
    backgroundColor: colors.mediumGray,
  },
  productDetailScrollWrapper: {
    flexGrow: 0,
    flexShrink: 1,
  },
  productDetailWrapper: {
    paddingBottom: spacing.max,
  },
  titlePriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.mid,
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
    fontSize: 18,
    marginTop: spacing.max,
    paddingHorizontal: spacing.min,
  },
  productSizesScrollWrapper: {
    paddingVertical: spacing.min,
    paddingHorizontal: spacing.min,
  },
  buttonWrapper: {
    paddingHorizontal: spacing.min,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.mid,
    paddingHorizontal: spacing.min,
    borderRadius: 10,
  },
  addToCartButton: {
    backgroundColor: colors.mediumGray,
    marginTop: spacing.max,
  },
  buyNowButton: {
    backgroundColor: colors.tintBrown,
    marginVertical: spacing.mid,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default Product;
