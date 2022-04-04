import { FlatList, View, Text, StatusBar, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/BackButton";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { spacing } from "../styles/utils";
import CartProduct from "../components/CartProduct";
import { TotalProductCharge } from "../components";

const cartProd = [
  {
    product: "Ear Ring",
    price: 450,
    type: "Ear Ring",
  },
  {
    product: "Finger Ring",
    price: 700,
    type: "Ring",
  },
  // {
  //   product: "Ear Ring 2",
  //   price: 450,
  //   type: "Ear Ring",
  // },
  // {
  //   product: "Finger Ring 2",
  //   price: 700,
  //   type: "Ring",
  // },
];

const Cart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      {/* Screen Title */}
      <View style={styles.headerWrapper}>
        <BackButton callback={() => navigation.goBack()} />
        <Text style={[styles.screenTitle, fonts.light]}> My Cart</Text>
      </View>

      {/* Cart Products */}
      <FlatList
        data={cartProd}
        keyExtractor={(item) => item.product}
        renderItem={({ item }) => <CartProduct {...item} />}
        contentContainerStyle={styles.productListContentWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.min,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  screenTitle: {
    color: colors.tintBrown,
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    marginLeft: "-10%",
  },

  productListContentWrapper: {
    paddingVertical: spacing.mid,
  },
});

export default Cart;
