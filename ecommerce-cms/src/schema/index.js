import { boolean, number, object, string } from 'yup';

export const loginSchema = object({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
});

export const productSchema = object({
  product: string().required(),
  desc: string(),
  price: number().positive().integer().required(),
  type: string().required(),
  stock: string().required(),
});

export const orderSchema = object({
  status: string().required(),
  orderPcs: number().integer().required().moreThan(0),
  shippingCharge: number().integer().required().moreThan(-1),
});
