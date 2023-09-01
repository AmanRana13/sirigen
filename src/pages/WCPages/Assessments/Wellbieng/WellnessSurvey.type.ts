import {AssessmentStatus} from 'globals/enums';
import {Dispatch, SetStateAction} from 'react';

export interface IGetFormDataParams {
  senior_id: string;
  account_id: string;
  limit: number;
  is_survey_completed: boolean;
  start_time: string;
  end_time: string;
  ascending: boolean;
}
export interface IPostWellnessSurvey {
  data: any;
  type: AssessmentStatus;
  versionNumber: string;
  seniorID: string;
  accountID: string;
  isAutoSave?: boolean;
  isUnMount?: boolean;
  historyData?: any;
  assessmentId?: string;
}
export interface IPostWellnesSurveyService {
  account_id: string;
  senior_id: string;
  careagent_id: string;
  form_version: string;
  survey_date: any;
  answer: any;
  is_survey_completed: boolean;
  is_reseted: boolean;
  survey_id?: string;
}
export interface IWellnessSurveyHistoryTableProps {
  historyTableData: any;
  handleSaveSubmit: (
    type: AssessmentStatus,
    isAutoSave: boolean,
    isUnMount: boolean,
    historyData: any,
  ) => void;
  isAssessmentDataUpdated: boolean;
}
export interface ISurveyData {
  measurement_name: string;
  value: string;
  comment: string;
}
export interface IWellnessSurveyTableProps {
  index: number;
  questionTitle: string;
  surveyData: ISurveyData;
  setTableData: (tableData: any) => void;
  disabled: boolean;
  formError: boolean;
}

export interface IWellnessSurveyProps {
  survey: any;
  surveyState: any;
  setSurveyState: Dispatch<SetStateAction<{}>>;
  checkIfFormFilled: () => boolean;
  surveyStateData: any;
  surveyCount: number;
}
