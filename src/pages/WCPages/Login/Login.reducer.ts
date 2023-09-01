import {Roles} from 'globals/enums';
import {ROLES_CONFIG} from 'config/app.config';
import {
  CLOSE_TIMEOUT_MODEL,
  FETCHING_LOGIN_DETAILS,
  FETCHING_LOGIN_DETAILS_DONE,
  LOGOUT_USER,
  OPEN_TIMEOUT_MODEL,
  USER_LOGGED_IN,
} from './Login.types';

const INITIAL_STATE = {
  username: '',
  isAuthenticated: false,
  loading: false,
  sessionInterval: null,
  isTimeoutModel: false,
  userRole: [],
  roleConfig: {
    defaultPage: `/login`,
    defaultHomeRoute: '/login',
    accessLabel: '',
    isPusher: false,
    careInsightPrivileges: {
      isAlerts: false,
      isApproveAlert: false,
      isApproveSummary: false,
      isAlertActionNotification: false,
      isSummaryActionNotification: false,
      isAlarms: false,
      isCIRangeMilestoneNotification: false,
      isLocationData: false,
    },
  },
  userName: {
    first_name: '',
    last_name: '',
    middle_name: '',
  },
};

export const loginReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCHING_LOGIN_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case FETCHING_LOGIN_DETAILS_DONE:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case 'SET_SESSION_INTERVAL':
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem('userInfo');
      localStorage.removeItem('seniorInfo');
      return INITIAL_STATE;

    case OPEN_TIMEOUT_MODEL:
      return {
        ...state,
        isTimeoutModel: true,
      };

    case CLOSE_TIMEOUT_MODEL:
      return {
        ...state,
        isTimeoutModel: false,
      };

    case USER_LOGGED_IN: {
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};
