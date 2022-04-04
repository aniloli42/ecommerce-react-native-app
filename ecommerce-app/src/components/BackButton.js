import { StyleSheet, Pressable } from "react-native";

import Ionic from "react-native-vector-icons/Ionicons";

const BackButton = ({ callback }) => {
  return (
    <Pressable style={styles.backButton} onPress={callback}>
      <Ionic name="arrow-back" size={20} color={"#000"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 34,
    height: 34,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 3,
    zIndex: 10,
  },
});

export default BackButton;
