import {AssessmentStatus} from 'globals/enums';

interface IHolisticAssessmentFormValue {
  always: number;
  never: number;
  sometimes: number;
  question: string;
}

export interface IHolisticAssessmentSurveyResponse {
  data: IHolisticAssessmentFormValue[];
  header: string;
}

export interface IHolisticAssessmentResponse {
  assessment_id: string;
  assessment_score: any;
  assessment_status: AssessmentStatus;
  care_agent_id: string;
  form: IHolisticAssessmentSurveyResponse[];
  modification_date: string;
  options: any;
  senior_id: string;
  total_score: number;
  version_number: number;
}
