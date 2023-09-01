import React from 'react';
import clsx from 'clsx';
import moment from 'moment-timezone';
import {useNavigate} from 'react-router-dom';
import Draggable from 'react-draggable';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Paper,
  PaperProps,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {InputFields} from 'common/InputFields';
import RemainingCharacters from 'common/RemainingCharacters/RemainingCharacters';
import {eventMaxDialogLayoutStyle} from 'common/Events/EventMaxDialog.style';
import {
  getCareAgentInfo,
  getQueryParamTimezone,
  maskPhoneNumber,
  toIsoString,
} from 'globals/global.functions';
import {AlarmStatus} from 'globals/enums';
import {
  APPLICATION_EVENTS,
  DATE_FORMAT,
  ERROR_MESSAGE,
  TIME_FORMAT,
  ZINDEX,
} from 'globals/global.constants';
import {
  closeCallEntry,
  updateCallEntryInbound,
} from 'pages/WCPages/SeniorDashboard/components/CallEntry/CallEntry.action';
import {updateAlarmStatus} from 'store/alarmReducer/Alarm.action';

import {callEntryDialogLayoutStyle} from './CallEntryDialogLayoutStyle';
import {
  setSeniorDetail,
  setSeniorImage,
} from 'store/commonReducer/common.action';
import {useAppDispatch} from 'hooks/reduxHooks';

const PaperComponent = (props: PaperProps) => (
  <Draggable
    // onDrag={(e: any) => {
    //   const from = e.relatedTarget || e.toElement;
    //   if (!from || from.nodeName === EVENT_NODE_NAME.HTML) {
    //     // stop your drag event here
    //     return false;
    //   }
    // }}
    handle='#callEntry-dialog'
    cancel={'[id*="callEntry-content"]'}>
    <Paper {...props} style={{pointerEvents: 'auto'}} />
  </Draggable>
);

