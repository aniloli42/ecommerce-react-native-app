import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'

import styles from '../styles/Login.style'
import fonts from '../styles/fonts'

const Login = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.pageTitle, fonts.medium]}>Login</Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={[styles.formElement]}>
            <Text style={[styles.formLabel, fonts.medium]}>Email</Text>
            <TextInput style={[styles.formInput, fonts.regular]} />
          </View>

          <View style={[styles.formElement, styles.passwordElement]}>
            <Text style={[styles.formLabel, fonts.medium]}>Password</Text>
            <TextInput style={[styles.formInput, fonts.regular]} />
          </View>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={[styles.buttonText, fonts.medium]}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Task */}
        <View style={[styles.alertContainer]}>
          <Text style={[fonts.light]}>Don't have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={[fonts.medium, styles.clickHere]}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login
