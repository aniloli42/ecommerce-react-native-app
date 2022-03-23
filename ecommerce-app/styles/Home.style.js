import { StyleSheet } from 'react-native'
import colors from './colors'

export default styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'scroll',
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: colors.lightGray,
    borderRadius: 36,
    marginTop: 120,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    marginTop: 30,
    width: 270,
    height: 270,
  },
  brandContainer: {
    marginTop: 30,
  },
  brandTitle: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: colors.tintBrown,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: 42,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 50,
    width: '80%',
    maxWidth: 450,
  },
  button: {
    marginVertical: 12,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: colors.tintBrown,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  signupText: {
    color: '#fff',
  },
})
