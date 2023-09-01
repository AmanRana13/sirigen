import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import React from 'react';
import {closeDialog} from 'store/commonReducer/common.action';
import AlertImage from '../../../assets/icons/Alert.svg';
import {limitDialogStyle} from './LimitDialog.style';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const LimitDialog = () => {
  const {isOpen, firstMessage} = useAppSelector(
    (state: any) => state.common.dialog,
  );
  const dispatch: any = useAppDispatch();
  const {classes} = limitDialogStyle();

  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={isOpen}
      classes={{paper: classes.container, paperScrollBody: 'red'}}
      TransitionComponent={Transition}>
      <Box className={classes.imageContainer} data-testid='limitDailog'>
        <Box component='img' src={AlertImage} alt='alert' />
      </Box>
      <DialogTitle className={classes.title}>Limit Reached</DialogTitle>
      <DialogContent className={classes.content}>
        <Typography variant='body1'>{firstMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} className={classes.buttonStyle}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LimitDialog;
