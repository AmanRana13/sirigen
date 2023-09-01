/**
 * @class MedicalConditionHistoryModel
 * @description class to maintain the assessment history model
 */
class MedicalConditionHistoryModel {
  date: string;
  time: string;
  version: number;
  wellnessCoachName: string;
  assessmentId: string;
  careAgentId: string;

  constructor(
    date: string,
    time: string,
    version: number,
    wellnessCoachName: string,
    assessmentId: string,
    careAgentId: string,
  ) {
    this.date = date;
    this.time = time;
    this.version = version;
    this.wellnessCoachName = wellnessCoachName;
    this.assessmentId = assessmentId;
    this.careAgentId = careAgentId;
  }
}

export default MedicalConditionHistoryModel;
