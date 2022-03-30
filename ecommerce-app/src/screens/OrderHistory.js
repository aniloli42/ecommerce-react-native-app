import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import React from "react";

const OrderHistory = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Text>OrderHistory</Text>
    </SafeAreaView>
  );
};

export default OrderHistory;
