import React, { useState } from 'react'

import styles from '../scss/registerPage.module.scss'
import { Paper, TextField, Typography, Alert } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { IUserRegisterData, Sex } from '../types/User';
import Button from '@mui/material/Button';
import { useUserRegisterMutation } from '../services/authService';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router';
import WaitDialog from '../components/CustomWaitModal'
import CustomizedDialogWithText from '../components/CustomModalWithText'
import { IsNullOrEmpty } from "../Helpers/StringHelper"
import { useTranslation } from 'react-i18next';
import '../i18n';

const RegisterPage = () => {

  const {t} = useTranslation();

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
        setModalTextMeddage(t('reg.emailMessage', {email: email}));
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

  const firstNameLabel = t('reg.firstName');
  const LastNameLabel = t('reg.lastName');
  const EmailLabel = t('reg.email');
  const toEmailLabel = t('reg.toEmail');
  const LoginLabel = t('reg.login');
  const BirthdayLabel = t('reg.birthday');
  const toBirthdayLabel = t('reg.toBirthday');
  const PasswordLabel = t('reg.password');
  const RepeatPasswordLabel = t('reg.repeatPassword');
  const RegisterButtonLabel = t('reg.registerButton');
  const CancelLabel = t('reg.cancelButton');
  const sexlabel = t('reg.selectSex');
  const mailHeader = t('reg.mailHeader');

  const requiredFirstNameLabel = t('reg.set', { prop: firstNameLabel });
  const requiredLastNameLabel = t('reg.set', { prop: LastNameLabel });
  const requiredEmailLabel = t('reg.set', { prop: toEmailLabel });
  const validEmailLabel = t(`reg.enterValidEmail`);
  const requiredLoginLabel =  t(`reg.set`, {prop: LoginLabel});
  const requiredBirthdayLabel = t(`reg.set`, {prop: toBirthdayLabel});
  const requiredSexLabel = t(`reg.set`, { prop: sexlabel });
  const requiredPasswordLabel = t(`reg.set`, {prop: PasswordLabel});
  const wrongRepeatPasswordLabel = t('reg.wrongRepeatPassword');
  const signUpLabel = t('reg.reg');

  return (
    <div className={styles.container}>
      <WaitDialog enable={openWaitModal} />
      <CustomizedDialogWithText handleClose={handleCloseTextModal} isOpen={openModalWithtext} text={modalTextMessage} header={mailHeader} />
      <Paper elevation={4} classes={{ root: styles.root }} {...defaultProps}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          {signUpLabel}
        </Typography>
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div className='register-text-field-row'>
            <TextField
              label={firstNameLabel}
              variant='outlined'
              error={Boolean(errors.profile?.name?.message)}
              helperText={errors.profile?.name?.message}
              {...register("profile.name", { required: requiredFirstNameLabel })}
            />
            <TextField
              label={LastNameLabel}
              variant='outlined'
              error={Boolean(errors.profile?.surname?.message)}
              helperText={errors.profile?.surname?.message}
              {...register("profile.surname", { required: requiredLastNameLabel })}
            />
          </div>
          <div className='register-text-field-row'>
            <TextField
              label={EmailLabel}
              error={Boolean(errors.profile?.email?.message)}
              helperText={errors.profile?.email?.message}
              {...register("profile.email", {
                required: requiredEmailLabel, pattern:
                  { value: emailRegex, message: validEmailLabel}
              })}
              type='Email' />
            <TextField
              label={LoginLabel}
              error={Boolean(errors.login?.message)}
              helperText={errors.login?.message}
              variant='outlined'
              {...register("login", { required: requiredLoginLabel })}
            />
          </div>
          <div className='label'>
            <label>{BirthdayLabel}</label>
          </div>
          <div className='register-text-field-row'>
              <TextField
                type='date'
                error={Boolean(errors.profile?.birthday?.message)}
                helperText={(errors.profile?.birthday?.message)}
                {...register("profile.birthday", { required: requiredBirthdayLabel })}
              />
            <TextField
              select {...register("profile.sex", { required: requiredSexLabel })}
              label={sexlabel}
              variant='outlined'>
              {Object.keys(Sex).map((key: string) => (
                <MenuItem key={key} value={key}>{t(`reg.sex.${key.toLowerCase()}`)}</MenuItem>
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
              {...register("password", { required: requiredPasswordLabel , minLength: 8 })}
            />
            <TextField
              label={RepeatPasswordLabel}
              name={RepeatPasswordLabel}
              onBlur={(e) => handleRepeatPassword(e)}
              onChange={(e => handleRepeatPassword(e))}
              helperText={(!isRepeatPasswordEqual && !IsNullOrEmpty(getValues('password'))) ? wrongRepeatPasswordLabel : ""}
              error={!isRepeatPasswordEqual && !IsNullOrEmpty(getValues('password'))}
              type='password'
              variant='outlined'
              />
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