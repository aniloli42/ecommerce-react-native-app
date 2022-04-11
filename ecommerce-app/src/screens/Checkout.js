import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { buttonOpacity, spacing } from '../styles/utils';
import colors from '../styles/colors';
import { ScreenHeader } from '../components';
import { useProductContext } from '../context/ProductContext';
import { useNavigation } from '@react-navigation/native';
import { auth, firebaseDB } from '../../firebase';
import fonts from '../styles/fonts';
import { Formik } from 'formik';
import { checkOutSchema } from '../schemas/userSchema';
import { useUserContext } from '../context/UserContext';
import { setDoc, doc, collection } from 'firebase/firestore';

const Checkout = () => {
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { product, setProduct } = useProductContext();

  return (
    <View style={styles.wrapper}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />

      {/* Screen Title */}
      <ScreenHeader
        screenName={'Checkout'}
        callback={() => navigation.goBack()}
      />

      <ScrollView>
        <Formik
          validationSchema={checkOutSchema}
          validateOnMount={true}
          initialValues={{
            orderName: auth.currentUser.displayName,
            orderAddress: '',
            phoneNumber: user.phoneNumber,
          }}
          onSubmit={async (values) => {
            const orderRef = collection(firebaseDB, 'orders');
            await setDoc(doc(orderRef), {
              ...product,
              orderName: values.orderName,
              orderAddress: values.orderAddress,
              phoneNumber: values.phoneNumber,
              userId: auth.currentUser.uid,
              orderAt: Date.now(),
            });

            alert(
              'Order Submitted, You can check order status in Order History Section.'
            );

            setProduct(null);
            navigation.navigate('Home');
          }}
        >
          {({ isValid, values, handleBlur, handleChange, handleSubmit }) => (
            <View style={styles.formWrapper}>
              <View style={styles.formElement}>
                <Text style={[styles.formLabel, fonts.light]}>Order Name</Text>
                <TextInput
                  style={[styles.formInput, fonts.regular]}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={handleChange('orderName')}
                  onBlur={handleBlur('orderName')}
                  value={values.orderName}
                />
              </View>

              <View style={styles.formElement}>
                <Text style={[styles.formLabel, fonts.light]}>
                  Order Address
                </Text>
                <TextInput
                  style={[styles.formInput, fonts.regular]}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={handleChange('orderAddress')}
                  onBlur={handleBlur('orderAddress')}
                  value={values.orderAddress}
                />
              </View>

              <View style={styles.formElement}>
                <Text style={[styles.formLabel, fonts.light]}>
                  Phone Number
                </Text>
                <TextInput
                  style={[styles.formInput, fonts.regular]}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyboardType="numeric"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
              </View>

              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.button(isValid)}
                  onPress={handleSubmit}
                  activeOpacity={
                    isValid ? buttonOpacity.active : buttonOpacity.disable
                  }
                >
                  <Text style={[styles.buttonText, fonts.regular]}>
                    Submit Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.noteWrapper}>
          <View style={styles.noteListWrapper}>
            <Text style={[styles.noteText, fonts.regular]}>Note:</Text>
            <Text style={[styles.listText, fonts.light]}>
              1. You will receive call for order confirmation.
            </Text>
            <Text style={[styles.listText, fonts.light]}>
              2. You have to pay before order shipping.
            </Text>
            <Text style={[styles.listText, fonts.light]}>
              2. Shipping Charge is not included in product price.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },

  // Form
  formWrapper: {
    margin: spacing.min,
  },

  formElement: {
    marginBottom: spacing.min,
  },

  formLabel: {
    fontSize: 14,
    color: colors.mediumGray,
    marginBottom: spacing.min * 0.25,
  },

  formInput: {
    borderWidth: 1,
    borderColor: colors.tintBrown,
    borderRadius: 5,
    fontSize: 16,
    paddingVertical: spacing.min * 0.34,
    paddingHorizontal: spacing.min * 0.5,
  },

  // Submit button
  buttonWrapper: {
    marginVertical: spacing.min * 0.45,
  },

  button: (isValid) => ({
    paddingVertical: spacing.min * 0.5,
    paddingHorizontal: spacing.min * 0.25,
    alignItems: 'center',
    backgroundColor: isValid ? colors.tintBrown : colors.mediumGray,
    borderRadius: 50,
  }),

  buttonText: {
    fontSize: 16,
    color: colors.white,
  },

  // Note
  noteWrapper: {
    marginHorizontal: spacing.min,
  },

  noteText: {
    fontSize: 14,
    color: colors.mediumGray,
    display: 'flex',
  },

  listText: {
    fontSize: 14,
    color: colors.mediumGray,
  },
});
