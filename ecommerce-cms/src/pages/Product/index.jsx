import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Main from '../../layouts/main';
import ProductTable from './ProductTable';

const Product = () => {
  return (
    <Main>
      <div className="flex justify-between items-end w-full">
        <PageTitle title="Products" />
        <Link
          to="/products/add"
          className="text-gray-300 text-xs py-2 px-4 bg-gray-600 rounded-md"
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
