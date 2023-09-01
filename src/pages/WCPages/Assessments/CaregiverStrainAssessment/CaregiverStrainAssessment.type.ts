import {capitalizeFirstLetter} from 'globals/global.functions';
import {AssessmentStatus} from 'globals/enums';

/**
 * @function getCaregiverName
 * @description to get caregiver name with the help of caregiverId and caregiverList
 * @param {string} caregiverId
 * @param {ICaregiverListItems[]}caregiverList
 * @returns
 */
export const getCaregiverName = (
  caregiverId: string,
  caregiverList: ICaregiverListItems[],
) => {
  if (caregiverId && caregiverList) {
    const caregiver: any = caregiverList?.find(
      (item: ICaregiverListItems) => item.id === caregiverId,
    );
    const caregiverName = `${capitalizeFirstLetter(
      caregiver?.name.firstName,
    )} ${capitalizeFirstLetter(caregiver?.name.lastName)}`;
    return caregiverName;
  }
  return '';
};

export interface IFormData {
  example: string | undefined;
  no: number;
  question: string;
  regular: number;
  sometimes: number;
}
export interface IHistoryTableData {
  assessmentId: string;
  careAgentId: string;
  caregiverId: string;
  caregiverName: string;
  date: string;
  formData: IFormData[];
  time: string;
  totalScore: number;
}
export interface ICaregiverStrainHistoryTableProps {
  historyTableData: IHistoryTableData[];
  surveyState: ICaregiverStrainAssessmentSurveyData[] | null;
  caregiverList: ICaregiverListItems[];
  handleSaveSubmit: (
    type: AssessmentStatus | undefined,
    isAutoSave: boolean,
    isUnMount?: boolean,
    historyData?: any,
  ) => void;
  resetAutoSave: () => void;
  isAssessmentDataUpdated: boolean;
}
export interface ICaregiverStrainAssessmentProps {
  heading: string;
}

export interface IGetCaregiverStrainAssessmentParam {
  senior_id: string;
}
export interface IGetCaregiverStrainAssessmentFilledFormParam {
  senior_id: string;
  caregiver_id: string;
  last_evaluated_key?: string;
}
export interface ICaregiverStrainAssessmentSurveyData
  extends ICareGiverStrainAssessmentOptions {
  question: string;
  example?: string;
}
export interface ICareGiverStrainAssessmentOptions {
  regular: number;
  no: number;
  sometimes: number;
}
export interface ICaregiverStraiAssessmentFormData {
  data: ICaregiverStrainAssessmentSurveyData[];
}
export interface ICaregiverStrainAssessmentData {
  id: string;
  date: string;
  time: string;
  totalScore: number;
  scorePercent: number;
  caregiverId: string;
  assessmentId: string;
  caregiverName: string;
  formData: ICaregiverStraiAssessmentFormData[];
}
export interface IPostCaregiverActionParams {
  survey: ICaregiverStrainAssessmentSurveyData[];
  caregiverName: string;
  caregiverId: string;
  type: AssessmentStatus;
  totalScore: number;
  versionNumber: number;
  seniorID: string;
  assessmentId?: string;
  isAutoSave?: boolean;
  isUnMount?: boolean;
  historyData?: any;
}

export interface IPostCareGiverStrainAssessmentParams {
  senior_id: string;
  caregiver_id: string;
  caregiver_name: string;
  assessment_status: string;
  data: ICaregiverStrainAssessmentSurveyData[];
  total_score: number;
  options: ICareGiverStrainAssessmentOptions;
  assessment_id?: string;
  version: number;
}
export interface ICaregiverStrainAssessmentHistory {
  data: ICaregiverStrainAssessmentData[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}
export interface ICaregiverStrainAssessmentStates {
  surveys: ICaregiverStrainAssessmentSurveyData[];
  assessmentId: string;
  history: ICaregiverStrainAssessmentHistory;
  isHistory: boolean;
  dateTime: string;
  isCompleted: boolean;
  loading: boolean;
  caregiverId: string;
  assessmentStatus: string;
  lastSavedDateTime: string;
  careAgentId: string;
}

export interface ICountTableProps {
  responses: ICareGiverStrainAssessmentOptions;
  totalScore: number;
  maximumScore: number;
  isCaregiverSelected: string;
}
export interface IAssessmentTableProps {
  tableData: ICaregiverStrainAssessmentSurveyData[];
  setTableData: (tableData: ICaregiverStrainAssessmentSurveyData[]) => void;
  formError: boolean;
  isHistory: boolean;
  setResponses: (response: IResponseInCountTable) => void;
  isCaregiverSelected: string;
  isLoading: boolean;
}
export interface IResponseInCountTable {
  no: number;
  sometimes: number;
  regular: number;
}
export interface ICaregiverName {
  firstName: string;
  lastName: string;
  middleName: string;
}
export interface ICaregiverListItems {
  alternateNumber: string;
  caregiverType: string;
  emergencyContact: boolean;
  id: string;
  mobileNumber: string;
  name: ICaregiverName;
}
export interface ICountTableRows {
  rowHeader: string;
  column1: number;
  column2: number;
  column3: number;
}

export const caregiverStrainAssessmentStates: ICaregiverStrainAssessmentStates = {
  surveys: [],
  loading: false,
  caregiverId: '',
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
  lastSavedDateTime: '',
  careAgentId: '',
};
