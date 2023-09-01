import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {
  DIALOG_TYPES,
  ERROR_MESSAGE,
  PAGINATION_LIMIT,
} from 'globals/global.constants';
import {
  getMedicationListService,
  postMedicationListService,
  searchMedicationService,
} from 'services/assessmentService/medicationService/medicationService';
import {
  closeDialog,
  openDialog,
  openOverlayDialog,
  showError,
  getPaginationDataIsolated,
} from 'store/commonReducer/common.action';
import {
  IMedicationData,
  IMedicationListDetailProps,
  IPostMedicationActionParams,
  IPostMedicationParams,
} from './MedicationList.types';
import {AssessmentStatus} from 'globals/enums';
import {getCurrentSenior} from 'globals/global.functions';
import {getAssessmentStatus} from '../AssessmentStatus/AssessmentStatus.action';

export const GET_MEDICATION_LIST = 'GET_MEDICATION_LIST';
export const GET_MEDICATION_LIST_SUCCESS = 'GET_MEDICATION_LIST_SUCCESS';
export const GET_MEDICATION_LIST_FAIL = 'GET_MEDICATION_LIST_FAIL';
export const UPDATE_MEDICATION_LIST_PAGE_NUMBER =
  'UPDATE_MEDICATION_LIST_PAGE_NUMBER';
export const GET_MEDICINE_SEARCH_RESULT = 'GET_MEDICINE_SEARCH_RESULT';
export const SEARCH_RESULT_SUCCESS = 'SEARCH_RESULT_SUCCESS';
export const SEARCH_RESULT_FAIL = 'SEARCH_RESULT_FAIL';
export const RESET_SEARCH = 'RESET_SEARCH';
export const MEDICATION_TOGGLE_IS_COMPLETED = 'MEDICATION_TOGGLE_IS_COMPLETED';
export const SET_MEDICATION_DIALOG_DATA = 'SET_MEDICATION_DIALOG_DATA';
export const EMPTY_MEDICATION_DIALOG_DATA = 'EMPTY_MEDICATION_DIALOG_DATA';
export const RESET_MEDICATION_DATA = 'RESET_MEDICATION_DATA';

/**
 * @description action creator to open Medication dialog
 * @function openMedicationDialog
 * @returns void
 */
export const openMedicationDialog =
  ({medicationData, dialogTitle}: any) =>
  async (dispatch: any) => {
    dispatch(
      openDialog({
        type: DIALOG_TYPES.MEDICATION,
        dialogTitle: dialogTitle,
        data: medicationData,
      }),
    );
  };

/**
 * @description action creator to fetch Medication Data
 * @function getMedicationData
 * @returns pagination data
 */
export const getMedicationData = () => async (dispatch: any) => {
  dispatch(showApplicationLoader('', false));
  try {
    const {seniorID} = getCurrentSenior();
    const response = await getMedicationListService({senior_id: seniorID});
    dispatch(hideApplicationLoader());
    return {
      data: response.data,
    };
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

/**
 * @function getMedicationDataSuccess
 * @description action creator to store assessment history table data
 * @param tableData
 */
export const getMedicationDataSuccess =
  (tableData: IMedicationListDetailProps) => (dispatch: any) => {
    const {data} = tableData;

    dispatch({
      type: GET_MEDICATION_LIST_SUCCESS,
      payload: {
        data,
      },
    });
  };

/**
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getMedicationFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));
  dispatch({
    type: GET_MEDICATION_LIST_FAIL,
  });
};

/**
 * @function updateMedicationPageNumber
 * @description action creator to update the page number medication list
 * @param {string | number} value
 */
export const updateMedicationPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({type: UPDATE_MEDICATION_LIST_PAGE_NUMBER, payload: value});
  };

/**
 * @function postMedicationData
 * @description action creator to update medication data
 */
export const postMedicationData =
  ({data, status, seniorID, medicationID = ''}: IPostMedicationActionParams) =>
  async (dispatch: any) => {
    dispatch(showApplicationLoader('', false));
    const params: IPostMedicationParams = {
      senior_id: seniorID,
      status: status,
      medicine: data?.medicationName,
      dose_form: data?.doseForm,
      dose_frequency: {
        every: data?.doseFrequencyTime,
        period: data?.doseFrequencyUnit,
      },
      when: data?.whenDoTheyTakeIt,
      date_prescribed: data?.datePrescribed,
      date_discontinued: data?.dateDiscontinued,
      pharmacy_name: data?.pharmacyName,
      pharmacy_phone_number: data?.pharmacyPhone,
      notes: data?.notes,
    };

    if (medicationID) {
      params.medication_id = medicationID;
    }
    try {
      await postMedicationListService(params);
      //set form as complete
      dispatch({
        type: MEDICATION_TOGGLE_IS_COMPLETED,
        payload: {isCompleted: true},
      });
      // Updating global AssessmentStatus
      dispatch(getAssessmentStatus());
      dispatch(
        getPaginationDataIsolated(
          () => getMedicationData(),
          PAGINATION_LIMIT.medication,
          '',
          1,
          getMedicationDataSuccess,
          getMedicationFail,
          '',
          '',
        ),
      );

      dispatch(hideApplicationLoader());
      if (status === AssessmentStatus.Submit) {
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.SUCCESS,
            firstMessage: 'Medication has been submitted successfully',
          }),
        );
      }
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function searchMedication
 * @discription to get list of auto suggetion on search for any medication
 * @param {string} value
 * @returns
 */
export const searchMedication = (value: string) => async (dispatch: any) => {
  const param = {
    medicine: value,
  };
  try {
    dispatch({type: GET_MEDICINE_SEARCH_RESULT});
    const response = await searchMedicationService(param);
    dispatch({type: SEARCH_RESULT_SUCCESS, payload: response});
  } catch (error) {
    dispatch({type: SEARCH_RESULT_FAIL, payload: ERROR_MESSAGE.SEARCH_ERROR});
  }
};

/**
 * @function checkAndSaveMedicationDialog
 * @discription to save and close medication dialog
 * @returns
 */
export const checkAndSaveMedicationDialog =
  (data: IMedicationData) => async (dispatch: any) => {
    const {seniorID} = getCurrentSenior();
    const param: any = {
      data: data,
      status: AssessmentStatus.Save,
      seniorID: seniorID,
      medicationID: data.medicationID,
    };

    if (data?.medicationName) {
      dispatch(postMedicationData(param));
    }
    dispatch(closeDialog());
    dispatch(emptyMedicationDialogData());
  };

/**
 * @function setMedicationDialogData
 * @discription to set medication dialog data
 * @returns
 */
export const setMedicationDialogData =
  (data: IMedicationData) => async (dispatch: any) => {
    dispatch({
      type: SET_MEDICATION_DIALOG_DATA,
      payload: data,
    });
  };

/**
 * @function emptyMedicationDialogData
 * @discription to empty medication dialog data
 * @returns void
 */
export const emptyMedicationDialogData = () => async (dispatch: any) => {
  dispatch({
    type: EMPTY_MEDICATION_DIALOG_DATA,
  });
};

/**
 * @function resetAllMedicationData
 * @discription to reset all the medication data for a senior
 * @returns void
 */
export const resetAllMedicationData = () => async (dispatch: any) => {
  dispatch({
    type: RESET_MEDICATION_DATA,
  });
};
