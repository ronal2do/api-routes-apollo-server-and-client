import * as yup from "yup";

export const emailNotLongEnough = "e-mail must be at least 3 characters";
export const passwordNotLongEnough = "password must be at least 3 characters";
export const invalidEmail = "e-mail must be a valid e-mail";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation
});

const invalidLogin = "invalid login";
const invalidContent = "invalid content";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidLogin)
    .required(),
  password: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required()
});

export const contentSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidContent)
    .max(255, invalidContent)
    .required()
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation
});