export interface ICIMilestoneNotificationData
  extends ICIMilestoneNotificationDataType {
  eventId: string;
}

export interface ICIMilestoneNotificationDataType {
  created_date: string;
  last_submitted: string;
  measurement_type: string;
  milestone: number;
  milestone_ordinal: number;
  modification_date: string;
  senior_id: string;
  status: string;
}

export interface IMilestoneNotificationData {
  createdDate: string;
  lastSubmitted: string;
  vitalSign: string;
  vitalLabel: string;
  measurementUnit: string;
  milestone: number;
  milestoneOrdinal: number;
  modificationDate: string;
  seniorId: string;
  status: string;
  eventId: string;
}

export interface IGetCIRangeMilestonesParams {
  status: string;
  last_evaluated_key?: string;
}

export interface ICIRangeMilestonesAction {
  type: string;
  payload?: any;
}

export interface ICIRangeMilstoneServicedata {
  data: ICIRangeMilestones[];
  lastEvaluatedKey: string;
}

export interface ISeniorName {
  firstName: string;
  middleName: string;
  lastName: string;
}
export interface ICIRangeMilestones {
  seniorID: string;
  accountID: string;
  seniorName: ISeniorName;
  cIType: string;
  milestoneDateAndTime: string;
  milestone: number;
  submittedDate: string;
  timezone: string;
  status: string;
}

export interface IInitialCIRangeMilestonesState {
  data: ICIRangeMilestones[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}

const openState: IInitialCIRangeMilestonesState = {
  data: [],
  lastEvaluatedKey: '',
  loading: false,
  totalRows: 0,
  currentPage: 1,
};

const completedState: IInitialCIRangeMilestonesState = {
  data: [],
  lastEvaluatedKey: '',
  loading: false,
  totalRows: 0,
  currentPage: 1,
};
export const initialCIRangeMilestonesStates = {
  open: openState,
  completed: completedState,
};
