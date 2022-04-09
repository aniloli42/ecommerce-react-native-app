import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getDate from '../../utils/getDate';

const OrderRow = ({
  productTitle,
  productType,
  productImage,
  totalPrice,
  orderName,
  phoneNumber,
  orderAt,
  id,
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

  return (
    <tr className="my-2 border-b border-b-gray-600 ">
      <td className="text-gray-400 font-light text-base py-2 pr-4  ">
        {productTitle}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4  ">
        <img
          src={image}
          alt="product image"
          className="w-20 h-20 rounded-md object-cover bg-gray-500"
        />
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        {productType}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        {orderName}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        {phoneNumber}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        Rs. {totalPrice}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        {getDate(orderAt)}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        <Link
          to={`/orders/${id}`}
          className="hover:underline focus-visible:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default OrderRow;
