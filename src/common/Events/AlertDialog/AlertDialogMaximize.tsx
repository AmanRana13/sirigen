import React from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment-timezone';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import {
  closeEvent,
  minimizeEvent,
  updateNoActionStatus,
} from 'store/eventsReducer/Events.action';
import {
  openDialog,
  setSeniorDetail,
  setSeniorImage,
} from 'store/commonReducer/common.action';
import {IAlertDataType} from 'store/eventsReducer/Events.state';
import {Fields} from 'common/Fields';
import EventMaxDialog from 'common/Events/EventMaxDialog';
import {CareInsightStatus, EventsType} from 'globals/enums';
import {
  capitalizeFirstLetter,
  getQueryParamTimezone,
} from 'globals/global.functions';
import {
  APPLICATION_EVENTS,
  DATE_FORMAT,
  DIALOG_TYPES,
  TIME_FORMAT,
} from 'globals/global.constants';

import {alertDialogStyle} from './AlertDialog.style';
import RemainingCharacters from 'common/RemainingCharacters/RemainingCharacters';
import {postAlertDialog} from 'store/eventsReducer/Alerts.action';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @function validateAlertMessage
 * @description check alert message is less than 2000 letters or not
 * @param {string} value
 * @returns {boolean}
 */
const validateAlertMessage = (value: string): boolean => {
  let isValidate = true;
  if (value.length > APPLICATION_EVENTS.alert.alertMessageCharCount) {
    isValidate = false;
  }
  return isValidate;
};

const AlertDialog = ({
  seniorId,
  eventType,
  careInsightHistory,
  fullName,
  message,
  endDate,
  startDate,
  accountId,
  seniorTimezone,
  eventId,
  alertId,
  position,
  detailList,
  dateGenerated,
}: IAlertDataType) => {
  const {classes} = alertDialogStyle();

  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = React.useState('');
  const [tableData, setTableData] = React.useState([]);

  /**
   * @function handleClose
   * @description show dialog after clicking on close button inside an alert.
   * @returns void
   */
  const handleClose = (
    firstMessage = 'Are you sure you want to',
    boldMessage = 'Close',
    onSuccess = () => {},
  ): void => {
    const openDialogProp = {
      firstMessage: firstMessage,
      boldMessage: boldMessage,
      secondMessage: '?',
      successButtonText: 'Confirm',
      type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        onSuccess();
        dispatch(closeEvent(eventId, eventType));
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  /**
   * @function handleSubmit
   * @description show dialog after clicking on submit button inside an alert.
   * @returns void
   */
  const handleSubmit = () => {
    handleClose('Are you sure you want to', 'Send', () =>
      dispatch(
        postAlertDialog(
          alertId,
          CareInsightStatus.SentForApproval,
          alertMessage,
        ),
      ),
    );
  };

  /**
   * @function minimizeModal
   * @description Function to minimize the alert.
   * @returns void
   */
  const minimizeModal = () => {
    const data = {
      careInsightHistory: careInsightHistory,
      message: alertMessage,
      startDate: startDate,
      endDate: endDate,
      dateGenerated,
    };
    dispatch(minimizeEvent(eventId, eventType, data));
  };

  /**
   * @function handleNavigate
   * @returns void
   */
  const handleNavigate = () => {
    minimizeModal();
    navigate(
      `/senior/${seniorId}/${accountId}/${getQueryParamTimezone(
        seniorTimezone,
      )}/dashboard`,
    );
    dispatch(setSeniorDetail());
    dispatch(setSeniorImage());
  };

  /**
   * @function handleNoAction
   * @description This function call after clicking on No Action button inside an alert.
   * @returns void
   */
  const handleNoAction = () => {
    handleClose('Are you sure you want to perform', 'No Action', () =>
      dispatch(updateNoActionStatus([alertId])),
    );
  };

  /**
   * @function handleMessageChange
   * @description Set alertMessage state value with the latest message.
   * @returns void
   */
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlertMessage(event.target.value);
  };

  React.useEffect(() => {
    setAlertMessage(message);
    setTableData(careInsightHistory);
  }, [message, careInsightHistory]);

  /**
   * @function disableSendButton
   * @description disable the send button until the care agent put a message inside the alert.
   * @returns void
   */
  const disableSendButton = React.useMemo(() => {
    if (alertMessage && validateAlertMessage(alertMessage)) {
      return false;
    }
    return true;
  }, [alertMessage]);

  return (
    <EventMaxDialog
      disableSendButton={disableSendButton}
      eventType={EventsType.Alert}
      fullName={fullName}
      isOpen={true}
      handleClose={() => handleClose()}
      handleSubmit={handleSubmit}
      minimizeModal={minimizeModal}
      navigateToDashboard={handleNavigate}
      handleNoAction={handleNoAction}
      position={position}
      alert={true}
      showMinimize={true}
      justifyButtonCenter={true}>
      <>
        <Box data-testid='alert-maximize'>
          <RemainingCharacters
            limit={APPLICATION_EVENTS.alert.alertMessageCharCount}
            value={alertMessage}
          />
          <Fields
            inputProps={{'aria-label': 'alert-message-input'}}
            value={alertMessage}
            onChange={handleMessageChange}
            multiline={true}
            rows={3}
            spellCheck={true}
          />
        </Box>
        <Box pt={1} display='flex' alignItems='center'>
          <Typography variant='h5'>Details</Typography>
          <Box className={classes.line}></Box>
        </Box>
        <Box display='flex' flexDirection='column' ml={2}>
          {/* TODO @Saquib need to fix this detailList code */}
          {detailList.map((data: any) => (
            <Box key={data.label} display='flex'>
              <Box width='65%'>{data.label} :</Box>
              <Box width='35%'>{data.value}</Box>
            </Box>
          ))}
        </Box>
        <Box pt={1} display='flex' alignItems='center'>
          <Box width={130}>
            <Typography variant='h5'>Insight History</Typography>
          </Box>
          <Box className={classes.line}></Box>
        </Box>
        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            aria-label='alert table'
            className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Date/Time</TableCell>
                <TableCell align='center'>Sent</TableCell>
                <TableCell align='center'>Variable</TableCell>
                <TableCell align='center'>Reading</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((row: any) => (
                <TableRow key={row.name}>
                  <TableCell>
                    {moment(row.dateGenerated)
                      .tz(moment.tz.guess())
                      .format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
                  </TableCell>
                  <TableCell align='center'>
                    {row.status == CareInsightStatus.Approved ||
                    row.status == CareInsightStatus.Sent ||
                    row.status == CareInsightStatus.ApprovedWithEdit
                      ? 'Yes'
                      : 'No'}
                  </TableCell>
                  <TableCell align='center'>
                    {capitalizeFirstLetter(row.variable)}
                  </TableCell>
                  <TableCell align='center'>{row.reading}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </EventMaxDialog>
  );
};

export default AlertDialog;
