import { useState } from "react";
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
import utils from "../styles/utils";
import { Formik } from "formik";
import { signUpSchema } from "../schemas/userSchema";
import SelectDropdown from "react-native-select-dropdown";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const Signup = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      style={styles.scrollWrapper}
    >
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <Text style={[styles.screenTitle, fonts.medium]}>Sign Up</Text>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          gender: "Female",
          phone: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => console.log(values)}
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
                  Gender
                </Text>
                <SelectDropdown
                  data={["Female", "Male"]}
                  defaultValue={values.gender}
                  onSelect={handleChange("gender")}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}
                  buttonStyle={styles.dropDownElement}
                  buttonTextStyle={styles.dropDownText}
                  renderDropdownIcon={(isOpened) => (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={colors.mediumGray}
                      size={16}
                    />
                  )}
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
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
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
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    padding: utils.maxSpacing,
  },
  scrollWrapper: {
    flexShrink: 1,
    flexGrow: 0,
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
  dropDownElement: {
    width: "100%",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    paddingHorizontal: 0,
  },
  dropDownText: {
    textAlign: "left",
    marginLeft: 0,
  },
  loginButton: (isValid) => ({
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: isValid ? colors.tintBrown : "#ccc",
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
