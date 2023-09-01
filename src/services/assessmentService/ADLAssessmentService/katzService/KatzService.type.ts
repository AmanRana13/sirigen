import {AssessmentStatus} from 'globals/enums';
export interface IKatzADLAssessmentOptions {
  label: string;
  value: string;
  score: string;
}
export interface IKatzADLAssessmentSurveyResponse {
  title: string;
  options: IKatzADLAssessmentOptions[];
}
export interface IKatzADLAssessmentResponse {
  senior_id: string;
  assessment_status: AssessmentStatus;
  assessment_id?: string;
  care_agent_name: string;
  form: IKatzADLAssessmentSurveyResponse[];
  modification_date: string;
  options: IKatzADLAssessmentOptions;
  total_score: number;
  version: number;
  care_agent_id: string;
}
