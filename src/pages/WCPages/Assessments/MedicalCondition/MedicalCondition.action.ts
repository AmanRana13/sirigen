/* eslint-disable max-len */
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {
  Assessements,
  AssessmentButtonAction,
  AssessmentName,
  AssessmentStatus,
  AssessmentStatuses,
} from 'globals/enums';
import {
  DIALOG_TYPES,
  FETCH_LIMIT,
  PAGINATION_LIMIT,
} from 'globals/global.constants';
import {
  assessmentDailogMessage,
  getCurrentSenior,
} from 'globals/global.functions';
import {
  getMedicalConditionHistoryService,
  getMedicalConditionService,
  postMedicalConditionService,
  searchMedicalConditionService,
} from 'services/assessmentService/medicalCondition/medicalConditionService';
import {
  getPaginationDataIsolated,
  getPaginationOffsetData,
  openDialog,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {
  GET_ASSESSMENT,
  GET_ASSESSMENT_HISTORY_FAIL,
  GET_ASSESSMENT_HISTORY_SUCCESS,
  GET_LOADING_STATUS,
  GET_SEARCH_RESULT,
  RESET_ASSESSMENT,
  SEARCH_RESULT_FAIL,
  SEARCH_RESULT_SUCCESS,
  TOGGLE_IS_COMPLETED,
  TOGGLE_VIEW_STATE,
  UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
} from '../Assessments.action';
import {
  IGetMedicalConditionActionParams,
  IMedicalConditionAPIFormat,
  IMedicalConditionData,
  IPostMedicalConditionActionParams,
  IPostMedicalConditionServiceParams,
  ISubmitMedicalCondition,
} from './MedicalCondition.types';
import {
  UPDATE_ASSESSMENT_STATUS,
  getAssessmentStatus,
} from '../AssessmentStatus/AssessmentStatus.action';

/**
 * @function setMedicalCondition
 * @description update medical condition table details with any values
 * @param data
 * @returns
 */
export const setMedicalCondition =
  (
    data: IMedicalConditionData[],
    dateTime: string,
    assessmentId: string,
    versionNumber: number,
    careAgentId: string,
    assessmentStatus: string,
  ) =>
  async (dispatch: any) => {
    dispatch({
      type: GET_ASSESSMENT,
      payload: {
        surveys: data,
        dateTime: dateTime,
        assessmentId: assessmentId,
        versionNumber: versionNumber,
        careAgentId,
        assessmentStatus,
        offset: 0,
      },
    });
  };

/**
 * @function searchMedicalCondition
 * @discription to get list of auto suggetion on search for any medical condition
 * @param value
 * @returns
 */
export const searchMedicalCondition =
  (value: string) => async (dispatch: any) => {
    const {seniorID} = getCurrentSenior();

    const param = {
      medical_condition: value,
      senior_id: seniorID,
    };
    try {
      dispatch({type: GET_SEARCH_RESULT});
      const response = await searchMedicalConditionService(param);
      dispatch({type: SEARCH_RESULT_SUCCESS, payload: response});
    } catch (error) {
      dispatch({type: SEARCH_RESULT_FAIL});
      dispatch(showError(error));
    }
  };

/**
 * @function getMedicalCondition
 * @description  action creator to fetch medical condition data
 * @param {number} offset
 * @param {number} limit
 * @param {string} condition_id
 */
export const getMedicalCondition =
  (offset = 0, limit = FETCH_LIMIT.medicalCondition, condition_id = '') =>
  async (dispatch: any) => {
    const {seniorID} = getCurrentSenior();
    const param: IGetMedicalConditionActionParams = {
      senior_id: seniorID,
      offset,
      limit,
    };
    if (condition_id) {
      param.condition_id = condition_id;
    }
    try {
      dispatch({type: GET_LOADING_STATUS, payload: true});
      const response = await getMedicalConditionService(param);
      dispatch({type: GET_LOADING_STATUS, payload: false});
      return {
        data: response?.data?.surveys || [],
        response: response.data,
      };
    } catch (error) {
      dispatch({type: GET_LOADING_STATUS, payload: false});
      throw error;
    }
  };

/**
 * @function getMedicalConditionSuccess
 * @discription  action creator to set medical condition data on success
 */
export const getMedicalConditionSuccess =
  (data: any, offset: number, response: any) => (dispatch: any) => {
    dispatch({
      type: GET_ASSESSMENT,
      payload: {
        surveys: data,
        offset: offset,
        assessmentStatus: response.assessmentStatus,
        assessmentId: response.assessmentId,
        versionNumber: response.versionNumber,
        dateTime: response.dateTime,
        careAgentId: response.careAgentId,
      },
    });
  };

/**
 * @function getMedicalConditionSuccess
 * @discription  action creator to show error on error
 */
export const getMedicalConditionError = (error: any) => (dispatch: any) => {
  showError(error);
};

/**
 * @function submitMedicalCondition
 * @description to save, submit or reset assessment
 * @param type
 * @param formError
 * @param data,
 * @param isAutoSave
 */
export const submitMedicalCondition =
  ({
    type,
    formError,
    data,
    deletedData,
    modifiedData,
    isAutoSave,
    historyData,
    assessmentId,
    isAssessmentDataUpdated = true,
    isUnMount = false,
    seniorID,
    careAgentName,
  }: ISubmitMedicalCondition) =>
  async (dispatch: any) => {
    const params = {
      data,
      deletedData,
      modifiedData,
      type,
      isAutoSave,
      assessmentId,
      seniorID,
      careAgentName,
    };
    const submitMessage = `Are you sure you want to Submit?`;
    const successButtonText = 'Yes';
    const cancelButtonText = 'No';
    const openDialogProp = {
      boldMessage: submitMessage,
      successButtonText,
      cancelButtonText,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        dispatch(postMedicalCondition(params));
      },
    };
    // if there is no form error only then allow user to save or submit assessment
    if (!formError && type === AssessmentStatus.Submit) {
      dispatch(openDialog({...openDialogProp}));
    }
    if (type === AssessmentStatus.Save && isAssessmentDataUpdated) {
      await dispatch(postMedicalCondition(params, isUnMount, historyData));
      dispatch({
        type: TOGGLE_IS_COMPLETED,
        payload: {isCompleted: false},
      });
    }
    //set previously submitted assessment data into the form if we click on view button
    if (historyData) {
      const dateTime = `${historyData.date} ${historyData.time}`;
      dispatch(toggleMedicalConditionViewState(true, dateTime));
      dispatch(
        setMedicalCondition(
          [],
          dateTime,
          historyData.assessmentId,
          historyData.version,
          historyData.careAgentId,
          'submit',
        ),
      );
    }
  };

