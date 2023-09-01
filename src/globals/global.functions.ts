/* eslint-disable max-len */
import {matchPath} from 'react-router-dom';
import moment from 'moment-timezone';
import {
  DATE_FORMAT,
  DEFAULT_CARE_AGENT_DATA,
  US_STATE_MAPPINGS,
  facilitySlugs,
} from './global.constants';
import {validateDate} from './date.functions';
import {ROLES_CONFIG} from 'config/app.config';
import {CaregiverType, Roles} from './enums';
import crypto from 'crypto';
import { IIsValueAvailable } from './global.types';

/*
 *
 * @param {string} title will be change the document title
 */
export const changeDocumentTitle = (title: string, isCustom?: boolean) => {
  if (isCustom && title) {
    document.title = title;
  } else if (title && !isCustom) {
    document.title = `${title} | Vimient`;
  } else {
    document.title = `Vimient`;
  }
};

export const emptyStringToNull = (obj: object) => {
  function eachRecursive(newObj: any) {
    for (const data in newObj) {
      if (typeof newObj[data] == 'object' && newObj[data] !== null)
        eachRecursive(newObj[data]);
      else if (newObj[data] === '' || newObj[data] === undefined) {
        newObj[data] = null;
      }
    }
    return newObj;
  }
  return eachRecursive(obj);
};

/**
 * @function isEmptyObject
 * @description check atleast one key has value in the given object
 * @param obj
 * @returns
 */
export const isEmptyObject = (obj: object) => {
  return Object.values(emptyStringToNull(obj)).some((item: any) => {
    if (item && typeof item !== 'object') {
      return item;
    } else if (item && typeof item === 'object') {
      const innerObject = Object.values(item).some(
        (item: any) => item !== null,
      );
      return innerObject;
    }
  });
};

export const toTitleCase = (str: string) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, function (txt: any) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getTimestamp = (str: string | number) => {
  if (!str) {
    return;
  }
  const timestamp = str.toString().slice(0, -6);
  return parseInt(timestamp);
};

export const getCurrentResidentID = () => {
  const {
    facilityManagement,
    facilityDashboard,
    facilityResident,
    residentDashboard,
    accountID,
    timezone,
  } = facilitySlugs;
  const {params}: any = matchPath(
    {
      path: `/${facilityManagement}/:${facilityDashboard}/:${facilityResident}/:${residentDashboard}/:${accountID}/:${timezone}/*`,
    },
    window.location.pathname,
  ) || {params: {}};

  return {
    seniorID: params[residentDashboard] || '',
    accountID: params[accountID] || '',
    timezone: params[timezone]?.replace(/-/g, '/'),
    senior_id: params[residentDashboard] || '',
    account_id: params[accountID] || '',
  };
};

export const getCurrentSenior = () => {
  const {residentDashboard, accountID, timezone, senior} = facilitySlugs;
  const {params}: any = matchPath(
    {
      path: `/${senior}/:${residentDashboard}/:${accountID}/:${timezone}/*`,
    },
    window.location.pathname,
  ) || {params: {}};

  if (params[residentDashboard]) {
    return {
      seniorID: params[residentDashboard] || '',
      accountID: params[accountID] || '',
      timezone: params[timezone]?.replace(/-/g, '/'),
      senior_id: params[residentDashboard] || '',
      account_id: params[accountID] || '',
    };
  } else {
    return getCurrentResidentID();
  }
};

export const getHourMin = (time: any, currentUnit = 's', format = 'long') => {
  const inHour = currentUnit == 's' ? time / 60 / 60 : time / 60;
  const inMin = currentUnit == 's' ? time / 60 : time;
  const durationHour = Math.floor(inHour);
  const durationMin = Math.floor(inMin) - durationHour * 60;
  if (durationHour) {
    return `${durationHour}${format == 'short' ? 'h' : 'hrs'} ${durationMin}${
      format == 'short' ? 'm' : 'min'
    }`;
  } else {
    return `${durationMin}${format == 'short' ? 'm' : 'min'}`;
  }
};

