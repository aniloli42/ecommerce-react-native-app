import React from 'react';
import PageTitle from '../../components/PageTitle';
import Main from '../../layouts/main';
import OrderTable from './OrderTable';

const Orders = () => {
  return (
    <Main>
      <PageTitle title="Orders" />

      <div className="w-full mt-4">
        <div className="flex my-2 overflow-auto pb-4">
          <div className="flex flex-shrink-0 overflow-hidden rounded-md">
            <p className="text-white px-4 py-2 text-sm bg-gray-600 text-center">
              Pending Orders
            </p>
            <p className="text-white px-4 py-2 text-sm bg-gray-500 text-center">
              Processing Orders
            </p>
            <p className="text-white px-4 py-2 text-sm bg-gray-500 text-center">
              Shipping Orders
            </p>
            <p className="text-white px-4 py-2 text-sm bg-gray-500 text-center">
              Completed Orders
            </p>
          </div>
        </div>

        <OrderTable />
      </div>
    </Main>
  );
};

export default Orders;
