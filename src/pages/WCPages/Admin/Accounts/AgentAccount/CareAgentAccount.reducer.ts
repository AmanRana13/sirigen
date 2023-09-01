import {
  END_PAGINATION,
  GET_CARE_AGENTS,
  RESET_CARE_AGENTS,
  RESET_PAGINATION,
} from './CareAgentAccount.actions';

const careAgentAccountInitialStates = {
  allCareAgentAccounts: null,
  isPaginate: true,
};

/**
 * @description admin careAgentAccount reducer
 * @returns care agent states
 */
export const careAgentAccountReducer = (
  state = careAgentAccountInitialStates,
  action: any,
) => {
  switch (action.type) {
    case GET_CARE_AGENTS: {
      return {
        ...state,
        allCareAgentAccounts: [
          ...(state?.allCareAgentAccounts || []),
          ...action.payload,
        ],
      };
    }
    case RESET_CARE_AGENTS: {
      return {
        ...state,
        allCareAgentAccounts: null,
      };
    }
    case RESET_PAGINATION: {
      return {...state, isPaginate: true};
    }
    case END_PAGINATION: {
      return {...state, isPaginate: false};
    }
    default: {
      return state;
    }
  }
};
