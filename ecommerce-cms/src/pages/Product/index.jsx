import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Main from '../../layouts/Main';
import ProductTable from './ProductTable';

const Product = () => {
  return (
    <Main>
      <div className="flex justify-between items-end w-full">
        <PageTitle title="Products" />
        <Link
          to="/products/add"
          className="text-gray-300 text-xs py-2 px-4 bg-gray-600 rounded-md hover:bg-gray-500 focus-visible:bg-gray-500 active:bg-gray-400"
        >
          Add Product
        </Link>
      </div>
      <div className="w-full mt-4">
        <ProductTable />
      </div>
    </Main>
  );
};

export default Product;
