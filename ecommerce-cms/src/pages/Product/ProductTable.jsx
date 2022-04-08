import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import image from '../../assets/IMG_1086.jpeg';

import { collection, getDocs, limit, query } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';

import ProductRow from './ProductRow';

/* 
const first = query(collection(db, "cities"), orderBy("population"), limit(25));
const documentSnapshots = await getDocs(first);

// Get the last visible document
const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
console.log("last", lastVisible);

// Construct a new query starting at this document,
// get the next 25 cities.
const next = query(collection(db, "cities"),
    orderBy("population"),
    startAfter(lastVisible),
    limit(25));
*/

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [lastPoint, setLastPoint] = useState([]);

  const getFirstProducts = async () => {
    const getFirstProductsQuery = query(
      collection(firebaseDB, 'products'),
      limit(8)
    );

    const getProductsSnap = await getDocs(getFirstProductsQuery);

    const getLastPoint = getProductsSnap.docs.at(-1);
    setLastPoint(getLastPoint);

    const getProducts = getProductsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(getProducts);
  };

  useEffect(() => {
    getFirstProducts();
  }, []);

  console.log(products);

  return (
    <div className="flex overflow-auto pb-4">
      <div className=" flex-shrink-0 p-4 flex-grow min-w-screen rounded-md bg-gray-700">
        <table className="table-auto  min-w-full  ">
          <thead className="border-b border-b-gray-400">
            <tr>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Product Name
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Image
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Product Type
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Price
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Stock
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <ProductRow key={product.id} {...product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
