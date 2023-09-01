import {AssessmentStatus} from 'globals/enums';

export interface ICareAgentName {
  first_name: string;
  last_name: string;
}
export interface IGetKatzADLAssessmentParam {
  senior_id: string;
  last_evaluated_key?: string;
}
export interface IKatzADLAssessmentSurveyData {
  title: string;
  options: IKatzOptions[];
}
export interface IKatzOptions {
  label: string;
  value: string;
  score: string;
}
export interface IKatzAssessmentFormData {
  data: IKatzADLAssessmentSurveyData[];
}
export interface IKatzAssessmentData {
  assessmentId: string;
  date: string;
  time: string;
  totalScore: number;
  careAgentName: string;
  formData: IKatzAssessmentFormData[];
}
export interface IPostKatzActionParams {
  survey: IKatzADLAssessmentSurveyData[];
  type: AssessmentStatus;
  totalScore: number;
  versionNumber: number;
  isUnMount: boolean;
  seniorID: string;
  assessmentId?: string;
  isAutoSave?: boolean;
  historyData?: any;
}
export interface IPostKatzADLAssessmentParams {
  senior_id: string;
  assessment_status: string;
  care_agent_name: string;
  data: IKatzADLAssessmentSurveyData[];
  total_score: number;
  assessment_id?: string;
  version: number;
}
export interface IKatzAssessmentHistory {
  data: IKatzAssessmentData[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}
export interface IKatzAssessmentStates {
  surveys: IKatzADLAssessmentSurveyData[];
  assessmentId: string;
  history: IKatzAssessmentHistory;
  isHistory: boolean;
  dateTime: string;
  isCompleted: boolean;
  loading: boolean;
  assessmentStatus: string;
  careAgentId: string;
}

export interface IAssessmentTableProps {
  tableData: IKatzADLAssessmentSurveyData[];
  setTableData: (tableData: IKatzADLAssessmentSurveyData[]) => void;
  formError: boolean;
  isHistory: boolean;
  isLoading: boolean;
}

export interface IKatzAssessmentHistoryTableProps {
  historyTableData: any;
  handleSaveSubmit: (
    type: AssessmentStatus,
    isAutoSave: boolean,
    isUnMount: boolean,
    historyData?: any,
  ) => void;
  isAssessmentDataUpdated: boolean;
}
export const KatzAssessmentStates: IKatzAssessmentStates = {
  surveys: [],
  loading: false,
  assessmentId: '',
  history: {
    data: [],
    lastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
  },
  isHistory: false,
  dateTime: '',
  isCompleted: true,
  assessmentStatus: '',
  careAgentId: '',
};
