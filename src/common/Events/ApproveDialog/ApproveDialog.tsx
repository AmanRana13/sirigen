/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {Box, Typography, Card} from '@mui/material';
import Clear from '@mui/icons-material/Clear';
import {ApproveDialogStyle} from './ApproveDialog.style';
import {EventsType} from 'globals/enums';
import {
  closeEvent,
  redirectApproveDialog,
} from 'store/eventsReducer/Events.action';
import {redirectMilestoneDialog} from 'store/eventsReducer/milestones.action';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @functions ApproveDialog
 * @description action creator to fetch the care insight on admin dashboard
 * @param {*} index
 * @param {*} type
 * @param {*} eventId
 * @param {*} seniorId
 */
const ApproveDialog = ({index, type, eventId, label}: any) => {
  const {classes} = ApproveDialogStyle();
  const dispatch: any = useAppDispatch();
  const screenSize = window.innerWidth;
  const [resize, setResize] = useState(1920);

  const handleClose = () => {
    dispatch(closeEvent(eventId, type));
  };

  /**
   * @functions handleRedirect
   * @description action creator to redirect the page to care insight review page when admin click on approve button.
   * @returns void
   */
  const handleRedirect = () => {
    switch (type) {
      case EventsType.Alert: {
        dispatch(redirectApproveDialog());
        break;
      }
      case EventsType.Summary: {
        dispatch(redirectApproveDialog());
        break;
      }
      case EventsType.MILESTONE: {
        dispatch(redirectMilestoneDialog());
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', function () {
      setResize(screenSize);
    });
  }, [resize]);

  return (
    <Card
      className={classes.container}
      style={
        screenSize >= 1920
          ? {margin: `${index * 117}px  0px 0px 0px`}
          : {margin: `${index * 90}px  0px 0px 0px`}
      }
      data-testid='approve-dialog'>
      <Box
        data-testid='redirect'
        onClick={handleRedirect}
        className={clsx({
          [classes.notificationColorDimensions]: true,
          [classes.alertNotificationColor]: type === EventsType.Alert,
          [classes.summaryNotificationColor]: type === EventsType.Summary,
          [classes.cIRangeMilestoneColor]: type === EventsType.MILESTONE,
        })}></Box>
      <Box className={classes.content} onClick={handleRedirect}>
        <Box style={{padding: '20px 0px'}}>
          <Typography variant='h3v1' className={classes.message}>
            {label}
          </Typography>
        </Box>
      </Box>
      <Box
        onClick={handleClose}
        className={classes.clearIcon}
        data-testid='cancelButton'>
        <Clear className={classes.clearButton} />
      </Box>
    </Card>
  );
};

export default ApproveDialog;
