import {
    IHolisticAssessmentSurveyData
} from "pages/WCPages/Assessments/HolisticAssessment/HolisticAssessment.types";

export interface IHolisticSectionData {
    surveyName: string;
    surveyData: IHolisticAssessmentSurveyData[];
}

export interface IHolisicAssessmentTemplateProps {
    data: IHolisticSectionData[];
}