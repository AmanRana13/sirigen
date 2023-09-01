export const BUSINESS_VOILATION_CODE = 2032;

export const ASSESSMENT_TIME_DIFF = 24;

/**
 * @description map application codes
 * @param {number} a business code
 * @param {number} b feature code
 * @returns number
 */
const mapApplicationNumber = (a: number, b: number) => Number(`${a}.${b}`);

export const APPLICATION_CODE = {
  multipleSurveyCode: mapApplicationNumber(BUSINESS_VOILATION_CODE, 3001),
  callScheduleCAConflictCode: mapApplicationNumber(
    BUSINESS_VOILATION_CODE,
    3002,
  ),
  callScheduleUserConflictCode: mapApplicationNumber(
    BUSINESS_VOILATION_CODE,
    3003,
  ),
  deviceNotReachableCode: 2046,
};
