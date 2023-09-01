import {API} from 'globals/api';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {emptyPaginationData} from 'store/commonReducer/common.action';
import {TABLE_CACHE_KEY} from 'globals/global.constants';

export const updateCallStatus = (
  senior_id: any,
  account_id: any,
  call_id: any,
  call_status: any,
) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      url: `supervision/update-call-status`,
      method: 'patch',
      data: {
        senior_id: senior_id,
        account_id: account_id,
        call_id: call_id,
        call_status: call_status,
      },
    })
      .then(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Call Deleted Successfully!', 'success'));
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Something Went Wrong!', 'error'));
      });
  };
};

export const markCompleteCall = (
  senior_id: any,
  account_id: any,
  call_id: any,
) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const currentTime = new Date();
    return API({
      url: `supervision/call-logs/outbound`,
      method: 'post',
      data: {
        senior_id: senior_id,
        account_id: account_id,
        call_id: call_id,
        call_time: currentTime,
        care_call_notes: '',
        action_item: [],
      },
    })
      .then(() => {
        //Clear data of call logs to get updated data.
        dispatch(emptyPaginationData(TABLE_CACHE_KEY.CALL_LOGS));

        dispatch(hideApplicationLoader());
        dispatch(showToast('Call Completed Successfully!', 'success'));
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Something Went Wrong!', 'error'));
      });
  };
};
