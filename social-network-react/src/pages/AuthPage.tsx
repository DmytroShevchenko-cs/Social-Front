import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "../css/authPage.module.css";

import { ILoginData } from "../types/User";
import { useLoginMutation, checkAuth } from "../services/authService";

const AuthPage = () => {
  // const isAuth = false;
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const isAuth = checkAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ILoginData>({
    defaultValues: {
      login: "",
      password: "",
      isNeedToRemember: false,
    },
    mode: "onChange",
  });

  const [login, { data, isLoading, error, isError }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginData> = async (dataS: ILoginData) => {
    setIsLoginError(false);
    console.log("reg data", dataS);
    await login(dataS)
      .unwrap()
      .then((payload) => {
        // console.log("fulfilled", payload);
        localStorage.setItem("accessKey", payload.accessKey);
        localStorage.setItem("refresh_token", payload.refresh_token);
        navigate("/");
      })
      .catch((error) => {
        console.error("rejected", error);
        if (error.status === 400) {
          setIsLoginError(true);
          setLoginError(error.data.Error);
          console.log("wrong login or passw");
        }
      });

    // console.log("response", data.accessKey);
  };

  // const { name, handleSubmit, reset } = useForm<IUserData>();
  // console.log("in authP", isAuth);
  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <CircularProgress classes={{ root: styles.progress }} />
      ) : (
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant='h5'>
            Login
          </Typography>
          <div className={styles.avatar}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={Boolean(errors.login?.message)}
              helperText={errors.login?.message}
              {...register("login", { required: "set login " })}
              className={styles.field}
              label='Login'
              fullWidth
            />

            <TextField
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type='password'
              {...register("password", { required: "set password " })}
              className={styles.field}
              label='Password'
              fullWidth
            />
            <div className={styles.isRemember}>
              <Checkbox {...register("isNeedToRemember")} />
              <p>remember me</p>
            </div>
            <Button
              disabled={!isValid}
              type='submit'
              size='large'
              variant='contained'
              fullWidth
            >
              login
            </Button>
          </form>
          <Link href='/register' underline='none'>
            <p>register</p>
          </Link>
          {isLoginError && (
            <Alert severity='error' onClose={() => setIsLoginError(false)}>
              {loginError}
            </Alert>
          )}
        </Paper>
      )}
    </div>
  );
};

export default AuthPage;
