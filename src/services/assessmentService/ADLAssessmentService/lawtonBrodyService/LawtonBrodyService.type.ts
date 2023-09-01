import {AssessmentStatus} from 'globals/enums';
export interface ILawtonBrodyADLAssessmentOptions {
  label: string;
  value: string;
  score: string;
}
export interface ILawtonBrodyADLAssessmentSurveyResponse {
  title: string;
  options: ILawtonBrodyADLAssessmentOptions[];
}
export interface ILawtonBrodyADLAssessmentResponse {
  senior_id: string;
  assessment_status: AssessmentStatus;
  assessment_id?: string;
  care_agent_name: string;
  form: ILawtonBrodyADLAssessmentSurveyResponse[];
  modification_date: string;
  options: ILawtonBrodyADLAssessmentOptions;
  total_score: number;
  version: number;
  care_agent_id: string;
}
