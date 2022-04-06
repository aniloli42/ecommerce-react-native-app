import { useState, useEffect } from "react";
import { FlatList, View, Text, StatusBar, StyleSheet } from "react-native";

import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import OrderProduct from "../components/OrderProduct";
import { firebaseDB, auth } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ScreenHeader } from "../components/";
import colors from "../styles/colors";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  // handle product fetching
  useEffect(() => {
    const q = query(
      collection(firebaseDB, "orders"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orderHistoryArray = [];
      querySnapshot.forEach((doc) => {
        orderHistoryArray.push({ id: doc.id, ...doc.data() });
      });

      setOrderHistory(orderHistoryArray);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      {/* Screen Title */}
      <ScreenHeader screenName={"Order History"} />

      <FlatList
        data={orderHistory}
        renderItem={({ item }) => <OrderProduct {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderScrollWrapper}
        ListHeaderComponent={
          orderHistory?.length === 0 && (
            <Text style={[fonts.regular, styles.noOrder]}>No Order Yet.</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  orderScrollWrapper: {
    paddingVertical: spacing.min,
  },
  noOrder: {
    fontSize: 16,
    color: colors.mediumGray,
    marginHorizontal: spacing.min,
  },
});

export default OrderHistory;
