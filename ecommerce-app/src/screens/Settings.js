import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { spacing } from "../styles/utils";

import Ionic from "react-native-vector-icons/Ionicons";
import colors from "../styles/colors";
import { ScreenHeader } from "../components/";

const Settings = () => {
  const navigation = useNavigation();

  const handleContact = async () => {
    await Linking.openURL("tel:+9779806242024");
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      {/* Screen Title */}
      <ScreenHeader screenName={"My Settings"} />

      <ScrollView>
        <View>
          {/* Section Profile */}
          <View style={styles.sectionWrapper}>
            {/* Section Header */}
            <View style={styles.sectionHeaderWrapper}>
              <Ionic name="person-outline" size={20} color="black" />
              <Text style={[styles.sectionHeaderText, fonts.regular]}>
                Account
              </Text>
            </View>

            {/* Separator */}
            <View style={styles.separator}></View>

            {/* Section Content */}
            <View style={styles.sectionContentWrapper}>
              <Pressable
                style={[styles.sectionButton]}
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={[fonts.regular, styles.buttonText]}>
                  View Profile
                </Text>
              </Pressable>

              <Pressable
                style={[styles.sectionButton]}
                onPress={() => navigation.navigate("Security")}
              >
                <Text style={[fonts.regular, styles.buttonText]}>Security</Text>
              </Pressable>
            </View>
          </View>

          {/* About App */}
          <View style={styles.sectionWrapper}>
            {/* Section Header */}
            <View style={styles.sectionHeaderWrapper}>
              <Ionic name="apps-outline" size={18} color="black" />
              <Text style={[fonts.regular, styles.sectionHeaderText]}>
                About App
              </Text>
            </View>

            {/* Separator */}
            <View style={styles.separator}></View>

            {/* Section Content */}
            <View style={styles.sectionContentWrapper}>
              <Pressable style={[styles.sectionButton]} onPress={handleContact}>
                <Text style={[fonts.regular, styles.buttonText]}>
                  Contact Us
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Logout */}
          <View style={styles.logoutButtonWrapper}>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={[styles.logoutButtonText, fonts.regular]}>
                Logout
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  signOutButton: {
    backgroundColor: "#b00",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 5,
    marginVertical: 15,
  },
  signOutText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  sectionWrapper: {
    marginHorizontal: spacing.min,
    marginVertical: spacing.min,
  },
  sectionHeaderWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.min * 0.15,
  },
  sectionHeaderText: {
    marginLeft: spacing.mid,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginBottom: spacing.min,
  },
  sectionButton: {
    marginBottom: spacing.min * 0.5,
    paddingVertical: spacing.min * 0.4,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.mediumGray,
  },

  logoutButtonWrapper: {
    marginHorizontal: spacing.min,
  },

  logoutButton: {
    backgroundColor: "red",
    paddingVertical: spacing.min * 0.75,
    paddingHorizontal: spacing.min * 0.45,
    alignItems: "center",
    borderRadius: 50,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 18,
    elevation: 5,
  },
});
