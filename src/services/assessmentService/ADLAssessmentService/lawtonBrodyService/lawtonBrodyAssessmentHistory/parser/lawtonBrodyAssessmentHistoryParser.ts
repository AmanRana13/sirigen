import {
  DATE_FORMAT,
  TIME_FORMAT,
} from '../../../../../../globals/global.constants';
import moment from 'moment-timezone';
// eslint-disable-next-line max-len
import LawtonBrodyAssessmentHistoryModel from '../model/lawtonBrodyAssessmentHistoryModel';

interface ILawtonBrodyHistoryDataParse {
  date: string;
  time: string;
  totalScore: number;
  careAgentName: string;
  assessmentId: string;
  createdDate: string;
  careAgentId: string;
  assessmentStatus: string;
}

interface ILawtonBrodyHistoryDataResponse {
  form: any;
  created_date: string;
  modification_date: string;
  total_score: number;
  care_agent_name: string;
  assessment_id: string;
  care_agent_id: string;
  assessment_status: string;
}

class LawtonBrodyAssessmentHistoryParser {
  protected historyData: LawtonBrodyAssessmentHistoryModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {ILawtonBrodyHistoryDataResponse} data api response array data
   * @returns {ILawtonBrodyHistoryDataParse[]} parsed data
   */
  parse(
    data: ILawtonBrodyHistoryDataResponse[],
  ): ILawtonBrodyHistoryDataParse[] {
    this.historyData = data.map(
      (
        history: ILawtonBrodyHistoryDataResponse,
      ): LawtonBrodyAssessmentHistoryModel => {
        return new LawtonBrodyAssessmentHistoryModel(
          moment
            .utc(history.modification_date)
            .tz(moment.tz.guess())
            .format(DATE_FORMAT),
          moment
            .utc(history.modification_date)
            .tz(moment.tz.guess())
            .format(TIME_FORMAT),
          history.total_score,
          history.care_agent_name,
          history.form,
          history.assessment_id,
          history.modification_date,
          history.care_agent_id,
          history.assessment_status
        );
      },
    );

    return this.historyData;
  }
}

export default LawtonBrodyAssessmentHistoryParser;