export const printStartEndTime = (startTime: any, endTime: any) => {
  // eslint-disable-next-line no-console
  console.info('StartTime', moment(getTimestamp(startTime)).format('llll'));
  // eslint-disable-next-line no-console
  console.info('EndTime', moment(getTimestamp(endTime)).format('llll'));
};

export const getCurrentDate = (timezone: string) => {
  const currentDate = moment().tz(timezone).format('L');
  const currentUTCOffset = moment().tz(timezone).format('Z');
  const currentStartTime = moment(
    `${currentDate} 00:00:00${currentUTCOffset}`,
  ).format('x');
  const currentEndTime = moment(
    `${currentDate} 23:59:59${currentUTCOffset}`,
  ).format('x');
  return {
    startTime: parseInt(currentStartTime) * 1000000,
    endTime: parseInt(currentEndTime) * 1000000,
  };
};

export const getCurrentSleepDate = (timezone: string) => {
  const currentDate = moment().tz(timezone)?.format('L');
  const currentUTCOffset = moment().tz(timezone)?.format('Z');
  const currentStartTime = moment(`${currentDate} 00:00:00${currentUTCOffset}`)
    ?.subtract('04:00:00')
    ?.format('x');
  const currentEndTime = moment(`${currentDate} 23:59:59${currentUTCOffset}`)
    ?.subtract('03:00:00')
    ?.format('x');
  return {
    startTime: parseInt(currentStartTime) * 1000000,
    endTime: parseInt(currentEndTime) * 1000000,
  };
};

export const getAge = (value: any) => {
  if (!value) {
    return `-`;
  }
  const ageDifMs = Date.now() - new Date(value).getTime();
  const ageDate = new Date(ageDifMs);
  const currentAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return `${currentAge}`;
};

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const toIsoString = (date: any) => {
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: number) {
      const norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ':' +
    pad(tzo % 60)
  );
};

export const saveUserInfo = (info: any) => {
  localStorage.setItem('userInfo', JSON.stringify(info));
};

/**
 * @description get parsed local storage value
 * @param {:- session storage key } key
 * @returns value || null
 */
export const getSessionStorage = (key: string) => {
  const cache = sessionStorage.getItem(key);

  return cache ? JSON.parse(cache) : null;
};

/**
 * @description set session storage
 * @param {*} key string
 * @param {*} value string
 */
export const setSessionStorage = (key: string, value: number) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description remove item from session storage
 * @param key value to remove from session storage
 */
export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

/**
 * @description get parsed local storage value
 * @param {: - local storage key} key
 * @returns {DefaultCareAgentData} value || null
 */
export const getLocalStorage = (key: string) => {
  const cache = localStorage.getItem(key);
  return cache ? JSON.parse(cache) : null;
};

/**
 * @description set local storage
 * @param {*} key string
 * @param {*} value string
 */
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description remove item from local storage
 * @param key value to remove from local storage
 */
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * @description get care agent data from localstorage
 * @returns {any}
 */
export const getCareAgentInfo = () =>
  getLocalStorage('userInfo') || DEFAULT_CARE_AGENT_DATA;

/**
 * @description check user session
 * @returns boolean
 */
export const checkUserSession = () => getSessionStorage('isUser');

/**
 * @description fn to inject the storage event
 * @param eventName event name that needs to inject
 */
export const injectStorageEvent = (eventName: string, value: any) => {
  setLocalStorage(eventName, value);
  removeLocalStorage(eventName);
};

/**
 * @description convert kg to lbs
 * @param value value that needs to be converted
 */
export const kgToLbs = (value: number) => {
  if (value) {
    return value * 2.2046;
  }
};

/**
 * @description round off the value
 * @param value value that needs to be rounded off
 * @param round upto how many decimal places needs to ne rounded
 */
