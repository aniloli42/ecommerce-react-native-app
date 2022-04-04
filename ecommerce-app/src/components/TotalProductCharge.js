import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import colors from "../styles/colors";

const TotalProductCharge = () => {
  return (
    <View style={styles.cartPriceWrapper}>
      <Views title="Total Price" price={450} />
      <Views title="Shipping Charge" price={450} />
      <View style={styles.separator} />
      <Views title="Grand Total" price={900} />
    </View>
  );
};

const Views = ({ title, price }) => (
  <View style={styles.viewWrapper}>
    <Text style={[fonts.regular]}>{title}</Text>
    <Text style={[title === "Grand Total" ? fonts.regular : fonts.light]}>
      Rs. {price}
    </Text>
  </View>
);

export default TotalProductCharge;

const styles = StyleSheet.create({
  cartPriceWrapper: {
    padding: spacing.min,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    marginVertical: spacing.min * 0.25,
  },
  viewWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.min * 0.35,
  },
});
