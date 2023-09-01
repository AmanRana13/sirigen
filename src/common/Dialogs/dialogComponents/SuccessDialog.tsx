import React from 'react';
import {Box, Dialog, DialogContent, Slide, Typography} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import Clear from '@mui/icons-material/Clear';

import {closeOverlayDialog} from 'store/commonReducer/common.action';
import SharedStorage from 'store/SharedStorage';
import {LOGOUT_MESSAGE} from 'globals/global.constants';
import {logoutUser} from 'pages/WCPages/Login/Login.action';

import Success from '../../../assets/icons/Success.png';
import ErrorIcon from '../../../assets/icons/ErrorIcon.svg';
import {successDialogStyle} from './SuccessDialog.style';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction='up' ref={ref} {...props} />;
  },
);

const SuccessDialog = ({error = false}: {error?: boolean}) => {
  const {isOpen, firstMessage, secondMessage, isLogout} = useAppSelector(
    (state: any) => state.common.overlayDialog,
  );
  const dispatch: any = useAppDispatch();
  const {classes}: any = successDialogStyle();

  const onCloseHandler = () => {
    dispatch(closeOverlayDialog());
    if (isLogout) {
      dispatch(logoutUser(LOGOUT_MESSAGE));
      SharedStorage.setNavigationEnable(false);
    }
  };

  return (
    <Dialog
      data-testid='successDialog'
      TransitionComponent={Transition}
      open={isOpen}
      classes={{paper: classes.container}}>
      <Box className={classes.successContainer}>
        <Clear onClick={onCloseHandler} className={classes.clearButton} />
      </Box>
      <DialogContent className={classes.content}>
        <Box className={error ? classes.error : classes.success}>
          <img
            src={error ? ErrorIcon : Success}
            width='60'
            height='60'
            alt='success'
          />
          <Typography variant='h3v1'>{error ? 'Error' : 'Success'}</Typography>
        </Box>
        <Box
          width='100%'
          display='flex'
          justifyContent='center'
          flexDirection='column'
          padding='16px'>
          <Typography variant='h3v1'>{firstMessage}</Typography>
          <Typography variant='h3v1'>{secondMessage}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
