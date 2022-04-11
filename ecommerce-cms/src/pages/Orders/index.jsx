import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Main from '../../layouts/main';
import OrderTable from './OrderTable';

const ORDER_SECTIONS = [
  {
    status: 'pending',
  },
  {
    status: 'processing',
  },
  {
    status: 'shipping',
  },
  {
    status: 'delivered',
  },
  {
    status: 'rejected',
  },
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState('pending');

  const toggleSelectedOrder = (e, status) => {
    e.stopPropagation();
    setSelectedOrder(status);
  };

  return (
    <Main>
      <PageTitle title="Orders" />

      <div className="w-full mt-4">
        <div className="flex my-2 overflow-auto pb-4">
          <div className="flex flex-shrink-0 overflow-hidden rounded-md">
            {ORDER_SECTIONS.map((order) => (
              <button
                onClick={(e) => toggleSelectedOrder(e, order.status)}
                key={order.status}
                className={`text-white px-4 py-2 text-sm text-center
              ${
                selectedOrder === order.status
                  ? 'bg-gray-700'
                  : 'bg-gray-600 hover:bg-gray-500 focus-visible:bg-gray-500 active:bg-gray-400'
              }
              `}
              >
                {order.status}
              </button>
            ))}
          </div>
        </div>

        <OrderTable selectedOrder={selectedOrder} />
      </div>
    </Main>
  );
};

export default Orders;
