import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import {IMedicalConditionAssessmentFormValue} from '../medicalConditionService.types';
import MedicalConditionModel from '../model/medicalConditionModel';

interface IMedicalConditionDataParse {
  dateTime: string;
  surveys: IMedicalConditionAssessmentFormValue[];
  assessmentStatus: string;
  versionNumber: number;
  assessmentId: string;
}

interface IMedicalConditionDataResponse {
  senior_id: string;
  medical_conditions: IMedicalConditionAssessmentFormValue[];
  status: string;
  condition_id: string;
  last_updated_by: string;
  last_updated_by_name: string;
  version: number;
  created_date: string;
  modification_date: string;
}

class MedicalConditionParser {
  protected medicalConditionData: MedicalConditionModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {IMedicalConditionDataResponse} data api response array data
   * @returns {IMedicalConditionDataParse[]} parsed data
   */
  parse(data: IMedicalConditionDataResponse): IMedicalConditionDataParse {
    const medicalConditions = (data.medical_conditions || []).map(
      (medicalCondition) => ({
        ...medicalCondition,
        resolved: medicalCondition.resolved
          ? medicalCondition.modification_date || ''
          : '',
      }),
    );
    return new MedicalConditionModel(
      data.modification_date
        ? `${moment
            .utc(data?.modification_date)
            .tz(moment.tz.guess())
            .format(DATE_FORMAT)}
          ${moment
            .utc(data?.modification_date)
            .tz(moment.tz.guess())
            .format(TIME_FORMAT)}`
        : '',
      medicalConditions,
      data.status,
      data.version,
      data.condition_id,
      data.last_updated_by,
    );
  }
}

export default MedicalConditionParser;
