import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Settings = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      <Text>Settings</Text>
      <Pressable
        onPress={async () => {
          try {
            await signOut(auth);
          } catch (error) {
            alert(error.message);
          }
        }}
        style={styles.signOutButton}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
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
});
