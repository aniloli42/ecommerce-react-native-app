import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ionic from "react-native-vector-icons/Ionicons";
import utils from "../styles/utils";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

const productImage = require("../../assets/IMG_8616.jpeg");
const productImage2 = require("../../assets/IMG_8633.jpeg");

const Product = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: colors.lightGray,
        flex: 1,
      }}
    >
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
          onPress={() => navigation.navigate("Tab", { screen: "Home" })}
        >
          <Ionic name="arrow-back" size={27} color={"#000"} />
        </TouchableOpacity>
      </View>

      {/* Image */}

      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-end",
          height: 360,
          width: "100%",
        }}
      >
        <Image
          source={productImage2}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            backgroundColor: colors.mediumGray,
          }}
        />
      </View>

      {/* Product Details */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: utils.midSpacing,
          paddingHorizontal: utils.maxSpacing,
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

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: "row",
            marginVertical: utils.minSpacing,
          }}
        >
          <Sizes text={"S"} />
          <Sizes text={"M"} />
          <Sizes text={"X"} />
        </ScrollView>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: utils.midSpacing,
            paddingHorizontal: utils.minSpacing,
            backgroundColor: colors.mediumGray,
            borderRadius: 10,
            marginTop: utils.midSpacing,
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

const Sizes = ({ text }) => {
  return (
    <TouchableOpacity
      style={{
        marginRight: utils.maxSpacing,
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderColor: "transparent",
        elevation: 1,
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={[
          fonts.regular,
          {
            fontSize: 18,
          },
        ]}
      >
        {text ?? "?"}
      </Text>
    </TouchableOpacity>
  );
};

export default Product;
