import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import Entypo from "react-native-vector-icons/Entypo";

// Custom
import { auth, firebaseDB } from "../../firebase";
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import { ProductCard, ProductType } from "../components";
import colors from "../styles/colors";
import {
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useUserContext } from "../context/UserContext";
import { updateProfile } from "firebase/auth";

const PRODUCTS_TYPES = [
  {
    id: 0,
    product: "Ring",
  },
  {
    id: 1,
    product: "Ear Ring",
  },
  { id: 2, product: "Necklace" },
];

const Dashboard = () => {
  const { temp, setTemp } = useUserContext();

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pType, setPType] = useState("All");
  const [filteredProduct, setFilteredProduct] = useState([]);

  // handle product fetching
  useEffect(() => {
    const q = query(
      collection(firebaseDB, "products"),
      where("stock", "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productArray = [];
      querySnapshot.forEach((doc) => {
        productArray.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productArray);
    });

    return () => {
      unsubscribe;
    };
  }, []);

  // handle search filter
  useEffect(() => {
    let Products = products;

    if (searchText.trim() === "" && pType === "All") {
      return setFilteredProduct(products);
    }

    if (pType !== "All") {
      Products = Products.filter(({ type }) => type === pType);
    }

    if (searchText.trim() != "") {
      Products = Products.filter(({ product }) =>
        product.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProduct(Products);
  }, [searchText, pType, products]);

  // Handle SignIn Data
  useEffect(async () => {
    if (temp === null) return;

    await setDoc(doc(firebaseDB, "users", auth.currentUser.uid), {
      name: temp.name,
      email: auth.currentUser.email,
      phoneNumber: temp.phoneNumber,
    });

    await updateProfile(auth.currentUser, {
      displayName: temp.name,
    });

    setTemp(null);
  }, []);

  const handleFilter = (productType) => {
    if (productType === pType) return setPType("All");

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

        {/* Search Box */}
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="Search"
            style={[styles.searchBox(searchText), fonts.regular]}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />

          {searchText !== "" && (
            <Pressable
              onPress={() => setSearchText("")}
              style={styles.searchClearButton}
            >
              <Entypo name="cross" size={24} color="white" />
            </Pressable>
          )}
        </View>
      </View>

      {/* All Products & Types Wrapper */}
      <FlatGrid
        data={filteredProduct}
        horizontal={false}
        initialNumToRender={6}
        renderItem={({ item }) => <ProductCard {...item} />}
        ListHeaderComponentStyle={styles.productsHeaderScrollWrapper}
        spacing={spacing.mid * 0.75}
        showsVerticalScrollIndicator={false}
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
        ListFooterComponent={
          <>
            {products.length === 0 && filteredProduct.length === 0 && (
              <ActivityIndicator />
            )}

            {products.length !== 0 && filteredProduct?.length === 0 && (
              <Text style={[styles.notFoundText, fonts.medium]}>
                Product Not Found!
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { height: "100%" },
  profileImageWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: spacing.min,
    alignItems: "center",
  },
  headerWrapper: {
    padding: spacing.min,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },

  brandText: {
    color: colors.tintBrown,
    fontSize: 26,
    textAlign: "left",
    marginBottom: spacing.min,
  },
  searchBox: (searchText) => ({
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: searchText === "" ? 10 : 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.lightGray,
    fontSize: 14,
    textAlignVertical: "bottom",
    flex: 1,
  }),

  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  searchClearButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tintBrown,
    flexGrow: 0,
    flexShrink: 0,
    width: 40,
    height: "100%",
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
    textAlign: "center",
  },
});

export default Dashboard;
