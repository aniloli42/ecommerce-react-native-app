import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

// custom
import colors from "../styles/colors";
import { spacing } from "../styles/utils";

const ProductType = ({ product, handleFilter, pType }) => {
  let productIcon;
  if (product === "Ring") productIcon = "ring";
  if (product === "Necklace") productIcon = "necklace";
  if (product === "Ear Ring") productIcon = "ornament-variant";

  return (
    <TouchableOpacity
      style={styles.buttonWrapper(pType, product)}
      onPress={() => handleFilter(product)}
    >
      <MaterialIcons name={productIcon} size={24} color={"#000"} />
      <Text style={[fonts.regular, styles.productTypeName]}>
        {product ?? "Not Found"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: (pType, product) => ({
    minWidth: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 1,
    marginRight: spacing.min,
    paddingHorizontal: spacing.min,
    borderWidth: 2,
    borderColor: pType === product ? "red" : "transparent",
  }),
  productTypeName: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ProductType;
