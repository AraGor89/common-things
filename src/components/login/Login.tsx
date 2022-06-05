import { useRef } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface IFormInputs {
  firstName: string;
  surName: string;
  age: number;
  email: string;
  login: string;
  password: string;
}

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    surName: yup.string().required("Surname is required"),
    login: yup.string().required("Login is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().email().required("Email is required"),
    age: yup.number().positive().integer().required("Age is required"),
  })
  .required();

const Login = () => {
  const inputRef = useRef(null);

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => console.log(data);
  const handleRefSubmit = () => {
    //   @ts-ignore (dont know why)
    inputRef.current.click();
  };

  const formFields = [
    { name: "firstName", type: "text", label: "First name" },
    { name: "surName", type: "text", label: "Surname" },
    { name: "age", type: "text", label: "Age" },
    { name: "email", type: "text", label: "Email" },
    { name: "login", type: "text", label: "Login" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <Paper
      elevation={3}
      style={{
        padding: "0 15px 10px 15px",
        width: "min-content",
        marginLeft: "100px",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <h2>Please log in</h2>
      <Typography component="form" onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((item) => {
          const { name, type, label } = item;
          return (
            <Controller
              key={name}
              name={name as keyof IFormInputs}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  //   onChange={onChange}
                  label={label}
                  error={!!errors[name as keyof IFormInputs]?.message}
                  helperText={errors[name as keyof IFormInputs]?.message}
                  type={type}
                  sx={{ display: "block", width: "450px", marginTop: "15px" }}
                  fullWidth
                  {...register(name as keyof IFormInputs)}
                />
              )}
            />
          );
        })}

        <input type="submit" ref={inputRef} style={{ display: "none" }} />
        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={handleRefSubmit}
        >
          Submit
        </Button>

        <h3>Do not have an account ?</h3>
        <Link to="/signin">Sign up here</Link>
      </Typography>
    </Paper>
  );
};

export default Login;
