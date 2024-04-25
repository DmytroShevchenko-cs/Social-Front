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

import { useTranslation } from 'react-i18next';
import '../i18n';

const AuthPage = () => {
  const {t} = useTranslation();

  const [isLoginError, setIsLoginError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { userLogin } = useActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginData>({
    defaultValues: {
      login: "",
      password: "",
      isNeedToRemember: false,
    },
    mode: "onChange",
  });

  const [login, { isLoading }] = useLoginMutation();

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

  const loginLabel = t('auth.login');
  const passwordLabel = t('auth.password');
  const rememberMeLabel = t('auth.rememberMe');
  const registerLinkLabel = t('auth.registerLink');
  const logginButtonLabel = t('auth.logginButton');

  return (
    <div className={styles.container}>
      {isLoading ? (
        <CircularProgress classes={{ root: styles.progress }} />
      ) : (
        <Paper elevation={4} classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant='h5'>
            {t('auth.auth')}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={Boolean(errors.login?.message)}
              helperText={errors.login?.message}
              {...register("login", { required: t('reg.set', { prop: loginLabel }) })}
              className={styles.field}
              label = {loginLabel}
              fullWidth
            />

            <TextField
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type='password'
              {...register("password", { required: t('reg.set', { prop: passwordLabel }) })}
              className={styles.field}
              label={passwordLabel}
              fullWidth
            />
            <div className={styles.isRemember}>
              <Checkbox {...register("isNeedToRemember")} />
              <p>{rememberMeLabel}</p>
            </div>
            <Button
              disabled={!isValid}
              type='submit'
              size='large'
              variant='contained'
              fullWidth
            >
              {logginButtonLabel}
            </Button>
          </form>
          <Link href='/register' underline='none'>
            <p>{registerLinkLabel}</p>
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
