/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {getCurrentSenior} from 'globals/global.functions';
import {API} from 'globals/api';
import {
  SET_MEDICAL_CONDITION,
  showError,
} from 'store/commonReducer/common.action';
import {getMedicalConditionService} from 'services/assessmentService/medicalCondition/medicalConditionService';
import {
  IGetMedicalConditionActionParams,
  IMedicalConditionData,
} from 'pages/WCPages/Assessments/MedicalCondition/MedicalCondition.types';

/**
 * @actionCreator getMedicalConditions
 * @description to fetch and set list of medical condtions
 */
export const getMedicalConditions = () => async (dispatch: any) => {
  const {seniorID} = getCurrentSenior();
  const param: IGetMedicalConditionActionParams = {
    senior_id: seniorID,
    offset: 0,
    limit: 100,
  };
  try {
    const response = await getMedicalConditionService(param);
    const data = JSON.parse(JSON.stringify(response.data));
    const medicalConditions = data.surveys.map(
      (item: IMedicalConditionData) => {
        return item.condition;
      },
    );
    dispatch({type: SET_MEDICAL_CONDITION, payload: medicalConditions || []});
  } catch (error) {
    dispatch(showError(error));
  }
};

export const fetchMedicalDetail = () => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const {seniorID, accountID} = getCurrentSenior();

    return API({
      url: `users/medical-history?senior_id=${seniorID}&account_id=${accountID}`,
      method: 'get',
    })
      .then((res: any) => {
        dispatch(hideApplicationLoader());
        return res.data;
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
        return {};
      });
  };
};
