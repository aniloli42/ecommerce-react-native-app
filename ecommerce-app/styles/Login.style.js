import { StyleSheet } from 'react-native'
import colors from './colors'

export default styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.lightGray,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  pageTitle: {
    marginTop: 72,
    fontSize: 42,
  },
  formContainer: {
    maxWidth: 450,
    width: '80%',
    marginTop: 50,
  },
  formElement: {
    marginTop: 15,
  },
  passwordElement: { marginTop: 36 },
  formLabel: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    marginTop: 2,
    paddingVertical: 5,
    fontSize: 18,
    textDecorationLine: 'none',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: colors.tintBrown,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  alertContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  clickHere: {
    marginLeft: 7,
    color: colors.tintBrown,
  },
})
