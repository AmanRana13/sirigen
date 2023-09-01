import {HolisticAssessmentAdminStatus} from 'globals/enums';
import {
  IHolisticAssessmentOptions,
  IHolisticAssessmentSurveyData,
} from 'pages/WCPages/Assessments/HolisticAssessment/HolisticAssessment.types';

export interface IGetHolisticAssessmentAdminResponse {
  form: IGetHolisticAssessmentAdminFormResponse[];
  created_by: string;
  options: IHolisticAssessmentOptions;
  form_status: HolisticAssessmentAdminStatus;
  version_number: number;
  updated_by: string;
  form_id: string;
  created_date: string;
  modification_date: string;
  publish_date_time: string | null;
  updated_by_name: string;
}

export interface IGetHolisticAssessmentAdminHistoryResponse {
  forms: IGetHolisticAssessmentAdminResponse[];
  last_evaluated_key: string | null;
}

interface IGetHolisticAssessmentAdminFormResponse {
  header: string;
  data: IHolisticAssessmentSurveyData[];
}
