import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export default ({ children }) => {
  // Product State Management
  const [product, setProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
