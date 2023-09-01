import {assessmentStates} from './Assessments.type';
import {
  GET_ASSESSMENT,
  RESET_ASSESSMENT,
  GET_ASSESSMENT_HISTORY_SUCCESS,
  UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
  TOGGLE_VIEW_STATE,
  TOGGLE_IS_COMPLETED,
  GET_LOADING_STATUS,
  SEARCH_RESULT_SUCCESS,
  RESET_SEARCH,
  SEARCH_RESULT_FAIL,
  GET_SEARCH_RESULT,
  UPDATE_ASSESSMENT_PAGE_NUMBER,
} from './Assessments.action';
import {
  RESET_ASSESSMENT_STATUS,
  UPDATE_ASSESSMENT_STATUS,
} from './AssessmentStatus/AssessmentStatus.action';
import {initialAssessmentStatus} from './AssessmentStatus/AssessmentStatus.types';

export const assessmentsReducer = (state = assessmentStates, action: any) => {
  switch (action.type) {
    case GET_LOADING_STATUS: {
      return {
        ...state,
        loading: !!action.payload,
      };
    }
    case GET_ASSESSMENT:
      return {
        ...state,
        surveys: action.payload.surveys,
        assessmentStatus: action.payload.assessmentStatus,
        assessmentId: action.payload.assessmentId || '',
        versionNumber: action.payload.versionNumber,
        dateTime: action.payload.dateTime,
        careAgentId: action.payload.careAgentId,
        offset: action.payload.offset,
      };
    case UPDATE_ASSESSMENT_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload || 1,
      };
    case RESET_ASSESSMENT:
      return {
        ...assessmentStates,
        assessmentStatuses: {
          ...state.assessmentStatuses,
        },
      };

    case GET_ASSESSMENT_HISTORY_SUCCESS: {
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
    case UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER: {
      return {
        ...state,
        history: {
          ...state.history,
          currentPage: action.payload,
        },
      };
    }
    case TOGGLE_VIEW_STATE: {
      return {
        ...state,
        isHistory: action.payload.isHistory,
        dateTime: action.payload.dateTime,
        caregiverId: action.payload.caregiverId || '',
      };
    }
    case TOGGLE_IS_COMPLETED: {
      return {
        ...state,
        isCompleted: action.payload.isCompleted,
      };
    }
    case GET_SEARCH_RESULT: {
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
      };
    }
    case SEARCH_RESULT_FAIL: {
      return {
        ...state,
        searchLoading: false,
      };
    }
    case RESET_SEARCH:
      return {
        ...state,
        searchResult: assessmentStates.searchResult,
      };

    case UPDATE_ASSESSMENT_STATUS: {
      return {
        ...state,
        assessmentStatuses: {
          ...state.assessmentStatuses,
          ...action.payload,
        },
      };
    }
    case RESET_ASSESSMENT_STATUS: {
      return {
        ...state,
        assessmentStatuses: initialAssessmentStatus,
      };
    }
    default:
      return state;
  }
};
