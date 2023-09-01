import get from 'lodash.get';

import {API} from 'globals/api';
import {
  isAuthenticateUser,
  removeObjectProperty,
  toIsoString,
} from 'globals/global.functions';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {TABLE_CACHE_KEY} from 'globals/global.constants';
import {
  emptyPaginationData,
  showError,
} from 'store/commonReducer/common.action';
import {EventsType, EventViewState} from 'globals/enums';
import {getSeniorMappingService} from 'services/seniorService/senior.service';

export const CREATE_CALL_ENTRY = 'CREATE_CALL_ENTRY';
export const CLOSE_CALL_ENTRY = 'CLOSE_CALL_ENTRY';

export const createCallEntryDialog = (data: any) => async (dispatch: any) => {
  const seniorQueryPayload = [
    {
      user_id: data.seniorId,
      account_id: data.accountId,
    },
  ];
  try {
    const seniorDetail = await getSeniorMappingService(seniorQueryPayload);
    const seniorName =
      seniorDetail[data.accountId][data.seniorId]['minimal']['name'];
    const seniorMobile =
      seniorDetail[data.accountId][data.seniorId]['minimal']['mobile_number'];
    const seniorTimezone = get(
      seniorDetail[data.accountId][data.seniorId],
      'minimal.timezone',
    );

    const fullName = `${seniorName.first_name} ${seniorName.last_name}`;

    if (!isAuthenticateUser()) {
      return;
    }

    const callEntryData = createCallEntryData(
      fullName,
      seniorMobile,
      data.seniorId,
      EventsType.CALL_ENTRY,
      EventViewState.Maximize,
      data.accountId,
      seniorTimezone,
      data.alarmId,
      data.timestamp,
      data.status,
      data.lastAlertTime,
      data.lastCallTime,
    );
    dispatch({
      type: CREATE_CALL_ENTRY,
      payload: {callEntryAlarm: callEntryData},
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Data is missing in the API', {error});
  }
};

/**
 * @function closeAlarms
 * @description action creator to close the alarms
 */
export const closeCallEntry =
  (eventId: any) => (dispatch: any, getState: any) => {
    const events = getState().callEntry.events;
    const updatedCallEntry = removeObjectProperty(events, eventId);

    dispatch({
      type: CLOSE_CALL_ENTRY,
      payload: {updatedCallEntry: updatedCallEntry},
    });
  };

const clearCallLogs = (dispatch: any) => {
  //Clear data of call logs to get updated data.
  dispatch(emptyPaginationData(TABLE_CACHE_KEY.CALL_LOGS));

  dispatch(hideApplicationLoader());
  dispatch(showToast('Call Updated Successfully!', 'success'));
};

const handleCallError = (dispatch: any) => {
  dispatch(hideApplicationLoader());
  dispatch(showToast('Something Went Wrong!', 'error'));
};

export const updateCallEntryInbound = (
  callInfo: any,
  data: any,
  type = 'inbound',
) => {
  const currentTime = toIsoString(new Date());

  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      url: `supervision/call-logs/instant`,
      method: 'post',
      data: {
        account_id: callInfo.account_id,
        senior_id: callInfo.senior_id,
        careagent_id: callInfo.careagent_id,
        start_time: callInfo.start_time,
        call_time: currentTime,
        duration: callInfo.duration,
        call_direction: type,
        call_reason: data.call_reason,
        call_type: data.call_type,
        call_status: 'completed',
        callee_type: callInfo.callee_type,
        call_priority: callInfo.call_priority,
        care_call_notes: data.callNotes,
        action_item: data.actionItems,
        disposition: data.disposition || null,
      },
    })
      .then(() => {
        clearCallLogs(dispatch);
        return {success: true};
      })
      .catch((err) => {
        handleCallError(dispatch);
        dispatch(showError(err));
        return {success: false};
      });
  };
};

export const updateCallEntryOutbound = (callInfo: any, data: any) => {
  const currentTime = toIsoString(new Date());
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      url: `supervision/call-logs/outbound`,
      method: 'post',
      data: {
        account_id: callInfo.account_id,
        senior_id: callInfo.senior_id,
        call_id: callInfo.call_id,
        call_time: currentTime,
        care_call_notes: data.callNotes,
        action_item: data.actionItems,
      },
    })
      .then(() => {
        clearCallLogs(dispatch);
      })
      .catch(() => {
        handleCallError(dispatch);
      });
  };
};

export const resetCallEntryData = () => {
  return (dispatch: any) => {
    dispatch({
      type: 'SET_CALL_ENTRY',
      payload: {
        callEntryData: [],
      },
    });
  };
};

/**
 * @function createCallEntryData
 * @description method to create data for alert event
 * @param {string} fullName senior fullname
 * @param {string} seniorId senior ID
 
 * @param {EventsType} type type of event alert
 * @param {EventViewState} viewState view state of event maximize or minimize
 
 */
const createCallEntryData = (
  fullName: string,
  seniorMobile: any,
  seniorId: string,
  eventType: any,
  viewState: any,
  accountId: string,
  seniorTimezone: string,
  alarmId: any,
  startTime: any,
  callType: any,
  lastAlertTime: any,
  lastCallTime: any,
) => {
  const eventId = `${seniorId}-${alarmId}`;
  return {
    [eventId]: {
      eventType,
      viewState,
      fullName,
      seniorMobile,
      seniorId,
      accountId,
      seniorTimezone,
      eventId,
      alarmId,
      startTime,
      callType,
      lastAlertTime,
      lastCallTime,
    },
  };
};
