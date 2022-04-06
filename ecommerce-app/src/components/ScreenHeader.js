import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { spacing } from "../styles/utils";
import BackButton from "./BackButton";

const ScreenHeader = ({ screenName, callback }) => {
  return (
    <View style={styles.headerWrapper}>
      {callback && <BackButton callback={callback} />}
      <Text style={[styles.screenTitle(callback), fonts.regular]}>
        {screenName ?? "App Screen"}
      </Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.min,
    paddingVertical: spacing.min * 0.75,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  screenTitle: (callback) => ({
    color: colors.tintBrown,
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    marginLeft: callback ? "-5%" : 0,
  }),
});
