import {AssessmentStatus} from 'globals/enums';

export interface ICaregiverStrainAssessmentFormValue
  extends ICareGiverStrainAssessmentOptions {
  question: string;
  example: string;
}
export interface ICareGiverStrainAssessmentOptions {
  regular: number;
  no: number;
  sometimes: number;
}

export interface ICaregiverStrainAssessmentSurveyResponse {
  data: ICaregiverStrainAssessmentFormValue[];
}

export interface ICaregiverStrainAssessmentResponse {
  assessment_id: string;
  assessment_status: AssessmentStatus;
  form: ICaregiverStrainAssessmentSurveyResponse[];
  modification_date: string;
  options: ICareGiverStrainAssessmentOptions;
  senior_id: string;
  total_score: number;
  version: number;
  care_agent_id: string;
}
