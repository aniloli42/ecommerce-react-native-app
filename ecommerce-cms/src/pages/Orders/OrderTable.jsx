import { useEffect, useState } from 'react';

import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import OrderRow from './OrderRow';
import { firebaseDB } from '../../firebase';

const ORDER_LIMIT = 10;

const OrderTable = ({ selectedOrder }) => {
  const [orders, setOrders] = useState([]);
  const [lastPoint, setLastPoint] = useState([]);
  const [limitNext, setLimitNext] = useState(null);

  const getFirstOrders = async () => {
    const getFirstOrdersQuery = query(
      collection(firebaseDB, 'orders'),
      limit(ORDER_LIMIT),
      where('status', '==', selectedOrder)
    );

    const getOrdersSnap = await getDocs(getFirstOrdersQuery);
    const getLastPoint = getOrdersSnap.docs.at(-1);
    setLastPoint(getLastPoint);

    const getOrders = getOrdersSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrders(getOrders);
  };

  const getNextOrders = async () => {
    try {
      const nextOrderQuery = query(
        collection(firebaseDB, 'orders'),
        startAfter(lastPoint),
        limit(ORDER_LIMIT),
        where('status', '==', selectedOrder)
      );

      const nextOrderSnap = await getDocs(nextOrderQuery);
      const getLastPoint = nextOrderSnap.docs.at(-1);
      setLastPoint(getLastPoint);

      const getOrders = nextOrderSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders((prev) => [...prev, ...getOrders]);
    } catch (e) {
      setOrders((prev) => [...prev]);
      console.log(e.message);
    }
  };

  useEffect(() => {
    getFirstOrders();
  }, [selectedOrder]);

  // Try to limit the products length
  useEffect(() => {
    if (orders == null) return;
    if (orders.length === 0) return;

    const orderLength = orders.length % ORDER_LIMIT;

    if (limitNext == null && orderLength === 0) {
      setLimitNext({
        next: 1,
        orderPrevLength: orders.length,
      });
      return;
    }

    if (orderLength !== 0) {
      setLimitNext((prev) => ({
        ...prev,
        next: 0,
        second: 0,
        orderPrevLength: orders.length,
      }));
      return;
    }

    if (orderLength === 0 && limitNext.orderPrevLength === orders.length) {
      setLimitNext((prev) => ({
        ...prev,
        next: 0,
      }));
      return;
    }

    if (orderLength === 0 && limitNext.orderPrevLength !== orders.length) {
      setLimitNext((prev) => ({
        ...prev,
        orderPrevLength: orders.length,
      }));
      return;
    }
  }, [orders]);

  const handleLoadMore = async (e) => {
    e.stopPropagation();
    await getNextOrders();
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
                  Product Image
                </th>
                <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                  Type
                </th>
                <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                  Order By
                </th>
                <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                  Contact
                </th>
                <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                  Total Price
                </th>

                <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                  Date
                </th>
                <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <OrderRow key={order.id} {...order} />
              ))}

              {orders?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-gray-400 
                text-center py-2"
                  >
                    Orders Not Found. Or, Check Internet Connection.
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
          Load More Orders
        </button>
      )}
    </>
  );
};

export default OrderTable;