/**
 * @function postMedicalCondition
 * @description action creator to update medical condition data
 */
export const postMedicalCondition =
  (
    {
      data,
      deletedData,
      modifiedData,
      type,
      isAutoSave,
      assessmentId,
      seniorID,
      careAgentName,
    }: IPostMedicalConditionActionParams,
    isUnMount?: boolean,
    historyData?: any,
  ) =>
  async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader('', false, isAutoSave));
    const params: IPostMedicalConditionServiceParams = {
      senior_id: seniorID,
      current_user_name: `${careAgentName.first_name} ${careAgentName.last_name}`,
      medical_conditions: formatMedicalConditionData(
        type,
        data,
        deletedData || [],
        modifiedData || [],
      ),
      status: type,
    };

    if (assessmentId) {
      params.condition_id = assessmentId;
    }

    try {
      await postMedicalConditionService(params);
      if (!isUnMount) {
        dispatch({type: RESET_ASSESSMENT});
        if (!historyData || historyData.condition_id === assessmentId) {
          await dispatch(
            getPaginationOffsetData(
              getMedicalCondition,
              PAGINATION_LIMIT.medicalCondition,
              1,
              0,
              FETCH_LIMIT.medicalCondition,
              getMedicalConditionSuccess,
              getMedicalConditionError,
              [],
            ),
          );
        }
        dispatch(
          getPaginationDataIsolated(
            () => getMedicalConditionHistory(),
            PAGINATION_LIMIT.assessmentHistory,
            '',
            1,
            getMedicalConditionHistorySuccess,
            getMedicalConditionHistoryFail,
            '',
            '',
          ),
        );
      }
      // Updating global AssessmentStatus
      if (type === AssessmentStatus.Reset) {
        dispatch(getAssessmentStatus());
      } else {
        dispatch({
          type: UPDATE_ASSESSMENT_STATUS,
          payload: {
            [AssessmentName.MEDICAL_CONDITION]: {
              status:
                type === AssessmentStatus.Submit
                  ? AssessmentStatuses.COMPLETE
                  : AssessmentStatuses.INCOMPLETE,
              datetime: new Date().toUTCString(),
            },
          },
        });
      }
      if (type == AssessmentStatus.Submit) {
        //set form as complete and refetch the history table
        dispatch({
          type: TOGGLE_IS_COMPLETED,
          payload: {isCompleted: true},
        });
      }
      const overlayMessage = (type: AssessmentStatus) => {
        if (AssessmentStatus.Submit === type) {
          return assessmentDailogMessage(
            Assessements.MEDICAL_CONDITION,
            AssessmentButtonAction.Submit,
          );
        } else {
          return assessmentDailogMessage(
            Assessements.MEDICAL_CONDITION,
            AssessmentButtonAction.Save,
          );
        }
      };
      dispatch(hideApplicationLoader());
      if (type === AssessmentStatus.Submit || type === AssessmentStatus.Save) {
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.SUCCESS,
            firstMessage: overlayMessage(type),
            isAutoSave: isAutoSave,
          }),
        );
      }
    } catch (error) {
      dispatch(hideApplicationLoader(isAutoSave));
      dispatch(showError(error));
    }
  };

