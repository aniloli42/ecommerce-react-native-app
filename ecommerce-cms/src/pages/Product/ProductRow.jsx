import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductRow = ({ product, type, price, stock, id, images }) => {
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
    <tr className="my-2 border-b border-b-gray-600 ">
      <td className="text-gray-400 font-light text-base py-2 pr-4  ">
        {product}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4  ">
        <img
          src={image}
          alt="product image"
          className="w-20 h-20 rounded-md object-cover bg-gray-500"
        />
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">{type}</td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        Rs. {price}
      </td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">{`${stock}`}</td>
      <td className="text-gray-400 font-light text-base py-2 pr-4">
        <Link
          to={`/products/${id}`}
          className="hover:underline focus-visible:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default ProductRow;
