import { useState, useEffect } from 'react';
import {
  View,
  Pressable,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ id, product, price, images }) => {
  const navigation = useNavigation();

  const [image, setImage] = useState();

  useEffect(() => {
    if (images == null) return;
    if (images.length === 0) return;
    const storage = getStorage();
    const imageRef = ref(storage, images[0]);

    getDownloadURL(imageRef)
      .catch((e) => console.log(e.message))
      .then((url) => setImage(url));
  }, []);

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate('Product', {
            productId: id,
          })
        }
        style={styles.productImageWrapper}
      >
        <ImageBackground style={styles.productImage} source={{ uri: image }} />
        <Text style={[fonts.medium, styles.productName]}>{product}</Text>
        <Text style={[fonts.regular, styles.productPrice]}>Rs. {price}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.lightGray,
  },
  productName: {
    marginTop: 8,
    fontSize: 16,
  },
  productPrice: {
    color: colors.mediumGray,
  },
});

export default ProductCard;