/**
 * @description action creator to fetch assessment history
 * @function getMedicalConditionHistory
 * @returns pagination data
 */
export const getMedicalConditionHistory = () => async (dispatch: any) => {
  try {
    const {seniorID} = getCurrentSenior();
    const params: any = {
      senior_id: seniorID,
      limit: 100,
    };
    const response = await getMedicalConditionHistoryService(params);
    return {
      data: JSON.parse(JSON.stringify(response.data)),
      lastEvaluatedKey: response.lastEvaluatedKey,
    };
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

/**
 * @function getMedicalConditionHistorySuccess
 * @description action creator to store assessment history table data
 * @param {} tableData
 */
export const getMedicalConditionHistorySuccess =
  (tableData: any) => (dispatch: any) => {
    let {data, lastEvaluatedKey} = tableData;
    dispatch({
      type: GET_ASSESSMENT_HISTORY_SUCCESS,
      payload: {
        data: data,
        lastEvaluatedKey,
      },
    });
  };

/**
 * @function getMedicalConditionHistoryFail
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getMedicalConditionHistoryFail =
  (error: any) => (dispatch: any) => {
    dispatch(showError(error));
    dispatch({
      type: GET_ASSESSMENT_HISTORY_FAIL,
    });
  };

/**
 * @function updateMedicalConditionHistoryPageNumber
 * @description action creator to update the page number of history table
 * @param {string | number} value
 */
export const updateMedicalConditionHistoryPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
      payload: value,
    });
  };

/**
 * @function toggleMedicalConditionViewState
 * @description action creator to toggle the view of medical condition assessmemt
 */
export const toggleMedicalConditionViewState =
  (isHistory: boolean, dateTime: string) => (dispatch: any) => {
    dispatch(showApplicationLoader());
    dispatch({
      type: TOGGLE_VIEW_STATE,
      payload: {
        isHistory: isHistory,
        dateTime: dateTime,
      },
    });
    dispatch(hideApplicationLoader());
  };

/**
 * @description fn to format the medical condition data
 * @function modifyMedicalConditionData
 * @param {IMedicalConditionData[]} currentData
 * @param {IMedicalConditionData[]} deletedData
 * @param {string[]} modifiedData
 * @returns {IMedicalConditionAPIFormat}
 */
export const formatMedicalConditionData = (
  type: AssessmentStatus,
  currentData: IMedicalConditionData[],
  deletedData: IMedicalConditionData[],
  modifiedData: string[],
): IMedicalConditionAPIFormat => {
  const removeModificationDate = (data: IMedicalConditionData) => {
    const newData = {
      ...data,
    };
    delete newData.modification_date;
    return {
      ...newData,
      resolved: !!data.resolved,
    };
  };
  const newData: IMedicalConditionAPIFormat = {
    addition: [],
    modification: [],
    deletion: [],
  };
  if (type === AssessmentStatus.Reset) {
    return newData;
  }
  currentData.forEach((condition) => {
    if (condition.modification_date) {
      // Modified Data
      const isModified = modifiedData.includes(condition.condition);
      const isPreviouslyResolved =
        condition.resolved === condition.modification_date;
      isModified &&
        !isPreviouslyResolved &&
        newData.modification.push(removeModificationDate(condition));
    } else {
      // Newly Added Data
      newData.addition.push(removeModificationDate(condition));
    }
  });
  newData.deletion = deletedData.map((data) => removeModificationDate(data));
  return newData;
};
