import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {API} from 'globals/api';
import {getCurrentSenior} from 'globals/global.functions';
import get from 'lodash.get';

export const saveMedicalInfo = (data: any) => {
  return (dispatch: any) => {
    let history_data = data.history;

    if (history_data.pacemaker_user == 'Yes') {
      history_data.pacemaker_user = true;
    } else if (history_data.pacemaker_user == 'No') {
      history_data.pacemaker_user = false;
    }
    dispatch(showApplicationLoader());
    const accountInfo = getCurrentSenior();
    const medicalInfoAPI = API({
      url: 'users/medical-history',
      method: 'put',
      data: {
        history_data: history_data,
        account_id: accountInfo.account_id,
        senior_id: accountInfo.senior_id,
      },
    });

    const prescriptionInfoAPI = API({
      url: 'users/medical-prescription',
      method: 'post',
      data: {
        ...data.prescription,
        account_id: accountInfo.account_id,
        senior_id: accountInfo.senior_id,
      },
    });

    return Promise.all([medicalInfoAPI, prescriptionInfoAPI])
      .then((res) => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Saved Successfully', 'success'));
        return {
          history: get(res[0], 'data'),
          prescription: get(res[1], 'data'),
        };
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        const message = get(err, 'response.data.message');
        dispatch(showToast(message, 'error'));
      });
  };
};

export const fetchMedicalInfo = () => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const seniorInfo = getCurrentSenior();
    if (!seniorInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    const {senior_id, account_id} = seniorInfo;
    const historyAPI = API({
      url: `users/medical-history?senior_id=${senior_id}&account_id=${account_id}`,
      method: 'get',
    });

    const prescriptionAPI = API({
      url: `users/medical-prescription?senior_id=${senior_id}&account_id=${account_id}`,
      method: 'get',
    });

    return Promise.all([historyAPI, prescriptionAPI])
      .then((res) => {
        dispatch(hideApplicationLoader());
        return {
          history: get(res[0], 'data'),
          prescription: get(res[1], 'data'),
        };
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        const message = get(err, 'response.data.message');
        dispatch(showToast(message, 'error'));
      });
  };
};

export const checkFoodRequired = (data: any) => {
  if (data.is_food_required) {
    return 'With food';
  } else if (!data.is_food_required) {
    return 'Without food';
  } else {
    return null;
  }
};

export const setPrescriptionData = (medicalInfo: any) => {
  const prescriptionData = medicalInfo?.prescription;
  if (prescriptionData && prescriptionData.length > 0) {
    prescriptionData.forEach((data: any) => {
      let medicationSchedules = [];
      let dataValue = checkFoodRequired(data);
      data.is_food_required = dataValue;
      let medicationSchedule: any = {};
      if (data.medication_schedule) {
        Object.values(data.medication_schedule).forEach(
          (medicationData: any) => {
            if (!medicationSchedule[medicationData.day]) {
              medicationSchedule[medicationData.day] = [];
            }
            medicationSchedule[medicationData.day].push(medicationData.time);
          },
        );
      }

      if (Object.keys(medicationSchedule).length > 0) {
        Object.keys(medicationSchedule).forEach((medicationDay: any) => {
          const medicationScheduleDay: any = {};
          medicationScheduleDay.day = medicationDay;

          medicationSchedule[`${medicationDay}`].forEach(
            (schedule: any, index: any) => {
              medicationScheduleDay[`time${index + 1}`] = schedule;
            },
          );
          medicationSchedules.push(medicationScheduleDay);
        });
      } else {
        medicationSchedules.push({day: ''});
      }

      data.medication_schedule = medicationSchedules;
      medicationSchedule = {};
      medicationSchedules = [];
    });
  }

  return prescriptionData;
};
