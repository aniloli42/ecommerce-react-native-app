import { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/BackButton";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { spacing } from "../styles/utils";
import CartProduct from "../components/CartProduct";
import { firebaseDB } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useUserContext } from "../context/UserContext";

const Cart = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();

  const [cart, setCart] = useState(null);

  useEffect(() => {
    const q = query(
      collection(firebaseDB, "cartProducts"),
      where("user", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cartArray = [];
      querySnapshot.forEach((doc) => {
        cartArray.push({ id: doc.id, ...doc.data() });
      });

      setCart(cartArray);
    });

    return () => {
      unsubscribe;
    };
  }, []);

  console.log(cart);

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

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartProduct {...item} />}
        contentContainerStyle={styles.productListContentWrapper}
      />

      <View style={styles.buttonWrapper}>
        <Pressable style={styles.checkoutButton}>
          <Text style={[styles.checkoutText, fonts.medium]}>Checkout</Text>
        </Pressable>
      </View>
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
  buttonWrapper: {
    margin: spacing.min,
  },
  checkoutButton: {
    backgroundColor: colors.tintBrown,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.min,
    borderRadius: 50,
  },
  checkoutText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default Cart;
