import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required().min(3, "Invalid Name"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be greater than 7 characters."),
  phone: yup.string().required().min(10).max(10),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});
