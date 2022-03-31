import {
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  FlatList,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";

import { useState, useCallback, useEffect } from "react";

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: utils.maxSpacing,
          paddingVertical: utils.minSpacing,
          alignItems: "center",
        }}
      >
        <Link to={"/Tab/Settings"}>
          <Ionic name="person-circle" size={56} color={"#000"} />
        </Link>
      </View>

      <Text
        style={[
          {
            paddingHorizontal: utils.maxSpacing,
            fontSize: 27,
            flexWrap: "wrap",
          },
          fonts.semiBold,
        ]}
      >
        Elegant Collection
      </Text>

      {/* Search Box */}
      <TextInput
        placeholder="Search"
        style={[
          {
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
          fonts.regular,
        ]}
      />

      {/* Products Category */}
      <Text
        style={[
          {
            marginHorizontal: utils.maxSpacing,
            fontSize: 18,
          },
          fonts.medium,
        ]}
      >
        Products
      </Text>

      <ScrollView
        horizontal={true}
        style={{
          marginVertical: utils.midSpacing,
          flexGrow: 0,
          flexShrink: 0,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: utils.maxSpacing,
        }}
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
        contentContainerStyle={{
          paddingHorizontal: utils.maxSpacing,
          paddingVertical: utils.midSpacing,
        }}
      />
    </View>
  );
};

export default Dashboard;
