import { StatusBar, StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
