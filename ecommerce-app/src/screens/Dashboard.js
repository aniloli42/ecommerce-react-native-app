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
import utils from "../styles/utils";
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
    id: 1,
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

      {/* Products Category */}
      <Text style={[styles.productText, fonts.medium]}>Products</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productTypeScrollWrapper}
      >
        <ProductType product="Ring" handleFilter={handleFilter} pType={pType} />
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

      <FlatList
        data={filteredProduct}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ index, item }) => (
          <ProductCard {...item} index={index} />
        )}
        contentContainerStyle={styles.productsScrollWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { height: "100%" },
  profileImageWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: utils.maxSpacing,
    paddingVertical: utils.minSpacing,
    alignItems: "center",
  },
  brandText: {
    paddingHorizontal: utils.maxSpacing,
    fontSize: 27,
    flexWrap: "wrap",
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    fontSize: 14,
    marginTop: utils.midSpacing,
    marginBottom: utils.minSpacing,
    marginHorizontal: utils.maxSpacing,
    textAlignVertical: "bottom",
  },
  productText: {
    marginHorizontal: utils.maxSpacing,
    fontSize: 18,
  },
  productTypeScrollWrapper: {
    paddingHorizontal: utils.maxSpacing,
    marginVertical: utils.midSpacing,
    flexGrow: 0,
    flexShrink: 0,
  },
  productsScrollWrapper: {
    paddingHorizontal: utils.maxSpacing,
    paddingVertical: utils.midSpacing,
  },
});

export default Dashboard;
