import {
  Box,
  Dialog,
  DialogContent,
  Slide,
  DialogTitle as MuiDialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {closeDialog} from 'store/commonReducer/common.action';
import {dialogWrapperStyle} from './DialogWrapper.style';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const DialogTitle = (props: any) => {
  const {classes} = dialogWrapperStyle();
  const {children, onClose, ...other} = props;

  return (
    <MuiDialogTitle disableTypography {...other}>
      <Box fontSize={32}>{children}</Box>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
          size='large'>
          <CloseIcon height={24} width={23.9} fontSize='large' />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const DialogWrapper = ({
  title,
  children: dialogContent,
  wide = false,
}: {
  title: string;
  children: JSX.Element;
  wide?: boolean;
}) => {
  const {isOpen} = useAppSelector((state: any) => state.common.dialog);

  const dispatch: any = useAppDispatch();
  const {classes} = dialogWrapperStyle();

  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={isOpen}
      classes={{paper: clsx(classes.container, {wide: wide})}}
      maxWidth={false}
      TransitionComponent={Slide}>
      <Box width='100%'>
        <DialogTitle className={classes.dialogTitle} onClose={onCloseHandler}>
          {title}
        </DialogTitle>
        <DialogContent className={clsx(classes.content, {wide: wide})}>
          {dialogContent}
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default DialogWrapper;
