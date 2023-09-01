import {convertDateInUTC} from 'globals/date.functions';
import {API_LOAD_STATE} from 'globals/global.constants';
import {
  GET_DASHBOARD_CARE_INSIGHT,
  GET_DASHBOARD_CARE_INSIGHT_FAIL,
  GET_DASHBOARD_CARE_INSIGHT_SUCCESS,
} from './components/CareInsights/CareInsights.action';
import {
  GET_WELLNESS_SURVEY,
  GET_WELLNESS_SURVEY_FAIL,
  GET_WELLNESS_SURVEY_SUCCESS,
  IS_DATE_ERROR,
  RESET_DATE_FILTER,
  RESET_WELLNESS_SURVEY,
  CLEAR_SURVEYS,
  UPDATE_TO_DATE,
  UPDATE_FROM_DATE,
  UPDATE_CURRENT_PAGE,
} from '../Assessments/Wellbieng/WellnessSurvey/WellnessSurvey.action';

const INITIAL_STATE = {
  wellnessSurvey: {
    allSurveys: [],
    surveyHeaders: [],
    loading: API_LOAD_STATE.NOT_LOADED,
    fromDate: '',
    toDate: new Date(),
    isDateError: false,
    lastEvaluatedKey: '',
    currentPage: 1,
  },
  careInsightHistory: {
    data: [],
    loading: false,
  },
};

/**
 * @description senior dashboard reducer
 * @returns wellness states
 */
export const seniorDashboardReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_WELLNESS_SURVEY:
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          loading: API_LOAD_STATE.PROGRESS,
        },
      };

    case GET_WELLNESS_SURVEY_SUCCESS:
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          loading: API_LOAD_STATE.SUCCESSFUL,
          allSurveys: action.payload.allSurveys,
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
        },
      };

    case GET_WELLNESS_SURVEY_FAIL:
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          loading: API_LOAD_STATE.ERROR,
        },
      };

    case UPDATE_TO_DATE: {
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          toDate: action.payload.date,
          isDateError: false,
        },
      };
    }

    case UPDATE_FROM_DATE: {
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          fromDate: convertDateInUTC(action.payload.date),
          isDateError: false,
        },
      };
    }

    case IS_DATE_ERROR: {
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          isDateError: action.payload,
        },
      };
    }

    case RESET_DATE_FILTER: {
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          fromDate: convertDateInUTC(action.payload.priorThirtyDayDate),
          toDate: new Date(),
          isDateError: false,
          allSurveys: [],
          lastEvaluatedKey: null,
        },
      };
    }

    case CLEAR_SURVEYS: {
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          allSurveys: [],
          lastEvaluatedKey: null,
        },
      };
    }

    case RESET_WELLNESS_SURVEY: {
      return {
        ...INITIAL_STATE,
      };
    }

    case UPDATE_CURRENT_PAGE: {
      return {
        ...state,
        wellnessSurvey: {
          ...state.wellnessSurvey,
          currentPage: action.payload,
        },
      };
    }

    case GET_DASHBOARD_CARE_INSIGHT: {
      return {
        ...state,
        careInsightHistory: {
          ...state.careInsightHistory,
          loading: true,
        },
      };
    }

    case GET_DASHBOARD_CARE_INSIGHT_SUCCESS: {
      return {
        ...state,
        careInsightHistory: {
          ...state.careInsightHistory,
          data: action.payload.data,
          loading: false,
        },
      };
    }

    case GET_DASHBOARD_CARE_INSIGHT_FAIL: {
      return {
        ...state,
        careInsightHistory: {
          ...state.careInsightHistory,
          loading: false,
        },
      };
    }

    default:
      return state;
  }
};
