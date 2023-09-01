/* eslint-disable max-len */
import React from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Typography} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';

import moment from 'moment-timezone';

import {
  emptyPaginationData,
  setSeniorDetail,
  setSeniorImage,
} from 'store/commonReducer/common.action';

import EventMaxDialog from 'common/Events/EventMaxDialog';
import {getQueryParamTimezone} from 'globals/global.functions';

import {sosFallDialogStyle} from './SosFallDialogStyle';
import {
  APPLICATION_EVENTS,
  DIALOG_TYPES,
  TABLE_CACHE_KEY,
} from 'globals/global.constants';
import {closeAlarms, updateAlarmStatus} from 'store/alarmReducer/Alarm.action';
import {AlarmStatus} from 'globals/enums';
import {Sounds} from '../../sounds/NotificationSound';
import {createCallEntryDialog} from 'pages/WCPages/SeniorDashboard/components/CallEntry/CallEntry.action';
import {checkAndSaveMedicationDialog} from 'pages/WCPages/Assessments/MedicationList/MedicationList.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const SosFallDialog = React.memo(
  ({
    position,
    eventType,
    viewState,
    fullName,
    seniorId,
    accountId,
    seniorTimezone,
    eventId,
    alarmId,
    startTime,
    detailList,
    alertType,
    lastCallTime,
    lastAlertTime,
  }: any) => {
    const {classes} = sosFallDialogStyle();

    const dispatch: any = useAppDispatch();
    const navigate = useNavigate();
    const dialogType = useAppSelector((state: any) => state.common.dialog.type);
    const {medicationDialogData} = useAppSelector(
      (state: any) => state.medicationList,
    );

    React.useEffect(() => {
      Sounds.notification.play();
    }, []);
    /**
     * @function handleSubmit
     * @description show dialog after clicking on submit button inside an alert.
     * @returns void
     */
    const handleSubmit = async () => {
      const callEntryData = {
        seniorId: seniorId,
        accountId: accountId,
        alarmId: alarmId,
        timestamp: startTime,
        status: eventType,
        lastCallTime: lastCallTime,
        lastAlertTime: lastAlertTime,
      };

      handleNavigate();
      const apiStatus: any = await dispatch(
        updateAlarmStatus(alarmId, AlarmStatus.ASSIGNED),
      );
      if (apiStatus.success) {
        dispatch(closeAlarms(eventId, eventType));

        dispatch(createCallEntryDialog(callEntryData));
      }
    };

    /**
     * @function handleNavigate
     * @returns void
     */
    const handleNavigate = () => {
      //checking medication dialog is open or not and if it is open then autosave save the details on alerts redirect
      {
        dialogType === DIALOG_TYPES.MEDICATION &&
          dispatch(checkAndSaveMedicationDialog(medicationDialogData));
      }

      navigate(
        `/senior/${seniorId}/${accountId}/${getQueryParamTimezone(
          seniorTimezone,
        )}/dashboard`,
      );

      //Clear data of call logs to get updated data.
      dispatch(emptyPaginationData(TABLE_CACHE_KEY.CALL_LOGS));
      dispatch(setSeniorDetail());
      dispatch(setSeniorImage());
    };

    return (
      <EventMaxDialog
        disableSendButton={false}
        eventType={eventType}
        fullName={fullName}
        isOpen={true}
        handleClose={() => console.log('close')}
        handleSubmit={handleSubmit}
        minimizeModal={() => console.log('minimize')}
        navigateToDashboard={handleNavigate}
        handleNoAction={() => console.log('noAction')}
        position={position}
        isSos={alertType === 'Sos' ? true : false}
        isFall={alertType === 'Fall' ? true : false}
        showMinimize={false}>
        <>
          <Box
            pt={1}
            display='flex'
            alignItems='center'
            data-testid='sosFallDialog'>
            <Typography
              variant='h6v1'
              style={{
                color: '#16A9D0',
              }}>{`${APPLICATION_EVENTS[eventType].label} Details`}</Typography>
            <Box
              className={
                alertType === 'Fall' ? classes.fallLine : classes.line
              }></Box>
            <TimerIcon style={{color: 'red', marginRight: '1'}} />
            <ShowTimer time={startTime} />
          </Box>
          <Box display='flex' flexDirection='column' mt={2}>
            {detailList.map((data: any) => (
              <Box key={data.label} display='flex'>
                <Box width='36%'>
                  <Typography variant='h5' className={classes.label}>
                    {data.label} :
                  </Typography>
                </Box>
                <Box width='64%'>
                  <Typography paragraph={true} className={classes.value}>
                    {data.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      </EventMaxDialog>
    );
  },
);
const ShowTimer = ({time}: any) => {
  const [timer, setTimer] = React.useState<any>({min: '00', sec: '00'});
  const handleTimer = () => {
    const currentTime = moment();
    const startTime = moment(time);
    const subtractStartTime = moment().subtract(startTime.format('hh:mm:ss'));
    const seconds = subtractStartTime.format('ss');
    const minutes = currentTime.diff(startTime, 'minutes');
    setTimer({min: minutes, sec: seconds});
  };
  React.useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);
  return (
    <Typography variant='h6v1' data-testid='timer'>
      {timer.min}:{timer.sec} Min:Sec
    </Typography>
  );
};

export default SosFallDialog;
