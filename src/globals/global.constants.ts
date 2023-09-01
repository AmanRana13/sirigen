import {CareInsightTypes} from './enums';
import {
  IAssessmentScore,
  ICGAssessmentResponseValues,
  IDefaultCareAgentData,
  IResidentSubRoute,
} from './global.constantsTypes';

export const CALL_TYPES = [
  {
    key: 'Senior Onboarding',
    value: 'Senior Onboarding',
  },
  {
    key: 'Caregiver Onboarding',
    value: 'Caregiver Onboarding',
  },
  {
    key: 'Senior Check-in',
    value: 'Senior Check-in',
  },
  {
    key: 'Caregiver Check-in',
    value: 'Caregiver Check-in',
  },
  {
    key: 'Return Call',
    value: 'Return Call',
  },
  {
    key: 'Facility follow-up',
    value: 'Facility follow-up',
  },
  {
    key: 'Fall Detected',
    value: 'Fall Detected',
  },
  {
    key: 'SOS',
    value: 'SOS',
  },
  {
    key: 'Care Coordination',
    value: 'Care Coordination',
  },
  {
    key: 'Care Insight Notification',
    value: 'Care Insight Notification',
  },
  {
    key: 'Other',
    value: 'Other',
  },
];

export const TEN_SECONDS = 1000 * 10; //10 sec in milliseconds
export const IDLE_USER_TIMEOUT = 1000 * 60 * 60 * 24 * 5; //5 days in milliseconds
// export const IDLE_USER_TIMEOUT = 1000 * 60 * 10 //10min in milliseconds

export const DEFAULT_AUTO_SAVE_TIMEOUT = 1000 * 60; //60 seconds

export const LOCAL_STORAGE_KEY = {
  AUTO_SAVE_TIMER: 'autoSaveTimer',
};

export const CACHE_EVENTS_AUTO_LOGOUT = {
  REQUESTING_SESSION: 'REQUESTING_SESSION',
  SESSION_SHARING: 'SESSION_SHARING',
  SESSION_FLUSH: 'SESSION_FLUSH',
  RELOAD_SESSION: 'RELOAD_SESSION',
};

export const USER_INFO_KEY = 'userInfo';
export const USER_SESSION_KEY = 'isUser';
export const LOGOUT_MESSAGE = 'User logged out successfully!';
export const SESSION_EXPIRED_MESSAGE =
  'User logged out due to session expired!';
export const AUTO_LOGOUT_MESSAGE = 'User logged out due to inactivity';

export const API_DATA_LIMIT = 100;
export const TABLE_ROWS_PER_PAGE = 20;

export const TABLE_CACHE_KEY = {
  CALL_LOGS: 'callLogs',
  WELLNESS_SURVEY: 'wellnessSurvey',
  GOALS: 'goals',
};

export const API_LOAD_STATE = Object.freeze({
  NOT_LOADED: 0,
  PROGRESS: 1,
  SUCCESSFUL: 2,
  ERROR: 3,
});

export const MEASUREMENT_TYPE = Object.freeze({
  WELLNESS_SURVEY: 'wellness_survey',
  SLEEP: 'sleep',
});

export const ERROR_STATUS = Object.freeze({
  UNAUTHORIZED: '401',
});

export const DATE_FORMAT = 'MM/DD/YYYY';
export const DATE_FORMAT_SHORT = 'MM/DD';
export const DATE_FORMAT_SHORT_YEAR = 'MM/DD/YY';
export const DATE_FORMAT_YEAR = 'YYYY-MM-DD';
//need to convert in object
export const TIME_FORMAT = 'hh:mm A';

export const DEVICE_TYPE = Object.freeze({
  WATCH: 'watch',
});

