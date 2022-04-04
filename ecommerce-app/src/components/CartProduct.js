import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import { spacing } from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import MaterialsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteDoc, doc } from "firebase/firestore";
import { firebaseDB } from "../../firebase";
const CartProduct = ({ product, type, id, price, image, size }) => {
  const removeFromCart = async () => {
    await deleteDoc(doc(firebaseDB, "cartProducts", id));
  };

  return (
    <View style={styles.cartProductWrapper}>
      {/* Image View */}
      <View>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>

      {/* Details View */}
      <View style={styles.productContentWrapper}>
        {/* Product Title */}
        <Text style={[styles.productTitle, fonts.regular]}>{product}</Text>

        {/* Product Price */}
        <Text style={[styles.priceText, fonts.light]}>Rs. {price}</Text>

        {/* Product Size */}
        {type == "Ring" && (
          <Text style={[styles.sizeText, fonts.light]}>{size}</Text>
        )}
      </View>

      {/* Product Remove View */}
      <Pressable style={styles.deleteButton} onPress={removeFromCart}>
        <MaterialsIcon name="delete" size={20} color="red" />
      </Pressable>
    </View>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  cartProductWrapper: {
    flexDirection: "row",
    marginHorizontal: spacing.min,
    marginBottom: spacing.min,
    alignItems: "flex-start",
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
    flex: 1,
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
  deleteButton: {
    padding: spacing.min * 0.65,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 50,
    marginTop: spacing.min * 0.25,
    marginRight: spacing.min,
  },
});
