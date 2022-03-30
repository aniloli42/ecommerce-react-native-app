// 3rd Party Packages
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
  Dashboard,
  Home,
  Login,
  Product,
  Settings,
  Signup,
} from "./src/screens";
import { StatusBar } from "expo-status-bar";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const SpecialStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

const SpecialStackScreen = () => {
  return (
    <SpecialStack.Navigator>
      <SpecialStack.Screen name="Product" component={Product} />
      <SpecialStack.Screen name="Setting" component={Settings} />
    </SpecialStack.Navigator>
  );
};

const TabStackScreen = () => {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="Home" component={Dashboard} />
    </TabStack.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
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
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Auth" component={AuthStackScreen} />
        <AppStack.Screen name="Products" component={TabStackScreen} />
        <AppStack.Screen name="Special" component={SpecialStackScreen} />
      </AppStack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
};

export default App;
