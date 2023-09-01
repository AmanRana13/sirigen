import {CareInsightStatus} from 'globals/enums';

export interface IGetCareInsightReviewsPayload {
  offset: number;
  limit: number;
  status?: any;
  desc?: boolean;
}

export interface IUpdateCareInsightStatusParams {
  careInsightId: string;
  status: CareInsightStatus;
  message: string;
  updated_by: string;
}
