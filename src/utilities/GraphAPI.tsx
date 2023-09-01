import {API} from 'globals/api';
import {getClientTimezone} from 'globals/date.functions';
import {getCurrentSenior} from 'globals/global.functions';
import get from 'lodash.get';

const logError = (error: Error) => {
  const message = get(error, 'response.data.message');
  // eslint-disable-next-line no-console
  console.error(message);
};
const clientTimezone = getClientTimezone();

const GraphAPI = {
  fetchHeartExtreme: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/vitals/heart-extreme`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data[0]');
      })
      .catch(logError);
  },

  fetchHeartRate: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/vitals/heart`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data');
      })
      .catch(logError);
  },

  fetchActivitySeries: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/vitals/activity-series`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data');
      })
      .catch(logError);
  },

  fetchRespirationExtreme: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/vitals/respiration-extreme`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data[0]');
      })
      .catch(logError);
  },

  fetchRespirationRate: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/vitals/respiration`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data');
      })
      .catch(logError);
  },

  fetchBodyHealthMeasurement: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/body-health/raw-measurement`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return {
          ...get(data, 'data.data', {}),
          last: get(data, 'data.last', null),
        };
      })
      .catch(logError);
  },

  fetchBodyHealthDifference: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/body-health/raw-difference`,
      method: 'get',
      params: {
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data');
      })
      .catch(logError);
  },

  fetchBodyHealthGraph: (
    type: string,
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      // eslint-disable-next-line max-len
      url: `measurement/body-health/body-graph`,
      method: 'get',
      params: {
        measurement_type: type,
        start_timestamp: startTime,
        end_timestamp: endTime,
        senior_id: info.seniorID,
        account_id: info.accountID,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data.data');
      })
      .catch(logError);
  },

  fetchActivityScore: (
    startTime: number,
    endTime: number,
    info = {...getCurrentSenior()},
  ) => {
    return API({
      url: `measurement/vitals/activity-score`,
      method: 'get',
      params: {
        senior_id: info.seniorID,
        account_id: info.accountID,
        start_timestamp: startTime,
        end_timestamp: endTime,
        timezone: clientTimezone,
      },
    })
      .then((data) => {
        return get(data, 'data');
      })
      .catch(logError);
  },
};

export const GraphAPIRegexUrls = {
  heartExtreme: /measurement\/vitals\/heart-extreme\/?.*/,
  heart: /measurement\/vitals\/heart\/?.*/,
  activityGoal: /measurement\/vitals\/activity-goal\/?.*/,
  activitySeries: /measurement\/vitals\/activity-series\/?.*/,
  activityScore: /measurement\/vitals\/activity-score\/?.*/,
  respirationExtreme: /measurement\/vitals\/respiration-extreme\/?.*/,
  respiration: /measurement\/vitals\/respiration\/?.*/,
  bodyHealthMeasurement: /measurement\/body-health\/raw-measurement\/?.*/,
  bodyHealthDifference: /measurement\/body-health\/raw-difference\/?.*/,
  bodyHealthGraph: /measurement\/body-health\/body-graph\/?.*/,
  sleepDaily: /measurement\/sleep\/sleep-daily\/?.*/,
  sleepDepth: /measurement\/sleep\/sleep-depth\/?.*/,
  sleepPhase: /measurement\/sleep\/sleep-phase\/?.*/,
  sleepHR: /measurement\/sleep\/sleep-hr\/?.*/,
  location: /measurement\/alarm\/location\/?.*/,
};

export default GraphAPI;
