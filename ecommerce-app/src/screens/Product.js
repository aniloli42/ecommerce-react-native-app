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
  { id: 0, size: "S" },
  { id: 1, size: "M" },
  { id: 2, size: "L" },
  { id: 3, size: "X" },
  { id: 4, size: "XL" },
  { id: 5, size: "XXL" },
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

      {/* Image */}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 0,
          flexShrink: 0,
          height: 360,
          width: "100%",
        }}
        horizontal={true}
      >
        <Image source={productImage2} style={styles.productImage} />
        <Image source={productImage} style={styles.productImage} />
      </ScrollView>

      {/* Product Details */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.productDetailScrollWrapper}
      >
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

        <TouchableOpacity style={[styles.addToCartButton, styles.button]}>
          <Text style={[fonts.medium, styles.buttonText]}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buyNowButton, styles.button]}>
          <Text style={[fonts.medium, styles.buttonText]}>Buy Now</Text>
        </TouchableOpacity>
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
    paddingTop: utils.midSpacing,
    paddingHorizontal: utils.maxSpacing,
    flexGrow: 0,
    flexShrink: 0,
  },
  titlePriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 24,
    color: colors.tintBrown,
    textAlignVertical: "bottom",
  },
  productPrice: {
    color: colors.mediumGray,
    fontSize: 20,
  },
  productSizeTitle: {
    fontSize: 18,
    marginTop: utils.maxSpacing,
  },
  productSizesScrollWrapper: {
    paddingVertical: utils.minSpacing,
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
