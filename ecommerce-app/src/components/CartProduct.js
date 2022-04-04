import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";
import { spacing } from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const CartProduct = ({ product, price }) => {
  return (
    <View style={styles.cartProductWrapper}>
      {/* Image View */}
      <View>
        <Image
          source={require("../../assets/IMG_8633.jpeg")}
          style={styles.productImage}
        />
      </View>

      {/* Details View */}
      <View style={styles.productContentWrapper}>
        {/* Product Title */}
        <Text style={[styles.productTitle, fonts.regular]}>{product}</Text>

        {/* Product Price */}
        <Text style={[styles.priceText, fonts.light]}>Rs. {price}</Text>

        {/* Product Size */}
        <Text style={[styles.sizeText, fonts.light]}>M</Text>
      </View>

      {/* Product Remove View */}
    </View>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  cartProductWrapper: {
    flexDirection: "row",
    marginHorizontal: spacing.min,
    marginBottom: spacing.min,
  },
  productImage: {
    width: 100,
    height: 120,
    borderRadius: 15,
    backgroundColor: "#ccc",
  },
  productContentWrapper: {
    marginHorizontal: spacing.mid,
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 16,
    marginTop: "3%",
  },
  priceText: {
    fontSize: 14,
    marginTop: spacing.min * 0.25,
    color: colors.mediumGray,
  },
  sizeText: {
    marginVertical: spacing.min,
    borderWidth: 1,
    borderColor: "red",
    textAlign: "center",
    textAlignVertical: "center",
    width: 32,
    height: 32,
    borderRadius: 50,
    elevation: 3,
    fontSize: 12,
    backgroundColor: colors.white,
  },
});
