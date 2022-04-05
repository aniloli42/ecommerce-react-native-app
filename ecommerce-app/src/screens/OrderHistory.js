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

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { spacing } from "../styles/utils";
import CartProduct from "../components/CartProduct";
import { firebaseDB } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useUserContext } from "../context/UserContext";

const OrderHistory = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      {/* Screen Title */}
      <View style={styles.headerWrapper}>
        <Text style={[styles.screenTitle, fonts.regular]}> Order History</Text>
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
    paddingHorizontal: spacing.min,
    paddingVertical: spacing.min * 0.75,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  screenTitle: {
    color: colors.tintBrown,
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
});

export default OrderHistory;
