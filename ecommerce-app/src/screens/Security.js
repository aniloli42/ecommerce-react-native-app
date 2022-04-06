import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "../components";

const Security = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScreenHeader
        screenName={"Security"}
        callback={() => navigation.goBack()}
      />
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({});
