import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import { auth, createUserWithEmailAndPassword } from "../../firebase";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import { Formik } from "formik";
import { signUpSchema } from "../schemas/userSchema";
import { useUserContext } from "../context/UserContext";
import ScreenHeader from "../components/ScreenHeader";

const Signup = ({ navigation }) => {
  const { setTemp } = useUserContext();

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <ScreenHeader
        screenName={"Sign up"}
        callback={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={async (values) => {
            try {
              const { name, phoneNumber, email, password } = values;

              await createUserWithEmailAndPassword(auth, email, password);

              setTemp({ name, phoneNumber });
            } catch (error) {
              alert("Check All Inputs or Email is already used.");
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
                    Name
                  </Text>
                  <TextInput
                    style={[styles.formElementInput, fonts.regular]}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    keyboardType="default"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </View>

                <View style={styles.formElementWrapper}>
                  <Text style={[styles.formElementLabel, fonts.medium]}>
                    Mobile Number
                  </Text>
                  <TextInput
                    style={[styles.formElementInput, fonts.regular]}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                  />
                </View>

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
                    Create Account
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>

        {/* Bottom Task */}
        <View style={[styles.newAccountWrapper]}>
          <Text style={[fonts.light]}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
    paddingVertical: spacing.min * 0.25,
    width: "90%",
  },
  formElementWrapper: {
    marginTop: spacing.max * 1.5,
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
});

export default Signup;
