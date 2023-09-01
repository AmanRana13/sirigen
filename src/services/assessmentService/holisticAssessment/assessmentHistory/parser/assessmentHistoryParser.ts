import {
  DATE_FORMAT,
  TIME_FORMAT,
} from '../../../../../globals/global.constants';
import moment from 'moment-timezone';
import AssessmentHistoryModel from '../model/assessmentHistoryModel';

interface IHistoryDataParse {
  date: string;
  time: string;
  totalScore: string;
  assessmentId: string;
  careAgentId: string;
}

interface IHistoryDataResponse {
  assessment_id: string;
  form: any;
  modification_date: string;
  total_score: string;
  care_agent_id: string;
}

class AssessmentHistoyParser {
  protected historyData: AssessmentHistoryModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {IHistoryDataResponse} data api response array data
   * @returns {IHistoryDataParse[]} parsed data
   */
  parse(data: IHistoryDataResponse[]): IHistoryDataParse[] {
    this.historyData = data.map(
      (history: IHistoryDataResponse): AssessmentHistoryModel => {
        return new AssessmentHistoryModel(
          moment
            .utc(history.modification_date)
            .tz(moment.tz.guess())
            .format(DATE_FORMAT),
          moment
            .utc(history.modification_date)
            .tz(moment.tz.guess())
            .format(TIME_FORMAT),
          history.total_score,
          history.form,
          history.assessment_id,
          history.care_agent_id,
        );
      },
    );

    return this.historyData;
  }
}

export default AssessmentHistoyParser;
