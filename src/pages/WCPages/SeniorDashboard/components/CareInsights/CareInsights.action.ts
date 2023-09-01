import moment from 'moment';
import {getCurrentResidentID, getCurrentSenior} from 'globals/global.functions';
import {convertNanoSecondsToMiliSeconds} from 'globals/date.functions';
import {DATE_FORMAT_SHORT_YEAR} from 'globals/global.constants';
import {showToast} from 'common/Toast';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {getCareInsightHistory} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.action';
import {CareInsightStatus, ToastMessageType} from 'globals/enums';
import {IGetInsightsPayload} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';

export const GET_DASHBOARD_CARE_INSIGHT = 'GET_DASHBOARD_CARE_INSIGHT';
export const GET_DASHBOARD_CARE_INSIGHT_SUCCESS =
  'GET_DASHBOARD_CARE_INSIGHT_SUCCESS';
export const GET_DASHBOARD_CARE_INSIGHT_FAIL =
  'GET_DASHBOARD_CARE_INSIGHT_FAIL';

/**
 * @description action creator to fetch the care insight on senior dashboard
 * @returns void
 */
export const getDashboardCareInsight = () => async (dispatch: any) => {
  dispatch(showApplicationLoader());
  const seniorInfo: any = getCurrentSenior();
  const date = new Date();
  const days = 30;
  const startDate: any = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  const endDateTime: any = new Date();
  const endDateTimeStamp = Math.round(endDateTime / 1000) * 10 ** 9;
  const startDateTimestamp = Math.round(startDate / 1000) * 10 ** 9;

  const payload: IGetInsightsPayload = {
    account_id: seniorInfo.accountID,
    senior_id: seniorInfo.seniorID,
    start_timestamp: startDateTimestamp,
    end_timestamp: endDateTimeStamp,
    desc: true,
    status: CareInsightStatus.Approved,
  };

  dispatch({
    type: GET_DASHBOARD_CARE_INSIGHT,
  });
  try {
    const response = await dispatch(getCareInsightHistory(payload));
    dispatch(hideApplicationLoader());
    dispatch({
      type: GET_DASHBOARD_CARE_INSIGHT_SUCCESS,
      payload: {data: response.results},
    });
    return response;
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch({
      type: GET_DASHBOARD_CARE_INSIGHT_FAIL,
    });
    if (error instanceof Error) {
      dispatch(showToast(error.message, ToastMessageType.Error));
    }
    return null;
  }
};

export const CARE_INSIGHT_MESSAGES = Object.freeze({
  GOOD_NEWS: 'Senior is feeling: ',
  ATTENTION: 'Senior is feeling Low-Medium levels of: ',
  ACTION: 'Senior is feeing high levels of: ',
});

export const getWellnessSurveyMessage = (message: any) => {
  message = JSON.parse(message);

  const goodNewsMessageType = message.every(
    (item: any) => Object.values(item)[0] === null,
  );

  const attentionMessageType = message.some(
    (item: any) =>
      Object.values(item)[0] === 'low' || Object.values(item)[0] === 'medium',
  );

  const actionMessageType = message.every(
    (item: any) => Object.values(item)[0] === 'high',
  );

  if (goodNewsMessageType) {
    message =
      CARE_INSIGHT_MESSAGES.GOOD_NEWS +
      message.map((item: any) => Object.keys(item)[0]).join(', ');
  }

  if (attentionMessageType) {
    message =
      CARE_INSIGHT_MESSAGES.ATTENTION +
      message
        .map(
          (item: string[]) =>
            `${Object.keys(item)[0]} - ${Object.values(item)[0].toUpperCase()}`,
        )
        .join(', ');
  }

  if (actionMessageType) {
    message =
      CARE_INSIGHT_MESSAGES.ACTION +
      message.map((item: any) => Object.keys(item)[0]).join(', ');
  }

  return message;
};

export const mapCareInsightSummary = (summary = []) => {
  const dateArray: any = [];

  summary.forEach((element: any) => {
    const summaryDate = moment(
      convertNanoSecondsToMiliSeconds(element.timestamp),
    ).format(DATE_FORMAT_SHORT_YEAR);
    const existData = dateArray.find((item: any) => item?.date === summaryDate);

    if (!existData) {
      dateArray.push({
        date: summaryDate,
        event: 'Daily Recap',
        vitalData: [],
        seniorId: element.senior_id,
        timestamp: element.timestamp,
      });
    }

    const index = dateArray.findIndex(
      (item: any) => item?.date === summaryDate,
    );

    dateArray[index] = {
      ...dateArray[index],
      vitalData: [...dateArray[index]?.vitalData, {...element}],
    };
  });

  return dateArray;
};
