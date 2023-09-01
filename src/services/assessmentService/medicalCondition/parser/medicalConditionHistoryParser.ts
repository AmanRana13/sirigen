import {DATE_FORMAT, TIME_FORMAT} from '../../../../globals/global.constants';
import moment from 'moment-timezone';
import MedicalConditionHistoryModel from '../model/medicalConditionHistoryModel';

interface IHistoryDataParse {
  date: string;
  time: string;
  version: number;
  wellnessCoachName: string;
  assessmentId: string;
  careAgentId: string;
}

interface IHistoryDataResponse {
  modification_date: string;
  version: number;
  last_updated_by_name: string;
  condition_id: string;
  last_updated_by: string;
}

class MedicalConditionHistoyParser {
  protected historyData: MedicalConditionHistoryModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {IHistoryDataResponse} data api response array data
   * @returns {IHistoryDataParse[]} parsed data
   */
  parse(data: IHistoryDataResponse[]): IHistoryDataParse[] {
    this.historyData = data?.map(
      (history: IHistoryDataResponse): MedicalConditionHistoryModel => {
        return new MedicalConditionHistoryModel(
          moment
            .utc(history.modification_date)
            .tz(moment.tz.guess())
            .format(DATE_FORMAT),
          moment
            .utc(history.modification_date)
            .tz(moment.tz.guess())
            .format(TIME_FORMAT),
          history.version,
          history.last_updated_by_name,
          history.condition_id,
          history.last_updated_by,
        );
      },
    );

    return this.historyData;
  }
}

export default MedicalConditionHistoyParser;
