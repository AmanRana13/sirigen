import {
  GET_WELLNESS_PLAN,
  RESET_WELLNESS_PLAN,
} from './SeniorWellnessPlan.action';

export const INITIAL_STATE = {
  wellnessPlanDetail: {
    situation: {error: false, errorText: '', value: ''},
    background: {error: false, errorText: '', value: ''},
    assessment: {error: false, errorText: '', value: ''},
    recommendation: {error: false, errorText: '', value: ''},
  },
  memberPriority: [
    {
      seq: 1,
      value: '',
      error: false,
      errorText: '',
    },
  ],
  challenges: [
    {
      seq: 1,
      value: '',
      error: false,
      errorText: '',
    },
  ],
  dateStarted: '',
  careagentId: '',
  createdDate: '',
  currentVersion: '',
  lastUpdatedBy: '',
  lastUpdatedDate: '',
  lastVersion: '',
  modificationDate: '',
  seniorId: '',
  seniorName: '',
  lastAvailableVersion: 0,
  isLatestVersion: true,
};

export const wellnessPlanReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_WELLNESS_PLAN:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_WELLNESS_PLAN:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
