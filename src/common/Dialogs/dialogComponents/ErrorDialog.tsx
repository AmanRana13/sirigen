import React from 'react';
import {Box, Dialog, DialogContent, Slide, Typography} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import Clear from '@mui/icons-material/Clear';

import {closeOverlayDialog} from 'store/commonReducer/common.action';

import {errorDialogStyle} from './ErrorDialog.style';
import {ZINDEX} from 'globals/global.constants';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props: any, ref: any) {
    return <Slide direction='up' ref={ref} {...props} />;
  },
);

const ErrorDialog = () => {
  const {isOpen, data} = useAppSelector(
    (state: any) => state.common.overlayDialog,
  );
  const dispatch: any = useAppDispatch();
  const {classes} = errorDialogStyle();

  const onCloseHandler = () => {
    dispatch(closeOverlayDialog());
  };

  return (
    <Dialog
      data-testid='errorDialog'
      TransitionComponent={Transition}
      open={isOpen}
      classes={{paper: classes.container}}
      style={{zIndex: ZINDEX.ACTION_ERROR}}>
      <Box className={classes.errorContainer}>
        <Clear onClick={onCloseHandler} className={classes.clearButton} />
      </Box>
      <DialogContent className={classes.content}>
        <Box className={classes.errorCodeLabel}>
          <Typography variant='h3v1'>Error Code:</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant='h1v1'>{data.errorCode || 400}</Typography>
        </Box>
        <Box mt={3} width='100%' display='flex' justifyContent='center'>
          <Typography variant='h3v1'>
            {data.errorMessage || 'Something Went Wrong'}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
