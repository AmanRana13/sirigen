import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import moment from 'moment-timezone';
import get from 'lodash.get';
import {useNavigate, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Box, Button, Typography} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {
  getCurrentSenior,
  getQueryParamTimezone,
  parseJwt,
  toIsoString,
} from 'globals/global.functions';
import {CALL_TYPES} from 'globals/global.constants';

import {callEntryStyle} from './CallEntry.style';
import CollapsibleContainer from 'common/CollapsibleContainer';
import {
  updateCallEntryOutbound,
  updateCallEntryInbound,
  resetCallEntryData,
} from './CallEntry.action';
import {getCompletedCallDetail} from 'pages/WCPages/SeniorCallScheduler/SeniorCallScheduler.action';

const AddTask = ({register, unregister}: any) => {
  const {classes} = callEntryStyle();

  const [actionItems, setActionItems] = useState(['']);

  const addMoreActionItem = () => {
    if (actionItems.length < 5) {
      setActionItems(actionItems.concat(''));
    }
  };

  const disableAddActionButton = React.useMemo(() => {
    return actionItems.length >= 5;
  }, [actionItems]);

  const deleteActionItem = (index: any) => {
    var array = [...actionItems]; // make a separate copy of the array
    unregister(`actionItem[${index}]`);
    if (index !== -1) {
      array.splice(index, 1);
      setActionItems(array);
    }
  };
  return (
    <>
      <Box display='flex' justifyContent='flex-end'>
        <Button
          className={classes.addTaskButton}
          onClick={addMoreActionItem}
          disabled={disableAddActionButton}
          variant='contained'
          size='small'
          color='primary'
          data-testid='add-task-button'>
          Add Task
        </Button>
      </Box>

      <Box mt={2}>
        {actionItems.map((data, i) => (
          <React.Fragment key={`actionItems-${i}`}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              style={{margin: '5px 0'}}>
              <Box htmlFor={'task-notes' + i + 1} component='label'>
                {i + 1}.
              </Box>
              <Box display='flex' width='93%'>
                <textarea
                  className={classes.textarea}
                  id={'task-notes' + i + 1}
                  {...register(`actionItems[${i}]`)}
                  name={`actionItems[${i}]`}
                  rows={2}
                  style={{minWidth: '100%', marginLeft: 2}}
                  defaultValue={data}
                />
              </Box>
              <HighlightOffIcon
                style={{
                  color: '#6ba539',
                  cursor: 'pointer',
                  display: 'flex',
                  alignSelf: 'center',
                  marginLeft: 5,
                  fontSize: 29,
                }}
                onClick={deleteActionItem.bind(this, i)}
                data-testid='delete-action-item-icon'
              />
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};
const CallEntryComponent = () => {
  const {classes} = callEntryStyle();
  const location = useLocation();
  const {register, handleSubmit, setValue, unregister} = useForm();
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const [callData, setCallData] = useState(
    useAppSelector((state: any) => state.callEntry.callEntryData),
  );
  const [disableOtherField, setDisableOtherField] = useState(false);

  const seniorInfo = {...getCurrentSenior()};

  const getQueryParam = (param: any) => {
    const query = new URLSearchParams(location.search);
    return query.get(param);
  };

  useEffect(() => {
    const localStorageUserInfo: any = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(localStorageUserInfo);
    const decodedJWT = parseJwt(userInfo.accessToken);
    const currentTime = toIsoString(new Date());
    if (
      get(callData, 'call_direction') == 'outbound' &&
      get(callData, 'call_id')
    ) {
      setDisableOtherField(true);
    }

    if (getQueryParam('call_entry') !== 'schedule') {
      dispatch(getCompletedCallDetail(seniorInfo.seniorID)).then((res: any) => {
        setCallData((prevState: any) => ({
          ...prevState,
          account_id: seniorInfo.accountID,
          senior_id: seniorInfo.seniorID,
          careagent_id: decodedJWT.user_id,
          start_time: currentTime,
          callee_last_call_time: get(res[0], 'call_time'),
          call_time: '',
          duration: 0,
          call_reason: '',
          call_type: '',
          call_status: 'completed',
          callee_type: 'senior',
          call_priority: 'low',
          care_call_notes: '',
        }));
        setValue('call_direction', 'inbound');
        setValue('call_reason', '');
        setValue('call_type', 'Fall Detected');
        setDisableOtherField(false);
      });
    }
    return () => {
      dispatch(resetCallEntryData());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pushHistory = () => {
    navigate(
      // eslint-disable-next-line max-len
      `/senior/${seniorInfo.seniorID}/${
        seniorInfo.accountID
      }/${getQueryParamTimezone(seniorInfo.timezone)}/call-logs`,
    );
  };

  const onSubmit = async (data: any) => {
    const callID = get(callData, 'call_id');
    if (data.call_direction == 'inbound') {
      await dispatch(updateCallEntryInbound(callData, data));
      pushHistory();
    } else if (data.call_direction == 'outbound') {
      if (!callID) {
        await dispatch(updateCallEntryInbound(callData, data, 'outbound'));
        pushHistory();
      } else {
        await dispatch(updateCallEntryOutbound(callData, data));
        pushHistory();
      }
    }
  };

  const handleChange = (value: any) => {
    if (value == 'outbound' && get(callData, 'call_id')) {
      setDisableOtherField(true);
    } else {
      setDisableOtherField(false);
    }

    if (value == 'outbound' && get(callData, 'call_id')) {
      setValue('call_reason', get(callData, 'call_reason'));
      setValue('call_type', get(callData, 'call_type'));
    }
  };

  return (
    <Box className={classes.container}>
      <Typography variant='h3v1'>Call Entry</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box data-testid='callEntryComponent'>
          <Box display='flex' justifyContent='space-between'>
            <Box mt={1} mr={1.7}>
              <Box display='flex' mb={1}>
                <Typography component='label' variant='h5'>
                  Last Called:&nbsp;
                </Typography>
                <Box>
                  {get(callData, 'callee_last_call_time')
                    ? moment(get(callData, 'callee_last_call_time')).format(
                        'ddd, MMMM DD | HH:mm',
                      )
                    : '-'}
                </Box>
              </Box>
              <Box display='flex' mb={1}>
                <Typography component='label' variant='h5' htmlFor='call-type'>
                  Call Type:&nbsp;
                </Typography>
                <Box>
                  <select
                    className={classes.callType}
                    id='call-type'
                    {...register('call_type')}
                    disabled={disableOtherField}
                    style={{width: 150}}
                    defaultValue={get(callData, 'call_type')}>
                    {CALL_TYPES.map((data) => (
                      <option key={data.key} value={data.value}>
                        {data.value}
                      </option>
                    ))}
                  </select>
                </Box>
              </Box>
            </Box>
            <Box mt={1}>
              <Box display='flex' mb={1}>
                <Typography component='label' variant='h5'>
                  Call Direction:&nbsp;
                </Typography>
                <Box>
                  <input
                    type='radio'
                    id='inbound'
                    {...register('call_direction')}
                    value='inbound'
                    onChange={handleChange.bind(this, 'inbound')}
                    //disabled={callDirectionReadOnly}
                    defaultChecked={
                      get(callData, 'call_direction') == 'inbound'
                    }
                  />
                  <label htmlFor='inbound'>Inbound</label>

                  <input
                    type='radio'
                    id='outbound'
                    {...register('call_direction')}
                    onChange={handleChange.bind(this, 'outbound')}
                    value='outbound'
                    //disabled={callDirectionReadOnly}
                    defaultChecked={
                      get(callData, 'call_direction') == 'outbound'
                    }
                  />
                  <label htmlFor='outbound'>Outbound</label>
                </Box>
              </Box>
            </Box>
          </Box>
          <Typography component='label' htmlFor='call-reason' variant='h5'>
            Call Reason:&nbsp;
          </Typography>
          <Box mt={1} mb={2}>
            <textarea
              className={classes.textarea}
              id='call-reason'
              {...register('call_reason')}
              style={{minWidth: '100%'}}
              disabled={disableOtherField}
              {...register('call_reason')}
              defaultValue={get(callData, 'call_reason')}
            />
          </Box>
          <Typography component='label' variant='h5' htmlFor='call-care-notes'>
            Call Care Notes
          </Typography>
          <Box mt={1} mb={2}>
            <textarea
              className={classes.textarea}
              id='call-care-notes'
              style={{minWidth: '100%'}}
              {...register('callNotes')}
              rows={5}
            />
          </Box>
          <Typography component='label' variant='h5' htmlFor='Action Item List'>
            Action Item List
          </Typography>
          <AddTask register={register} unregister={unregister} />
          <Box display='flex' justifyContent='center' mt={2}>
            <Button
              className={classes.addTaskButton}
              variant='contained'
              type='submit'
              size='small'
              color='primary'>
              Call Complete
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export {CallEntryComponent};
