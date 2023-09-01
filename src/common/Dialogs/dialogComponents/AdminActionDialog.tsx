import {closeDialog} from '../../../store/commonReducer/common.action';
import globalUseStyles from 'config/global.styles';
import {adminActionDialogStyle} from './AdminActionDialog.style';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
  DialogTitle,
} from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const AdminActionDialog = () => {
  const {classes: globalClasses} = globalUseStyles();
  const {classes} = adminActionDialogStyle();

  const {
    isOpen,
    onSuccessButton,
    firstMessage,
    boldMessage,
    secondMessage,
    successButtonText,
    isFailButton,
    cancelButtonText,
    showAlertIcon,
  } = useAppSelector((state: any) => state.common.dialog);

  const dispatch: any = useAppDispatch();

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
      open={isOpen}
      classes={{paper: classes.container}}
      TransitionComponent={Slide}>
      <Box
        width='100%'
        minHeight={140}
        display='flex'
        flexDirection='column'
        data-testid='adminActionDialog'>
        <DialogTitle className={classes.dialogTitle}>
          <Box display='flex' alignItems='flex-end' justifyContent='flex-end'>
            <Clear
              onClick={onCloseHandler}
              style={{cursor: 'pointer'}}
              fontSize='large'
            />
          </Box>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Typography variant='body1'>
            {firstMessage} <b>{boldMessage}</b>
          </Typography>

          <Typography
            variant='h4'
            style={{marginBottom: secondMessage ? 20 : 0}}>
            {showAlertIcon && (
              <WarningAmberRoundedIcon className={classes.warningIcon} />
            )}
            <b>{secondMessage}</b>
          </Typography>
        </DialogContent>
        <DialogActions className={classes.buttonContainer}>
          {isFailButton && (
            <Button
              type='submit'
              size='small'
              variant='outlined'
              onClick={onCloseHandler}
              className={globalClasses.smallButtonOutlined}
              data-testid='cancelButton'>
              {cancelButtonText || 'Cancel'}
            </Button>
          )}
          <Button
            data-testid='submitButton'
            type='submit'
            color='primary'
            variant='contained'
            className={globalClasses.smallButton}
            onClick={onSuccessHandler}>
            {successButtonText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AdminActionDialog;
