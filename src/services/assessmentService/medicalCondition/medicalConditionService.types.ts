export interface IMedicalConditionAssessmentFormValue {
  condition: string;
  severity_level: string;
  date_of_onset: string;
  resolved: string;
  notes: string;
  modification_date?: string;
}

export interface IMedicalConditionAssessmentSurveyResponse {
  data: IMedicalConditionAssessmentFormValue[];
}

export interface IMedicalConditionAssessmentResponse {
  senior_id: string;
  medical_conditions: IMedicalConditionAssessmentFormValue[];
  status: string;
  condition_id: string;
  last_updated_by: string;
  last_updated_by_name: string;
  version: number;
  created_date: string;
  modification_date: string;
}
export interface IGetMedicalConditionAssessmentHistoryParam {
  senior_id: string;
  assessment_id?: string;
}

export interface ISearchMedicalConditionParam {
  medical_condition: string;
}
