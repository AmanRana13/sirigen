import {
  EventsType,
  EventViewState,
  CareInsightStatus,
} from './../../globals/enums';

export interface ICareInsightDataType {
  fullName: string;
  seniorId: string;
  startDate: string;
  endDate: string;
  careInsightHistory: any;
  eventType: EventsType;
  viewState: EventViewState;
  message: string;
  accountId: string;
  seniorTimezone: string | undefined;
  eventId: string;
  isResident?: boolean;
}
export interface ISosFallDetectionDataType {
  fullName: string;
  seniorId: string;
  eventType: EventsType;
  viewState: EventViewState;
  accountId: string;
  seniorTimezone: string | undefined;
  eventId: string;
  alarmId: string;
  startTime: number | undefined;
  alarmStatus: string;
  lastAlertTime: any;
  lastCallTime: any;
}

export interface ISummaryDataType extends ICareInsightDataType {}
export interface ISosDataType extends ISosFallDetectionDataType {
  alertType?: string;
  position?: any;
  detailList?: any;
}

export interface IAlertDataType extends ICareInsightDataType {
  alertId: string;
  detailList: any;
  dateGenerated: string;
  position?: any;
}

export interface ICreateMilestoneDataParams {
  seniorId: string;
  modificationDate: string;
  eventType: EventsType;
  viewState: EventViewState;
  vitalSign: string;
  vitalLabel: string;
  milestone: number;
  eventId: string;
}
export interface ICIRangeMilestoneDataType {
  seniorId: string;
  modificationDate: string;
  eventType: EventsType;
  viewState: EventViewState;
  vitalSign: string;
  vitalLabel: string;
  milestone: number;
  eventId: string;
}

export interface IMilestoneDataType extends ICIRangeMilestoneDataType {}

export interface ISummaryEvent {
  [eventId: string]: ISummaryDataType;
}

export interface IAlertEvent {
  [eventId: string]: IAlertDataType;
}

export interface IMilestoneEvent {
  [eventId: string]: IMilestoneDataType;
}

export interface ISosEvent {
  [eventId: string]: ISosDataType;
}

export interface IEventsInitialState {
  [event: string]: ISummaryEvent | any;
  summary: ISummaryEvent;
  alert: IAlertEvent;
  sos: {};
  fallDetection: {};
}

export interface IEventsAction {
  type: string;
  payload?: any;
}

export interface ICareInsightUpdateStatusPayload {
  care_insight_ids: string[];
  updated_by: string;
  status: CareInsightStatus;
}

export const intialStateEvents: IEventsInitialState = {
  summary: {},
  alert: {},
  milestone: {},
  sos: {},
  fallDetection: {},
  isRenderLocation: true,
};
