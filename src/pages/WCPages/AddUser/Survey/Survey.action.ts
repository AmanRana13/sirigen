import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {API} from 'globals/api';
import {getCurrentSenior} from 'globals/global.functions';
import get from 'lodash.get';

export const saveSurveyInfo = (data: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const {account_id, senior_id} = getCurrentSenior();
    const {disease_deletion, survey_modification, disease_modification} = data;
    const medicalSurveyAPI = API({
      url: 'users/medical-survey',
      method: 'put',
      data: {survey_modification, account_id, senior_id},
    });

    const diseasesAPI = API({
      url: 'users/diseases',
      method: 'put',
      data: {disease_modification, disease_deletion, account_id, senior_id},
    });

    Promise.all([medicalSurveyAPI, diseasesAPI])
      .then(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Saved Successfully', 'success'));
        return {success: true};
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        const message = get(err, 'response.data.message');
        dispatch(showToast(message, 'error'));
      });
  };
};

export const fetchSurvey = () => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const seniorInfo = getCurrentSenior();
    if (!seniorInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    const medicalSurveyAPI = API({
      // eslint-disable-next-line max-len
      url: `users/medical-survey?senior_id=${seniorInfo.senior_id}&account_id=${seniorInfo.account_id}`,
      method: 'get',
    });
    const diseasesAPI = API({
      url: `users/diseases?senior_id=${seniorInfo.senior_id}&account_id=${seniorInfo.account_id}`,
      method: 'get',
    });

    return Promise.all([medicalSurveyAPI, diseasesAPI])
      .then((res) => {
        dispatch(hideApplicationLoader());
        return {
          medical_survey: get(res[0], 'data.medical_survey'),
          diseases: get(res[1], 'data.diseases'),
        };
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
      });
  };
};

export const fetchDiseases = (data: any) => {
  return () => {
    return API({
      url: `users/autocomplete/diseases?word=${data}&size=10`,
      method: 'get',
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };
};