export const roundOff = (value: number | undefined, round = 1) => {
  if (value != null) {
    return parseFloat(String(value)).toFixed(round);
  }
  return '-';
};

/**
 * @function convertKgToLbs
 * @description convert kg to lbs
 * @param value value that needs to be converted
 */
export const convertKgToLbs = (value: number) => {
  if (!value) return 0;
  return value * 2.2046;
};

/**
 * @function convertLbsToKg
 * @description convert lbs to kg
 * @param value that needs to be converted
 */
export const convertLbsToKg = (value: number) => {
  if (!value) return 0;
  return parseInt(String(value / 2.2046));
};

/**
 * @function feetToCm
 * @description convert feet and inch value into centimeter
 * @param feet value in feet
 * @param inch value in inch
 * @return value in centimeter
 */
export const feetToCm = (feet: number, inch: number) => {
  if (!feet && !inch) return 0;
  return parseInt(String(numberRoundOff(feet * 30.48 + inch * 2.54)));
};

/**
 * @function numberRoundOff
 * @description method to round off the number
 * @param value value that needs to be rounded off
 * @param round upto how many decimal places needs to ne rounded
 * @return {number} rounded number
 */
export const numberRoundOff = (value: number, round = 1) => {
  if (!value) {
    return value;
  }
  return Number(parseFloat(String(value)).toFixed(round));
};

/**
 * @description remove new object with no data
 * @param bucket actual object
 * @param normalization normalized object
 */
export const removeActivityWithNoData = (bucket: any, normalization: any) => {
  for (let x in normalization) {
    if (bucket[parseInt(x)].length == 0) {
      delete bucket[x];
      delete normalization[x];
    }
  }
  return {bucket: bucket, activity: normalization};
};

/**
 * @description Normalize Activity graph
 * @param data actual data that need to be normalized
 * @param domainMax min range
 * @param domainMin max range
 */
export const normalizeActivity = (
  data: any,
  domainMax: any,
  domainMin: any,
) => {
  // domainMax: Min Heart Rate - 1
  // domainMin: Minimun of Y axis tick for overall graph  eg: (min * 0.8), 0 , (min * 0.5)

  let bucket: any = {};

  for (let x in data) {
    let diff = domainMax - domainMin;
    let mediumOffset = (data[x].medium_activity / 100) * diff;
    let highOffset = (data[x].high_activity / 100) * diff;
    if (data[x].high_activity !== 0) {
      if (data[x].medium_activity !== 0) {
        data[x].high_activity = highOffset;
      } else {
        data[x].high_activity = domainMin + highOffset;
      }
    }
    if (data[x].medium_activity !== 0) {
      data[x].medium_activity = domainMin + mediumOffset;
    }

    // Bucket
    let y = parseInt(x);
    bucket[y] = y + parseInt(data[x].activity_duration) * 1000000000;
  }

  return {bucket: bucket, normalizedActivity: data};
};

/**
 * @description putToBucket
 * @param bucket bucket list
 * @param measurement data points
 * @param key_name heart_rate/respiration
 */

export const putToBucket = (bucket: any, measurement: any, key_name: any) => {
  let bucket_assignment: any = {};
  let counter = 0;
  for (let start_key in bucket) {
    const start_point = parseInt(start_key);
    const end_point = parseInt(bucket[start_key]);
    for (let i = counter; i < measurement.length; ++i) {
      if (bucket_assignment[start_key] === undefined) {
        bucket_assignment[start_key] = [];
      }
      if (
        measurement[i].time >= start_point &&
        measurement[i].time <= end_point
      ) {
        bucket_assignment[start_key].push(measurement[i][key_name]);
      }
      // else {
      //   break_statement = true;
      // }
    }
  }
  return bucket_assignment;
};

/**
 * @description capitalizeFirstLetter
 * @param string string that needs to be capitalize
 */