export const US_STATES_WITH_VALUE = [
  {value: 'AL', label: 'AL'},
  {value: 'AK', label: 'AK'},
  {value: 'AS', label: 'AS'},
  {value: 'AZ', label: 'AZ'},
  {value: 'AR', label: 'AR'},
  {value: 'CA', label: 'CA'},
  {value: 'CO', label: 'CO'},
  {value: 'CT', label: 'CT'},
  {value: 'DE', label: 'DE'},
  {value: 'DC', label: 'DC'},
  {value: 'FM', label: 'FM'},
  {value: 'FL', label: 'FL'},
  {value: 'GA', label: 'GA'},
  {value: 'GU', label: 'GU'},
  {value: 'HI', label: 'HI'},
  {value: 'ID', label: 'ID'},
  {value: 'IL', label: 'IL'},
  {value: 'IN', label: 'IN'},
  {value: 'IA', label: 'IA'},
  {value: 'KS', label: 'KS'},
  {value: 'KY', label: 'KY'},
  {value: 'LA', label: 'LA'},
  {value: 'ME', label: 'ME'},
  {value: 'MH', label: 'MH'},
  {value: 'MD', label: 'MD'},
  {value: 'MA', label: 'MA'},
  {value: 'MI', label: 'MI'},
  {value: 'MN', label: 'MN'},
  {value: 'MS', label: 'MS'},
  {value: 'MO', label: 'MO'},
  {value: 'MT', label: 'MT'},
  {value: 'NE', label: 'NE'},
  {value: 'NV', label: 'NV'},
  {value: 'NH', label: 'NH'},
  {value: 'NJ', label: 'NJ'},
  {value: 'NM', label: 'NM'},
  {value: 'NY', label: 'NY'},
  {value: 'NC', label: 'NC'},
  {value: 'ND', label: 'ND'},
  {value: 'MP', label: 'MP'},
  {value: 'OH', label: 'OH'},
  {value: 'OK', label: 'OK'},
  {value: 'OR', label: 'OR'},
  {value: 'PW', label: 'PW'},
  {value: 'PA', label: 'PA'},
  {value: 'PR', label: 'PR'},
  {value: 'RI', label: 'RI'},
  {value: 'SC', label: 'SC'},
  {value: 'SD', label: 'SD'},
  {value: 'TN', label: 'TN'},
  {value: 'TX', label: 'TX'},
  {value: 'UT', label: 'UT'},
  {value: 'VT', label: 'VT'},
  {value: 'VI', label: 'VI'},
  {value: 'VA', label: 'VA'},
  {value: 'WA', label: 'WA'},
  {value: 'WV', label: 'WV'},
  {value: 'WI', label: 'WI'},
  {value: 'WY', label: 'WY'},
];

