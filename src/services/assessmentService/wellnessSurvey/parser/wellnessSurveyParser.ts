import {isEmpty} from 'lodash';
import {AssessmentStatus} from 'globals/enums';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import moment from 'moment-timezone';
import {defaultValues} from 'pages/WCPages/Assessments/Wellbieng/WellnessSurveyData';
import WellnessSurveyModel from '../model/wellnessSurveyModel';

interface IWellnessSurveyDataParse {
  date: string;
  time: string;
  dateTime: string;
  surveyDate: string;
  assessmentId: string;
  careAgentId: string;
  assessmentStatus: string;
  versionNumber: string;
}

interface IWellnessSurveyDataResponse {
  survey_id: string;
  answer: any;
  survey_date: string;
  careagent_id: string;
  is_Survey_Completed: boolean;
  form_version: string;
  created_date: string;
  survey_date_timezone: string;
  modification_date: string;
}

class WellnessSurveyParser {
  protected wellnessSurveyData: WellnessSurveyModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {IWellnessSurveyDataResponse} data api response array data
   * @returns {IWellnessSurveyDataParse[]} parsed data
   */

  parse(data: IWellnessSurveyDataResponse): IWellnessSurveyDataParse {
    const date = moment
      .utc(data.modification_date)
      .tz(moment.tz.guess())
      .format(DATE_FORMAT);
    const time = moment
      .utc(data.modification_date)
      .tz(moment.tz.guess())
      .format(TIME_FORMAT);

    const assessmentStatus = () => {
      if (!isEmpty(data)) {
        return data.is_Survey_Completed
          ? AssessmentStatus.Submit
          : AssessmentStatus.Save;
      } else {
        return '';
      }
    };

    return new WellnessSurveyModel(
      date,
      time,
      `${date} ${time}`,
      data.survey_date,
      data.answer || defaultValues,
      data.survey_id || '',
      data.careagent_id || '',
      assessmentStatus(),
      data.form_version || '',
    );
  }
}

export default WellnessSurveyParser;
