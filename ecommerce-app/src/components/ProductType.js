import { TouchableOpacity, Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

// custom
import colors from "../styles/colors";
import utils from "../styles/utils";

const ProductType = ({ product, handleFilter, pType }) => {
  let productIcon;
  if (product === "Ring") productIcon = "ring";
  if (product === "Necklace") productIcon = "necklace";

  return (
    <TouchableOpacity
      style={{
        minWidth: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: colors.white,
        elevation: 1,
        marginRight: utils.midSpacing,
        paddingHorizontal: utils.minSpacing,
        borderWidth: 2,
        borderColor: pType === product ? "red" : "transparent",
      }}
      onPress={() => handleFilter(product)}
    >
      <MaterialIcons name={productIcon} size={24} color={"#000"} />
      <Text
        style={[
          fonts.regular,
          {
            fontSize: 14,
            marginTop: 5,
          },
        ]}
      >
        {product ?? "Not Found"}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductType;
