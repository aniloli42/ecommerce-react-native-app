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
import utils from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Sizes } from "../components";

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionic name="arrow-back" size={27} color={"#000"} />
        </TouchableOpacity>
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
    paddingLeft: utils.maxSpacing,
    marginBottom: utils.midSpacing,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: utils.minSpacing,
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
    paddingBottom: utils.maxSpacing,
  },
  titlePriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: utils.midSpacing,
    paddingHorizontal: utils.maxSpacing,
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
    marginTop: utils.maxSpacing,
    paddingHorizontal: utils.maxSpacing,
  },
  productSizesScrollWrapper: {
    paddingVertical: utils.minSpacing,
    paddingHorizontal: utils.maxSpacing,
  },
  buttonWrapper: {
    paddingHorizontal: utils.maxSpacing,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: utils.midSpacing,
    paddingHorizontal: utils.minSpacing,
    borderRadius: 10,
  },
  addToCartButton: {
    backgroundColor: colors.mediumGray,
    marginTop: utils.maxSpacing,
  },
  buyNowButton: {
    backgroundColor: colors.tintBrown,
    marginVertical: utils.midSpacing,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default Product;
