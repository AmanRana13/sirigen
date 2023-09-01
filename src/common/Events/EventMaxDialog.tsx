import React from 'react';
import clsx from 'clsx';
import Draggable from 'react-draggable';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  PaperProps,
  Paper,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {APPLICATION_EVENTS, ZINDEX} from '../../globals/global.constants';
import {eventMaxDialogLayoutStyle} from './EventMaxDialog.style';
import {IEventMaxDialogProps} from './EventMaxDialog.types';
import {PRINT_HIDE_CLASS} from 'common/Print/Print.types';

/**
 * @description React component to show Maximize view of an event
 * @returns {JSX}
 */

const PaperComponent = (props: PaperProps) => (
  <Draggable handle='#event-max-dialog' cancel={'[id*="dialog-max-content"]'}>
    <Paper {...props} style={{pointerEvents: 'auto'}} />
  </Draggable>
);
const EventMaxDialog = ({
  minimizeModal,
  handleClose,
  handleSubmit,
  handleNoAction,
  navigateToDashboard,
  disableSendButton,
  fullName,
  isOpen,
  eventType,
  children,
  alert,
  isSos,
  isFall,
  showMinimize,
  justifyButtonCenter,
  position,
}: IEventMaxDialogProps) => {
  const {classes} = eventMaxDialogLayoutStyle(position);

  React.useEffect(() => {
    // removing overflow hidden to scroll the background
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 500);
  }, []);

  const assignPriority = () => {
    if (isSos) {
      return ZINDEX.SOS;
    } else if (isFall) {
      return ZINDEX.FALL;
    } else if (alert) {
      return ZINDEX.ALERT;
    } else {
      return 1000;
    }
  };

  const justifyContentValue = () => {
    if (isSos || isFall) {
      return 'center';
    } else if (justifyButtonCenter) {
      return 'space-between';
    }
    return 'flex-end';
  };

  return (
    <Dialog
      maxWidth='sm'
      disableEnforceFocus={true}
      BackdropProps={{invisible: true}}
      hideBackdrop={true}
      classes={{
        root: clsx({
          [classes.removeBackground]: true,
          [classes.stackMargin]: alert || isSos || isFall,
        }),
      }}
      aria-labelledby='event-max-dialog'
      open={isOpen}
      className={clsx(PRINT_HIDE_CLASS, {
        [classes.sosEventDialog]: isSos || isFall,
        [classes.eventDialog]: !isSos && !isFall,
      })}
      style={{zIndex: assignPriority()}}
      PaperComponent={PaperComponent}>
      <Box
        id='event-max-dialog'
        data-testid='MaximizeView'
        className={clsx(classes.dialogTitle, 'grabbable', {
          [classes.alertDialog]: alert,
          [classes.sosDialogTitle]: isSos || isFall,
        })}>
        {showMinimize && (
          <Box className={classes.minimizeIcon}>
            <RemoveIcon
              data-testid='event-minimize'
              onClick={minimizeModal}
              id='dialog-max-content'
            />
          </Box>
        )}
        <Box
          className={clsx(classes.dialogTitleName, {
            [classes.sosDialogTitleName]: isSos || isFall,
          })}>
          <Typography variant='h6v1'>
            {APPLICATION_EVENTS[eventType].label}
          </Typography>
          <Typography
            variant='h6v1'
            className={clsx({[classes.sosDialogName]: isSos || isFall})}>
            {fullName}
            {navigateToDashboard && (
              <ArrowRightIcon
                fontSize='large'
                className={clsx(classes.navigateIcon, {
                  [classes.sosNavigateIcon]: isSos || isFall,
                })}
                onClick={navigateToDashboard}
              />
            )}
          </Typography>
        </Box>
      </Box>
      <DialogContent id='dialog-max-content'>{children}</DialogContent>
      <DialogActions
        id='dialog-max-content'
        className={clsx(classes.dialogActions, {
          [classes.sosDialogActions]: isSos || isFall,
        })}
        style={{
          justifyContent: justifyContentValue(),
        }}>
        {!isSos && !isFall && (
          <>
            <Button
              data-testid='event-close'
              onClick={handleClose}
              size='large'
              color='primary'
              variant='contained'>
              Close
            </Button>
            {handleNoAction && (
              <Button
                data-testid='event-noaction'
                onClick={handleNoAction}
                size='large'
                color='primary'
                variant='contained'>
                No Action
              </Button>
            )}
          </>
        )}
        <Button
          data-testid='event-send'
          size='large'
          onClick={handleSubmit}
          color='primary'
          variant='contained'
          disabled={disableSendButton}>
          {isSos || isFall ? 'Assign to me' : 'Send'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventMaxDialog;
