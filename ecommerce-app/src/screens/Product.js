import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ionic from "react-native-vector-icons/Ionicons";
import utils from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Sizes } from "../components";

const productImage = require("../../assets/IMG_8616.jpeg");
const productImage2 = require("../../assets/IMG_8633.jpeg");

const ProductSizes = [
  { id: 0, size: "S" },
  { id: 1, size: "M" },
  { id: 2, size: "L" },
  { id: 3, size: "X" },
  { id: 4, size: "XL" },
  { id: 5, size: "XXL" },
];

const Product = () => {
  const navigation = useNavigation();

  const [chooseSize, setChooseSize] = useState(0);

  const handleSize = (value) => {
    setChooseSize(value);
  };

  return (
    <SafeAreaView
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
          paddingLeft: utils.maxSpacing,
          marginBottom: utils.midSpacing,
        }}
      >
        <TouchableOpacity
          style={{
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            marginTop: utils.minSpacing,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionic name="arrow-back" size={27} color={"#000"} />
        </TouchableOpacity>
      </View>

      {/* Image */}

      <ScrollView
        style={{
          flexGrow: 0,
          flexShrink: 0,
          height: 360,
          width: "100%",
        }}
        contentContainerStyle={{ flexGrow: 1, flexShrink: 0 }}
        horizontal={true}
      >
        <Image
          source={productImage2}
          style={{
            width: "100%",
            height: 360,
            resizeMode: "cover",
            backgroundColor: colors.mediumGray,
          }}
        />
        <Image
          source={productImage}
          style={{
            width: "100%",
            height: 360,
            resizeMode: "cover",
            backgroundColor: colors.mediumGray,
          }}
        />
      </ScrollView>

      {/* Product Details */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: utils.midSpacing,
          paddingHorizontal: utils.maxSpacing,
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              fonts.medium,
              {
                fontSize: 24,
                color: colors.tintBrown,
                textAlignVertical: "bottom",
              },
            ]}
          >
            Product 1
          </Text>

          <Text
            style={[
              fonts.regular,
              {
                color: colors.mediumGray,
                fontSize: 20,
              },
            ]}
          >
            Rs. 480
          </Text>
        </View>

        {/* Product Sizes */}
        <Text
          style={[
            fonts.medium,
            {
              fontSize: 18,
              marginTop: utils.maxSpacing,
            },
          ]}
        >
          Sizes
        </Text>

        <FlatList
          keyExtractor={(item) => item.id}
          data={ProductSizes}
          horizontal={true}
          renderItem={({ item }) => (
            <Sizes {...item} chooseSize={chooseSize} handleSize={handleSize} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: utils.minSpacing,
          }}
        />

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: utils.midSpacing,
            paddingHorizontal: utils.minSpacing,
            backgroundColor: colors.mediumGray,
            borderRadius: 10,
            marginTop: utils.maxSpacing,
          }}
        >
          <Text
            style={[
              fonts.medium,
              {
                color: colors.white,
                fontSize: 18,
              },
            ]}
          >
            Add To Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: utils.midSpacing,
            paddingHorizontal: utils.minSpacing,
            backgroundColor: colors.tintBrown,
            borderRadius: 10,
            marginVertical: utils.midSpacing,
          }}
        >
          <Text
            style={[
              fonts.medium,
              {
                color: colors.white,
                fontSize: 18,
              },
            ]}
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;
