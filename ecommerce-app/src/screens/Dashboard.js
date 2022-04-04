import {
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";

import { useState, useEffect } from "react";

// Custom
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import { ProductCard, ProductType } from "../components";
import colors from "../styles/colors";
import { Link } from "@react-navigation/native";

const EProducts = [
  {
    id: 1,
    type: "Ring",
    product: "Diamond 1",
    price: 500,
  },
  {
    id: 2,
    type: "Ear Ring",
    product: "Ear 1",
    price: 400,
  },
  {
    id: 3,
    type: "Necklace",
    product: "Gold Necklace 1",
    price: 500,
  },
];

const Dashboard = () => {
  const [pType, setPType] = useState("All");
  const [filteredProduct, setFilteredProduct] = useState(EProducts);

  useEffect(() => {
    if (pType === "All") return setFilteredProduct(EProducts);

    setFilteredProduct(EProducts.filter((Product) => Product.type === pType));
  }, [pType]);

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
      <View style={styles.profileImageWrapper}>
        <Link to={"/Tab/Settings"}>
          <Ionic name="person-circle" size={56} color={"#000"} />
        </Link>
      </View>

      <Text style={[styles.brandText, fonts.semiBold]}>Elegant Collection</Text>

      {/* Search Box */}
      <TextInput
        placeholder="Search"
        style={[styles.searchBox, fonts.regular]}
      />

      {/* All Products & Types Wrapper */}
      <FlatList
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
              <ProductType
                product="Ring"
                handleFilter={handleFilter}
                pType={pType}
              />
              <ProductType
                product="Ear Ring"
                handleFilter={handleFilter}
                pType={pType}
              />
              <ProductType
                product="Necklace"
                handleFilter={handleFilter}
                pType={pType}
              />
            </ScrollView>
          </>
        }
        data={filteredProduct}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ index, item }) => (
          <ProductCard {...item} index={index} />
        )}
        contentContainerStyle={styles.productsScrollWrapper}
        initialNumToRender={6}
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
  brandText: {
    paddingHorizontal: spacing.min,
    fontSize: 24,
    flexWrap: "wrap",
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    fontSize: 14,
    marginTop: spacing.mid,
    marginBottom: spacing.min,
    marginHorizontal: spacing.min,
    textAlignVertical: "bottom",
    elevation: 2,
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
  productsScrollWrapper: {
    paddingHorizontal: spacing.min,
    paddingVertical: spacing.mid,
  },
});

export default Dashboard;
