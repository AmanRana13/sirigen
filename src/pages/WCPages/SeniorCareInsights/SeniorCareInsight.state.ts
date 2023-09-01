import {IName} from './../../../common/UserName/UserName.types';
import {CareInsightStatus, EXISTING_VITALS} from './../../../globals/enums';
import {CareInsightTypes} from 'globals/enums';

export interface IGetInsightsPayload {
  senior_id: string;
  account_id: string;
  start_timestamp: number | string;
  end_timestamp: number | string;
  insight_type?: CareInsightTypes;
  vital_type?: string;
  status?: any;
  event_list?: [];
  desc?: boolean;
}

export interface ICareInsightRange {
  goodUpper: number;
  goodLower: number;
}

export interface ICareInsightHistory {
  dateGenerated: number | undefined;
  dateUpdated: number | undefined;
  status: CareInsightStatus;
  agent: string;
  vitalSign: EXISTING_VITALS;
  type: CareInsightTypes;
  message: string;
  variable: string;
  range: ICareInsightRange;
  careInsightId: string;
  reading: number;
  vitalLabel: string;
  meassurementUnit: string;
  seniorId: string;
  accountId: string;
  seniorName: IName;
}

export interface IGetCareInsightTransactionPayload {
  senior_id: string;
  care_insight_id: string;
}

export const INITIAL_STATE = {
  thresholds: {
    vitals: {
      active: [],
      inactive: [],
    },
    //@need to store whole object from API
    selectedVital: null,
  },
};
