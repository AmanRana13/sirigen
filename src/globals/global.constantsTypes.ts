import {Roles} from './enums';

interface IUserName {
  middle_name: string;
  first_name: string;
  last_name: string;
}

export interface IDefaultCareAgentData {
  email: string;
  accessToken: string;
  refreshToken: string;
  userName: IUserName;
  userId: string;
  userRole: Roles[];
}
export interface ICGAssessmentResponseValues {
  No: number;
  Sometimes: number;
  Regular: number;
}
export interface IAssessmentScore {
  Selected: number;
  NotSelected: number;
}

export interface IResidentSubRoute {
  path: string;
  title: string;
  value: string;
}
