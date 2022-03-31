import { View, Text, StatusBar } from "react-native";

const OrderHistory = () => {
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
      <Text>OrderHistory</Text>
    </View>
  );
};

export default OrderHistory;
