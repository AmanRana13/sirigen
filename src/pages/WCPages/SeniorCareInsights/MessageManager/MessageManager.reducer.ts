import {
  GET_INSIGHT_HISTORY,
  END_PAGINATION,
  RESET_INSIGHT_HISTORY,
  RESET_PAGINATION,
  UPDATE_SUBHISTORY,
  EXPAND_COLLAPSE_CARE_INSIGHT_HISTORY,
} from './MessageManager.action';

const INITIAL_STATE = {
  careInsightHistory: [],
  careInsightSubHistory: {},
  isPaginate: true,
};
const messageManagerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_INSIGHT_HISTORY: {
      return {
        ...state,
        careInsightHistory: [
          ...state.careInsightHistory,
          ...action.payload.careInsightHistory,
        ],
      };
    }
    case UPDATE_SUBHISTORY: {
      return {
        ...state,
        careInsightSubHistory: {
          ...state.careInsightSubHistory,
          ...action.payload.subHistoryData,
        },
      };
    }
    case RESET_INSIGHT_HISTORY: {
      return {
        ...state,
        careInsightHistory: INITIAL_STATE.careInsightHistory,
      };
    }
    case RESET_PAGINATION: {
      return {...state, isPaginate: true};
    }
    case END_PAGINATION: {
      return {...state, isPaginate: false};
    }
    case EXPAND_COLLAPSE_CARE_INSIGHT_HISTORY: {
      return {
        ...state,
        careInsightHistory: [...action.payload.careInsightHistory],
      };
    }
    
    default: {
      return state;
    }
  }
};

export default messageManagerReducer;
