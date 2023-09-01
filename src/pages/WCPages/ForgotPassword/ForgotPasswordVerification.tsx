import React from 'react';
import {useLocation} from 'react-router-dom';
import {Box, Button, TextField, Typography, Link} from '@mui/material';

import PublicWrapper from 'common/PublicWrapper';
import {Label} from 'common/Input';

import {
  forgotPassword,
  forgotPasswordVerification,
} from './ForgotPassword.action';
import {forgotPasswordStyle} from './ForgotPassword.style';
import {useAppDispatch} from 'hooks/reduxHooks';

const ForgotPasswordVerification = () => {
  const {classes} = forgotPasswordStyle();
  const location = useLocation();
  const dispatch: any = useAppDispatch();

  const [disableResendCode, setDisableResendCode] = React.useState(false);

  const query = new URLSearchParams(location.search);
  const email = query.get('email')?.replace(/ /g, '+');

  const getMaskedEmail = (email: any) => {
    return ` ${email?.charAt(0)}*****${email?.charAt(
      email.indexOf('@') - 1,
    )}@${email?.substring(email.indexOf('@') + 1)}`;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otp = formData.get('otp');

    dispatch(forgotPasswordVerification(email, otp));
  };

  const handleResend = () => {
    setDisableResendCode(true);
    dispatch(forgotPassword(email));
    setTimeout(() => {
      setDisableResendCode(false);
    }, 30000);
  };

  return (
      <PublicWrapper
        heading='Forgot Password?'
        subHeading={`We have sent a code to your email ${getMaskedEmail(
          email,
        )}`}>
        <form style={{width: '100%', height: '100%'}} onSubmit={handleSubmit}>
          <Box
            className={classes.fieldArea}
            data-testid='ForgotPasswordVerification'>
            <Box pb={2}>
              <Label>Enter One Time Password</Label>
              <TextField
                fullWidth
                className={classes.inputField}
                placeholder='One Time Password'
                variant='outlined'
                name='otp'
              />
              <Box
                display='flex'
                justifyContent='flex-end'
                className={
                  disableResendCode
                    ? classes.resendOtpDisable
                    : classes.resendOtp
                }
                pt={0.2}>
                <Typography variant='subtitle1'>
                  <Link onClick={handleResend} data-testid='resendCodeLink'>
                    Resend code
                  </Link>
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                className={classes.resetPasswordButton}
                fullWidth
                type='submit'
                color='primary'
                variant='contained'>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </PublicWrapper>
  );
};

export default ForgotPasswordVerification;
