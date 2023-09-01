/**
 * @class AssessmentHistoryModel
 * @description class to maintain the assessment history model
 */
class AssessmentHistoryModel {
  date: string;
  time: string;
  totalScore: number;
  scorePercent: number;
  caregiverName: string;
  caregiverId: string;
  formData: any;
  assessmentId: string;
  careAgentId: string;

  constructor(
    date: string,
    time: string,
    totalScore: number,
    scorePercent: number,
    caregiverName: string,
    caregiverId: string,
    form: any,
    assessmentId: string,
    careAgentId: string,
  ) {
    this.date = date;
    this.time = time;
    this.totalScore = totalScore;
    this.scorePercent = scorePercent;
    this.caregiverName = caregiverName;
    this.caregiverId = caregiverId;
    this.formData = form;
    this.assessmentId = assessmentId;
    this.careAgentId = careAgentId;
  }
}

export default AssessmentHistoryModel;
