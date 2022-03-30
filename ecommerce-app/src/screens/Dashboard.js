import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { ProductCard } from "../components";

// Custom
import fonts from "../styles/fonts";

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingHorizontal: 24,
        backgroundColor: colors.lightGray,
        flex: 1,
      }}
    >
      <View></View>
      <View>
        <Text
          style={[
            {
              fontSize: 24,
              marginTop: 32,
            },
            fonts.medium,
          ]}
        >
          Elegant Collection
        </Text>

        {/* Search Box */}
        <TextInput
          placeholder="Search"
          style={[
            {
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: colors.white,
              fontSize: 14,
              marginVertical: 15,
              textAlignVertical: "bottom",
            },
            fonts.regular,
          ]}
        />
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingVertical: 15,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            maxWidth: 480,
            alignItems: "center",
          }}
        >
          <ProductCard navigation={navigation} />
          <ProductCard navigation={navigation} />
          <ProductCard navigation={navigation} />
          <ProductCard navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
