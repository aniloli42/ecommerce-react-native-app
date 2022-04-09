import { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';

import fonts from '../styles/fonts';
import { spacing } from '../styles/utils';
import OrderProduct from '../components/OrderProduct';
import { firebaseDB, auth } from '../../firebase';
import {
  collection,
  query,
  limit,
  getDocs,
  orderBy,
  where,
  startAfter,
} from 'firebase/firestore';
import { ScreenHeader } from '../components/';
import colors from '../styles/colors';

const ORDERS_LIMIT = 6;
const { height } = Dimensions.get('window');

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [lastPointer, setLastPointer] = useState([]);

  const getInitialOrders = async () => {
    try {
      const initialOrdersQuery = query(
        collection(firebaseDB, 'orders'),
        orderBy('orderAt', 'desc'),
        limit(ORDERS_LIMIT),
        where('userId', '==', auth.currentUser.uid)
      );
      const initialOrdersSnap = await getDocs(initialOrdersQuery);

      const lastOrderPointer =
        initialOrdersSnap.docs[initialOrdersSnap.docs.length - 1];

      setLastPointer(lastOrderPointer);

      const initialOrders = initialOrdersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(initialOrders);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getNextOrders = async () => {
    try {
      const nextOrdersQuery = query(
        collection(firebaseDB, 'orders'),
        orderBy('orderAt', 'desc'),
        startAfter(lastPointer),
        limit(ORDERS_LIMIT),
        where('userId', '==', auth.currentUser.uid)
      );

      const nextOrdersSnap = await getDocs(nextOrdersQuery);

      const nextOrdersLastPointer =
        nextOrdersSnap.docs[nextOrdersSnap.docs.length - 1];

      const nextOrders = nextOrdersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLastPointer(nextOrdersLastPointer);
      setOrders((prev) => [...prev, ...nextOrders]);
    } catch (e) {
      setOrders((prev) => [...prev]);
    }
  };

  useEffect(() => {
    getInitialOrders();

    return () => getInitialOrders();
  }, []);

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      {/* Screen Title */}
      <ScreenHeader screenName={'Order History'} />

      <View style={{ flex: 1, height: height }}>
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderProduct getInitialOrders={getInitialOrders} {...item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orderScrollWrapper}
          refreshing={refresh}
          onEndReachedThreshold={0.01}
          onEndReached={getNextOrders}
          onRefresh={async () => {
            setRefresh(true);
            await getInitialOrders();
            setRefresh(false);
          }}
          ListHeaderComponent={
            orders?.length === 0 && (
              <Text style={[fonts.regular, styles.noOrder]}>No Order Yet.</Text>
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
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
