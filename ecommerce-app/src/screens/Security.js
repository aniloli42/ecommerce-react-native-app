import { useNavigation } from "@react-navigation/native";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
  updatePassword,
  signOut,
} from "firebase/auth";
import { Formik } from "formik";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { auth } from "../../firebase";

import { ScreenHeader } from "../components";
import { emailChangeSchema, passwordChangeSchema } from "../schemas/userSchema";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";

const Security = () => {
  const navigation = useNavigation();

  const reAuth = async (password) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <View>
      <ScreenHeader
        screenName={"Security"}
        callback={() => navigation.goBack()}
      />

      <View style={styles.viewWrapper}>
        <Formik
          validationSchema={emailChangeSchema}
          validateOnMount={true}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try {
              if (values.email === auth.currentUser.email)
                return alert("You entered same email.");

              await reAuth(values.password);
              await verifyBeforeUpdateEmail(auth.currentUser, values.email);
              alert("Check Email, Verify & Login");

              await signOut(auth);
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          {({ isValid, handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.sectionWrapper}>
              <Text style={[fonts.medium, styles.sectionTitle]}>
                Change Email
              </Text>
              <View style={styles.separator}></View>
              <View style={styles.sectionElementWrapper}>
                <Text style={[fonts.regular, styles.sectionTitle]}>
                  New Email
                </Text>
                <TextInput
                  style={[fonts.light, styles.sectionTextInput]}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View style={styles.sectionElementWrapper}>
                <Text style={[fonts.regular, styles.sectionTitle]}>
                  Password
                </Text>
                <TextInput
                  style={[fonts.light, styles.sectionTextInput]}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  keyboardType="default"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              <Pressable
                onPress={handleSubmit}
                style={styles.editProfileButton}
              >
                <Text style={styles.editProfileButtonText(isValid)}>
                  Update Email
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <Formik
          validationSchema={passwordChangeSchema}
          validateOnMount={true}
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          onSubmit={async (values) => {
            try {
              await reAuth(values.oldPassword);
              await updatePassword(auth.currentUser, values.newPassword);
              alert("Login with new password");

              await signOut(auth);
            } catch (e) {
              alert(e.message);
            }
          }}
        >
          {({ isValid, handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.sectionWrapper}>
              <Text style={[fonts.medium, styles.sectionTitle]}>
                Change Password
              </Text>
              <View style={styles.separator}></View>
              <View style={styles.sectionElementWrapper}>
                <Text style={[fonts.regular, styles.sectionTitle]}>
                  Old Password
                </Text>
                <TextInput
                  style={[fonts.light, styles.sectionTextInput]}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  keyboardType="default"
                  secureTextEntry
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  value={values.oldPassword}
                />
              </View>
              <View style={styles.sectionElementWrapper}>
                <Text style={[fonts.regular, styles.sectionTitle]}>
                  New Password
                </Text>
                <TextInput
                  style={[fonts.light, styles.sectionTextInput]}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  keyboardType="default"
                  secureTextEntry
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  value={values.newPassword}
                />
              </View>

              <Pressable
                onPress={handleSubmit}
                style={styles.editProfileButton}
              >
                <Text style={styles.editProfileButtonText(isValid)}>
                  Update Password
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <Text style={[fonts.light, styles.noteText]}>
          Note: After Each Request, You will be Logout.
        </Text>
      </View>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  viewWrapper: {
    margin: spacing.min,
  },

  // section

  sectionWrapper: {
    marginBottom: spacing.min,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: spacing.min,
  },

  separator: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },

  sectionTitle: {
    fontSize: 14,
    color: colors.tintBrown,
  },
  sectionText: {
    fontSize: 18,
  },

  sectionElementWrapper: {
    marginTop: spacing.min,
  },

  // TextInput
  sectionTextInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: spacing.min * 0.5,
    paddingVertical: spacing.min * 0.35,
    fontSize: 16,
    marginTop: spacing.min * 0.25,
    borderColor: colors.mediumGray,
  },

  editProfileButton: {
    alignSelf: "flex-start",
    marginTop: spacing.min,
  },

  editProfileButtonText: (isValid) => ({
    backgroundColor: isValid ? colors.tintBrown : colors.mediumGray,
    paddingHorizontal: spacing.min,
    paddingVertical: spacing.min * 0.5,
    borderRadius: 50,
    color: colors.white,
  }),

  cancelButton: {
    alignSelf: "flex-start",
    marginLeft: spacing.min,
  },
  cancelButtonText: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.min * 0.75,
    paddingVertical: spacing.min * 0.5,
    borderRadius: 50,
    color: colors.tintBrown,
  },

  // Note section
  noteText: {
    marginVertical: spacing.min,
    color: colors.mediumGray,
  },
});
