import {
  IChallenge,
  IMemberPriority,
  IWellnessPlanDetail,
} from 'pages/WCPages/SeniorWellnessPlan/SeniorWellnessPlan.types';

export interface IWellnessPlanResponse {
  customer_id: string;
  customer_name: string;
  wellness_plan_date_started: string;
  last_updated_date: string;
  last_updated_by: string;
  careagent_id: string;
  last_version: string;
  last_available_version: number;
  current_version: string;
  wellness_plan_details: {
    situation: string;
    background: string;
    assessment: string;
    recommendations: string;
    member_priorities: IMemberPriorityResponse[];
    challenges: IChallengeResponse[];
  };
  created_date: string;
  modification_date: string;
  role?: string;
}

export interface IWellnessPlanData {
  wellnessPlanDetail: IWellnessPlanDetail;
  memberPriority: IMemberPriority[];
  challenges: IChallenge[];
  careagentId: string;
  createdDate: string;
  currentVersion: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  lastVersion: string;
  lastAvailableVersion: number;
  modificationDate: string;
  seniorId: string;
  seniorName: string;
  dateStarted: string;
  isLatestVersion: boolean;
}

export interface IMemberPriorityResponse {
  seq: number;
  value: string;
}

export interface IChallengeResponse {
  seq: number;
  value: string;
}
