import {
  DATE_FORMAT,
  TIME_FORMAT,
} from '../../../../../../globals/global.constants';
import moment from 'moment-timezone';
// eslint-disable-next-line max-len
import KatzAssessmentHistoryModel from '../model/katzAssessmentHistoryModel';

interface IKatzHistoryDataParse {
  date: string;
  time: string;
  totalScore: number;
  careAgentName: string;
  assessmentId: string;
  createdDate: string;
  careAgentId: string;
  assessmentStatus: string;
}

interface IKatzHistoryDataResponse {
  form: any;
  created_date: string;
  modification_date: string;
  total_score: number;
  care_agent_name: string;
  assessment_id: string;
  care_agent_id: string;
  assessment_status: string;
}

class KatzAssessmentHistoryParser {
  protected historyData: KatzAssessmentHistoryModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {IKatzHistoryDataResponse} data api response array data
   * @returns {IKatzHistoryDataParse[]} parsed data
   */
  parse(data: IKatzHistoryDataResponse[]): IKatzHistoryDataParse[] {
    this.historyData = data.map(
      (history: IKatzHistoryDataResponse): KatzAssessmentHistoryModel => {
        return new KatzAssessmentHistoryModel(
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

export default KatzAssessmentHistoryParser;
