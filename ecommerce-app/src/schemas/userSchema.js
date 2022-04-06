import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required().min(3, "Invalid Name"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be greater than 7 characters."),
  phoneNumber: yup.string().required().min(10).max(10),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

export const checkOutSchema = yup.object().shape({
  orderName: yup.string().required(),
  orderAddress: yup.string().required().min(4),
  phoneNumber: yup
    .string()
    .min(10, "Number Must be at least 10 numbers")
    .required(),
});

export const profileSchema = yup.object().shape({
  name: yup.string().required(),
  phoneNumber: yup
    .string()
    .min(10, "Number Must be at least 10 numbers")
    .required(),
});

export const emailChangeSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be greater than 7 characters."),
});

export const passwordForgetSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const passwordChangeSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required()
    .min(8, "Password must be greater than 7 characters."),

  newPassword: yup
    .string()
    .required()
    .min(8, "Password must be greater than 7 characters."),
});
