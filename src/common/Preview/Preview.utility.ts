import AssessmentMetaDataModel from "common/Print/models/AssessmentMetaDataModel";
import { ASSESSMENT_STATUS } from "common/Print/Print.utility";
import { DATE_FORMAT } from "globals/global.constants";
import moment from "moment";

/**
 * @description function to parse Assessment Meta UI data from provided data
 * @param {AssessmentMetaDataModel} meta
 * @returns array of Details Component Data
 */
export const parseAssessmentMetaData = (meta: AssessmentMetaDataModel) => [
    {
      firstLabel: 'Preferred:',
      secondLabel: 'Account:',
      firstValue: meta.preferredName,
      secondValue: meta.accountId,
      columns: 6,
    },
    {
      firstLabel: 'Age:',
      secondLabel: 'Gender:',
      firstValue: meta.age ? `${meta.age} yrs` : '',
      secondValue: meta.gender,
      columns: 4,
    },
    {
      firstLabel:
        meta.status === 'submit' ? 'Submitted Date:' : 'Last Saved Date:',
      secondLabel: meta.status === 'submit' ? 'Submitted By:' : 'Last Saved By:',
      firstValue: moment(meta.dateTime).format(DATE_FORMAT),
      secondValue: meta.careAgentName,
      columns: 6,
    },
    {
      firstLabel: 'Status:',
      firstValue: ASSESSMENT_STATUS[meta.status] || '',
      secondLabel: 'Version:',
      secondValue: `${meta.version}${meta.status === 'submit' ? '' : ' Draft'}`,
      columns: 4,
    },
];
