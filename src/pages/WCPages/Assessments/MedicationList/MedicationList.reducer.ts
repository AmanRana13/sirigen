import {
  GET_MEDICATION_LIST_SUCCESS,
  UPDATE_MEDICATION_LIST_PAGE_NUMBER,
  GET_MEDICINE_SEARCH_RESULT,
  SEARCH_RESULT_SUCCESS,
  SEARCH_RESULT_FAIL,
  RESET_SEARCH,
  MEDICATION_TOGGLE_IS_COMPLETED,
  SET_MEDICATION_DIALOG_DATA,
  EMPTY_MEDICATION_DIALOG_DATA,
  RESET_MEDICATION_DATA,
} from './MedicationList.action';

export const INITIAL_STATE = {
  data: [],
  lastEvaluatedKey: '',
  loading: false,
  totalRows: 0,
  currentPage: 1,
  searchResult: [],
  searchLoading: false,
  errorMessage: '',
  isCompleted: true,
  medicationDialogData: [],
};

export const medicationListReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_MEDICATION_LIST_SUCCESS: {
      return {
        ...state,
        data: [...action.payload.data],
        lastEvaluatedKey: action.payload.lastEvaluatedKey,
        loading: false,
      };
    }
    case UPDATE_MEDICATION_LIST_PAGE_NUMBER: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case GET_MEDICINE_SEARCH_RESULT: {
      return {
        ...state,
        searchLoading: true,
      };
    }
    case SEARCH_RESULT_SUCCESS: {
      return {
        ...state,
        searchResult: action.payload,
        searchLoading: false,
        errorMessage: INITIAL_STATE.errorMessage,
      };
    }
    case SEARCH_RESULT_FAIL: {
      return {
        ...state,
        searchLoading: false,
        errorMessage: action.payload,
      };
    }
    case RESET_SEARCH:
      return {
        ...state,
        searchResult: INITIAL_STATE.searchResult,
        errorMessage: INITIAL_STATE.errorMessage,
      };
    case MEDICATION_TOGGLE_IS_COMPLETED: {
      return {
        ...state,
        isCompleted: action.payload.isCompleted,
      };
    }
    case SET_MEDICATION_DIALOG_DATA: {
      return {
        ...state,
        medicationDialogData: action.payload,
      };
    }
    case EMPTY_MEDICATION_DIALOG_DATA: {
      return {
        ...state,
        medicationDialogData: INITIAL_STATE.medicationDialogData,
      };
    }
    case RESET_MEDICATION_DATA: {
      return {
        data: [],
        lastEvaluatedKey: '',
        loading: false,
        totalRows: 0,
        currentPage: 1,
        searchResult: [],
        searchLoading: false,
        errorMessage: '',
        isCompleted: true,
        medicationDialogData: [],
      };
    }
    default:
      return state;
  }
};
