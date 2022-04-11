import { useEffect } from 'react';

// 3rd Party Packages
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';

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
} from '@expo-google-fonts/poppins';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Components
import {
  Checkout,
  Dashboard,
  ForgetPassword,
  Home,
  Login,
  OrderHistory,
  Product,
  Profile,
  Security,
  Settings,
  Signup,
} from './src/screens';

const AppStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();

import { auth, firebaseDB } from './firebase';
import { getDoc, doc } from 'firebase/firestore';
import UserContext, { useUserContext } from './src/context/UserContext';
import ProductContext from './src/context/ProductContext';
import colors from './src/styles/colors';

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          color = focused ? colors.tintBrown : '#aaa';

          if (route.name == 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }

          if (route.name === 'OrderHistory') {
            iconName = focused
              ? 'ios-reorder-four'
              : 'ios-reorder-four-outline';
          }

          if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionic name={iconName} size={size} color={color} />;
        },
      })}
    >
      <TabStack.Screen name="Home" component={Dashboard} />
      <TabStack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ tabBarLabel: 'Order History' }}
      />
      <TabStack.Screen name="Settings" component={Settings} />
    </TabStack.Navigator>
  );
};

const App = () => {
  const { isLogged, setUser, temp, setTemp } = useUserContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return setUser(null);

      const userCollection = doc(firebaseDB, 'users', user.uid);
      const userSnap = await getDoc(userCollection);

      if (!userSnap.exists()) {
        setUser(user);
        return;
      }
      const resUser = userSnap.data();
      setUser(resUser);
    });

    return unsubscribe;
  }, []);

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
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#fff',
          card: '#fff',
        },
      }}
    >
      <ProductContext>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {isLogged ? (
            <>
              <AppStack.Screen name="Tab" component={TabStackScreen} />
              <AppStack.Screen name="Product" component={Product} />
              <AppStack.Screen name="Profile" component={Profile} />
              <AppStack.Screen name="Security" component={Security} />
              <AppStack.Screen name="Checkout" component={Checkout} />
            </>
          ) : (
            <>
              <AppStack.Screen name="Home" component={Home} />
              <AppStack.Screen name="Login" component={Login} />
              <AppStack.Screen name="Signup" component={Signup} />
              <AppStack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
              />
            </>
          )}
        </AppStack.Navigator>
      </ProductContext>
    </NavigationContainer>
  );
};

export default () => (
  <UserContext>
    <App />
  </UserContext>
);
