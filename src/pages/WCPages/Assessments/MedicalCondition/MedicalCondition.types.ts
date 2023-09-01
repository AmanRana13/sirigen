import {AssessmentStatus} from 'globals/enums';
export interface IMedicalConditionProps {
  heading: string;
}
export interface IMedicalConditionData {
  condition: string;
  severity_level: string | null;
  date_of_onset: string | null;
  notes: string | null;
  resolved: string;
  modification_date?: string;
}
export interface IMedicalConditionAPIData {
  condition: string;
  severity_level: string | null;
  date_of_onset: string | null;
  notes: string | null;
  resolved: boolean;
}
export interface IMedicalConditionSection {
  formError: boolean;
  setFormError: (formError: boolean) => void;
  medicalConditionData: IMedicalConditionData[];
  setMedicalConditionData: (medicalConditionData: any) => void;
  deletedMedicalConditions: any;
  setDeletedMedicalConditions: (medicalConditionData: any) => void;
  modifiedMedicalConditions: string[];
  setModifiedMedicalConditions: (medicalConditionData: any) => void;
  isAssessmentDataUpdated: boolean;
}
export interface IMedicalConditionTableProps {
  disabled: boolean;
  setError: (error: boolean) => void;
  data: IMedicalConditionData[];
  setMedicalConditionData: (
    medicalConditionData: IMedicalConditionData[],
  ) => void;
  setDeletedMedicalConditions: (
    medicalConditionData: IMedicalConditionData,
  ) => void;
  setModifiedMedicalConditions: (
    medicalConditionData: IMedicalConditionData,
  ) => void;
}
export interface IPostMedicalConditionActionParams {
  data: IMedicalConditionData[];
  type: AssessmentStatus;
  assessmentId: string;
  seniorID: string;
  careAgentName: any;
  isAutoSave?: boolean;
  deletedData?: IMedicalConditionData[];
  modifiedData?: string[];
}
export interface IGetMedicalConditionActionParams {
  senior_id: string;
  offset?: number;
  limit?: number;
  condition_id?: string;
}
export interface ISubmitMedicalCondition {
  type: AssessmentStatus;
  formError: boolean;
  data: IMedicalConditionData[];
  isAutoSave: boolean;
  assessmentId: string;
  seniorID: string;
  careAgentName: any;
  historyData?: any;
  isAssessmentDataUpdated?: boolean;
  isUnMount?: boolean;
  deletedData?: IMedicalConditionData[];
  modifiedData?: string[];
}

export interface IMedicalConditionAPIFormat {
  addition: IMedicalConditionAPIData[];
  modification: IMedicalConditionAPIData[];
  deletion: IMedicalConditionAPIData[];
}

export interface IPostMedicalConditionServiceParams {
  senior_id: string;
  current_user_name: string;
  medical_conditions: IMedicalConditionAPIFormat;
  status: AssessmentStatus;
  condition_id?: string;
}