export const capitalizeFirstLetter = (string: string) => {
  if (!string) {
    return '-';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * @param {date} dt
 * @param {date-time} tm
 * @returns date time combined
 */
export const formatDateTime = (dt: any, tm: any) => {
  const newDt = moment(dt).format(DATE_FORMAT);
  const newTm = moment(tm).format('HH:mm');
  const dateTime = moment(`${newDt} ${newTm}`).format();
  return dateTime.replace(/Z/, '');
};

export const maskPhoneNumber = (number: string) => {
  if (!number) return ``;
  return `(${number.substring(0, 3)}) ${number.substring(
    3,
    6,
  )}-${number.substring(6, number.length)}`;
};

export const unmaskPhoneNumber = (value: string) => {
  if (value) {
    return value.replace(/\(|\)|-|\s*/g, '');
  }
  return value;
};

export const maskMAC = (mac: any) => {
  const MAC_LENGTH = 12;
  const HYPHEN_INDEXES = [1, 3, 5, 7, 9];
  const isLastChar = (index: number, str: string) => index === str.length - 1;

  if (!mac) return '';
  const unmaskedMac = unmaskMAC(mac);

  return unmaskedMac
    .slice(0, MAC_LENGTH)
    .split('')
    .reduce((acc, digit, index) => {
      const result = `${acc}${digit}`;
      if (!isLastChar(index, mac)) {
        if (HYPHEN_INDEXES.includes(index)) return `${result}:`;
      }
      return result;
    }, '');
};

export const unmaskMAC = (str: string) =>
  String(str).replace(/[^a-zA-Z0-9]/g, '');

export const roundToTen = (n: number, range?: any) => {
  let a = parseInt(String(n / 10)) * 10;
  if (range == 'min') {
    return a;
  } else {
    return a + 10;
  }
};

export const updateBucketWithNoActivity = (
  bucket: any,
  startT: any,
  endT: any,
) => {
  const globalTime = 3600000000000;
  if (Object.keys(bucket).length === 0) {
    let tempTime = startT;
    let tempBucket: any = {};

    while (tempTime <= endT) {
      const tempStart = tempTime;
      tempTime += globalTime;
      tempBucket[tempStart] = tempTime;
    }

    return tempBucket;
  } else {
    const bucketKey = Number(Object.keys(bucket)[0]);
    let tempKey = bucketKey;

    while (startT + globalTime < tempKey) {
      const newEndTime = tempKey;
      tempKey -= globalTime;
      bucket[tempKey] = newEndTime;
    }

    tempKey = bucketKey;
    while (endT - globalTime > tempKey) {
      const newStartTime = tempKey;
      tempKey += globalTime;
      bucket[newStartTime] = tempKey;
    }
    return bucket;
  }
};

export const getQueryParamTimezone = (timezone = '') => {
  return timezone?.replace(/\//g, '-') || moment.tz.guess().replace(/\//g, '-');
};

/**
 * @description sort by key
 * @param arr array that needs to be sorted
 * @param key key for which sorting needs to be done
 */
export const sortBy = (arr: any, key: any) => {
  return arr.sort(function (a: any, b: any) {
    // eslint-disable-next-line max-len
    const valueA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]; // ignore upper and lowercase

    // eslint-disable-next-line max-len
    const valueB = typeof a[key] === 'string' ? b[key].toUpperCase() : b[key]; // ignore upper and lowercase

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

export const getAvgOfTwoValue = (valueOne: any, valueTwo: any) => {
  if (valueOne || valueTwo) {
    return (valueOne + valueTwo) / 2;
  }

  return 0;
};

/**
 * @description function to convert the array into object with specific key
 * @param {array} array
 * @param {string} key
 * @returns object
 */
export const convertArrayToObject = (array: any, key: any) =>
  array.reduce((acc: any, curr: any) => {
    acc[curr[key]] = curr;
    return acc;
  }, {});
/**
 * @function removeObjectProperty
 * @description fn to remove the property from an object without creating copy
 * @param {*} object
 * @param {string} property
 * @returns Object
 */
export const removeObjectProperty = (obj: any, property: any) => {
  return Object.keys(obj).reduce((prevValue: any, key) => {
    if (key !== property) {
      prevValue[key] = obj[key];
    }

    return prevValue;
  }, {});
};

/**
 * @description fn to get existing vitals data
 * @param {string | any | undefined} timezone senior timezone
 * @returns vitals data
 */
export const getExistingVitalsData = (timezone: any) => {
  return {
    heart_rate_measurement: {
      label: 'Heart Rate',
      measurementUnit: 'Beats Per Minute (BPM)',
      measurementUnitAbbreviation: 'bpm',
      apiEndPoint: '/vitals/heart-rate-raw',
      downloadEndPoint: '/vitals/heart-summary-report',
      payload: {
        timezone,
      },
      reportPayload: {
        timezone,
      },
      isDisable: false,
    },
    body_weight: {
      label: 'Body Weight',
      measurementUnit: 'Pound Unit Of Mass (LBS)',
      measurementUnitAbbreviation: 'lbs',
      apiEndPoint: '/body-health/summary/body/insight',
      downloadEndPoint: '/body-health/body-summary-report',
      payload: {
        measurement_type: 'weight',
      },
      reportPayload: {
        timezone,
        measurement_type: 'weight',
      },
      isDisable: true,
    },
    body_hydration: {
      label: 'Body Hydration',
      measurementUnit: 'Percentage (%)',
      measurementUnitAbbreviation: '%',
      apiEndPoint: '/body-health/summary/body/insight',
      downloadEndPoint: '/body-health/body-summary-report',
      payload: {
        measurement_type: 'hydration',
      },
      reportPayload: {
        timezone,
        measurement_type: 'hydration',
      },
      isDisable: true,
    },
    activity_measurement: {
      label: 'Activity',
      measurementUnit: 'Minutes (Min)',
      measurementUnitAbbreviation: 'min',
      apiEndPoint: '/vitals/activity-series-insight',
      downloadEndPoint: '/vitals/activity-measurement-summary-report',
      payload: {
        timezone,
      },
      reportPayload: {
        timezone,
      },
      isDisable: true,
    },
    sleep_score: {
      label: 'Sleep Score',
      measurementUnit: 'Beats Per Minute (BPM)',
      measurementUnitAbbreviation: 'bpm',
      apiEndPoint: '/sleep/sleep-insight',
      downloadEndPoint: '/sleep/sleep-score-summary-report',
      reportPayload: {
        timezone,
      },
      isDisable: true,
    },
  };
};

/**
 * @description fn to validate the dates
 * @param {date} fromDate start date
 * @param {date} toDate end date date
 * @param {boolean | undefined} isDateError error value
 * @returns void
 */
export const searchRangeDateValidation = (
  fromDate: string,
  toDate: string,
  isDateError: boolean | undefined,
) => {
  let isError = false;

  if (!validateDate(fromDate) || !validateDate(toDate) || isDateError) {
    isError = true;
  }

  return isError;
};

/**
 * @function getCareAgentDetails
 * @description getCareAgentDetails
 */
export const getCareAgentDetailsParseJWT = () => {
  const userInfo = getCareAgentInfo();
  return parseJwt(userInfo.accessToken);
};

/**
 * @function showTextWithEllipsis
 * @description add ellipsis in string
 * @param {string} text
 * @param {number} limit
 * @returns {string} altered string
 */
export const showTextWithEllipsis = (text: string, limit: number) =>
  text.length > limit ? `${text.substring(0, limit)}...` : text;

/**
 * @function isAuthenticateUser
 * @description Method to return user is authenticated.
 * @returns {boolean}
 */
export const isAuthenticateUser = () => {
  const userInfo = getCareAgentInfo();
  return userInfo && userInfo.email ? true : false;
};

/**
 * @function isTwoArrayEqual
 * @description method to compare two array
 * @param {string[]} a
 * @param {string[]} b
 * @returns {boolean}
 */
export const isTwoArrayEqual = (a: any, b: any) =>
  a.length === b.length && a.every((v: any, i: any) => v === b[i]);

/**
 * @function getCurrentUserRoleConfig
 * @description method to get role base configuration of the current portal user
 * @param {string[]} userRoleList
 */
export const getCurrentUserRoleConfig = (userRoleList: any) => {
  if (userRoleList.includes(Roles.Admin)) {
    return ROLES_CONFIG[Roles.Admin];
  } else if (userRoleList.includes(Roles.WarehouseEmployee)) {
    return ROLES_CONFIG[Roles.WarehouseEmployee];
  } else if (userRoleList.includes(Roles.BDM)) {
    return ROLES_CONFIG[Roles.BDM];
  } else {
    return ROLES_CONFIG[Roles.CareAgent];
  }
};

export const getAddressByLatLng = async (lat: any, lng: any) => {
  if (lat == null || lng == null) {
    return '-';
  }
  const geocoder = new google.maps.Geocoder();
  const response = await geocoder.geocode({
    location: {
      lat: lat,
      lng: lng,
    },
  });
  if (response.results[0]) {
    const addr = response.results[0];
    return addr.formatted_address;
  } else {
    return '';
  }
};

export const createDashedLine = (data: any) => {
  if (!data) return;
  let array: any = [];
  data.forEach((interup: any, index: number) => {
    const lastIndex = data[index - 1];
    const currentIndex = data[index];
    const nextIndex = data[index + 1];

    if (interup.y == null) {
      if (index > 0 && lastIndex?.y) {
        array.push({
          x: lastIndex?.x,
          y: lastIndex?.y,
        });
      }
      if (nextIndex?.y) {
        array.push({
          x: nextIndex?.x || currentIndex?.x,
          y: nextIndex?.y,
        });
        array.push({
          x: nextIndex?.x,
          y: null,
        });
      }
    }
  });
  return array;
};

/***
 * function to calculate percentile value of an array
 * arguments(array, percentileValue)
 */
export const calculatePercentile = (arr: any, p: any) => {
  if (arr.length === 0) return 0;
  if (p <= 0) return arr[0];
  if (p >= 1) return arr[arr.length - 1];
  const array = arr.sort(function (a: any, b: any) {
    return a - b;
  });
  const index = (arr.length - 1) * p,
    lower = Math.floor(index),
    upper = lower + 1,
    weight = index % 1;

  if (upper >= arr.length) return array[lower];
  return array[lower] * (1 - weight) + array[upper] * weight;
};

/**
 * @function constructName function to create a full name
 * @param {string} firstName
 * @param {string} middleName
 * @param {string} lastName
 * @returns {string} fullName
 */
export const constructName = (
  firstName: string = '',
  middleName: string = '',
  lastName: string = '',
) => {
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

  return fullName;
};

/**
 * @function constructNameInitials function to create nameInitials
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string} initials
 */
export const constructNameInitials = (
  firstName: string = '',
  lastName: string = '',
) => {
  const initials = [firstName, lastName]
    .filter(Boolean)
    .map((val) => val.charAt(0))
    .join('');
  return initials.toUpperCase();
};

/**
 * @function getStateFromAbbr function to get State Name from State Abbreviation
 * @param {string} abbr
 * @returns {string} State Name
 */
export const getStateFromAbbr = (abbr: string) => {
  return (
    US_STATE_MAPPINGS.filter(
      (state) => state.abbreviation.toLowerCase() === abbr.toLowerCase(),
    )[0]?.name || ''
  );
};

/**
 * @function getAbbrFromState function to get State Abbreviaton from State Name
 * @param {string} name
 * @returns {string} State Abbreviation
 */
export const getAbbrFromState = (name: string) => {
  return (
    US_STATE_MAPPINGS.filter(
      (state) => state.name.toLowerCase() === name.toLowerCase(),
    )[0]?.abbreviation || ''
  );
};

/**
 * @function constructLocation function to create short location string
 * @param {Record<string, any>} location
 * @param {boolean} abbr Should State be Abbreviated?
 * @returns {string} location
 */
export const constructLocation = (
  location: Record<string, any> = {},
  abbr = false,
) => {
  let state = location?.state;
  if (state && abbr) {
    state = getAbbrFromState(state);
  }
  const locationString = [location?.city, state].filter(Boolean).join(', ');
  return locationString;
};

/**
 * @function constructShortTimezone function to create short timezone string
 * @param {string} timezone
 * @returns {string} short timezone
 */
export const constructTimezoneAbbr = (timezone: string = '') => {
  if (timezone) {
    return moment().tz(timezone).zoneAbbr();
  }
  return '';
};

export const searchDelay = (fn: any) => {
  let timer: any;

  return function (this: unknown, ...args: any) {
    const context: any = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(context, args);
    }, 500);
  };
};

/**
 * @function assessmentDailogMessage
 * @description function to get Dialog message for save, submit, and reset for any assessment
 * @param {string} assessment_name
 * @param {string} type (save,submit,reset)
 */
export const assessmentDailogMessage = (
  assessmentName: string,
  action: string,
) => {
  return `${assessmentName} has been ${action} successfully`;
};
/**
 * @function calculatePercentage
 * @param {number} score
 * @param {number} maximumScore
 * @returns percantage value
 */
export const calculatePercentage = (score: number, maximumScore: number) => {
  return roundOff((score / maximumScore) * 100, 0);
};

/**
 * @function getMinMaxAxis
 * @description method to get min and max domain of axis on the basis of data
 * @param {any[]} array
 * @param {string} type it can be either {min} or {max}
 */
export const getMinMaxAxis = (array: any, type: any) => {
  let minValue = Math.floor(Math.min(...array));
  let maxValue = Math.ceil(Math.max(...array));

  const num = (maxValue - minValue) / array.length;
  let step = 0;

  if (num % 1 === 0) {
    step = Math.ceil(num / 5) * 5;
  } else {
    step = Math.ceil(num);
  }

  if (type == 'min') {
    return minValue - roundToTen(step);
  } else if (type == 'max') {
    return maxValue + roundToTen(step);
  }
};

/**
 * @function sortCareGiverInfo
 * @description to sort caregivers on the basis of caregiver type
 * @param {ICaregiverListItems[]} caregivers
 * @returns
 */
export const sortCareGiverInfo = (caregivers: any) => {
  if (caregivers.length > 0) {
    return caregivers.sort(function (a: any, b: any) {
      if (
        (a.caregiverType == CaregiverType.PRIMARY &&
          b.caregiverType !== CaregiverType.PRIMARY) ||
        (a.caregiverType == CaregiverType.SECONDARY &&
          b.caregiverType == CaregiverType.ALTERNATE)
      ) {
        return -1;
      }
      if (
        (a.caregiverType != CaregiverType.PRIMARY &&
          b.caregiverType == CaregiverType.PRIMARY) ||
        (a.caregiverType != CaregiverType.ALTERNATE &&
          b.caregiverType == CaregiverType.SECONDARY)
      ) {
        return 1;
      }
      return 0;
    });
  }
  return caregivers;
};

/**
 * @function getFormData
 * @description to get formData from object
 * @param {object} obj
 * @returns
 */
export const getFormData = (obj: any) => {
  const newFormData = Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key]);
    return formData;
  }, new FormData());
  return newFormData;
};

