import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React from "react";
import colors from "../styles/colors";
import { spacing } from "../styles/utils";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { profileSchema } from "../schemas/userSchema";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { auth, firebaseDB } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const EditProfile = ({ handleEdit }) => {
  const { user, setUser } = useUserContext();

  return (
    <View style={styles.viewWrapper}>
      <Formik
        validationSchema={profileSchema}
        initialValues={{
          name: user?.name,
          phoneNumber: user.phoneNumber,
        }}
        onSubmit={async (values) => {
          if (
            values.name === user.name &&
            values.phoneNumber === user.phoneNumber
          )
            return handleEdit();

          const usersRef = doc(firebaseDB, "users", auth.currentUser.uid);

          await setDoc(
            usersRef,
            {
              name: values.name,
              phoneNumber: values.phoneNumber,
            },
            { merge: true }
          );

          await updateProfile(auth.currentUser, {
            displayName: values.name,
          });
          await updateCurrentUser(auth, auth.currentUser);

          setUser((prevUser) => ({
            ...prevUser,
            name: values.name,
            phoneNumber: values.phoneNumber,
          }));

          alert("Profile Updated");

          handleEdit();
        }}
      >
        {({ isValid, handleBlur, handleChange, handleSubmit, values }) => (
          <>
            <View style={styles.sectionWrapper}>
              <Text style={[fonts.regular, styles.sectionTitle]}>
                Profile Name
              </Text>
              <TextInput
                style={[fonts.light, styles.sectionTextInput]}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType="default"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={[fonts.regular, styles.sectionTitle]}>
                Email Address
              </Text>
              <Text style={[fonts.light, styles.sectionText]}>
                {user?.email}
              </Text>
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={[fonts.regular, styles.sectionTitle]}>
                Phone Number
              </Text>
              <TextInput
                style={[fonts.light, styles.sectionTextInput]}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType="numeric"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={handleSubmit}
                style={styles.editProfileButton}
              >
                <Text style={styles.editProfileButtonText(isValid)}>
                  Update Profile
                </Text>
              </Pressable>

              <Pressable onPress={handleEdit} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>

      <Text style={[fonts.light, styles.noteText]}>
        Note: Email can be change from security section.
      </Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  viewWrapper: {
    margin: spacing.min,
  },

  // section
  sectionWrapper: {
    marginBottom: spacing.min * 0.75,
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  sectionText: {
    fontSize: 18,
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

  // button section
  buttonWrapper: {
    flexDirection: "row",
  },

  editProfileButton: {
    alignSelf: "flex-start",
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
