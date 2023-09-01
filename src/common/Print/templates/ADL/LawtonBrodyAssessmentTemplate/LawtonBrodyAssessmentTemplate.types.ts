import {ILawtonBrodyADLAssessmentSurveyData} from 'pages/WCPages/Assessments/AdlAssessment/LawtonBrodyAssessment/LawtonBrodyAssessment.type';

export interface ILawtonBrodySectionData {
  surveyName: string;
  surveyData: ILawtonBrodyADLAssessmentSurveyData;
}

export interface ILawtonBrodyAssessmentTemplateProps {
  data: ILawtonBrodySectionData[];
}