export const US_STATES = [
  'AL',
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const US_STATE_MAPPINGS = [
  {name: 'ALABAMA', abbreviation: 'AL'},
  {name: 'ALASKA', abbreviation: 'AK'},
  {name: 'AMERICAN SAMOA', abbreviation: 'AS'},
  {name: 'ARIZONA', abbreviation: 'AZ'},
  {name: 'ARKANSAS', abbreviation: 'AR'},
  {name: 'CALIFORNIA', abbreviation: 'CA'},
  {name: 'COLORADO', abbreviation: 'CO'},
  {name: 'CONNECTICUT', abbreviation: 'CT'},
  {name: 'DELAWARE', abbreviation: 'DE'},
  {name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
  {name: 'FLORIDA', abbreviation: 'FL'},
  {name: 'GEORGIA', abbreviation: 'GA'},
  {name: 'GUAM', abbreviation: 'GU'},
  {name: 'HAWAII', abbreviation: 'HI'},
  {name: 'IDAHO', abbreviation: 'ID'},
  {name: 'ILLINOIS', abbreviation: 'IL'},
  {name: 'INDIANA', abbreviation: 'IN'},
  {name: 'IOWA', abbreviation: 'IA'},
  {name: 'KANSAS', abbreviation: 'KS'},
  {name: 'KENTUCKY', abbreviation: 'KY'},
  {name: 'LOUISIANA', abbreviation: 'LA'},
  {name: 'MAINE', abbreviation: 'ME'},
  {name: 'MARYLAND', abbreviation: 'MD'},
  {name: 'MASSACHUSETTS', abbreviation: 'MA'},
  {name: 'MICHIGAN', abbreviation: 'MI'},
  {name: 'MINNESOTA', abbreviation: 'MN'},
  {name: 'MISSISSIPPI', abbreviation: 'MS'},
  {name: 'MISSOURI', abbreviation: 'MO'},
  {name: 'MONTANA', abbreviation: 'MT'},
  {name: 'NEBRASKA', abbreviation: 'NE'},
  {name: 'NEVADA', abbreviation: 'NV'},
  {name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
  {name: 'NEW JERSEY', abbreviation: 'NJ'},
  {name: 'NEW MEXICO', abbreviation: 'NM'},
  {name: 'NEW YORK', abbreviation: 'NY'},
  {name: 'NORTH CAROLINA', abbreviation: 'NC'},
  {name: 'NORTH DAKOTA', abbreviation: 'ND'},
  {name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
  {name: 'OHIO', abbreviation: 'OH'},
  {name: 'OKLAHOMA', abbreviation: 'OK'},
  {name: 'OREGON', abbreviation: 'OR'},
  {name: 'PENNSYLVANIA', abbreviation: 'PA'},
  {name: 'PUERTO RICO', abbreviation: 'PR'},
  {name: 'RHODE ISLAND', abbreviation: 'RI'},
  {name: 'SOUTH CAROLINA', abbreviation: 'SC'},
  {name: 'SOUTH DAKOTA', abbreviation: 'SD'},
  {name: 'TENNESSEE', abbreviation: 'TN'},
  {name: 'TEXAS', abbreviation: 'TX'},
  {name: 'UTAH', abbreviation: 'UT'},
  {name: 'VERMONT', abbreviation: 'VT'},
  {name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
  {name: 'VIRGINIA', abbreviation: 'VA'},
  {name: 'WASHINGTON', abbreviation: 'WA'},
  {name: 'WEST VIRGINIA', abbreviation: 'WV'},
  {name: 'WISCONSIN', abbreviation: 'WI'},
  {name: 'WYOMING', abbreviation: 'WY'},
];

export enum DIALOG_TYPES {
  LIMIT = 'LIMIT',
  MESSAGE_ACTION_DIALOG = 'MESSAGE_ACTION_DIALOG',
  DAILY_RECAP = 'DAILY_RECAP',
  ADD_AGENT = 'ADD_AGENT',
  ADMIN_ACTION_DIALOG = 'ADMIN_ACTION_DIALOG',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  ERROR2 = 'ERROR2',
  CALL_ENTRY = 'CALL_ENTRY',
  RESOURCES = 'RESOURCES',
  MEDICATION = 'MEDICATION',
  ASSIGN_WELLNESS_COACH = 'ASSIGN_WELLNESS_COACH',
  UNASSIGN_SENIORS = 'UNASSIGN_SENIORS',
  CORPORATE = 'CORPORATE',
  FACILITY = 'FACILITY',
}

export const IMAGE_LIMIT_EXCEED_MESSAGE =
  "You cannot select more than 10 senior's photos.";

export const IMAGE_TYPES = ['image/png', 'image/jpeg'];

export const INVALID_IMAGE_FORMAT = 'Invalid image format.';
export const INVALID_DATE = 'Invalid Date';
export const INVALID_TIME = 'Invalid Time';

export const DATE_ERROR_MESSAGE = {
  maxDateMessage: '“From” date cannot be greater than “To” date',
  minDateMessage: '“To” date cannot be less than “From” date',
  futureDateDisable: 'Date cannot be greater than today',
  beforeOnboarding: 'Date should not be before onboarding date',
  goals: {
    startDate: 'Date cannot be greater than “Target date”',
    targetDate: 'Date cannot be less than “Start date”',
  },
  emailIdAlreadyExist: 'Email id is already in use',
};

export const REGEX = Object.freeze({
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  ONLY_NUMBER_ONE_DEC: /^(\d)+(\.)?([0-9]{1})?$/gim,
  URL: /^https?:\/\//i,
  BLANK_FIELD: /^(?=.*\S)/g,
  ONLY_ALPHABETS: /^\s*[a-zA-Z]+\s*$/,
});

export const FORM_ERROR_MESSAGES = {
  blankFieldErrorMessage: 'Required Field',
};
export const EXISTING_APP_VITALS = [
  'body_weight',
  'heart_rate_measurement',
  'body_hydration',
  'sleep_score',
  'sleep_duration',
  'sleep_depth',
  'activity_measurement',
  'activity_score',
];

//FE pagination limit
export const PAGINATION_LIMIT = {
  messageManager: 15,
  adminAgentAccount: 15,
  adminCareInsightReview: 15,
  goals: 6,
  assessmentHistory: 6,
  adminCIRangeMilestones: 10,
  homeSenior: 100,
  medication: 5,
  seniorCoachAssignment: 15,
  wellnessCoachUnassignList: 14,
  wellnessCoachList: 9,
  medicalCondition: 10,
  corporateAndFacilities: 10,
  wellbiengSurvey: 20
};

//Record API limit
export const FETCH_LIMIT = {
  medicalCondition: 100,
  corporateAndFacilities: 10,
};

export const CHARACTERS_LIMIT = {
  searchMedication: 25,
};

export const MAX_RECORDS_LIMIT = {
  medication: 15,
};

export const APPLICATION_EVENTS: any = Object.freeze({
  summary: {
    label: 'Summary',
    summarMessageCharCount: 2000,
  },
  alert: {
    label: 'Alert',
    alertMessageCharCount: 2000,
  },
  sos: {
    label: 'SOS',
    shortLabel: 'SOS',
  },
  fall: {
    label: 'Fall Detection',
    shortLabel: 'Fall',
  },
  call_entry: {
    label: 'Call Entry',
  },
  medicalAssessment: {
    medicalAssessmentNotesCharCount: 500,
  },
  wellnessSurvey: {
    wellnessSurveyNotesCharCount: 500,
  },
  medication: {
    medicationCharCount: 500,
  },
});

export const TOAST_MESSAGES = Object.freeze({
  POST_CARE_INSIGHT_SUMMARY: {
    SUCCESS: 'Summary message submitted successfully.',
    FAIL: 'Failed to submit summary message.',
  },
  GET_ALL_CARE_INSIGHT: {
    FAIL: 'Failed to fetch exisisting events data.',
  },
});

export const LOCATION = {
  RADIUS_MEASUREMENT: {
    FEET: 'feet',
    MILE: 'mile',
  },
};

export const EVENT_NODE_NAME = {
  HTML: 'HTML',
};

export const DEFAULT_CARE_AGENT_DATA: IDefaultCareAgentData = {
  email: '',
  accessToken: '',
  refreshToken: '',
  userName: {middle_name: '', first_name: '', last_name: ''},
  userId: '',
  userRole: [],
};

export const ERROR_MESSAGE = {
  REQUIRED_FIELD: 'Required Field',
  INVALID_EMAIL: 'Invalid email address',
  SEARCH_ERROR: 'Results could not be fetched. Please try again',
};

export const timezoneAbbrsFullname: any = {
  GMT: 'Greenwich Mean Time',
  UTC: 'Universal Coordinated Time',
  ECT: 'European Central Time',
  EET: 'Eastern European Time',
  ART: '(Arabic) Egypt Standard Time',
  EAT: 'Eastern African Time',
  MET: 'Middle East Time',
  NET: 'Near East Time',
  PLT: 'Pakistan Lahore Time',
  IST: 'Indian Standard Time',
  BST: 'Bangladesh Standard Time',
  VST: 'Vietnam Standard Time',
  CTT: 'China Taiwan Time',
  JST: 'Japan Standard Time',
  ACT: 'Australia Central Time',
  AET: 'Australia Eastern Time',
  SST: 'Solomon Standard Time',
  NST: 'New Zealand Standard Time',
  MIT: 'Midway Islands Time',
  HST: 'Hawaii Standard Time',
  AST: 'Alaska Standard Time',
  PST: 'Pacific Standard Time',
  PNT: 'Phoenix Standard Time',
  MST: 'Mountain Standard Time',
  CST: 'Central Standard Time',
  EST: 'Eastern Standard Time',
  IET: 'Indiana Eastern Standard Time',
  PRT: 'Puerto Rico and US Virgin Islands Time',
  CNT: 'Canada Newfoundland Time',
  AGT: 'Argentina Standard Time',
  BET: 'Brazil Eastern Time',
  CAT: 'Central African Time',
};

export const LocationLocateMeError = {
  locationNotFetched: 'Location could not be fetched, please try again.',
  deviceNotReachable: 'Device not reachable, please try later.',
};

export const ZINDEX = {
  ACTION_ERROR: 9999,
  SOS: 5000,
  FALL: 4000,
  CALL_ENTRY: 3000,
  ALERT: 2000,
  SUMMARY: 1000,
};

export const AdminNotificationsLabels: any = Object.freeze({
  alert: 'You have a new Care insight Alert',
  summary: 'You have a new Care insight Summary',
  milestone: 'You have a new CI Range Milestone',
});

export const SEARCH_MINIMUM_CHAR_COUNT = 2;

export const delayInMilliSeconds = {
  SOS_FALL: 1300,
};
export const intervalInSeconds = {
  SOS_FALL: 120,
};
export const CGAssessmentResponseValues: ICGAssessmentResponseValues = {
  No: 0,
  Sometimes: 1,
  Regular: 2,
};
export const assessmentScore: IAssessmentScore = {
  Selected: 1,
  NotSelected: 0,
};

export const ALERT_MESSAGES = Object.freeze({
  autoSaveLogout:
    'Changes that you made are not saved. Please save the form before logging out.',
});

export const resourcesConfig = {
  MAX_TOTAL_COUNT: 10,
  MAX_URL_COUNT: 10,
  FILE_SIZE_IN_MB: 15,
};

export const activityGoalOptions = new Array(10)
  .fill(0)
  .map((v: any, i: number) => ({
    label: `${(i + 1) * 5000}`,
    value: (i + 1) * 5000,
  }));

export const summaryTypeLabel: any = {
  [CareInsightTypes.Summary]: 'Caregiver Summary',
  [CareInsightTypes.Facility_Summary]: 'Facility Summary',
};

export const facilitySlugs = {
  facilityManagement: 'facility-management',
  facilityDashboard: 'facilityDashboard',
  facilityResident: 'facilityResident',
  residentDashboard: 'seniorID',
  accountID: 'accountID',
  timezone: 'timezone',
  senior: 'senior',
  subRoute: 'subRoute',
};

export const residentSubPages: Record<string, IResidentSubRoute> = {
  wellnessData: {
    path: 'wellness-data',
    title: 'Resident Wellness Data',
    value: 'Wellness Data',
  },
  location: {
    path: 'location',
    title: 'Resident Location',
    value: 'Location',
  },
};
