import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import styles from '../styles/Home.style'
import fonts from '../styles/fonts'

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/home-background.png')}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/brand.png')} style={styles.image} />
        </View>
        <View style={styles.brandContainer}>
          <Text style={[styles.brandTitle, fonts.black]}>ELEGANT</Text>
          <Text style={[styles.brandTitle, fonts.black]}>COLLECTION</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, fonts.regular]}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={[styles.buttonText, styles.signupText, fonts.regular]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Home
