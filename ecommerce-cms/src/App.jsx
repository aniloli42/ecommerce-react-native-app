import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SuspenseLoading from './components/SuspenseLoading';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Product = lazy(() => import('./pages/Product'));
const ProductEdit = lazy(() => import('./pages/ProductEdit'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderEdit = lazy(() => import('./pages/OrderEdit'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <SuspenseLoading>
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
    </SuspenseLoading>
  );
}

export default App;