/**
 * @function getLabelStepsValue
 * @description to get array of values with equal interval
 * @param {number} step
 * @param {number} maximumValue
 * @returns
 */
export const getLabelStepsValue = (step: number, maximumValue: number) => {
  let stepsArray = [];
  let i = 0;
  while (i <= maximumValue) {
    if (i % step == 0) {
      stepsArray.push({value: i, label: `${i}`});
    }
    i++;
  }
  return stepsArray;
};

export const getMBValueInBytes = (valueInMB: number) => 1024 * 1024 * valueInMB;
export const generateUniqueId = (bytes: number = 16) =>
  crypto.randomBytes(bytes).toString('hex');
export const convertSecondsToMilliSeconds = (valueInSeconds: number) =>
  1000 * valueInSeconds;

/**
 * @description trimValuesInObject method trim values inside an object
 * @function trimValuesInObject
 * @param {any} data
 * @returns trimmed the leading and trailing spaces from the data object
 */
const trimValuesInObject = (data: any) => {
  for (const property in data) {
    data[property] = trimValues(data[property]);
  }
  return data;
};

/**
 * @description trimValuesInArray method trim values inside an array
 * @function trimValuesInArray
 * @param {any} data
 * @returns trimmed the leading and trailing spaces from the data array
 */
const trimValuesInArray = (data: any) => {
  return data.map((item: any) => trimValues(item));
};

