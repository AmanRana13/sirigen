import {IMedicalConditionAssessmentFormValue} from '../medicalConditionService.types';

/**
 * @class MedicalConditionModel
 * @description class to maintain the medical condition assessment  model
 */
class MedicalConditionModel {
  dateTime: string;
  surveys: IMedicalConditionAssessmentFormValue[];
  assessmentStatus: string;
  versionNumber: number;
  assessmentId: string;
  careAgentId: string;

  constructor(
    dateTime: string,
    surveys: IMedicalConditionAssessmentFormValue[],
    assessmentStatus: string,
    versionNumber: number,
    assessmentId: string,
    careAgentId: string,
  ) {
    this.dateTime = dateTime;
    this.surveys = surveys;
    this.assessmentStatus = assessmentStatus;
    this.versionNumber = versionNumber;
    this.assessmentId = assessmentId;
    this.careAgentId = careAgentId;
  }
}

export default MedicalConditionModel;
