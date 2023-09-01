import {useEffect, useState} from 'react';
import {useAppDispatch} from 'hooks/reduxHooks';
import {useForm} from 'react-hook-form';
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import PublicWrapper from 'common/PublicWrapper';
import {Label} from 'common/Input';
import ForgotPassword from 'common/ForgotPassword/ForgotPassword.component';
import {showApplicationLoader} from 'common/ApplicationLoader';

import {loginStyle} from './Login.style';
import {clearReduxState, loginUser} from './Login.action';
import {REGEX} from 'globals/global.constants';

const PasswordField = ({register, errors}: any) => {
  const {classes} = loginStyle();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <TextField
        id='password'
        fullWidth
        variant='outlined'
        name='password'
        type={showPassword ? 'text' : 'password'}
        placeholder='*****'
        className={classes.inputField}
        {...register('password', {
          required: 'Password is required',
          pattern: {
            value: REGEX.BLANK_FIELD,
            message: 'Password is required',
          },
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                data-testid='showPasswordIcon'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                size='large'>
                {showPassword ? (
                  <Visibility className={classes.visibility} />
                ) : (
                  <VisibilityOff className={classes.visibility} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{'data-testid': 'passwordTextField'}}
        {...register}
      />
      <Typography variant='subtitle1' className={classes.errorText}>
        {errors?.password?.message || ''}
      </Typography>
      <ForgotPassword />
    </>
  );
};
type FormType = {
  email: string;
  password: string;
};
const LoginComponent = () => {
  const {classes} = loginStyle();
  const dispatch: any = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    dispatch(clearReduxState());
  }, []);

  const onSubmit = (data: any) => {
    dispatch(showApplicationLoader());
    dispatch(loginUser(data));
  };
  return (
    <PublicWrapper heading='Welcome Back'>
      <Box width={1} py={3} px={8} data-testid='login-component'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box pb={2}>
            <Label htmlFor='email'>Email</Label>
            <TextField
              id='email'
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
              inputProps={{'data-testid': 'emailTextField'}}
            />
            <Typography variant='subtitle1' className={classes.errorText}>
              {errors?.email?.message || ''}
            </Typography>
          </Box>
          <Box pb={3}>
            <Label htmlFor='password'>Password</Label>
            <PasswordField register={register} errors={errors} />
          </Box>
          <Button
            size='large'
            sx={{width: '100%'}}
            type='submit'
            color='primary'
            variant='contained'>
            Log In
          </Button>
        </form>
      </Box>
    </PublicWrapper>
  );
};

export default LoginComponent;
