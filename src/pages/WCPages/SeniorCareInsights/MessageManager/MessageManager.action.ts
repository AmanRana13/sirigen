import {closeAllActionNotification} from './../../../../store/eventsReducer/Events.action';
import moment from 'moment-timezone';
import {isEmpty} from 'lodash';

import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {getCareInsightTransactionService} from 'services/careInsightService/insightSummary.service';
import {
  convertStartDateInUTCTz,
  convertEndDateInUTCTz,
  getClientTimezone,
} from 'globals/date.functions';
import {DATE_FORMAT} from 'globals/global.constants';

import {getCareInsightHistory} from '../SeniorCareInsight.action';
import {IGetCareInsightTransactionPayload} from '../SeniorCareInsight.state';
import {showToast} from 'common/Toast';
import {EventViewState} from 'globals/enums';

export const GET_INSIGHT_HISTORY = 'GET_INSIGHT_HISTORY';
export const END_PAGINATION = 'END_PAGINATION';
export const RESET_INSIGHT_HISTORY = 'RESET_INSIGHT_HISTORY';
export const RESET_PAGINATION = 'RESET_PAGINATION';
export const UPDATE_SUBHISTORY = 'UPDATE_SUBHISTORY';
export const EXPAND_COLLAPSE_CARE_INSIGHT_HISTORY =
  'EXPAND_COLLAPSE_CARE_INSIGHT_HISTORY';

export const getInsightHistory = (offset: number, limit: number) => async (
  dispatch: any,
  getState: any,
) => {
  try {
    dispatch(showApplicationLoader());
    const {
      user_id,
      account_id,
      created_date,
    } = getState().common.seniorDetail.minimalInfo;
    const timezone = getClientTimezone();

    const start_time = convertStartDateInUTCTz(
      moment(created_date).format(DATE_FORMAT),
      timezone,
    );

    const end_time = convertEndDateInUTCTz(
      moment().format(DATE_FORMAT),
      timezone,
    );

    const start_timestamp = parseInt(moment(start_time).format('x')) * 1000000;
    const end_timestamp = parseInt(moment(end_time).format('x')) * 1000000;
    const param = {
      start_timestamp: start_timestamp,
      end_timestamp: end_timestamp,
      senior_id: user_id,
      account_id: account_id,
      desc: true,
      offset: offset,
      limit: limit,
    };
    const response = await dispatch(getCareInsightHistory(param));
    if (isEmpty(response.results)) {
      dispatch({type: END_PAGINATION});
    }

    const historyDataMappedNotificationData = dispatch(
      mapCareInsightNotifyData(response.results),
    );

    dispatch({
      type: GET_INSIGHT_HISTORY,
      payload: {
        careInsightHistory: historyDataMappedNotificationData,
      },
    });
    dispatch(hideApplicationLoader());
  } catch (err) {
    dispatch(showToast(err.message, 'error'));
    dispatch(hideApplicationLoader());
  }
};

export const getCareInsightTransaction = (id: string) => async (
  dispatch: any,
  getState: any,
) => {
  const {user_id} = getState().common.seniorDetail.minimalInfo;
  const careInsightSubHistory = getState().messageManager.careInsightSubHistory;
  if (careInsightSubHistory[id]) {
    return;
  }
  try {
    dispatch(showApplicationLoader());
    const params: IGetCareInsightTransactionPayload = {
      care_insight_id: id,
      senior_id: user_id,
    };
    const response = await getCareInsightTransactionService(params);

    // sorting implemented on dateUpdated
    const subHistoryData = {
      [id]: [...response].sort((a: any, b: any): any => {
        return (
          +moment(b.dateUpdated).format('X') -
          +moment(a.dateUpdated).format('X')
        );
      }),
    };
    dispatch({
      type: UPDATE_SUBHISTORY,
      payload: {
        subHistoryData,
      },
    });
    dispatch(hideApplicationLoader());
  } catch (error) {
    return error;
  }
};

export const mapCareInsightNotifyData = (careInsightHistoryData: any) => (
  dispatch: any,
  getState: any,
) => {
  const {user_id} = getState().common.seniorDetail.minimalInfo;

  const careInsightEvents = {
    ...getState().events.alert,
    ...getState().events.summary,
  };

  const isActionNotification = Object.values(careInsightEvents).some(
    (data: any) =>
      data.viewState === EventViewState.ActionNotification &&
      data.seniorId === user_id,
  );

  if (isActionNotification) {
    const mappedData = careInsightHistoryData.map((data: any) => {
      if (
        careInsightEvents[`${user_id}-${data.careInsightId}`] &&
        careInsightEvents[`${user_id}-${data.careInsightId}`].viewState ===
          EventViewState.ActionNotification
      ) {
        data.notify = true;
        return data;
      }
      return data;
    });

    dispatch(closeAllActionNotification());

    return mappedData;
  } else {
    return careInsightHistoryData;
  }
};

export const expandCareInsight = (id: string) => (
  dispatch: any,
  getState: any,
) => {
  const careInsightHistory = getState().messageManager.careInsightHistory;

  const updatedData = careInsightHistory.map((data: any) => {
    if (data.careInsightId === id) {
      data.isExpand = true;
      data.notify = false;
      return data;
    }
    return data;
  });

  dispatch({
    type: EXPAND_COLLAPSE_CARE_INSIGHT_HISTORY,
    payload: {
      careInsightHistory: updatedData,
    },
  });
};

export const collapseCareInsight = (id: string) => (
  dispatch: any,
  getState: any,
) => {
  const careInsightHistory = getState().messageManager.careInsightHistory;

  const updatedData = careInsightHistory.map((data: any) => {
    if (data.careInsightId === id) {
      data.isExpand = !data.isExpand;
      return data;
    }
    return data;
  });

  dispatch({
    type: EXPAND_COLLAPSE_CARE_INSIGHT_HISTORY,
    payload: {
      careInsightHistory: updatedData,
    },
  });
};
