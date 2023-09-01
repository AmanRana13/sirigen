import {
    IKatzADLAssessmentSurveyData
} from "pages/WCPages/Assessments/AdlAssessment/KatzAssessment/KatzAssessment.type";

export interface IKatzADLSectionData {
    surveyName: string;
    surveyData: IKatzADLAssessmentSurveyData;
}

export interface IKatzADLAssessmentTemplateProps {
    data: IKatzADLSectionData[];
}