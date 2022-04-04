import {
  View,
  Pressable,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ id, product, price, images }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("Product", {
            productId: id,
          })
        }
        style={styles.productImageWrapper}
      >
        <ImageBackground
          style={styles.productImage}
          source={{ uri: images[0] }}
        />
        <Text style={[fonts.medium, styles.productName]}>{product}</Text>
        <Text style={[fonts.regular, styles.productPrice]}>Rs. {price}</Text>
      </Pressable>
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
    backgroundColor: colors.lightGray,
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
