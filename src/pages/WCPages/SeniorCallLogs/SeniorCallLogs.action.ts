import get from 'lodash.get';

import {getCurrentSenior, getLocalStorage} from 'globals/global.functions';
import {API} from 'globals/api';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {API_DATA_LIMIT} from 'globals/global.constants';
import {postUserMappingService} from 'services/userService/userService';

export const getCallLogs = () => {
  const seniorInfo = {...getCurrentSenior()};
  return (dispatch: any) => {
    const cacheData = getLocalStorage('callLogs');
    let params;

    if (cacheData) {
      params = {
        user_id: seniorInfo.seniorID,
        call_status: 'completed',
        limit: API_DATA_LIMIT,
        last_evaluated_key: cacheData.lastEvaluatedKey, // pass existing evaluated key
      };
    } else {
      params = {
        user_id: seniorInfo.seniorID,
        call_status: 'completed',
        limit: API_DATA_LIMIT,
      };
    }

    return API({
      url: `supervision/senior-calls`,
      method: 'get',
      params,
    })
      .then((res) => {
        const logList = get(res, 'data.data');
        const lastEvaluatedKey = res.data.last_evaluated_key;
        const careagent_ids: any = [];
        logList.map((data: any) => {
          careagent_ids.push(data.careagent_id);
        });
        const userList = postUserMappingService(careagent_ids).then(
          (result) => {
            return result;
          },
        );
        return Promise.all([userList]).then((response) => {
          const careagent = response[0];
          logList.map((logListData: any) => {
            logListData['careagent_name'] = get(
              careagent,
              `${logListData['careagent_id']}.name.first_name`,
            );
          });

          return {
            data: logList,
            lastEvaluatedKey,
          };
        });
      })
      .catch((err) => {
        const message = get(err, 'response.data.message');
        dispatch(showToast(message, 'error'));
        return [];
      });
  };
};

export const fetchCallNotes = (
  account_id: any,
  senior_id: any,
  call_id: any,
) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      url: `supervision/call-logs/detail`,
      method: 'get',
      params: {
        account_id: account_id,
        senior_id: senior_id,
        call_id: call_id,
      },
    })
      .then((res) => {
        dispatch(hideApplicationLoader());
        return get(res, 'data');
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
      });
  };
};

export const updateCallNotes = (callInfo: any, data: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      url: `supervision/call-logs`,
      method: 'put',
      data: {
        account_id: callInfo.account_id,
        senior_id: callInfo.senior_id,
        call_id: callInfo.call_id,
        care_call_notes: data.callNotes,
        action_item: data.actionItems,
      },
    })
      .then(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Call Updated Successfully!', 'success'));
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Something Went Wrong!', 'error'));
      });
  };
};
