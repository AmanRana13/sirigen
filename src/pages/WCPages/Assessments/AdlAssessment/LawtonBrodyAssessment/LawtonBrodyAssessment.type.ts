import {AssessmentStatus} from 'globals/enums';

export interface ICareAgentName {
  first_name: string;
  last_name: string;
}
export interface IGetLawtonBrodyADLAssessmentParam {
  senior_id: string;
  last_evaluated_key?: string;
}
export interface ILawtonBrodyADLAssessmentSurveyData {
  title: string;
  options: ILawtonBrodyOptions[];
}
export interface ILawtonBrodyOptions {
  label: string;
  value: string;
  score: string;
}
export interface ILawtonBrodyAssessmentFormData {
  data: ILawtonBrodyADLAssessmentSurveyData[];
}
export interface ILawtonBrodyAssessmentData {
  assessmentId: string;
  date: string;
  time: string;
  totalScore: number;
  careAgentName: string;
  formData: ILawtonBrodyAssessmentFormData[];
}
export interface IPostLawtonBrodyActionParams {
  survey: ILawtonBrodyADLAssessmentSurveyData[];
  type: AssessmentStatus;
  totalScore: number;
  versionNumber: number;
  seniorID: string;
  assessmentId?: string;
  isUnMount?: boolean;
  isAutoSave?: boolean;
  historyData?: any;
}
export interface IPostLawtonBrodyADLAssessmentParams {
  senior_id: string;
  assessment_status: string;
  care_agent_name: string;
  data: ILawtonBrodyADLAssessmentSurveyData[];
  total_score: number;
  assessment_id?: string;
  version: number;
}
export interface ILawtonBrodyAssessmentHistory {
  data: ILawtonBrodyAssessmentData[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}
export interface ILawtonBrodyAssessmentStates {
  surveys: ILawtonBrodyADLAssessmentSurveyData[];
  assessmentId: string;
  history: ILawtonBrodyAssessmentHistory;
  isHistory: boolean;
  dateTime: string;
  isCompleted: boolean;
  loading: boolean;
  assessmentStatus: string;
  careAgentId: string;
}

export interface IAssessmentTableProps {
  tableData: ILawtonBrodyADLAssessmentSurveyData[];
  setTableData: (tableData: ILawtonBrodyADLAssessmentSurveyData[]) => void;
  formError: boolean;
  isHistory: boolean;
  isLoading: boolean;
}

export interface ILawtonAssessmentHistoryTableProps {
  historyTableData: any;
  handleSaveSubmit: (
    type: AssessmentStatus,
    isAutoSave: boolean,
    isUnMount: boolean,
    historyData: any,
  ) => void;
  isAssessmentDataUpdated: boolean;
}
export const LawtonBrodyAssessmentStates: ILawtonBrodyAssessmentStates = {
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
