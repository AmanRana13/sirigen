import {Box, Typography, Link} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router';
import {ForgotPasswordStyle} from './ForgotPassword.style';

const ForgotPassword = () => {
  const {classes} = ForgotPasswordStyle();
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      justifyContent='flex-end'
      className={classes.forgotPassword}
      pt={1}>
      <Typography variant='subtitle1'>
        <Link onClick={() => navigate('/forgot-password')}>
          Forgot your password?
        </Link>
      </Typography>
    </Box>
  );
};

export default React.memo(ForgotPassword);
