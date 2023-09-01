import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Box, Button, DialogActions, Typography} from '@mui/material';
import {closeDialog} from 'store/commonReducer/common.action';
import {eventMaxDialogLayoutStyle} from 'common/Events/EventMaxDialog.style';
import {IMedictionDialogButtonProps} from './MedicationDialog.types';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @description component for the medication dialog buttons
 * @param {string} position
 * @param {boolean} disable
 * @returns JSX
 */
const MedicationActionDialogButton = ({
  position,
  disable,
}: IMedictionDialogButtonProps) => {
  const [showAlertButton, setShowAlertButton] = React.useState<boolean>(false);

  const dispatch: any = useAppDispatch();
  const {classes: eventClasses} = eventMaxDialogLayoutStyle(position);

  /**
   * @function onCloseHandler method to close the medication dialog
   * @description to handle close of the dialog
   * @returns void
   */
  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      {showAlertButton && (
        <Box
          style={{
            backgroundColor: '#eaf8f7',
            borderTop: 'solid 1px #cbcbcb',
            marginTop: 9,
          }}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            style={{marginTop: 19}}>
            <InfoOutlinedIcon style={{fontSize: 17, marginRight: 4}} />
            <Typography variant='body1'>
              Are you sure you want to Cancel? Cancelling will clear all the
              changes made so far.
            </Typography>
          </Box>
          <DialogActions
            className={eventClasses.dialogActions}
            style={{
              justifyContent: 'center',
            }}>
            <Button
              size='large'
              variant='outlined'
              style={{boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)'}}
              onClick={() => setShowAlertButton(false)}>
              No
            </Button>
            <Button
              size='large'
              onClick={onCloseHandler}
              color='primary'
              variant='contained'
              style={{boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)'}}>
              Yes
            </Button>
          </DialogActions>
        </Box>
      )}
      {!showAlertButton && (
        <DialogActions
          className={eventClasses.dialogActions}
          style={{
            justifyContent: 'center',
          }}>
          <Button
            data-testid='resourcesCancel'
            size='large'
            onClick={() => setShowAlertButton(true)}
            variant='outlined'
            style={{boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)'}}>
            Cancel
          </Button>
          <Button
            type='submit'
            size='large'
            color='primary'
            variant='contained'
            style={{boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)'}}
            disabled={disable}>
            Submit
          </Button>
        </DialogActions>
      )}
    </>
  );
};

export default MedicationActionDialogButton;
