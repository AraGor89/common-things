import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Paper, TextField, Typography } from "@mui/material";
import {
  IFormFields,
  loginFormFields,
  loginSchema,
  signinFormFields,
  signinSchema,
} from "./utils";
import cache from "../../utils/cache";
import { SIGN_IN, LOG_IN } from "../../constants";

const Login = () => {
  let navigate = useNavigate();
  const inputRef = useRef(null);
  const { pathname } = useLocation();
  const isSigninPage = pathname === "/signin";
  const schema = isSigninPage ? signinSchema : loginSchema;
  const [generalerror, setGeneralError] = useState<string>("");
  const fields = isSigninPage ? signinFormFields : loginFormFields;
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const getSignedIn = cache.getItem(SIGN_IN);
  const isSignedIn = Boolean(getSignedIn);

  const onSubmit = (data: IFormFields) => {
    if (isSigninPage) {
      cache.setItem(SIGN_IN, data);
      navigate("/login");
      reset();
      return;
    }

    if (!isSigninPage) {
      if (!isSignedIn) {
        setGeneralError("You are not registered");
        return;
      }
      if (isSignedIn) {
        const { login, password } = getSignedIn;
        if (login !== data.login || password !== data.password) {
          setGeneralError("Wrong email or password");
          return;
        } else {
          cache.setItem(LOG_IN, data);
          setGeneralError("");
          navigate("/alias");
          return;
        }
      }
    }
  };

  const handleRefSubmit = () => {
    //   @ts-ignore (dont know why)
    inputRef.current.click();
  };

  useEffect(() => {
    const isAuth = Boolean(cache.getItem(LOG_IN));
    if (isAuth) navigate("/");
  }, []);

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px 15px",
        width: "min-content",
        marginLeft: "100px",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <h2>Please {isSigninPage ? "Sign in" : "Log in"}</h2>

      <Typography component="h3" sx={{ fontSize: "14px", color: "#d32f2f" }}>
        {generalerror}
      </Typography>

      <Typography component="form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item) => {
          const { name, type, label } = item;
          return (
            <Controller
              key={name}
              name={name as keyof IFormFields}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  //   onChange={onChange}
                  data-cy={name}
                  label={label}
                  error={!!errors[name as keyof IFormFields]?.message}
                  helperText={errors[name as keyof IFormFields]?.message}
                  type={type}
                  sx={{ display: "block", width: "450px", marginTop: "15px" }}
                  fullWidth
                  {...register(name as keyof IFormFields)}
                />
              )}
            />
          );
        })}

        <input type="submit" ref={inputRef} style={{ display: "none" }} />
        <Button
          fullWidth
          data-cy={"Submit"}
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={handleRefSubmit}
        >
          Submit
        </Button>

        {!isSigninPage && (
          <>
            <h3>Do not have an account ?</h3>
            <Link
              to="/signin"
              onClick={() => {
                reset();
                setGeneralError("");
              }}
            >
              Sign up here
            </Link>
          </>
        )}
      </Typography>
      <hr />
      <h4>Please fill some fake credentials for Sign in/Sign up cycle 😊</h4>
    </Paper>
  );
};

export default Login;
