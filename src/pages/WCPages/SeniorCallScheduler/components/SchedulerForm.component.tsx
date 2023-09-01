import React, {useEffect, useState, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {useForm} from 'react-hook-form';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {Box, Grid, Typography} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';

import {schedulerFormStyle} from './SchedulerForm.style';
import {
  initiateCallSchedule,
  updateCallSchedule,
  getCompletedCallDetail,
  getPendingCallDetail,
  checkCallScheduled,
  clearCheckCallSchedluedMessage,
} from '../SeniorCallScheduler.action';

import get from 'lodash.get';

import {
  DatePicker,
  TimePicker,
  Menu,
  LabelText,
  InputTextBox,
} from '../formFields';

import {
  DATE_FORMAT_SHORT_YEAR,
  FORM_ERROR_MESSAGES,
  INVALID_DATE,
  INVALID_TIME,
  REGEX,
} from 'globals/global.constants';
import AlertMessage from './AlertMessage';
import {formatDateTime, trimValues} from 'globals/global.functions';

const formData: any = [
  {
    input: 'LabelText',
    name: 'memberName',
    label: 'Member Name:',
    value: '',
  },
  {
    input: 'LabelText',
    name: 'timeZone',
    label: 'Time Zone:',
    value: '',
  },
  {
    input: 'LabelText',
    name: 'location',
    label: 'Location:',
    value: '',
  },
  {
    input: 'Menu',
    name: 'callerList',
    label: 'Who to call?',
    required: true,
    menu: true,
    menuItems: [],
    validation: {
      required: 'Required Field',
    },
  },
  {
    input: 'LabelText',
    name: 'lastTimeContacted',
    label: 'Last Time Contacted:',
    value: '',
  },
  {
    input: 'LabelText',
    name: 'currentSchedule',
    label: 'Currently Scheduled:',
    value: '',
    align: 'flex-start',
  },
  {
    input: 'Menu',
    name: 'assignedCareAgent',
    label: 'Assigned Care Agent:',
    required: true,
    menu: true,
    menuItems: [],
    validation: {
      required: 'Required Field',
    },
  },
  {
    input: 'Date',
    name: 'callDate',
    label: 'Date:',
    required: true,
    menu: true,
    menuItems: [],
    validation: {
      required: 'Required Field',
      validate: {
        value: (value: any) => {
          if (value == INVALID_DATE) {
            return INVALID_DATE;
          }
        },
      },
    },
  },
  {
    input: 'Time',
    name: 'callTime',
    label: 'Time:',
    required: true,
    menu: true,
    menuItems: [],
    validation: {
      required: 'Required Field',
      validate: {
        value: (value: any) => {
          if (value == INVALID_DATE) {
            return INVALID_TIME;
          }
        },
      },
    },
  },
  {
    input: 'InputText',
    name: 'callDuration',
    label: 'Call Duration:',
    required: true,
    placeholder: 'Enter Call Duration',
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 20,
        message: 'Max 20 character allowed',
      }
    },
  },
  {
    input: 'Menu',
    name: 'callType',
    label: 'Call Type:',
    required: true,
    menu: true,
    menuItems: [],
    validation: {
      required: 'Required Field',
    },
  },
  {
    id: 'callReason',
    input: 'InputText',
    name: 'callReason',
    label: 'Call Reason:',
    required: true,
    validation: {
      required: 'Required Field',
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
];

const setFormValues = (seniorInfo: any) => {
  formData.forEach((data: any) => {
    data.value = seniorInfo[data.name];
  });
};

const setFormMenuItems = (list: any, key: any) => {
  const formItem: any = formData.find((data: any) => data.name === key);

  formItem.menuItems = list;
};

const SeniorCallSchedulerForm = (prop: any) => {
  const {
    seniorInfo,
    setSeniorInfo,
    callerList,
    assignedCareAgent,
    callType,
    callInfo,
    closeDialog,
  } = prop;
  setFormValues(seniorInfo);
  setFormMenuItems(callerList, 'callerList');
  setFormMenuItems(assignedCareAgent, 'assignedCareAgent');
  setFormMenuItems(callType, 'callType');
  const dispatch: any = useAppDispatch();
  const initialRender = useRef(false);

  const checkCallScheduledMessage = useAppSelector(
    (state: any) => state.seniorCallScheduler.checkCallScheduledMessage,
  );

  const {classes: formClass} = schedulerFormStyle();
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const disableForm = false;
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  useEffect(() => {
    if (callInfo && Object.keys(callInfo).length) {
      initialRender.current = true;
      if (callInfo.start_time) {
        setIsTimeSelected(true);
      }
      setValue('callerList', callInfo.callee_id);
      setValue('assignedCareAgent', callInfo.careagent_id);
      setValue('callDate', callInfo.start_time ?? null);
      setValue('callTime', callInfo.start_time ?? null);
      setValue('callDuration', callInfo.duration);
      setValue('callType', callInfo.call_type);
      setValue('callReason', callInfo.call_reason);
      setTimeout(() => {
        handleWhoToCall(callInfo.callee_id);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkCallScheduledFields: any = watch();

  const buildPayload = (data: any) => {
    const trimmedData = trimValues(data);
    return {
      account_id: seniorInfo.accountId,
      senior_id: seniorInfo.id,
      callee_id: trimmedData.callerList,
      careagent_id: trimmedData.assignedCareAgent,
      start_time: trimmedData.callTime,
      duration: trimmedData.callDuration,
      call_reason: trimmedData.callReason,
      call_type: trimmedData.callType,
      //call_status: 'Pending',
      callee_type: trimmedData.callerList.includes('senior')
        ? 'senior'
        : 'caregiver',
      call_priority: "",
    };
  };

  const onSubmit = (data: any) => {
    data.callTime = formatDateTime(data.callDate, data.callTime);

    const payload: any = buildPayload(data);

    if (!isEmpty(callInfo)) {
      payload.call_id = callInfo.call_id;
      dispatch(updateCallSchedule(payload)).then(() => {
        closeDialog && closeDialog();
      });
    } else {
      dispatch(
        initiateCallSchedule(payload, checkCallScheduledFields, closeDialog),
      );
    }
  };

  const getError = (name: string) => {
    const allErrors = errors as any;
    if (name.includes('.')) {
      try {
        return allErrors[name.split('.')[0]][name.split('.')[1]];
      } catch {
        return undefined;
      }
    } else {
      return errors[name];
    }
  };

  const handleWhoToCall = (value: any) => {
    dispatch(showApplicationLoader());
    const lastTimeContacted = dispatch(getCompletedCallDetail(value)).then(
      (res: any) => {
        return get(res[0], 'start_time');
      },
    );
    const currentSchedule = dispatch(getPendingCallDetail(value)).then(
      (res: any) => {
        let currentlySch: any = [];
        res.map((data: any) => {
          currentlySch.push(
            <div>
              {moment(data.start_time).format(DATE_FORMAT_SHORT_YEAR)} @{' '}
              {moment(data.start_time).format('LT')}
            </div>,
          );
        });
        return currentlySch;
      },
    );
    Promise.all([lastTimeContacted, currentSchedule]).then((res) => {
      dispatch(hideApplicationLoader());
      const lastContactedDate = res[0];
      const currentlySch = res[1];

      setSeniorInfo((prevState: any) => ({
        ...prevState,
        lastTimeContacted: lastContactedDate
          ? moment(lastContactedDate).format(`dddd, ${DATE_FORMAT_SHORT_YEAR}`)
          : '-',
        currentSchedule: currentlySch,
      }));
    });
  };

  React.useEffect(() => {
    dispatch(clearCheckCallSchedluedMessage());

    if (
      checkCallScheduledFields.callerList &&
      checkCallScheduledFields.assignedCareAgent &&
      checkCallScheduledFields.callDate &&
      checkCallScheduledFields.callTime != 'Invalid Date' &&
      checkCallScheduledFields.callTime &&
      checkCallScheduledFields.callTime != 'Invalid Date' &&
      checkCallScheduledFields.callDuration &&
      isTimeSelected
    ) {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        dispatch(checkCallScheduled(checkCallScheduledFields, callInfo));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkCallScheduledFields.callerList,
    checkCallScheduledFields.assignedCareAgent,
    checkCallScheduledFields.callDate,
    checkCallScheduledFields.callTime,
    checkCallScheduledFields.callDuration,
    isTimeSelected,
    dispatch,
  ]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid='Senior-Call-Scheduler-Form'>
        <Box className={formClass.container}>
          <Card className={formClass.card}>
            <CardContent>
              <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={2}>
                <Grid item sm={12}>
                  <Box className={formClass.header}>
                    <Typography variant='h3v1' alignSelf='center'>
                      Call Scheduler
                    </Typography>
                    {closeDialog && (
                      <Box position='absolute' right={0}>
                        <IconButton
                          aria-label='close'
                          onClick={closeDialog}
                          size='large'>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>

              {formData.map((data: any) => (
                <Grid
                  key={data.name}
                  container
                  direction='row'
                  justifyContent='space-around'
                  spacing={2}
                  alignItems={data.align || 'center'}>
                  <Grid item sm={2}></Grid>
                  <Grid item sm={4} className={formClass.label}>
                    <LabelText
                      id={data?.id}
                      label={data.label}
                      bold={true}
                      required={data.required}
                    />
                  </Grid>
                  <Grid item sm={5} sx={{p: 1}}>
                    {(() => {
                      switch (data.input) {
                        case 'LabelText':
                          return <LabelText label={data.value} />;
                        case 'InputText':
                          return (
                            <InputTextBox
                              {...data}
                              register={register(data.name, data.validation)}
                              errorField={
                                Object.keys(errors).length !== 0
                                  ? getError(data.name)
                                  : null
                              }
                              // value={watch(data.name) || ''}
                              disabled={disableForm}
                              errorText={get(errors, `${data.name}.message`)}
                            />
                          );
                        case 'Menu':
                          return (
                            <Menu
                              {...data}
                              errorField={errors[data.name]}
                              errorText={get(errors, `${data.name}.message`)}
                              rules={data.validation}
                              control={control}
                              value={watch(data.name) || ''}
                              disabled={disableForm}
                              handleChange={(e: any) => {
                                if (data.name === 'callerList') {
                                  handleWhoToCall(e);
                                }
                              }}
                            />
                          );
                        case 'Date':
                          return (
                            <DatePicker
                              name={data.name}
                              errorField={
                                checkCallScheduledMessage
                                  ? true
                                  : errors[data.name]
                              }
                              errorText={get(errors, `${data.name}.message`)}
                              defaultValue={null}
                              rules={data.validation}
                              control={control}
                              disablePast={true}
                              label='Date'
                              required={true}
                              maxDate={moment().add(1, 'y')}
                              disabled={disableForm}
                            />
                          );
                        case 'Time':
                          return (
                            <TimePicker
                              name={data.name}
                              errorField={
                                checkCallScheduledMessage
                                  ? true
                                  : errors[data.name]
                              }
                              errorText={get(errors, `${data.name}.message`)}
                              defaultValue={null}
                              rules={data.validation}
                              control={control}
                              label='Time'
                              required={true}
                              disabled={disableForm}
                              inputFormat="hh:mm a"
                              placeholder="HH:MM AM/PM"
                              onClose={() => {
                                setIsTimeSelected(true);
                              }}
                              onOpen={() => {
                                setIsTimeSelected(false);
                              }}
                            />
                          );
                        default:
                          return;
                      }
                    })()}
                  </Grid>
                  <Grid item sm={1}></Grid>
                </Grid>
              ))}
              {checkCallScheduledMessage && (
                <Grid
                  container
                  direction='row'
                  justifyContent='space-around'
                  alignItems='center'
                  spacing={2}>
                  <Grid item sm={2}></Grid>
                  <Grid item sm={9}>
                    <AlertMessage message={checkCallScheduledMessage} />
                  </Grid>
                  <Grid item sm={1}></Grid>
                </Grid>
              )}
            </CardContent>
            <CardActions>
              <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={2}>
                <Grid item sm={2}>
                  <Box>
                    <Button
                      type='submit'
                      size='small'
                      disabled={checkCallScheduledMessage}
                      variant='contained'
                      className={formClass.actionBtn}>
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </form>
    </>
  );
};

export {SeniorCallSchedulerForm};
