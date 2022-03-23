import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'

import styles from '../styles/Login.style'
import fonts from '../styles/fonts'

const Signup = ({ navigation }) => {
  return (
    <ScrollView style={[styles.scrollContainer]}>
      <View style={styles.container}>
        <Text style={[styles.pageTitle, fonts.medium]}>Signup</Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={[styles.formElement]}>
            <Text style={[styles.formLabel, fonts.medium]}>Name</Text>
            <TextInput style={[styles.formInput, fonts.regular]} />
          </View>

          <View style={[styles.formElement, styles.passwordElement]}>
            <Text style={[styles.formLabel, fonts.medium]}>Address</Text>
            <TextInput style={[styles.formInput, fonts.regular]} />
          </View>

          <View style={[styles.formElement, styles.passwordElement]}>
            <Text style={[styles.formLabel, fonts.medium]}>Phone Number</Text>
            <TextInput style={[styles.formInput, fonts.regular]} />
          </View>

          <View style={[styles.formElement, styles.passwordElement]}>
            <Text style={[styles.formLabel, fonts.medium]}>Password</Text>
            <TextInput style={[styles.formInput, fonts.regular]} />
          </View>

          <TouchableOpacity style={[styles.button]}>
            <Text style={[styles.buttonText, fonts.medium]}>Signup</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Task */}
        <View style={[styles.alertContainer]}>
          <Text style={[fonts.light]}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[fonts.medium, styles.clickHere]}>Click Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signup
