/**
 * @class WellnessSurveyModel
 * @description class to maintain the assessment model
 */
class WellnessSurveyModel {
  date: string;
  time: string;
  dateTime: string;
  surveyDate: string;
  surveys: any;
  assessmentId: string;
  careAgentId: string;
  assessmentStatus: string;
  versionNumber: string;

  constructor(
    date: string,
    time: string,
    dateTime: string,
    surveyDate: string,
    answer: any,
    assessmentId: string,
    careAgentId: string,
    assessmentStatus: string,
    versionNumber: string,
  ) {
    this.date = date;
    this.time = time;
    this.dateTime = dateTime;
    this.surveyDate = surveyDate;
    this.surveys = answer;
    this.assessmentId = assessmentId;
    this.careAgentId = careAgentId;
    this.assessmentStatus = assessmentStatus;
    this.versionNumber = versionNumber;
  }
}

export default WellnessSurveyModel;
