// 3rd Party Packages
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "@react-native-async-storage/async-storage";

import Ionic from "react-native-vector-icons/Ionicons";

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// Components
import {
  Cart,
  Dashboard,
  Home,
  Login,
  OrderHistory,
  Product,
  Settings,
  Signup,
} from "./src/screens";
import { StatusBar } from "expo-status-bar";
import colors from "./src/styles/colors";
import UserContext from "./src/context/UserContext";

const AppStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          color = focused ? colors.tintBrown : "#aaa";

          if (route.name == "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          }

          if (route.name === "OrderHistory") {
            iconName = focused
              ? "ios-reorder-four"
              : "ios-reorder-four-outline";
          }

          if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}
    >
      <TabStack.Screen name="Home" component={Dashboard} />
      <TabStack.Screen name="Cart" component={Cart} />
      <TabStack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ tabBarLabel: "Order History" }}
      />
      <TabStack.Screen name="Settings" component={Settings} />
    </TabStack.Navigator>
  );
};

const isAuth = false;

const App = () => {
  const [loaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!loaded) return <AppLoading />;

  return (
    <UserContext>
      <NavigationContainer
        theme={{
          colors: {
            background: "#fff",
            card: "#fff",
          },
        }}
      >
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Signup" component={Signup} />
          <AppStack.Screen name="Product" component={Product} />
          <AppStack.Screen name="Tab" component={TabStackScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </UserContext>
  );
};

export default App;
