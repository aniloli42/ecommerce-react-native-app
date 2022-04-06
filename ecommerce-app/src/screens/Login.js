import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { auth, signInWithEmailAndPassword } from "../../firebase";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import { loginSchema } from "../schemas/userSchema";
import { Formik } from "formik";
import { ScreenHeader } from "../components";

const Login = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <ScreenHeader screenName={"Login"} callback={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            try {
              await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
            } catch (error) {
              alert(error.message);
            }
          }}
          validateOnMount={true}
        >
          {({ isValid, handleSubmit, handleChange, handleBlur, values }) => (
            <>
              {/* Form */}
              <View style={styles.formWrapper}>
                <View style={styles.formElementWrapper}>
                  <Text style={[styles.formElementLabel, fonts.medium]}>
                    Email
                  </Text>
                  <TextInput
                    style={[styles.formElementInput, fonts.regular]}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>

                <View style={styles.formElementWrapper}>
                  <Text style={[styles.formElementLabel, fonts.medium]}>
                    Password
                  </Text>
                  <TextInput
                    style={[styles.formElementInput, fonts.regular]}
                    secureTextEntry={true}
                    keyboardType="default"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                </View>

                <Pressable
                  style={styles.loginButton(isValid)}
                  onPress={handleSubmit}
                >
                  <Text style={[styles.loginButtonText, fonts.medium]}>
                    Login
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>

        <Pressable
          style={styles.forgetButton}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          <Text style={[fonts.regular, styles.forgetText]}>
            Forget password?
          </Text>
        </Pressable>

        {/* Bottom Task */}
        <View style={[styles.newAccountWrapper]}>
          <Text style={[fonts.light]}>Don't have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={[fonts.medium, styles.newAccountButtonText]}>
              Click Here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  scrollWrapper: {
    alignItems: "center",
    padding: spacing.min,
  },

  formWrapper: {
    width: "84%",
  },
  formElementWrapper: {
    marginTop: spacing.min * 1.5,
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
  loginButton: (isValid) => ({
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: isValid ? colors.tintBrown : colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 50,
  }),
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

  // forget Password

  forgetButton: {
    marginTop: spacing.mid * 1.5,
  },

  forgetText: {
    fontSize: 15,
    color: colors.mediumGray,
  },
});

export default Login;
