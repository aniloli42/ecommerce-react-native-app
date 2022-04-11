import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { ScreenHeader } from '../components';
import { Formik } from 'formik';
import { passwordForgetSchema } from '../schemas/userSchema';
import colors from '../styles/colors';
import { buttonOpacity, spacing } from '../styles/utils';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const navigation = useNavigation();

  return (
    <View>
      <ScreenHeader
        screenName={'Forget Password'}
        callback={() => navigation.goBack()}
      />
      <View style={styles.scrollWrapper}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={passwordForgetSchema}
          onSubmit={async (values) => {
            try {
              await sendPasswordResetEmail(auth, values.email);
              alert('Check Your Email');
            } catch (error) {
              alert(error.message);
            }
          }}
          validateOnMount={true}
        >
          {({ isValid, handleSubmit, handleChange, handleBlur, values }) => (
            <>
              {/* Form */}
              <View style={styles.formWrapper}>
                <View style={styles.formElementWrapper}>
                  <Text style={[styles.formElementLabel, fonts.medium]}>
                    Email
                  </Text>
                  <TextInput
                    style={[styles.formElementInput, fonts.regular]}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>

                <TouchableOpacity
                  style={styles.loginButton(isValid)}
                  onPress={handleSubmit}
                  activeOpacity={
                    isValid ? buttonOpacity.active : buttonOpacity.disable
                  }
                >
                  <Text style={[styles.loginButtonText, fonts.medium]}>
                    Send Mail
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  scrollWrapper: {
    alignItems: 'center',
    padding: spacing.min,
  },

  formWrapper: {
    width: '90%',
  },
  formElementWrapper: {
    marginTop: spacing.min * 1.5,
  },
  formElementLabel: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  formElementInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    marginTop: 2,
    paddingVertical: 5,
    fontSize: 18,
    textDecorationLine: 'none',
  },
  loginButton: (isValid) => ({
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: isValid ? colors.tintBrown : colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 50,
  }),
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
