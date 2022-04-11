import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { buttonOpacity, spacing } from '../styles/utils';

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View style={styles.wrapper}>
        <View style={styles.brandWrapper}>
          <View style={styles.brandImageWrapper}>
            <Image
              source={require('../../assets/brand.png')}
              style={styles.brandImage}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={[styles.brandText, fonts.black]}>ELEGANT</Text>
            <Text style={[styles.brandText, fonts.black]}>COLLECTION</Text>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.loginButton, styles.button]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={buttonOpacity.active}
          >
            <Text
              style={[styles.buttonText, styles.loginButtonText, fonts.regular]}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signUpButton, styles.button]}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={buttonOpacity.active}
          >
            <Text
              style={[
                styles.buttonText,
                styles.signUpButtonText,
                fonts.regular,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { width: '100%', height: '100%', flex: 1 },
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
  brandWrapper: {
    alignItems: 'center',
  },
  brandImageWrapper: {
    width: 150,
    height: 150,
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderRadius: 36,
    marginTop: spacing.max * 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  brandImage: {
    marginTop: 30,
    width: 270,
    height: 270,
  },
  textWrapper: {
    marginTop: spacing.max,
  },
  brandText: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: colors.tintBrown,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: 42,
  },
  buttonWrapper: {
    margin: spacing.max,
    width: '80%',
  },
  button: {
    marginVertical: 12,
    paddingVertical: 12,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#fff',
  },
  signUpButton: {
    backgroundColor: colors.tintBrown,
  },
  buttonText: { fontSize: 18 },
  loginButtonText: { color: colors.tintBrown },
  signUpButtonText: { color: '#fff' },
});

export default Home;
