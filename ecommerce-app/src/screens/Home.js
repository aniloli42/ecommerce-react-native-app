import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import fonts from "../styles/fonts";
import colors from "../styles/colors";

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%", flex: 1 }}
    >
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: colors.lightGray,
            borderRadius: 36,
            marginTop: 120,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            elevation: 3,
          }}
        >
          <Image
            source={require("../../assets/brand.png")}
            style={{
              marginTop: 30,
              width: 270,
              height: 270,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <Text
            style={[
              {
                color: "#fff",
                fontSize: 36,
                textAlign: "center",
                fontWeight: "bold",
                textShadowColor: colors.tintBrown,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
                lineHeight: 42,
              },
              fonts.black,
            ]}
          >
            ELEGANT
          </Text>
          <Text
            style={[
              {
                color: "#fff",
                fontSize: 36,
                textAlign: "center",
                fontWeight: "bold",
                textShadowColor: colors.tintBrown,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
                lineHeight: 42,
              },
              fonts.black,
            ]}
          >
            COLLECTION
          </Text>
        </View>

        <View
          style={{
            marginTop: "auto",
            marginBottom: 50,
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={{
              marginVertical: 12,
              backgroundColor: "#fff",
              paddingVertical: 12,
              elevation: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={[{ fontSize: 18, color: colors.tintBrown }, fonts.regular]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                marginVertical: 12,
                backgroundColor: colors.tintBrown,
                paddingVertical: 12,
                elevation: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
              },
            ]}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={[{ fontSize: 18, color: "#fff" }, fonts.regular]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;
