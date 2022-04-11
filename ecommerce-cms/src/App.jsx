import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductEdit from './pages/ProductEdit';
import Orders from './pages/Orders';
import OrderEdit from './pages/OrderEdit';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products">
        <Route index element={<Product />} />
        <Route path="add" element={<ProductEdit />} />
        <Route path=":productId" element={<ProductEdit />} />
      </Route>
      <Route path="/orders">
        <Route index element={<Orders />} />
        <Route path=":orderId" element={<OrderEdit />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
