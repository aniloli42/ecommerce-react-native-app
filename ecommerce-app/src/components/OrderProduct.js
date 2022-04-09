import { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { spacing } from '../styles/utils';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteDoc, doc } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';
const OrderProduct = ({
  id,
  totalPrice,
  productImage,
  productTitle,
  productType,
  productSize,
  shippingCharge,
  status,
  orderPcs,
  remarks,
  getInitialOrders,
}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (productImage == null) return;
    if (productImage.length === 0) return;
    const storage = getStorage();
    const imageRef = ref(storage, productImage);

    getDownloadURL(imageRef)
      .catch((e) => console.log(e.message))
      .then((url) => setImage(url));
  }, []);

  const removeFromCart = async () => {
    await deleteDoc(doc(firebaseDB, 'orders', id));
    await getInitialOrders();
  };

  return (
    <View style={styles.cartProductWrapper}>
      {/* Image View */}
      <View>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>

      {/* Details View */}
      <View style={styles.productContentWrapper}>
        {/* Product Title */}
        <Text style={[styles.productTitle, fonts.regular]}>{productTitle}</Text>

        {/* Product Price */}
        <Text style={[styles.priceText, fonts.light]}>Rs. {totalPrice}</Text>

        <Text style={[styles.productStatus(status), fonts.light]}>
          {status}
        </Text>

        {/* Product Size */}
        {productType !== 'rejected' && remarks === '' ? (
          <View style={styles.sizePcsWrapper}>
            {productType == 'Ring' && (
              <Text style={[styles.sizeText, fonts.light]}>{productSize}</Text>
            )}

            {orderPcs ? (
              <Text style={[styles.pcsText, fonts.light]}>Pcs: {orderPcs}</Text>
            ) : null}

            {shippingCharge !== 0 && (
              <View style={styles.shippingWrapper}>
                <Icon name="local-shipping" size={18} color="#aaa" />
                <Text style={[styles.pcsText, fonts.light]}>
                  Rs.{shippingCharge}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View>
            <Text style={[styles.pcsText, fonts.light]}>{remarks}</Text>
          </View>
        )}
      </View>

      {/* Product Remove View */}
      {status === 'pending' || status === 'rejected' ? (
        <Pressable style={styles.deleteButton} onPress={removeFromCart}>
          <MaterialsIcon name="delete" size={20} color="red" />
        </Pressable>
      ) : null}
    </View>
  );
};

export default OrderProduct;

const styles = StyleSheet.create({
  cartProductWrapper: {
    flexDirection: 'row',
    marginHorizontal: spacing.min,
    marginBottom: spacing.min,
    alignItems: 'flex-start',
  },
  productImage: {
    width: 100,
    height: 140,
    borderRadius: 15,
    backgroundColor: '#ccc',
  },
  productContentWrapper: {
    marginHorizontal: spacing.mid,
    alignItems: 'flex-start',
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    marginTop: '3%',
  },
  priceText: {
    fontSize: 14,
    marginTop: spacing.min * 0.05,
    color: colors.mediumGray,
  },

  sizePcsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  pcsText: {
    marginLeft: spacing.min * 0.5,
    fontSize: 14,
    color: colors.mediumGray,
  },

  shippingWrapper: {
    flexDirection: 'row',
    marginLeft: spacing.min * 0.75,
  },

  sizeText: {
    marginTop: spacing.min * 0.25,
    borderWidth: 1,
    borderColor: 'lightgray',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    width: 26,
    height: 26,
    borderRadius: 50,
    elevation: 3,
    fontSize: 14,
    backgroundColor: colors.white,
  },
  deleteButton: {
    padding: spacing.min * 0.65,
    borderWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 50,
    marginTop: spacing.min * 0.25,
    marginRight: spacing.min,
  },

  // product status
  productStatus: (status) => ({
    backgroundColor:
      status === 'pending'
        ? colors.pending
        : status === 'processing'
        ? colors.processing
        : status === 'delivered'
        ? colors.delivered
        : status === 'rejected'
        ? colors.rejected
        : status === 'shipping'
        ? colors.shipping
        : colors.lightGray,
    paddingHorizontal: spacing.min * 0.75,
    paddingVertical: spacing.min * 0.15,
    borderRadius: 50,
    color: colors.white,
    fontSize: 12,
    marginVertical: spacing.min * 0.35,
  }),
});
