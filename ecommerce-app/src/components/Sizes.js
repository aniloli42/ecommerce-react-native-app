import { TouchableOpacity, Text } from "react-native";
import colors from "../styles/colors";
import utils from "../styles/utils";

const Sizes = ({ size, handleSize, chooseSize, id }) => {
  return (
    <TouchableOpacity
      style={{
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
      }}
      onPress={() => handleSize(id)}
    >
      <Text
        style={[
          fonts.regular,
          {
            fontSize: 18,
          },
        ]}
      >
        {size ?? "?"}
      </Text>
    </TouchableOpacity>
  );
};

export default Sizes;
