import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import utils from "../styles/utils";

const Sizes = ({ size, handleSize, chooseSize, id }) => {
  return (
    <TouchableOpacity
      style={styles.sizeTypeWrapper(chooseSize, id)}
      onPress={() => handleSize(id)}
    >
      <Text style={[fonts.regular, styles.sizeText]}>{size ?? "?"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sizeTypeWrapper: (chooseSize, id) => ({
    marginRight: utils.maxSpacing,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "transparent",
    elevation: 1,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: chooseSize === id ? "red" : "white",
  }),
  sizeText: {
    fontSize: 18,
  },
});

export default Sizes;
