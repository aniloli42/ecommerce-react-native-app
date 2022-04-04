import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { spacing } from "../styles/utils";

const ProductCard = ({ index, product, price }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper(index)}>
      <TouchableOpacity onPress={() => navigation.navigate("Product")}>
        <ImageBackground
          style={styles.productImage}
          source={require("../../assets/IMG_1028.jpeg")}
        >
          <TouchableOpacity style={styles.productNavigatorButtonWrapper}>
            <MaterialCommunityIcons name="cart-plus" color={"#000"} size={16} />
          </TouchableOpacity>
        </ImageBackground>

        <Text style={[fonts.medium, styles.productName]}>{product}</Text>
        <Text style={[fonts.regular, styles.productPrice]}>Rs. {price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: (index) => ({
    marginRight: index % 2 === 0 ? spacing.mid : 0,
    marginVertical: 6,
    flexBasis: "48%",
  }),
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  productNavigatorButtonWrapper: {
    width: 27,
    height: 27,
    backgroundColor: colors.white,
    position: "absolute",
    borderRadius: 50,
    zIndex: 1,
    top: 0,
    right: 0,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productName: {
    marginTop: 8,
    fontSize: 16,
  },
  productPrice: {
    color: colors.mediumGray,
  },
});

export default ProductCard;
