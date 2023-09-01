import React from 'react';
import {Box, Button, TextField} from '@mui/material';
import {useNavigate} from 'react-router';
import {useAppDispatch} from 'hooks/reduxHooks';
import PublicWrapper from 'common/PublicWrapper';
import {Label} from 'common/Input';
import {ERROR_MESSAGE, REGEX} from 'globals/global.constants';

import {forgotPasswordStyle} from './ForgotPassword.style';
import {forgotPassword} from './ForgotPassword.action';

const ForgotPasswordForm = () => {
  const {classes} = forgotPasswordStyle();

  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = React.useCallback(
    (value: string) => {
      setEmail(value);
      setError('');
    },
    [email, error],
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid: any = RegExp(REGEX.EMAIL).test(email);

    if (isValid) {
      dispatch(forgotPassword(email));
      navigate(`/forgot-password-verification?email=${email}`);
    } else {
      setError(ERROR_MESSAGE.INVALID_EMAIL);
    }
  };

  return (
    <form style={{width: '100%', height: '100%'}} onSubmit={handleSubmit}>
      <Box className={classes.fieldArea} data-testid='Forgotpassword'>
        <Box>
          <Box pb={2}>
            <Label>Enter Email</Label>
            <TextField
              fullWidth
              className={classes.inputField}
              variant='outlined'
              name='email'
              onChange={(e) => handleChange(e.target.value)}
            />
            <Box className={classes.errorText} data-testid='errorMessage'>
              {error}
            </Box>
          </Box>
          <Button
            className={classes.resetPasswordButton}
            fullWidth
            type='submit'
            color='primary'
            variant='contained'>
            Reset Password
          </Button>
        </Box>
      </Box>
    </form>
  );
};
const ForgotPassword = () => {
  return (
      <PublicWrapper
        heading='Forgot Password?'
        subHeading='Type in your email to retrieve your password '>
        <ForgotPasswordForm />
      </PublicWrapper>
  );
};

export default ForgotPassword;