/**
 * @description trimValues method trim all the values doesn't matter on the type of data
 * @function trimValues
 * @param {any} data
 * @returns trimmed the leading and trailing spaces from the data
 */
export const trimValues = (data: any) => {
  if (Array.isArray(data)) {
    return trimValuesInArray(data);
  } else if (typeof data === 'object') {
    return trimValuesInObject(data);
  } else if (typeof data === 'string') {
    return data.trim();
  }

  return data;
};

/**
 * @description method takes array of strings and convert them into a single string seperated with provided separator
 * @function capitalizeAndJoinStrings
 * @param {any} arrayOfString
 * @returns converts array of strings into single string seperated with provided separator
 */
export function capitalizeAndJoinStrings(
  arrayOfString: string[],
  separator: string,
): string {
  if (arrayOfString.length === 0) {
    return '';
  }
  return arrayOfString
    .map((str: any) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(separator);
}

/**
 * @description gets count string for givemn count & string
 * @function getCountString
 * @param {number} count
 * @param {string} str
 * @returns Count + Plural or Singular String
 */
export const getCountString = (count: number = 0, str: string = 'Item') => {
  return `${count} ${str}${count === 1 ? '' : 's'}`;
};

/**
 * @description converts an array into array of smaller arrays
 * @function getChunks
 * @param {T[]} list array of type T
 * @param {number} size size of each smaller array/chunk
 * @returns array of arrays
 */
export function getChunks<T>(list: T[] = [], size: number = 10) {
  let remainingList: T[] = [...list];
  const chunks: T[][] = [];
  while (remainingList.length) {
    chunks.push(remainingList.slice(0, size));
    remainingList = remainingList.slice(size);
  }
  return chunks;
}

/**
 * @description escape/sanitize a string for use as a RegExp
 * @function escapeStringRegexp
 * @param {string} str string to be escaped
 * @returns {string} escapedString
 */
export function escapeStringRegexp(str: string) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

export const getSeniorResidentBaseUrl = () => {
  const {accountID, seniorID, timezone} = getCurrentSenior();

  const seniorUrlWithTab = (endpoint: string, tab: string) => {
    return `/senior/${seniorID}/${accountID}/${getQueryParamTimezone(
      timezone,
    )}/${endpoint}?tab=${tab}`;
  };

  return {seniorUrlWithTab};
};

/**
 * @description show empty - or emptyValue is value in not present
 * @function isValueAvailable
 * @param {any} value use to check is value present or not
 * @param {string} showValue use to render custom value
 * @param {string} postfix
 * @param {string} emptyValue
 * @returns {string} value or emptyValue
 */

export const isValueAvailable = ({
  value,
  showValue,
  postfix = '',
  emptyValue = '-',
}: IIsValueAvailable): string => {
  return value ? `${showValue ?? value} ${postfix}` : emptyValue;
};
