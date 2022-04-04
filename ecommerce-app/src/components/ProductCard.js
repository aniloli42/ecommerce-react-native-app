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

const ProductCard = ({ product, price }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Product")}>
        <ImageBackground
          style={styles.productImage}
          source={require("../../assets/IMG_1028.jpeg")}
        />
        <Text style={[fonts.medium, styles.productName]}>{product}</Text>
        <Text style={[fonts.regular, styles.productPrice]}>Rs. {price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
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
