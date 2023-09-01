import {
  GET_ACTIVE_VITALS,
  GET_INACTIVE_VITALS,
  UPDATE_VITALS,
  SET_SELECTED_VITALS,
  GET_VITALS_SUCCESS,
  REMOVE_SELECTED_VITAL,
} from './ThresholdSettings/Threshold.action';

import {INITIAL_STATE} from './SeniorCareInsight.state';

const seniorCareInsightsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_ACTIVE_VITALS: {
      return state.thresholds.vitals.active;
    }
    case GET_INACTIVE_VITALS: {
      return state.thresholds.vitals.inactive;
    }

    case GET_VITALS_SUCCESS: {
      return {
        ...state,
        thresholds: {
          ...state.thresholds,
          vitals: {
            ...state.thresholds.vitals,
            active: action.payload.active,
            inactive: action.payload.inactive,
          },
        },
      };
    }

    case UPDATE_VITALS: {
      return {
        ...state,
        thresholds: {
          ...state.thresholds,
          vitals: {
            ...state.thresholds.vitals,
            active: [...action.payload.active],
            inactive: [...action.payload.inactive],
          },
        },
      };
    }
    case SET_SELECTED_VITALS: {
      return {
        ...state,
        thresholds: {
          ...state.thresholds,
          vitals: {
            ...state.thresholds.vitals,
            active: [...action.payload.active],
          },
          selectedVital: action.payload.selectedItem,
        },
      };
    }

    case REMOVE_SELECTED_VITAL: {
      return {
        ...state,
        thresholds: {
          ...state.thresholds,
          selectedVital: INITIAL_STATE.thresholds.selectedVital,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default seniorCareInsightsReducer;
