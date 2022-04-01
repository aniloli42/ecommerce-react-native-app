import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StatusBar,
  StyleSheet,
} from "react-native";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import { useState } from "react";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import utils from "../styles/utils";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert(response);
    } catch (error) {
      alert("Check Your Email and Password");
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <Text style={[styles.screenTitle, fonts.medium]}>Login</Text>

      {/* Form */}
      <KeyboardAvoidingView style={styles.formWrapper}>
        <View style={styles.formElementWrapper}>
          <Text style={[styles.formElementLabel, fonts.medium]}>Email</Text>
          <TextInput
            style={[styles.formElementInput, fonts.regular]}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.formElementWrapper}>
          <Text style={[styles.formElementLabel, fonts.medium]}>Password</Text>
          <TextInput
            style={[styles.formElementInput, fonts.regular]}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Tab", { screen: "Home" })}
        >
          <Text style={[styles.loginButtonText, fonts.medium]}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Bottom Task */}
      <View style={[styles.newAccountWrapper]}>
        <Text style={[fonts.light]}>Don't have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={[fonts.medium, styles.newAccountButtonText]}>
            Click Here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    alignItems: "center",
    padding: utils.maxSpacing,
  },
  screenTitle: { fontSize: 42 },
  formWrapper: {
    marginTop: utils.maxSpacing * 2,
    width: "84%",
  },
  formElementWrapper: {
    marginTop: utils.maxSpacing * 1.5,
  },
  formElementLabel: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  formElementInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    marginTop: 2,
    paddingVertical: 5,
    fontSize: 18,
    textDecorationLine: "none",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: colors.tintBrown,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 50,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  newAccountWrapper: {
    marginTop: 30,
    flexDirection: "row",
  },
  newAccountButtonText: {
    marginLeft: 7,
    color: colors.tintBrown,
  },
});

export default Login;
