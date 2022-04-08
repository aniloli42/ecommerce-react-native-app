import React from 'react';
import SuspenseLoading from '../components/SuspenseLoading';
import Main from '../layouts/main';

const Product = () => {
  return (
    <SuspenseLoading>
      <Main>Product</Main>
    </SuspenseLoading>
  );
};

export default Product;
