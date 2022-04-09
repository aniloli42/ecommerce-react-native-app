import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';
import { firebaseDB } from '../../firebase';
import ProductRow from './ProductRow';

const PRODUCT_LIMIT = 10;

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [lastPoint, setLastPoint] = useState([]);
  const [limitNext, setLimitNext] = useState(null);

  const getFirstProducts = async () => {
    const getFirstProductsQuery = query(
      collection(firebaseDB, 'products'),
      limit(PRODUCT_LIMIT)
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

  const getNextProducts = async () => {
    try {
      const nextProductQuery = query(
        collection(firebaseDB, 'products'),
        startAfter(lastPoint),
        limit(PRODUCT_LIMIT)
      );

      const nextProductSnap = await getDocs(nextProductQuery);
      const getLastPoint = nextProductSnap.docs.at(-1);
      setLastPoint(getLastPoint);

      const getProducts = nextProductSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts((prev) => [...prev, ...getProducts]);
    } catch (e) {
      setProducts((prev) => [...prev]);
      console.log(e.message);
    }
  };

  useEffect(() => {
    getFirstProducts();
  }, []);

  // Try to limit the products length
  useEffect(() => {
    if (products == null) return;
    if (products.length === 0) return;

    const productLength = products.length % PRODUCT_LIMIT;

    if (limitNext == null && productLength === 0) {
      setLimitNext({
        next: 1,
        productPrevLength: products.length,
      });
      return;
    }

    if (productLength !== 0) {
      setLimitNext((prev) => ({
        ...prev,
        next: 0,
        second: 0,
        productPrevLength: products.length,
      }));
      return;
    }

    if (
      productLength === 0 &&
      limitNext.productPrevLength === products.length
    ) {
      setLimitNext((prev) => ({
        ...prev,
        next: 0,
      }));
      return;
    }

    if (
      productLength === 0 &&
      limitNext.productPrevLength !== products.length
    ) {
      setLimitNext((prev) => ({
        ...prev,
        productPrevLength: products.length,
      }));
      return;
    }
  }, [products]);

  const handleLoadMore = async (e) => {
    e.stopPropagation();
    await getNextProducts();
  };

  return (
    <>
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

              {products?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-gray-400 
                text-center py-2"
                  >
                    Products Not Found. Or, Check Internet Connection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {limitNext?.next === 1 && (
        <button
          onClick={handleLoadMore}
          className="text-white bg-gray-600 rounded-md my-2 py-2 px-4 w-full"
        >
          Load More Products
        </button>
      )}
    </>
  );
};

export default ProductTable;
