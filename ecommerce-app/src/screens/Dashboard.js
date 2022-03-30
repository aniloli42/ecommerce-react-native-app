import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";

// Custom
import fonts from "../styles/fonts";
import utils from "../styles/utils";
import { ProductCard } from "../components";

const Data = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: colors.lightGray,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: utils.maxSpacing,
          paddingVertical: utils.minSpacing,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionic name="person-circle" size={47} color={"#000"} />
        </TouchableOpacity>
      </View>

      <Text
        style={[
          {
            paddingHorizontal: utils.maxSpacing,
            fontSize: 27,
            flexWrap: "wrap",
          },
          fonts.semiBold,
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
            marginTop: utils.midSpacing,
            marginBottom: utils.minSpacing,
            marginHorizontal: utils.maxSpacing,
            textAlignVertical: "bottom",
          },
          fonts.regular,
        ]}
      />

      <ScrollView
        horizontal={true}
        style={{
          paddingHorizontal: utils.maxSpacing,
          height: 80,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={{
            padding: utils.minSpacing,
          }}
        >
          <Text>Hello</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={Data}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <ProductCard {...item} />}
        contentContainerStyle={{
          paddingHorizontal: utils.maxSpacing,
          display: "flex",
          justifyContent: "space-around",
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
