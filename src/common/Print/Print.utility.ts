/* eslint-disable max-len */
import {constructName} from 'globals/global.functions';
import {IHolisticAssessmentSurveyData} from 'pages/WCPages/Assessments/HolisticAssessment/HolisticAssessment.types';
import AssessmentMetaDataModel from './models/AssessmentMetaDataModel';
import {IDictionary, IHolisticStatsData} from './Print.types';
import {IKatzADLSectionData} from './templates/ADL/KatzADLAssessmentTemplate/KatzADLAssessmentTemplate.types';
import {IHolisticSectionData} from './templates/HolisticAssessmentTemplate/HolisticAssessmentTemplate.types';

/**
 * @description function to convert Survey Question Data into score.
 * @param {IHolisticAssessmentSurveyData} data
 * @returns {number} score
 */
export const getScore = (data: IHolisticAssessmentSurveyData) => {
  const {always, never, sometimes} = data;
  if (always) return 3;
  else if (sometimes) return 2;
  else if (never) return 1;
  return 0;
};

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
    firstValue: meta.dateTime,
    secondValue: meta.careAgentName,
    columns: 8,
  },
  {
    firstLabel: 'Status:',
    firstValue: ASSESSMENT_STATUS[meta.status] || '',
    columns: 4,
    ...(meta.version ? {
      secondLabel: 'Version:',
      secondValue: `${meta.version}${meta.status === 'submit' ? '' : ' Draft'}`,
    } : {})
  },
];

/**
 * @description function to parse Holistic Stats UI data from provided data
 * @param {IHolisticSectionData[]} data Array of Section Data
 * @returns Object { scores, totalScore }
 */
export const parseHolisticStats = (data: IHolisticSectionData[]) => {
  let totalScore = 0;
  const scores: IHolisticStatsData[] = data?.map(
    (section: IHolisticSectionData) => {
      const {surveyName, surveyData} = section;
      const score = surveyData.reduce(
        (acc: number, b: any) => acc + getScore(b),
        0,
      );
      totalScore += score;
      return {
        surveyName,
        score,
      };
    },
  );
  return {
    scores,
    totalScore,
  };
};

/**
 * @description function to split a big array into an array of smaller arrays of specified size
 * @param {any[]} arr Array to be splitted
 * @param {number} size length of smaller arrays
 * @returns array of arrays
 */
export const splitIntoSmallerArrays = (arr: any[] = [], size: number = 6) => {
  const result = [];
  let a = arr;
  while (a.length > 0) {
    result.push(a.slice(0, size));
    a = a.slice(size);
  }
  return result;
};

/**
 * @description function to extract careAgentName from careAgentInfo
 * @param {any} careAgentInfo
 * @returns careAgentName string
 */
export const getCareAgentName = (careAgentInfo: any) => {
  if (careAgentInfo) {
    const {name} = careAgentInfo;
    if (name) {
      const {firstName = '', middleName = '', lastName = ''} = name;
      return constructName(firstName, middleName, lastName);
    }
  }
  return '';
};

// a dictionary of possible Assesment Statuses
export const ASSESSMENT_STATUS: IDictionary = {
  save: 'Saved',
  submit: 'Submitted',
};

// a list of statuses for which Print Button is shown
export const ASSESSMENT_STATUS_KEYS = ['save', 'submit'];

// fontSizes used while Printing
export const fontSizes = {
  regular: '36px',
  regular2: '38px',
  heading: '48px',
  subHeading: '42px',
  subHeading2: '40px'
};

// regular fontStyle
const regular = {
  fontFamily: 'SFUIText',
  fontSize: fontSizes.regular,
  fontWeight: 'normal',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
};

export const TemplateTypography = {
  regular,
  heading: {
    ...regular,
    fontSize: fontSizes.heading,
    fontWeight: 600,
    lineHeight: 0.42,
  },
  subHeading: {
    ...regular,
    fontSize: fontSizes.subHeading,
    fontWeight: 500,
    lineHeight: 0.57,
  },
};

export const getADLScore = (data: IKatzADLSectionData[]) => {
  let count: number = 0;
  data?.forEach((item: IKatzADLSectionData) => {
    item?.surveyData?.options?.forEach((option: any) => {
      count += option.value * option.score;
    });
  });
  return count;
};

// eslint-disable-next-line max-len
const lawtonText =
  'A summary score ranges from 0 (low function, dependent) to 8 (high function, independent) for women and 0 through 5 for men to avoid potential gender bias';

export const infoText = {
  lawton: lawtonText,
  katz: '6 Points=Patient Independent, 0-5 Dependent',
};
