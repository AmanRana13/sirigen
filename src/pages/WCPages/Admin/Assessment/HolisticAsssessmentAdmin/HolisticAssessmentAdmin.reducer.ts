import {
  GET_HOLISTIC_ASSESSMENT_ADMIN,
  GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_SUCCESS,
  TOGGLE_HOLISTIC_ADMIN_VIEW_STATE,
  UPDATE_ASSESSMENT_HISTORY_ADMIN_PAGE_NUMBER,
} from './HolisticAssessmentAdmin.action';

export const INITIAL_STATE = {
  survey: [],
  versionNumber: 1,
  formId: '',
  formStatus: '',
  history: {
    data: [],
    lastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
  },
  isHistory: false,
};

export const holisticAssessmentAdminReducer = (
  state = INITIAL_STATE,
  action: any,
) => {
  switch (action.type) {
    case GET_HOLISTIC_ASSESSMENT_ADMIN:
      return {
        ...state,
        survey: [...action.payload.survey],
        versionNumber: action.payload.versionNumber,
        formId: action.payload.formId,
        formStatus: action.payload.formStatus,
        publishDateTime: action.payload.publishDateTime,
      };

    case GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_SUCCESS: {
      return {
        ...state,
        history: {
          ...state.history,
          data: [...action.payload.data],
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          loading: false,
        },
      };
    }
    case UPDATE_ASSESSMENT_HISTORY_ADMIN_PAGE_NUMBER: {
      return {
        ...state,
        history: {
          ...state.history,
          currentPage: action.payload,
        },
      };
    }
    case TOGGLE_HOLISTIC_ADMIN_VIEW_STATE: {
      return {
        ...state,
        isHistory: action.payload.isHistory,
      };
    }

    default:
      return state;
  }
};
