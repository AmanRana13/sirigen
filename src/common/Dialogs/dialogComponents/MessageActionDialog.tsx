import {closeDialog} from '../../../store/commonReducer/common.action';
import {messageActionDialogStyle} from './MessageActionDialog.style';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import {ZINDEX} from 'globals/global.constants';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const MessageActionDialog = () => {
  const {
    isOpen,
    onSuccessButton,
    firstMessage,
    boldMessage,
    secondMessage,
    successButtonText,
    isFailButton,
  } = useAppSelector((state: any) => state.common.dialog);

  const dispatch: any = useAppDispatch();
  const {classes} = messageActionDialogStyle();

  const onSuccessHandler = () => {
    if (onSuccessButton) {
      onSuccessButton();
    }
    dispatch(closeDialog());
  };

  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      data-testid='messageActionDialog'
      open={isOpen}
      classes={{paper: classes.container}}
      TransitionComponent={Slide}
      style={{zIndex: ZINDEX.ACTION_ERROR}}>
      <Box width='100%'>
        <DialogContent className={classes.content}>
          <Typography variant='body1'>
            {firstMessage} <b>{boldMessage}</b>
            {secondMessage}
          </Typography>
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          {isFailButton && (
            <Button
              type='submit'
              size='large'
              variant='outlined'
              onClick={onCloseHandler}
              className='secondaryButton'>
              Cancel
            </Button>
          )}
          <Button
            type='submit'
            size='large'
            color='primary'
            variant='contained'
            onClick={onSuccessHandler}>
            {successButtonText}
          </Button>
        </DialogActions>
      </Box>
      <Box>
        <Clear
          onClick={onCloseHandler}
          style={{cursor: 'pointer'}}
          fontSize='large'
        />
      </Box>
    </Dialog>
  );
};

export default MessageActionDialog;
