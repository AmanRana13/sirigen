import {ILawtonBrodyOptions} from 'pages/WCPages/Assessments/AdlAssessment/LawtonBrodyAssessment/LawtonBrodyAssessment.type';
import {IKatzADLAssessmentOptions} from 'services/assessmentService/ADLAssessmentService/katzService/KatzService.type';

export type adlOption = ILawtonBrodyOptions | IKatzADLAssessmentOptions;
export interface IADLSectionProps {
  title: string;
  options: adlOption[];
}
