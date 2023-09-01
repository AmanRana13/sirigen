/**
 * @class KatzAssessmentHistoryModel
 * @description class to maintain the katz independence assessment history model
 */
class KatzAssessmentHistoryModel {
  date: string;
  time: string;
  totalScore: number;
  careAgentName: string;
  formData: any;
  assessmentId: string;
  createdDate: string;
  careAgentId: string;
  assessmentStatus: string;

  constructor(
    date: string,
    time: string,
    totalScore: number,
    careAgentName: string,
    form: any,
    assessmentId: string,
    createdDate: string,
    careAgentId: string,
    assessmentStatus: string
  ) {
    this.date = date;
    this.time = time;
    this.totalScore = totalScore;
    this.careAgentName = careAgentName;
    this.formData = form;
    this.assessmentId = assessmentId;
    this.createdDate = createdDate;
    this.careAgentId = careAgentId;
    this.assessmentStatus = assessmentStatus;
  }
}

export default KatzAssessmentHistoryModel;
