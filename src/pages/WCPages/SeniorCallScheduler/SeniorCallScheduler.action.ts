import {API} from 'globals/api';

import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {APPLICATION_CODE} from 'globals/applicationCodes';
import {formatDateTime, toIsoString} from 'globals/global.functions';

export const CHECK_CALL_SCHEDULED = 'CHECK_CALL_SCHEDULED';
export const CHECK_CALL_SCHEDULED_FAILED = 'CHECK_CALL_SCHEDULED_FAILED';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const fetchCareGiverInfo = (seniorInfo: any) => {
  return () => {
    return API({
      // eslint-disable-next-line max-len
      url: `users/senior/care-circle?senior_id=${seniorInfo.seniorID}&account_id=${seniorInfo.accountID}`,
      method: 'get',
    }).then((res) => {
      return res.data;
    });
  };
};

export const initiateCallSchedule = (
  data: any,
  checkCallScheduledFields: any,
  closeDialog: any,
) => {
  return async (dispatch: any) => {
    try {
      dispatch(showApplicationLoader());
        const scheduleCall = await API({
          // eslint-disable-next-line max-len
          url: `supervision/call-scheduler`,
          method: 'post',
          data: data,
        });
        dispatch(hideApplicationLoader());
        dispatch(showToast('Call Scheduled Successfully!', 'success'));

        if (closeDialog) {
          closeDialog();
        }

        return scheduleCall.data;
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showToast('Call Scheduled Unsuccessful!', 'error'));
    }
  };
};

export const updateCallSchedule = (data: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      // eslint-disable-next-line max-len
      url: `supervision/update-call-scheduler`,
      method: 'put',
      data: data,
    }).then((res) => {
      dispatch(hideApplicationLoader());
      dispatch(showToast('Call Updated Successfully!', 'success'));
      return res.data;
    });
  };
};

export const getCompletedCallDetail = (user_id: any) => {
  return () => {
    return API({
      url: `supervision/callee-call-scheduler`,
      method: 'get',
      params: {
        callee_id: user_id,
        call_status: 'completed',
        limit: 1,
      },
    }).then((res) => {
      return res.data;
    });
  };
};

export const getPendingCallDetail = (user_id: any) => {
  return () => {
    const currentTime = toIsoString(new Date());
    return API({
      url: `supervision/callee-call-scheduler`,
      method: 'get',
      params: {
        callee_id: user_id,
        call_status: 'pending',
        gte_time: currentTime,
      },
    }).then((res) => {
      return res.data;
    });
  };
};

export const getCareAgentList = () => {
  return () => {
    return API({
      url: `users/query/careagent-list`,
      method: 'get',
    }).then((res) => {
      return res.data;
    });
  };
};

/**
 * @description action to fetch the available call slot through API.
 * @param {callerList, callDuration, callTime, callDate, assignedCareAgent} data
 * @returns void
 */
export const checkCallScheduled =
  (data: any, callInfo: any) => async (dispatch: any) => {
    try {
      dispatch(showApplicationLoader());

      const params: any = {
        callee_id: data.callerList,
        duration: data.callDuration,
        start_time: formatDateTime(data.callDate, data.callTime),
        careagent_id: data.assignedCareAgent,
      };

      //while edit call add exclude
      if (callInfo) {
        if (
          callInfo.callee_id === params.callee_id ||
          callInfo.careagent_id === params.careagent_id
        ) {
          params.exclude = callInfo.call_id;
        }
      }

      const slotRes = await API({
        url: 'supervision/check-scheduler-slot',
        method: 'post',
        params,
      });

      dispatch(hideApplicationLoader());
      return slotRes;
    } catch (error) {
      dispatch(hideApplicationLoader());
      const {application_code, message} = error?.response?.data;

      //display alert message when call slot conflicts occurs
      if (
        application_code === APPLICATION_CODE.callScheduleCAConflictCode ||
        application_code === APPLICATION_CODE.callScheduleUserConflictCode
      ) {
        dispatch({
          type: CHECK_CALL_SCHEDULED_FAILED,
          payload: message,
        });
      }

      return error;
    }
  };

/**
 * @description action creator to clear out the slot alert message
 * @returns void
 */
export const clearCheckCallSchedluedMessage = () => (dispatch: any) => {
  dispatch({type: CLEAR_MESSAGE});
};
