import React from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, Typography, TextField, Grid} from '@mui/material';
import {useAppDispatch} from 'hooks/reduxHooks';
import {Label} from 'common/Input';
import med from 'assets/med.svg';

import {resetPasswordAPI} from './ResetPassword.action';

import {resetPasswordStyle} from './ResetPassword.style';

type FormType = {
  email: string;
  password: string;
  confirm_password: string;
};

const ResetPassword = () => {
  const {classes} = resetPasswordStyle();
  const dispatch: any = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const getQueryParam = () => {
    return '';
  };

  const onSubmit = (data: any) => {
    delete data.confirm_password;
    data.reset_code = getQueryParam();

    dispatch(resetPasswordAPI(data));
  };

  return (
      <Box
        boxShadow={1}
        className={classes.container}
        data-testid='reset-password-component'>
        <Grid container>
          <Grid item sm={6}>
            <Box className={classes.loginImageContainer}>
              <Box className={classes.polygon}></Box>
              <img src={med} className={classes.loginImage} />
            </Box>
          </Grid>
          <Grid item sm={6} className={classes.loginArea}>
            <Typography variant='h4' className={classes.welcomeText}>
              New Password
            </Typography>
            <Box className={classes.fieldArea}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box pb={2}>
                  <Label>Email</Label>
                  <TextField
                    fullWidth
                    className={classes.inputField}
                    variant='outlined'
                    placeholder='John@gmail.com'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  <Box className={classes.errorText}>
                    {errors?.email?.message || ''}
                  </Box>
                </Box>

                <Box pb={3}>
                  <Label>New Password</Label>
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='password'
                    placeholder='*****'
                    className={classes.inputField}
                    {...register('password', {
                      required: 'password is required',
                    })}
                  />
                  <Box className={classes.errorText}>
                    {errors?.password?.message || ''}
                  </Box>
                </Box>

                <Box pb={3}>
                  <Label>Confirm Password</Label>
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='password'
                    placeholder='*****'
                    className={classes.inputField}
                    {...register('confirm_password', {
                      validate: (value) => {
                        return (
                          value === getValues('password') ||
                          'password is not matched'
                        );
                      },
                    })}
                  />
                  <Box className={classes.errorText} data-testid='errorMessage'>
                    {errors?.confirm_password?.message || ''}
                  </Box>
                </Box>
                <Button
                  className={classes.loginButton}
                  fullWidth
                  type='submit'
                  color='primary'
                  variant='contained'>
                  Reset Password
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default ResetPassword;
