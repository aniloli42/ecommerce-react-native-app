import { View, Text, StatusBar } from "react-native";

const Cart = () => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <Text>Cart</Text>
    </View>
  );
};

export default Cart;
