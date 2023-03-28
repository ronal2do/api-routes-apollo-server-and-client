export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormValue {
  content: string;
}

export interface NormalizedErrorMap {
  [key: string]: string;
}