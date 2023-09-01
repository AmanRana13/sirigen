import {
  RESET_CI_RANGE_MILESTONES,
  GET_COMPLETED_CI_RANGE_MILESTONES_SUCCESS,
  GET_OPEN_CI_RANGE_MILESTONES_SUCCESS,
  GET_OPEN_CI_RANGE_MILESTONES_FAIL,
  GET_COMPLETED_CI_RANGE_MILESTONES_FAIL,
  UPDATE_OPEN_CI_RANGE_MILESTONES_PAGE_NUMBER,
  UPDATE_COMPLETED_CI_RANGE_MILESTONES_PAGE_NUMBER,
} from './CIRangeMilestones.action';
import {
  ICIRangeMilestonesAction,
  initialCIRangeMilestonesStates,
} from './CIRangeMilestones.types';

/**
 * @description admin cIRangeMilestones reducer
 * @returns care insight range milestones states
 */
export const cIRangeMilestonesReducer = (
  state = initialCIRangeMilestonesStates,
  action: ICIRangeMilestonesAction,
) => {
  switch (action.type) {
    case UPDATE_OPEN_CI_RANGE_MILESTONES_PAGE_NUMBER: {
      return {
        ...state,
        open: {
          ...state.open,
          currentPage: action.payload,
        },
      };
    }
    case UPDATE_COMPLETED_CI_RANGE_MILESTONES_PAGE_NUMBER: {
      return {
        ...state,
        completed: {
          ...state.completed,
          currentPage: action.payload,
        },
      };
    }
    case GET_OPEN_CI_RANGE_MILESTONES_SUCCESS: {
      return {
        ...state,
        open: {
          ...state.open,
          data: [...action.payload.data],
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          loading: false,
        },
      };
    }
    case GET_COMPLETED_CI_RANGE_MILESTONES_SUCCESS: {
      return {
        ...state,
        completed: {
          ...state.completed,
          data: [...action.payload.data],
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          loading: false,
        },
      };
    }
    case GET_OPEN_CI_RANGE_MILESTONES_FAIL: {
      return {
        ...state,
        open: {...state.open, loading: false},
      };
    }
    case GET_COMPLETED_CI_RANGE_MILESTONES_FAIL: {
      return {
        ...state,
        completed: {...state.completed, loading: false},
      };
    }
    case RESET_CI_RANGE_MILESTONES: {
      return {
        ...initialCIRangeMilestonesStates,
      };
    }
    default: {
      return state;
    }
  }
};
