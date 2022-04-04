import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export default ({ children }) => {
  // Product State Management
  const [cart, setCart] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => ({ ...prevCart, product }));
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart.filter((cartProduct) => cartProduct.id !== product.id);
    });
  };

  return (
    <ProductContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </ProductContext.Provider>
  );
};
