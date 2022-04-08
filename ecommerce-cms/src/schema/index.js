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
