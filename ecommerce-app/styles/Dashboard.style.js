import { StyleSheet, StatusBar, Platform } from 'react-native'
import colors from './colors'

export default styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 24,
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  brandTitle: {
    fontSize: 24,
    marginTop: 32,
  },

  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.white,
    fontSize: 14,
    marginVertical: 15,
    textAlignVertical: 'bottom',
  },
  productContainer: {
    paddingVertical: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
