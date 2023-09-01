import {hideApplicationLoader} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {API} from 'globals/api';
import get from 'lodash.get';
import {getSeniorMappingService} from 'services/seniorService/senior.service';
import {postUserMappingService} from 'services/userService/userService';

export const getCallScheduleList = (senior_id: any, listAll: any) => {
  return async (dispatch: any) => {
    return API({
      url: `supervision/${listAll ? 'scheduled-calls' : 'senior-calls'}`,
      method: 'get',
      params: {
        user_id: senior_id,
        call_status: 'pending',
      },
    })
      .then(async (res) => {
        let logList = get(res, 'data.data');
        const callee_id_caregiver: any = [];
        const callee_id_senior: any = [];
        logList.map((data: any) => {
          callee_id_caregiver.push(data.careagent_id);
          if (data.callee_type == 'caregiver') {
            callee_id_caregiver.push(data.callee_id);
          } else {
            callee_id_senior.push({
              user_id: data.callee_id,
              account_id: data.account_id,
            });
          }
        });
        const userList = postUserMappingService(callee_id_caregiver).then(
          (result) => {
            return result;
          },
        );
        const seniorList = getSeniorMappingService(callee_id_senior).then(
          (result) => {
            return result;
          },
        );
        return Promise.all([userList, seniorList]).then((response) => {
          const c_giver = response[0];
          const senior = response[1];
          logList.map((data: any) => {
            data['careagent_name'] = get(
              c_giver,
              `${data['careagent_id']}.name.first_name`,
            );
            if (data.callee_type == 'caregiver') {
              data['callee_name'] = get(
                c_giver,
                `${data['callee_id']}.name.first_name`,
              );
              data['gender'] = get(c_giver, `${data['callee_id']}.gender`);
              data['mobile_number'] = get(
                c_giver,
                `${data['callee_id']}.mobile_number`,
              );
              data['location'] = get(c_giver, `${data['callee_id']}.location`);
              data['alternate_number'] = get(
                c_giver,
                `${data['callee_id']}.alternate_number`,
              );
            } else {
              if (senior[data['account_id']]) {
                data['callee_name'] =
                  senior[data['account_id']][
                    data['callee_id']
                  ]?.minimal?.name?.first_name;
                data['gender'] =
                  senior[data['account_id']][
                    data['callee_id']
                  ]?.minimal?.gender;
                data['mobile_number'] =
                  senior[data['account_id']][
                    data['callee_id']
                  ]?.minimal?.mobile_number;
                data['location'] =
                  senior[data['account_id']][
                    data['callee_id']
                  ]?.basic_info?.location;
                data['timezone'] =
                  senior[data['account_id']][
                    data['callee_id']
                  ]?.basic_info?.timezone;
                data['dob'] =
                  senior[data['account_id']][data['callee_id']]?.minimal?.dob;
              }
            }
          });
          dispatch(hideApplicationLoader());

          return logList;
        });
      })
      .catch((err) => {
        let message = '';
        dispatch(hideApplicationLoader());
        if (err.message) {
          message = 'Fetch call schedule fail.';
        } else {
          message = get(err, 'response.data.message');
        }

        dispatch(showToast(message, 'error'));
        return [];
      });
  };
};
