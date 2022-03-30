import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import utils from "../styles/utils";

const ProductCard = ({ index }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        marginRight: index % 2 === 0 ? utils.midSpacing : 0,
        marginVertical: 6,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Product")}>
        <ImageBackground
          style={{
            backgroundColor: colors.mediumGray,
            width: "100%",
            height: 200,
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
          }}
          source={require("../../assets/IMG_1028.jpeg")}
        >
          <TouchableOpacity
            style={{
              width: 27,
              height: 27,
              backgroundColor: colors.white,
              position: "absolute",
              borderRadius: 50,
              zIndex: 1,
              top: 0,
              right: 0,
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="cart-plus" color={"#000"} size={16} />
          </TouchableOpacity>
        </ImageBackground>

        <Text
          style={[
            fonts.medium,
            {
              marginTop: 8,
              fontSize: 16,
            },
          ]}
        >
          NeckLace
        </Text>
        <Text
          style={[
            fonts.regular,
            {
              color: colors.mediumGray,
            },
          ]}
        >
          Rs. 40
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
