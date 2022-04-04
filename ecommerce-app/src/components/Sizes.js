import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import { spacing } from "../styles/utils";

const Sizes = ({ size, handleSize, chooseSize }) => {
  return (
    <TouchableOpacity
      style={styles.sizeTypeWrapper(chooseSize, size)}
      onPress={() => handleSize(size)}
    >
      <Text style={[fonts.regular, styles.sizeText]}>{size ?? "?"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sizeTypeWrapper: (chooseSize, size) => ({
    marginRight: spacing.min,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "transparent",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: chooseSize === size ? "red" : colors.lightGray,
  }),
  sizeText: {
    fontSize: 18,
  },
});

export default Sizes;
