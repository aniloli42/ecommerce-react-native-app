import { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

// Custom
import { auth, firebaseDB } from '../../firebase';
import fonts from '../styles/fonts';
import { spacing } from '../styles/utils';
import { ProductCard, ProductType } from '../components';
import colors from '../styles/colors';
import {
  setDoc,
  collection,
  query,
  where,
  doc,
  limit,
  startAfter,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';
import { updateProfile } from 'firebase/auth';

const PRODUCTS_TYPES = [
  {
    id: 0,
    product: 'Ring',
  },
  {
    id: 1,
    product: 'Ear Ring',
  },
  { id: 2, product: 'Necklace' },
];

const PRODUCTS_LIMIT = 6;
const { height } = Dimensions.get('window');

const Dashboard = () => {
  const { temp, setTemp } = useUserContext();

  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [lastPointer, setLastPointer] = useState([]);
  const [limitNext, setLimitNext] = useState(null);
  const [pType, setPType] = useState('All');

  const getInitialProducts = async () => {
    try {
      const initialProductsQuery = query(
        collection(firebaseDB, 'products'),
        orderBy('createdAt', 'desc'),
        limit(PRODUCTS_LIMIT),
        where('stock', '==', true)
      );
      const initialProductsSnap = await getDocs(initialProductsQuery);

      const lastProductPointer =
        initialProductsSnap.docs[initialProductsSnap.docs.length - 1];

      setLastPointer(lastProductPointer);

      const initialProducts = initialProductsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(initialProducts);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getNextProducts = async () => {
    try {
      const nextProductsQuery = query(
        collection(firebaseDB, 'products'),
        orderBy('createdAt', 'desc'),
        startAfter(lastPointer),
        limit(PRODUCTS_LIMIT),
        where('stock', '==', true)
      );
      const nextProductsSnap = await getDocs(nextProductsQuery);

      const nextProductsLastPointer =
        nextProductsSnap.docs[nextProductsSnap.docs.length - 1];

      const nextProducts = nextProductsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLastPointer(nextProductsLastPointer);
      setProducts((prev) => [...prev, ...nextProducts]);
    } catch (e) {
      setProducts((prev) => [...prev]);
    }
  };

  // handle product fetching
  useEffect(() => {
    getInitialProducts();
  }, []);

  // handle search filter
  useEffect(() => {
    const getFilteredResult = async () => {
      if (products.length === 0) return;
      if (pType === 'All') {
        getInitialProducts();
      }

      if (pType !== 'All') {
        const typeQuery = query(
          collection(firebaseDB, 'products'),
          orderBy('createdAt', 'desc'),
          where('type', '==', pType)
        );

        const typeQuerySnap = await getDocs(typeQuery);

        const typeProducts = typeQuerySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(typeProducts);
      }
    };

    getFilteredResult();

    return getFilteredResult();
  }, [pType]);

  /* Handle SignIn Data
   * For handling Signup data, Create Authenticated user and after create
   * rest data collection into firestore.
   */
  useEffect(async () => {
    if (temp === null) return;

    await setDoc(doc(firebaseDB, 'users', auth.currentUser.uid), {
      name: temp.name,
      email: auth.currentUser.email,
      phoneNumber: temp.phoneNumber,
    });

    await updateProfile(auth.currentUser, {
      displayName: temp.name,
    });

    setTemp(null);
  }, []);

  /*
   * Toggle the product select category by user.
   */
  const handleFilter = (productType) => {
    if (productType === pType) return setPType('All');

    setPType(productType);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <View style={styles.headerWrapper}>
        <Text style={[styles.brandText, fonts.medium]}>Elegant Collection</Text>
      </View>

      <View style={{ flex: 1, height: height }}>
        {/* All Products & Types Wrapper */}
        <FlatGrid
          data={products}
          horizontal={false}
          initialNumToRender={PRODUCTS_LIMIT}
          renderItem={({ item }) => <ProductCard {...item} />}
          ListHeaderComponentStyle={styles.productsHeaderScrollWrapper}
          spacing={spacing.mid * 0.75}
          showsVerticalScrollIndicator={false}
          refreshing={refresh}
          onRefresh={async () => {
            setRefresh(true);
            await getInitialProducts();
            setRefresh(false);
          }}
          onEndReachedThreshold={0.01}
          onEndReached={getNextProducts}
          ListHeaderComponent={
            <>
              {/* Products Category */}
              <Text style={[styles.productText, fonts.medium]}>Products</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollContainer}
                contentContainerStyle={styles.productTypeScrollWrapper}
              >
                {PRODUCTS_TYPES?.map(({ id, product }) => (
                  <ProductType
                    product={product}
                    key={id}
                    handleFilter={handleFilter}
                    pType={pType}
                  />
                ))}
              </ScrollView>
            </>
          }
          ListFooterComponent={<ActivityIndicator />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { height: '100%' },
  profileImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.min,
    alignItems: 'center',
  },
  headerWrapper: {
    padding: spacing.min,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },

  brandText: {
    color: colors.tintBrown,
    fontSize: 26,
    textAlign: 'left',
  },

  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  searchClearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tintBrown,
    flexGrow: 0,
    flexShrink: 0,
    width: 40,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  productText: {
    fontSize: 18,
  },
  productTypeScrollWrapper: {
    marginVertical: spacing.min,
  },
  scrollContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  productScrollWrapper: {
    paddingHorizontal: spacing.min,
  },
  productsHeaderScrollWrapper: {
    paddingHorizontal: spacing.min,
  },
  notFoundText: {
    marginHorizontal: spacing.min,
    color: colors.mediumGray,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Dashboard;
