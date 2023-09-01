import moment from 'moment';
import {
  DATE_FORMAT,
  timezoneAbbrsFullname,
  TIME_FORMAT,
} from './global.constants';
import {getTimestamp} from './global.functions';

/**
 * @description get date in utc format
 * @param {date} date required date
 * @returns utc formated date
 */
export const convertDateInUTC = (date: string) => {
  const currentUTCOffset = moment(date).format('Z');
  const currentDate = moment(date).format('L');
  return moment(`${currentDate} 00:00:00${currentUTCOffset}`).format();
};

/**
 * @description check if date is valid or not
 * @param {date} date required date
 * @returns NaN or time in milisenconds
 */
export const validateDate = (date: string) => {
  return Date.parse(date);
};

/**
 * @description fn to add the value in date
 * @param {date|undefined} date required date
 * @param {number} numberOfdays days to increase by
 * @param {string} type days || months || years
 * @returns updated increased date
 */
export const addDate = (date: any, numberOfdays: any, type: any) => {
  if (!date) {
    return null;
  }
  return moment(date).add(numberOfdays, type);
};

/**
 * @description fn to subtract the value from date
 * @param {date} date required date
 * @param {number} numberOfdays days to decrease by
 * @param {string} type days || months || years
 * @returns updated subtracted date
 */
export const subtractDate = (date: any, numberOfdays: any, type: any) => {
  if (!date) {
    return null;
  }
  return moment(date).subtract(numberOfdays, type);
};

/**
 * @description convert nanosecond to milisecond
 * @returns converted time
 */
export const convertNanoSecondsToMiliSeconds = (nanoSecond: any) => {
  return nanoSecond / 1000000;
};

/**
 * @description convert millisecond to nanosecond
 * @returns converted time
 */
export const convertMiliSecondsToNanoSeconds = (nanoSecond: any) => {
  return nanoSecond * 1000000;
};

/**
 * @description convert unix second to nanosecond
 * @returns converted time
 */
export const convertUTCSecondsToUnixNanoSeconds = (seconds: any) => {
  const unix = moment(seconds).unix();
  return unix * 1000000000;
};

/**
 * @description get client(BROWSER) timezone
 * @returns get client timezone
 */
export const getClientTimezone = () => moment.tz.guess();

/**
 * @description convert date to senior tz start day
 * @param {*} date
 * @param {string | undefined} timezone
 * @returns Date
 */
export const convertStartDateInUTCTz = (
  date: any,
  timezone: any,
  time = '00:00:00',
) => {
  if (timezone) {
    const currentUTCOffset = moment(date).tz(timezone).format('Z');
    const currentDate = moment(date).format('L');

    return moment(`${currentDate} ${time}${currentUTCOffset}`)
      .tz(timezone)
      .format();
  }
  return '';
};

/**
 * @description convert date to senior tz end day
 * @param {*} date
 * @param {string | undefined } timezone
 * @returns Date
 */
export const convertEndDateInUTCTz = (
  date: any,
  timezone: string | undefined,
  endTime = '23:59:59',
) => {
  if (timezone) {
    const currentUTCOffset = moment(date).tz(timezone).format('Z');
    const currentDate = moment(date).format('L');

    return moment(`${currentDate} ${endTime}${currentUTCOffset}`)
      .tz(timezone)
      .format();
  }
  return '';
};

/**
 * @description get date and time both
 * @param {*} date
 * @returns date and time
 */
export const getFormatedDateTime = (date: any) =>
  moment(date).format(`${DATE_FORMAT} ${TIME_FORMAT}`);

/**
 * @description get date
 * @function getFormattedDate
 * @param {*} date
 * @returns date
 */
export const getFormattedDate = (date: any, format = DATE_FORMAT) => {
  if (!date) return '';
  const len = date.toString().length;
  const dt = parseInt(date);

  if (len === 19) {
    return moment(getTimestamp(dt)).format(`${format}`);
  }
  return moment(dt).format(`${format}`);
};

/**
 * @description function to get timezone long name
 * @function getTimezoneFullAbbr
 * @param {string} timezone
 * @returns {string} timezone full name
 */
export const getTimezoneFullAbbr = (timezone: string) => {
  const timezoneAbbrv = moment.tz([2012, 0], timezone).format('z');

  return `${timezoneAbbrsFullname[timezoneAbbrv]}(${timezoneAbbrv})`;
};

/**
 * @description function to get timezone name
 * @function getTimezoneName
 * @param {string} timezone
 * @returns {string} timezone full name
 */
export const getTimezoneName = (timezone: string) => {
  const timezoneAbbrv = moment.tz([2012, 0], timezone).format('z');

  return `${timezoneAbbrsFullname[timezoneAbbrv]}`;
};
