import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";

const Cart = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Text>Cart</Text>
    </SafeAreaView>
  );
};

export default Cart;