const CallEntryDailog = ({
  position,
  fullName,
  seniorMobile,
  callType,
  accountId,
  seniorId,
  startTime,
  lastAlertTime,
  lastCallTime,
  alarmId,
  eventId,
  seniorTimezone,
}: any) => {
  const {classes} = callEntryDialogLayoutStyle();
  const {classes: eventClasses} = eventMaxDialogLayoutStyle(position);

  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();

  const [note, setNote] = React.useState('');

  const [disposition, setDisposition] = React.useState('');
  const [actionItems, setActionItems] = React.useState(['']);
  const [showValidation, setShowValidation] = React.useState(false);

  React.useEffect(() => {
    // removing overflow hidden to scroll the background
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 500);
  }, []);

  const handleSubmit = async () => {
    if (disposition == '' || note == '') {
      setShowValidation(true);
      return;
    }
    const userInfo = getCareAgentInfo();
    const callInfo = {
      account_id: accountId,
      senior_id: seniorId,
      start_time: toIsoString(new Date(startTime)),
      duration: 0,
      callee_type: 'senior',
      call_priority: 'high',
      careagent_id: userInfo.userId,
    };

    const data = {
      call_reason: '',
      call_type: APPLICATION_EVENTS[callType].label,
      callNotes: note,
      actionItems: actionItems,
      disposition: disposition,
    };
    const apiStatus: any = await dispatch(
      updateCallEntryInbound(
        callInfo,
        data,
        callType == 'fall' ? 'outbound' : 'inbound',
      ),
    );
    if (apiStatus.success) {
      await dispatch(updateAlarmStatus(alarmId, AlarmStatus.COMPLETED));
      await dispatch(closeCallEntry(eventId));
      navigate(
        `/senior/${seniorId}/${accountId}/${getQueryParamTimezone(
          seniorTimezone,
        )}/call-logs`,
      );
      dispatch(setSeniorDetail());
      dispatch(setSeniorImage());
    }
  };

  const handleChange = (e: any, i: any) => {
    e.preventDefault();
    e.stopPropagation();
    setActionItems(
      [...actionItems].map((data, index) => {
        if (i === index) {
          return e.target.value;
        } else return data;
      }),
    );
  };

  const handleMessageChange = (event: any) => {
    setNote(event.target.value);
  };

  const addMoreActionItem = () => {
    if (actionItems.length < 5) {
      setActionItems(actionItems.concat(''));
    }
  };

  const disableAddActionButton = React.useMemo(() => {
    return actionItems.length >= 5;
  }, [actionItems]);
  const disableDeleteButton = React.useMemo(() => {
    return actionItems.length === 1;
  }, [actionItems]);
  const deleteActionItem = (index: any) => {
    let array = [...actionItems]; // make a separate copy of the array

    if (index !== -1 && !disableDeleteButton) {
      array.splice(index, 1);
      setActionItems(array);
    }
  };

  const handleDisposition = (e: any) => {
    setDisposition(e.target.value);
  };

  return (
    <Dialog
      maxWidth='sm'
      disableEnforceFocus={true}
      disableAutoFocus={true}
      BackdropProps={{invisible: true}}
      hideBackdrop={true}
      classes={{
        root: clsx({
          [eventClasses.removeBackground]: true,
          // [eventClasses.stackMargin]: true,
        }),
      }}
      aria-labelledby='callEntry-dialog'
      open={true}
      className={eventClasses.eventDialog}
      style={{zIndex: ZINDEX.CALL_ENTRY}}
      PaperComponent={PaperComponent}>
      <Box
        id='callEntry-dialog'
        className={clsx(classes.dialogTitle, 'grabbable')}
        data-testid='callEntryDialog'>
        <Box className={classes.dialogTitleName}>
          <Typography variant='h6v1'>Call Entry</Typography>
          <Typography variant='h6v1'>{fullName}</Typography>
          <Typography variant='h6v1'>
            {maskPhoneNumber(seniorMobile)}
          </Typography>
        </Box>
      </Box>

      <DialogContent id='callEntry-content'>
        <Box pt={1} display='flex' alignItems='center'>
          <Typography
            variant='h6v1'
            style={{
              color: '#16A9D0',
            }}>
            Details
          </Typography>
          <Box className={classes.line}></Box>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Box mt={1} width='50%'>
            <Box display='flex' mb={1}>
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Last Call:&nbsp;
              </Typography>
              <Box>
                <Typography paragraph={true}>
                  {lastCallTime
                    ? moment
                        .utc(lastCallTime)
                        .tz(moment.tz.guess())
                        .format(`${DATE_FORMAT} @ ${TIME_FORMAT}`)
                    : '-'}
                </Typography>
              </Box>
            </Box>
            <Box display='flex' mb={3} alignItems='center'>
              <Typography variant='h5' className={classes.titleColor}>
                Call Type:&nbsp;
              </Typography>
              <Box width='70%'>
                <InputFields
                  menu={true}
                  menuItems={[
                    {value: 'fall', label: 'Fall Detected'},
                    {value: 'sos', label: 'SOS'},
                  ]}
                  inputProps={{name: 'callType'}}
                  eventProps={{
                    value: callType,
                    disabled: true,
                  }}
                />
              </Box>
            </Box>
            <Box display='flex' mb={1}>
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Last {APPLICATION_EVENTS[callType].shortLabel} Detected:&nbsp;
              </Typography>
              <Box>
                <Typography paragraph={true}>
                  {lastAlertTime
                    ? moment
                        .utc(lastAlertTime)
                        .tz(moment.tz.guess())
                        .format(`${DATE_FORMAT} @ ${TIME_FORMAT}`)
                    : '-'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={1} width='50%'>
            <Box display='flex' mb={1}>
              <Typography
                component='label'
                variant='h5'
                className={classes.titleColor}>
                Call Direction:&nbsp;
              </Typography>
              <Box
                width='60%'
                alignItems='center'
                style={{marginBottom: '16px'}}>
                <InputFields
                  inputProps={{name: 'callDirection', disabled: true}}
                  radio={true}
                  showRadioLabel={true}
                  className={classes.radioField}
                  radioItems={[
                    {
                      value: 'Inbound',
                      label: 'Inbound',
                    },
                    {value: 'OutBound', label: 'Outbound'},
                  ]}
                  eventProps={{
                    value: callType == 'fall' ? 'OutBound' : 'Inbound',
                    disabled: true,
                  }}
                />
              </Box>
            </Box>
            <Box display='flex' mb={1}>
              <Typography
                variant='h5'
                style={{marginTop: 8}}
                className={classes.titleColor}>
                Disposition<span className={classes.errorText}>*</span>:&nbsp;
              </Typography>
              <Box width='70%'>
                <InputFields
                  menu={true}
                  isError={showValidation && disposition == ''}
                  errorText={
                    showValidation && disposition == ''
                      ? ERROR_MESSAGE.REQUIRED_FIELD
                      : ''
                  }
                  menuItems={[
                    {value: 'false_alarm', label: 'False Alarm'},
                    {value: 'confirmed_event', label: 'Confirmed Event'},
                    {value: 'unable_to_confirm', label: 'Unable to Confirm'},
                  ]}
                  inputProps={{name: 'disposition'}}
                  eventProps={{
                    value: disposition,
                    onChange: handleDisposition,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box pt={1} display='flex' alignItems='center'>
          <Typography
            variant='h6v1'
            style={{
              color: '#16A9D0',
            }}>
            Notes<span className={classes.errorText}>*</span>
          </Typography>
          <Box className={classes.line}></Box>
        </Box>
        <RemainingCharacters limit={2000} value={note} />

        <InputFields
          isError={showValidation && note == ''}
          errorText={
            showValidation && note == '' ? ERROR_MESSAGE.REQUIRED_FIELD : ''
          }
          eventProps={{
            onChange: (e: any) => handleMessageChange(e),
            value: note,
          }}
          inputProps={{
            name: 'note',
            required: true,
            maxLength: 2000,
            style: {padding: 0},
          }}
          multiline={true}
          rows={10}
        />
        <Box className={classes.actionBox}>
          <Box
            display='flex'
            alignItems='center'
            style={{justifyContent: 'center', padding: '10px'}}>
            <Typography
              variant='h6v1'
              style={{
                color: '#16A9D0',
              }}>
              Action Item List
            </Typography>
            <Box className={classes.actionLine}></Box>
            <Button
              size='large'
              color='primary'
              variant='contained'
              onClick={addMoreActionItem}
              disabled={disableAddActionButton}>
              Add Task
            </Button>
          </Box>
          <Box mt={2}>
            {actionItems.map((data, i) => (
              <Box
                key={`actionItems-${i}`}
                display='flex'
                justifyContent='space-around'
                alignItems='center'
                style={{margin: '5px 10px'}}>
                <Box component='label'>
                  <Typography variant='h5' data-testid='actionItems'>
                    {i + 1}.
                  </Typography>
                </Box>
                <Box display='flex' width='90%' style={{borderRadius: 10}}>
                  <InputFields
                    inputProps={{
                      name: `actionItems[${i}]`,
                      style: {padding: 0},
                    }}
                    multiline={true}
                    rows={2}
                    className={classes.actionItems}
                    eventProps={{
                      value: data,
                      onChange: (e: any) => handleChange(e, i),
                    }}
                  />
                </Box>
                <HighlightOffIcon
                  data-testid='deleteTask'
                  style={{
                    color: disableDeleteButton ? '#aaaaaa' : '#16A9D0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignSelf: 'center',
                    height: 30,
                    width: 30,
                  }}
                  onClick={deleteActionItem.bind(this, i)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        className={eventClasses.dialogActions}
        id='callEntry-content'
        style={{
          justifyContent: 'center',
        }}>
        <Button
          data-testid='callComplete'
          size='large'
          onClick={handleSubmit}
          color='primary'
          variant='contained'>
          Complete Call
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CallEntryDailog;
