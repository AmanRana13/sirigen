import {isEmpty} from 'lodash';

import {API} from 'globals/api';
import {LOCATION_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod, LocationStatus} from 'globals/enums';
import {getTimestamp} from 'globals/global.functions';

import {
  ISeniorLocationParams,
  ISeniorLocationData,
  ISeniorLocationHistoryParams,
} from './seniorLocationService.types';

const locationAPIAlarmType = {
  home: 'enter',
  away: 'exit',
};
export async function getSeniorLocationService(
  params: ISeniorLocationParams,
): Promise<any> {
  try {
    const response = await API({
      url: LOCATION_END_POINTS.GET_LOCATION,
      method: 'get',
      params: params,
    });

    return mapSeniorLocationData(response.data);
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

const mapSeniorLocationData = (response: any): ISeniorLocationData => {
  const {latest, history, total_time_away_secs} = response;

  const currentLocationData = latest?.data;
  const locationData: ISeniorLocationData = {
    atHome: LocationStatus.NO_LOCATION,
    currentCoordinates: {
      latitude: null,
      longitude: null,
      timestamp: null,
    },
    timeAwayFromHome: total_time_away_secs || 0,
    lastUpdated: 0,
    historyData: [],
  };

  if (!isEmpty(currentLocationData)) {
    locationData.atHome =
      currentLocationData?.alarm_type === locationAPIAlarmType.home
        ? LocationStatus.HOME
        : LocationStatus.AWAY;

    locationData.currentCoordinates = {
      latitude: currentLocationData.lat || null,
      longitude: currentLocationData.lng || null,
      timestamp: currentLocationData.time || null,
    };

    locationData.lastUpdated = getTimestamp(currentLocationData.time || 0);
  }

  if (history?.data?.length > 0) {
    history.data.forEach((historyData: any) => {
      if (historyData.lat != null || historyData.lng != null) {
        locationData.historyData.push({
          latitude: historyData.lat,
          longitude: historyData.lng,
          timestamp: getTimestamp(historyData.time),
        });
      }
    });
  }

  return locationData;
};

export async function getSeniorLocationPostAPIService(
  params: any,
): Promise<any> {
  const response = await API({
    url: LOCATION_END_POINTS.POST_LOCATION,
    method: APIMethod.Post,
    data: params,
  });

  return response?.applicationCode;
}

export const createLocationData = (data: any) => {
  return {
    seniorId: data.senior_id,
  };
};

export async function getSeniorLocationHistoryService(
  params: ISeniorLocationHistoryParams,
): Promise<any> {
  try {
    const response = await API({
      url: LOCATION_END_POINTS.GET_ENABLE_DATES,
      method: 'get',
      params: params,
    });

    return monthEnableDatesData(response.data);
  } catch (error) {
    let errorMessage = error.response?.data.message;
    throw new Error(errorMessage);
  }
}

const monthEnableDatesData = (response: any) => {
  const monthsEnableData = response.data;
  let lastRecordedDate = response.last_recorded_data;
  let nextRecordedDate = response.next_recorded_data;

  const calenderDates = monthsEnableData.map((dates: any) => {
    return dates.replaceAll('-', '/');
  });

  lastRecordedDate = lastRecordedDate && lastRecordedDate.replaceAll('-', '/');
  nextRecordedDate = nextRecordedDate && nextRecordedDate.replaceAll('-', '/');
  return {calenderDates, lastRecordedDate, nextRecordedDate};
};
