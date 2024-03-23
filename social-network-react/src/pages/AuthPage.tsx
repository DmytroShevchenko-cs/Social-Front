import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, SubmitHandler } from "react-hook-form";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "../css/authPage.module.css";

import { ILoginData } from "../types/User";
import { useLoginMutation } from "../services/authService";
import { useActions } from "../myHooks/storeHook";
import { IAuthInformation } from "../types/AuthInfo";

const AuthPage = () => {
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { userLogin } = useActions();

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

    await login(dataS)
      .unwrap()
      .then((payload : IAuthInformation) => {
        userLogin(payload);
        
        navigate("/");
      })
      .catch((error) => {
        if (error.status === 400) {
          setIsLoginError(true);
          setLoginError(error.data.Error);
        }
      });
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <CircularProgress classes={{ root: styles.progress }} />
      ) : (
        <Paper elevation={4} classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant='h5'>
            Login
          </Typography>

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
