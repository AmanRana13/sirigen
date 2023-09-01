import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {Roles} from 'globals/enums';
import {getCurrentSenior} from 'globals/global.functions';

import {
  getUserAssessmentStatusService,
  getSupervisionAssessmentStatusService,
} from 'services/assessmentService/assessmentStatusService/assessmentStatus.service';

import {showError} from 'store/commonReducer/common.action';

export const UPDATE_ASSESSMENT_STATUS = 'UPDATE_ASSESSMENT_STATUS';
export const RESET_ASSESSMENT_STATUS = 'RESET_ASSESSMENT_STATUS';

/**
 * @function getAssessmentStatus
 * @description  action creator to fetch all assessment statuses
 */
export const getAssessmentStatus =
  () => async (dispatch: any) => {
    dispatch(showApplicationLoader());
    const {seniorID, accountID} = getCurrentSenior();
    try {
      const [userResponse, supervisionResponse] = await Promise.all([
        getUserAssessmentStatusService({
          senior_id: seniorID,
          account_id: accountID,
        }),
        getSupervisionAssessmentStatusService({
          senior_id: seniorID,
          account_id: accountID,
        }),
      ]);
      const payload = {
        ...userResponse,
        ...supervisionResponse,
      };
      dispatch(hideApplicationLoader());
      // Updating global AssessmentStatus
      dispatch({
        type: UPDATE_ASSESSMENT_STATUS,
        payload,
      });
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function resetAssessmentStatus
 * @description  action creator to reset all assessment statuses
 */
export const resetAssessmentStatus = () => (dispatch: any) => {
  dispatch({
    type: RESET_ASSESSMENT_STATUS,
  });
};
