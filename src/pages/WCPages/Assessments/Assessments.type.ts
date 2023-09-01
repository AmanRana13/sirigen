import {AssessmentStatus, AssessmentStatuses} from 'globals/enums';
import {
  IInitialAssessmentStatus,
  initialAssessmentStatus,
} from './AssessmentStatus/AssessmentStatus.types';

export interface IAssessmentActionButtons {
  isHistory: boolean;
  handleClose: () => void;
  handleReset: () => void;
  handleSaveSubmit: (type: AssessmentStatus) => void;
  disabled?: boolean;
  buttonText?: string;
  disableSave?: boolean;
}

export interface IPanelListSubOptions {
  name: string;
  label: string;
  route: string;
  isDisabled: boolean;
  status: AssessmentStatuses;
}
export interface IPanelList {
  name: string;
  label: string;
  isDisabled: boolean;
  status: AssessmentStatuses;
  route?: string;
  isSelected?: boolean;
  subOptions?: IPanelListSubOptions[];
}

export interface IAssessmentData {
  assessmentId?: string;
  date: string;
  time: string;
  totalScore: number;
  careAgentName?: string;
  formData: any[];
}
export interface IAssessmentHistory {
  data: IAssessmentData[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}
export interface IAssessmentStates {
  surveys: any;
  caregiverId?: string;
  assessmentId: string;
  assessmentStatus: string;
  history: IAssessmentHistory;
  searchResult: string[];
  isHistory: boolean;
  dateTime: string;
  isCompleted: boolean;
  loading?: boolean;
  searchLoading: boolean;
  assessmentStatuses: IInitialAssessmentStatus;
  offset?: number;
  currentPage?: number;
}

export const assessmentStates: IAssessmentStates = {
  surveys: null,
  loading: false,
  searchLoading: false,
  assessmentId: '',
  assessmentStatus: '',
  searchResult: [],
  caregiverId: '',
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
  assessmentStatuses: initialAssessmentStatus,
  offset: 0,
  currentPage: 1,
};
