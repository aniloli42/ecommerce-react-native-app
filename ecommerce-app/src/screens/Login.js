import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

const Login = ({ navigation }) => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 50,
          }}
        >
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            animated={true}
          />
          <Text
            style={[
              {
                marginTop: 72,
                fontSize: 42,
              },
              fonts.medium,
            ]}
          >
            Login
          </Text>

          {/* Form */}
          <View
            style={{
              width: "80%",
              marginTop: 50,
            }}
          >
            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: colors.mediumGray,
                  },
                  fonts.medium,
                ]}
              >
                Email
              </Text>
              <TextInput
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.mediumGray,
                    marginTop: 2,
                    paddingVertical: 5,
                    fontSize: 18,
                    textDecorationLine: "none",
                  },
                  fonts.regular,
                ]}
              />
            </View>

            <View
              style={{
                marginTop: 36,
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: colors.mediumGray,
                  },
                  fonts.medium,
                ]}
              >
                Password
              </Text>
              <TextInput
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.mediumGray,
                    marginTop: 2,
                    paddingVertical: 5,
                    fontSize: 18,
                    textDecorationLine: "none",
                  },
                  fonts.regular,
                ]}
              />
            </View>

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                backgroundColor: colors.tintBrown,
                paddingHorizontal: 8,
                paddingVertical: 12,
                borderRadius: 50,
              }}
              onPress={() => navigation.navigate("Tab", { screen: "Home" })}
            >
              <Text
                style={[
                  {
                    color: "#fff",
                    fontSize: 18,
                  },
                  fonts.medium,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Task */}
          <View
            style={[
              {
                marginTop: 30,
                flexDirection: "row",
              },
            ]}
          >
            <Text style={[fonts.light]}>Don't have an Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={[
                  fonts.medium,
                  {
                    marginLeft: 7,
                    color: colors.tintBrown,
                  },
                ]}
              >
                Click Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
