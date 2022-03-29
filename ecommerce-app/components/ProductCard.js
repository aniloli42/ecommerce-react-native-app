import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import Icon from 'react-native-vector-icons/FontAwesome'

const ProductCard = () => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity>
        <ImageBackground
          style={[styles.imageContainer]}
          source={require('../assets/IMG_1028.jpeg')}
        >
          <TouchableOpacity style={[styles.addToCart]}>
            <Icon name='cart-plus' color={'#000'} size={18} />
          </TouchableOpacity>
        </ImageBackground>

        <Text style={[fonts.medium, styles.productTitle]}>NeckLace</Text>
        <Text style={[fonts.regular, styles.productPrice]}>Rs. 40</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 6,
  },
  imageContainer: {
    backgroundColor: colors.mediumGray,
    width: '100%',
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  addToCart: {
    width: 27,
    height: 27,
    backgroundColor: colors.white,
    position: 'absolute',
    borderRadius: 50,
    zIndex: 1,
    top: 0,
    right: 0,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    marginTop: 8,
    fontSize: 16,
  },
  productPrice: {
    color: colors.mediumGray,
  },
})

export default ProductCard
