import * as yup from "yup";

export interface IFormFields {
  firstName: string;
  surName: string;
  age: number;
  email: string;
  login: string;
  password: string;
}

export const signinSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    surName: yup.string().required("Surname is required"),
    login: yup.string().required("Login is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().email().required("Email is required"),
    age: yup.number().positive().integer().required("Age is required"),
  })
  .required();

export const loginSchema = yup
  .object({
    login: yup.string().required("Login is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const signinFormFields = [
  { name: "firstName", type: "text", label: "First name" },
  { name: "surName", type: "text", label: "Surname" },
  { name: "age", type: "text", label: "Age" },
  { name: "email", type: "text", label: "Email" },
  { name: "login", type: "text", label: "Login" },
  { name: "password", type: "password", label: "Password" },
];

export const loginFormFields = [
  { name: "login", type: "text", label: "Login" },
  { name: "password", type: "password", label: "Password" },
];
