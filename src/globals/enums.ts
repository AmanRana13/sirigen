/* eslint-disable no-unused-vars */
export enum VitalState {
  UNASSIGNED = 'unassigned',
  ASSIGNED = 'assigned',
  ACTIVE_INSIGHT = 'active_insight',
  DEACTIVATED = 'DEACTIVATED',
}

export enum EXISTING_VITALS {
  BodyWeight = 'body_weight',
  HeartRateMeasurement = 'heart_rate_measurement',
  BodyHydration = 'body_hydration',
  SleepScore = 'sleep_score',
  SleepDuration = 'sleep_duration',
  SleepDepth = 'sleep_depth',
  ActivityMeasurement = 'activity_measurement',
  ActivityScore = 'activity_score',
  WellnessSurvey = 'wellness_survey',
}

export enum ToastMessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export enum CareInsightTypes {
  Action = 'action',
  Attention = 'attention',
  Good_News = 'good_news',
  Summary = 'summary',
  Alert = 'alert',
  Facility_Summary = 'facility_summary',
}

export enum WellnessDashboardVitals {
  HeartRate = 'heart_rate',
  Hr_Variablity = 'hr_variablity',
  Body_Health = 'body_health',
  Activity = 'activity',
  Sleep = 'sleep',
}

export enum EventsType {
  Summary = 'summary',
  Alert = 'alert',
  SOS = 'sos',
  FALL = 'fall',
  CALL_ENTRY = 'call_entry',
  MILESTONE = 'milestone',
  RESOURCES = 'resources',
}

export enum LocateMePostAPIResponseType {
  Success = 200,
}

export enum APIMethod {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete',
}
export enum EventViewState {
  Maximize,
  Minimize,
  Approve, //display toast when CI sent for approval
  ActionNotification, //display noti on CI and highlight record when action performed on CI by admin
  Hide, // hide the CI
}

export enum CareInsightStatus {
  Approved = 'approved',
  New = 'new',
  Sent = 'sent',
  Abandoned = 'abandoned',
  NoAction = 'no_action',
  SentForApproval = 'sent_for_approval',
  ApprovedWithEdit = 'approved_with_edit',
  Denied = 'denied',
}

export enum PusherConnectionStatus {
  Disconnected = 'disconnected',
  Connected = 'connected',
}

export enum LocationStatus {
  AWAY,
  HOME,
  NO_LOCATION,
}

export enum GoogleMapAddressComponent {
  streetNumber = 'street_number',
  route = 'route',
  locality = 'locality',
  postalCode = 'postal_code',
  state = 'administrative_area_level_1',
}

export enum autoCompleteEvents {
  placeChanged = 'place_changed',
}

export enum Roles {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  CareAgent = 'careagent',
  Senior = 'senior',
  WarehouseEmployee = 'warehouse-employee',
  BDM = 'bdm',
}

export enum FontSize {
  LARGE = 'large',
  SMALL = 'small',
}

export enum GoalStatus {
  Started = 'started',
  Not_Started = 'not_started',
  In_Progress = 'in_progress',
  Cancelled = 'cancelled',
  Completed = 'completed',
  Deleted = 'deleted',
}

export enum AlarmType {
  SOS = 'sos',
  FALL = 'fall',
}

export enum AlarmStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  COMPLETED = 'completed',
}
export enum AssessmentStatus {
  Save = 'save',
  Submit = 'submit',
  Reset = 'reset',
  OK = 'OK',
  YES = 'Yes',
  NO = 'No',
}
export enum AssessmentName {
  CAREGIVER_STRAIN = 'caregiver-strain-assessment',
  HOLISTIC = 'holistic-assessment',
  KATZ_INDEPENDENCE = 'katz-independence',
  LAWTON_BRODY = 'lawton-brody',
  WELLNESS_SURVEY = 'wellness-survey',
  MEDICAL_CONDITION = 'medical-condition',
  MEDICATION_LIST = 'medication-list',
}
export enum Assessements {
  WELLNESS_SURVEY = 'Wellness Survey',
  HOLISTIC = 'Holistic assessment',
  CAREGIVER_STRAIN = 'Caregiver Strain assessment',
  KATZ_INDEPENDENCE = 'Katz-Index of Independence assessment',
  LAWTON_BRODY = 'Lawton-Brody assessment',
  MEDICAL_CONDITION = 'Medical Condition/ Disease',
}
export enum AssessmentButtonAction {
  Save = 'saved',
  Submit = 'submitted',
  Reset = 'reset',
}
export enum HolisticAssessmentAdminStatus {
  Save = 'save',
  Submit = 'submit',
  SubmitLater = 'submit_later',
  Reset = 'reset',
}

export enum CIRangeMilestones {
  Pending = 'pending',
  Completed = 'completed',
}

export enum ThresholdOperations {
  GT = 'gt',
  LT = 'lt',
  EQ = 'eq',
  GTE = 'gte',
  LTE = 'lte',
}

export enum CaregiverType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ALTERNATE = 'alternate',
}

export enum GetSeniorData {
  SENIOR = 'senior',
  CAREGIVER = 'caregiver',
  PROVIDER = 'provider',
  DEVICES = 'devices',
}
export enum CGAssessmentOptions {
  NO = 'no',
  REGULAR = 'regular',
  SOMETIMES = 'sometimes',
}
export enum OnboardingTab {
  PROFILE_INFO = 'profile-info',
  PROVIDER_INFO = 'provider-info',
  MEDICAL_INFO = 'medical-info',
  CARE_CIRCLE = 'care-circle',
  DEVICES = 'devices',
  SURVEY = 'survey',
}

