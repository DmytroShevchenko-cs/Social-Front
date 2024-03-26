import React, { useState } from 'react'

import styles from "../css/authPage.module.css";
import '../scss/registePage.module.scss'
import { Paper, TextField, Typography, Alert } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { IUserRegisterData, Sex } from '../types/User';
import Button from '@mui/material/Button';
import { useUserRegisterMutation } from '../services/authService';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router';
import WaitDialog from '../components/CustomWaitModal'
import CustomizedDialogWithText from '../components/CustomModalWithText'
import { StringHelper, IsNullOrEmpty } from "../Helpers/StringHelper"


const RegisterPage = () => {
  const defaultProps = {
    borderColor: 'text.primary',
    m: 1,
    border: 0,
    borderRadius: 12,
    style: { width: '31rem', height: '83%' },
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IUserRegisterData>({
    defaultValues: {
      login: "",
      password: "",
      profile: {
        avatarImage: "",
        birthday: new Date(),
        description: "",
        email: "",
        name: "",
        surname: "",
        sex: undefined
      }
    },
    mode: "onChange",
  });

  const [userRegister] = useUserRegisterMutation();

  const OnSubmit: SubmitHandler<IUserRegisterData> = async (registerData: IUserRegisterData) => {
    setOpenWaitModal(true);
    await userRegister(registerData)
      .unwrap()
      .then((payload) => {
        setOpenWaitModal(false);
        setTextModal(true);
        var email = getValues('profile.email');
        setModalTextMeddage(StringHelper.format(EmailMessage, email));
      })
      .catch((error) => {
        setOpenWaitModal(false);
        setIsRegisterError(true);
        console.log(typeof (error?.data?.errors))
        setRegisterErrorText(error?.data?.errors ?? { '': error.data.Error });
      })
  }

  const emailRegex : RegExp =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [openWaitModal, setOpenWaitModal] = useState(false);
  const [openModalWithtext, setTextModal] = useState(false);
  const [modalTextMessage, setModalTextMeddage] = useState('');
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [registerErrorText, setRegisterErrorText] = useState<Record<string, string>>({});
  const [isRepeatPasswordEqual, setIsRepeatPasswordEqual] = useState(false);

  const handleRepeatPassword = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    var passwordField = getValues('password');
    setIsRepeatPasswordEqual(e.target.value === passwordField)
  }


  const handleCloseTextModal = () => {
    setTextModal(false);
    navigate('/');
  }

  //TODO: In the future we will need to move this to the config to use i18 for translation.
  const firstNameLabel = 'First name';
  const LastNameLabel = 'Last name';
  const EmailLabel = "Email";
  const LoginLabel = "Login";
  const BirthdayLabel = "Birthday";
  //const SexLabel = "Sex";
  const PasswordLabel = "Password"
  const RepeatPasswordLabel = "Repeat password"
  const RegisterButtonLabel = "Register"
  const CancelLabel = "Cancel";
  const EmailMessage = "To authorize you need to confirm your email address {0}";

  return (
    <div className={styles.container}>
      <WaitDialog enable={openWaitModal} />
      <CustomizedDialogWithText handleClose={handleCloseTextModal} isOpen={openModalWithtext} text={modalTextMessage} />
      <Paper elevation={4} classes={{ root: styles.root }} {...defaultProps}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div className='register-text-field-row'>
            <TextField
              label={firstNameLabel}
              variant='outlined'
              error={Boolean(errors.profile?.name?.message)}
              helperText={errors.login?.message}
              {...register("profile.name", { required: "Set name " })}
            />
            <TextField
              label={LastNameLabel}
              variant='outlined'
              error={Boolean(errors.login?.message)}
              helperText={errors.profile?.surname?.message}
              {...register("profile.surname", { required: "set surname " })}
            />
          </div>
          <div className='register-text-field-row'>
            <TextField
              label={EmailLabel}
              error={Boolean(errors.profile?.email?.message)}
              helperText={errors.profile?.email?.message}
              {...register("profile.email", {
                required: "set email", pattern:
                  { value: emailRegex, message: "Enter a valid email" }
              })}
              type='Email' />
            <TextField
              label={LoginLabel}
              variant='outlined'
              {...register("login", { required: "set login" })}
            />
          </div>
          <div className='register-text-field-row'>
            <div className="label-and-field">
              <label>{BirthdayLabel}</label>
              <TextField
                type='date'
                {...register("profile.birthday", { required: "set birthday" })}
              />
            </div>
            <TextField select {...register("profile.sex", { required: "select sex" })} label="Select your sex" variant='outlined'>
              {Object.keys(Sex).map((key: string) => (
                <MenuItem key={key} value={key}>{key}</MenuItem>
              ))}
            </TextField>
          </div>
          <div className='register-text-field-row'>
            <TextField
              label={PasswordLabel}
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              type='password'
              variant='outlined'
              {...register("password", { required: "set password", minLength: 8 })}
            />
            <TextField
              label={RepeatPasswordLabel}
              name={RepeatPasswordLabel}
              onBlur={(e) => handleRepeatPassword(e)}
              onChange={(e => handleRepeatPassword(e))}
              helperText={(!isRepeatPasswordEqual && !IsNullOrEmpty(getValues('password'))) ? "Password isn't the same" : ""}
              error={!isRepeatPasswordEqual && !IsNullOrEmpty(getValues('password'))}
              type='password'
              variant='outlined' />
          </div>
          <div className='register-text-field-row'>
            <Button disabled={!isValid || !isRepeatPasswordEqual} type='submit' color='success' variant='contained'>{RegisterButtonLabel}</Button>
            <Button onClick={(e) => navigate("/")} variant='contained'>{CancelLabel}</Button>
          </div>
        </form>
        {isRegisterError && (
          <div className='alert-container'>
            <Alert variant='filled' severity='error' onClose={() => setIsRegisterError(false)}>
              {Object.keys(registerErrorText).map((key: string, index) => (
                <div key={index}>
                  <span key={index}> {IsNullOrEmpty(key) ? '' : `${key.split('.').pop()}: `}{registerErrorText[key]}</span>
                </div>
              ))}
            </Alert>
          </div>
        )}
      </Paper>
    </div>
  )
}

export default RegisterPage