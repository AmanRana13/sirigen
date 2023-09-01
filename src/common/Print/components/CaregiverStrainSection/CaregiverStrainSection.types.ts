import {ICaregiverStrainAssessmentSurveyData} from 'pages/WCPages/Assessments/CaregiverStrainAssessment/CaregiverStrainAssessment.type';

export interface ICaregiverStrainSectionProps {
  data: ICaregiverStrainAssessmentSurveyData[];
  caregiverName: string;
}

export interface ICaregiverStrainStatsProps {
  data: ICaregiverStrainAssessmentSurveyData[];
}
