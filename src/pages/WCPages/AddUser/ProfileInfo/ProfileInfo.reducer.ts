import {
  UNIQUE_EMAIL_ID,
  UNIQUE_EMPLOYEE_ID,
  UNIQUE_NUMBER,
  RESET_VALIDATION,
} from './ProfileInfo.action';

const INITIAL_STATE = {
  isEmailExists: null,
  isPhoneExists: null,
  errorEmailMessage: '',
  errorNumberMessage: '',
};

export const validateDataReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UNIQUE_EMAIL_ID:
      return {
        ...state,
        isEmailExists: action.payload.data,
        errorEmailMessage: action.payload.message,
      };
    case UNIQUE_EMPLOYEE_ID:
      return {
        ...state,
        isEmpIdExists: action.payload.data,
        errorEmpIdMessage: action.payload.message,
      };
    case UNIQUE_NUMBER:
      return {
        ...state,
        isPhoneExists: action.payload.data,
        errorNumberMessage: action.payload.message,
      };
    case RESET_VALIDATION:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
