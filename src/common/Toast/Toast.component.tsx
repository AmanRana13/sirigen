/** @format */

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {hideToast} from './Toast.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const Toast = () => {
  const dispatch: any = useAppDispatch();

  const toast = useAppSelector((state: any) => state.toast);

  /**
   * @description handle when we close toast
   * @param {any} event
   * @param {any} reason
   * @returns {void}
   */
  const handleClose = (event: any, reason?: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideToast());
  };

  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      open={toast.open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert
        variant='filled'
        elevation={6}
        onClose={handleClose}
        severity={toast.type}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export {Toast};
