import {AssessmentStatus} from 'globals/enums';
import {IAssessmentHistoryTableData} from '../AssessmentHistory.type';
export interface IHolisticTableData {
  assessmentId: string;
  careAgentId: string;
  date: string;
  formData: IHolisticAssessmentFormData[];
  time: string;
  totalScore: number;
}
export interface IHolisticHistoryTableProps {
  historyTableData: IHolisticTableData[];
  setSurveyCount: any;
  handleSaveSubmit: (
    type: AssessmentStatus,
    isAutoSave?: boolean,
    isUnMount?: boolean,
    historyData?: any,
  ) => void;
  resetAutoSave: () => void;
  isAssessmentDataUpdated: boolean;
}
export interface IHolisticAssessmentProps {
  heading: string;
}

export interface IGetHolisticAssessmentHistoryParam {
  senior_id: string;
}

export interface IHolisticAssessmentSurveyData {
  always: number;
  never: number;
  sometimes: number;
  question: string;
}

export interface IHolisticAssessmentSurvey {
  [value: string]: IHolisticAssessmentSurveyData[];
}

export interface IHolisticAssessmentSurveyCount {
  [value: string]: number;
}

export interface IIntiatlStateAssessment {
  hisory: IAssessmentHistoryTableData;
}

export interface IHolisticAssessmentFormData {
  header: string;
  data: IHolisticAssessmentSurveyData[];
}
export interface IHolisticAssessmentData {
  date: string;
  time: string;
  totalScore: number;
  formData: IHolisticAssessmentFormData[];
}
export interface IHolisticAssessmentHistory {
  data: IHolisticAssessmentData[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}
export interface IHolisticAssessmentStates {
  surveys: IHolisticAssessmentSurvey;
  assessmentId: string;
  history: IHolisticAssessmentHistory;
  isHistory: boolean;
  dateTime: string;
  isCompleted: boolean;
}

export const holisticAssessmentStates: IHolisticAssessmentStates = {
  surveys: {},
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
};

export interface IHolisticAssessmentOptions {
  always: number;
  never: number;
  sometimes: number;
}

export interface IPostHolisticAssessmentParams {
  senior_id: string;
  care_agent_id: string;
  created_by: string;
  assessment_status: string;
  assessment_score: IHolisticAssessmentSurveyCount;
  data: IHolisticAssessmentSurvey[];
  total_score: number;
  options: IHolisticAssessmentOptions;
  assessment_id?: string;
  version: number;
}