export enum GraphView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export enum ThemeVersion {
  v1,
  v2,
}

export enum Float {
  Right = 'right',
  Left = 'left',
}
export enum ResourceFormats {
  URL = 'url',
  PDF = 'pdf',
}

export enum PrintTemplates {
  HOLISTIC = 'holistic-assessment',
  LAWTON = 'lawton-brody',
  KATZ = 'katz-independence',
  CAREGIVER_STRAIN = 'caregiver-strain-assessment',
  MEDICAL_CONDITION = 'medical-condition',
}

export enum PreviewTemplates {
  MEDICAL_CONDITION = 'medical-condition',
}

export enum DeviceType {
  WATCH = 'watch',
  SLEEP = 'sleep',
  SCALE = 'scale',
  WITHINGS_HUB = 'withings_hub',
}

export enum TableSelectionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  NONE = 'none',
  ROW = 'row',
}

export enum SelectAllStatus {
  NONE = 'none',
  SOME = 'some',
  ALL = 'all',
}

export enum ProviderTypes {
  DOCTOR = 'doctor',
  DENTIST = 'dentist',
  PHARMACY = 'pharmacy',
}

export enum AvatarVariants {
  CIRCULAR = 'circular',
  ROUNDED = 'rounded',
  SQUARE = 'square',
}

export enum ShiftTypes {
  DAY = 'day',
  EVENING = 'evening',
  OVERNIGHT = 'overnight',
}

export enum AssessmentStatuses {
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
  DUE = 'due',
}

export enum SecretsKeys {
  GOOGLE_MAP_API_KEY = 'GOOGLE_MAP_API_KEY',
  PUSHER_CHANNEL_KEY = 'PUSHER_CHANNEL_KEY',
  PUSHER_CHANNEL_CLUSTER = 'PUSHER_CHANNEL_CLUSTER',
}

export enum PaginationFetchTypes {
  LAST_EVALUATED_KEY = 'LAST_EVALUATED_KEY',
  OFFSET = 'OFFSET',
}

export enum PAGINATION_TYPE {
  PRIMARY,
  SECONDARY,
}

export enum ZoneType {
  WHITE = 'White',
  BLUE = 'Blue',
  GREEN = 'Green',
  VIMIENT = 'Vimient',
}

export enum ZoneColor {
  zoneWhite = 'zoneWhite',
  zoneBlue = 'zoneBlue',
  zoneGreen = 'zoneGreen',
  zoneVimient = 'zoneVimient',
}

export enum ACTIVITY_CARD_VARIANT {
  MODERATE = 'MODERATE',
  INTENSE = 'INTENSE',
  ACTIVITY = 'ACTIVITY',
}

export enum PRIMARY_COLOR {
  BLUE = 'BLUE',
  GREEN = 'GREEN',
}

export enum DASHBOARD_VITALS_TYPE {
  WELLNESS = 'Wellness',
  ACTIVITY = 'Activity',
  SLEEP = 'Sleep',
  HEALTH = 'Health',
  WELLBEING = 'Wellbeing',
}

export enum HEART_RATE_CONDITION {
  NO_DATA = 'No_Data',
  HIGH = 'High',
  GOOD = 'Good',
  LOW = 'Low',
}

export enum ACTIVITY_CONDITION {
  NO_DATA = 'No_Data',
  GOOD = 'Good',
  CONCERN = 'Concern',
}

export enum WELLNESS_CONDITION {
  NO_DATA = 'No_Data',
  CONCERN = 'Concern',
  POSITIVE = 'Positive',
  GOOD = 'good',
}

export enum SLEEP_CONDITION {
  NO_DATA = 'No_Data',
  GOOD = 'Good',
  AVERAGE = 'Average',
  POOR = 'Poor',
}

export enum WEIGHT_CONDITION {
  NO_DATA = 'No_Data',
  NO_CHANGE = 'No_Change',
  INCREASE = 'Increase',
  DECREASE = 'Decrease',
}

export enum VITAL_CONDITION_CLASSNAME {
  GREY = 'verbiageGrey',
  RED = 'verbiageRed',
  GREEN = 'verbiageGreen',
  YELLOW = 'verbiageYellow',
}

export enum VITAL_CONDITION_CLASSNAMES {
  No_Data = VITAL_CONDITION_CLASSNAME.GREY,
  No_Change = VITAL_CONDITION_CLASSNAME.GREY,
  High = VITAL_CONDITION_CLASSNAME.RED,
  Good = VITAL_CONDITION_CLASSNAME.GREEN,
  Low = VITAL_CONDITION_CLASSNAME.RED,
  Concern = VITAL_CONDITION_CLASSNAME.YELLOW,
  Poor = VITAL_CONDITION_CLASSNAME.RED,
  Increase = VITAL_CONDITION_CLASSNAME.RED,
  Decrease = VITAL_CONDITION_CLASSNAME.GREEN,
  Average = VITAL_CONDITION_CLASSNAME.GREEN,
  Positive = VITAL_CONDITION_CLASSNAME.GREEN,
  good = VITAL_CONDITION_CLASSNAME.YELLOW,
}
