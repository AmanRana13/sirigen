import {
  ACTIVITY_CONDITION,
  HEART_RATE_CONDITION,
  SLEEP_CONDITION,
  WEIGHT_CONDITION,
  WELLNESS_CONDITION,
} from 'globals/enums';
import get from 'lodash.get';

/**
 * @description function to get Heart Rate Verbiage from given heart rate & threshold value
 * @param currentHeartRate
 * @param threshold
 * @returns an object {heartRate: value}
 */
export const getHeartRateVerbiage = (currentHeartRate: any, threshold: any) => {
  const newConditions: any = {};
  const upper = get(threshold, 'heart_rate_measurement.upper', '');
  const lower = get(threshold, 'heart_rate_measurement.lower', '');
  if (typeof currentHeartRate === 'number') {
    if (typeof upper === 'number' && typeof lower === 'number') {
      if (currentHeartRate > upper) {
        newConditions.heartRate = HEART_RATE_CONDITION.HIGH;
      } else if (currentHeartRate < lower) {
        newConditions.heartRate = HEART_RATE_CONDITION.LOW;
      } else {
        newConditions.heartRate = HEART_RATE_CONDITION.GOOD;
      }
    }
  }
  return newConditions;
};

/**
 * @description function to get Weight Verbiage from given currentWeight & lastWeight value
 * @param currentWeight
 * @param lastWeight
 * @returns an object {weight: value}
 */
export const getWeightVerbiage = (currentWeight: any, lastWeight: any) => {
  const newConditions: any = {};
  if (typeof currentWeight === 'number' && currentWeight !== 0) {
    if (typeof lastWeight === 'number' && lastWeight !== 0) {
      if (currentWeight > lastWeight) {
        newConditions.weight = WEIGHT_CONDITION.INCREASE;
      } else if (currentWeight < lastWeight) {
        newConditions.weight = WEIGHT_CONDITION.DECREASE;
      } else {
        newConditions.weight = WEIGHT_CONDITION.NO_CHANGE;
      }
    } else {
      newConditions.weight = WEIGHT_CONDITION.NO_CHANGE;
    }
  }
  return newConditions;
};

/**
 * @description function to get Sleep Verbiage from given currentSleepScore
 * @param currentSleepScore
 * @returns an object {sleep: value}
 */
export const getSleepVerbiage = (currentSleepScore: any) => {
  const newConditions: any = {};
  if (typeof currentSleepScore === 'number') {
    if (currentSleepScore > 80) {
      newConditions.sleep = SLEEP_CONDITION.GOOD;
    } else if (currentSleepScore > 50) {
      newConditions.sleep = SLEEP_CONDITION.AVERAGE;
    } else {
      newConditions.sleep = SLEEP_CONDITION.POOR;
    }
  }
  return newConditions;
};

/**
 * @description function to get Activity Verbiage from given currentActivityScore
 * @param currentActivityScore
 * @returns an object {activity: value}
 */
export const getActivityVerbiage = (currentActivityScore: any) => {
  const newConditions: any = {};
  if (typeof currentActivityScore === 'number') {
    if (currentActivityScore > 0) {
      newConditions.activity = ACTIVITY_CONDITION.GOOD;
    } else {
      newConditions.activity = ACTIVITY_CONDITION.CONCERN;
    }
  }
  return newConditions;
};
/**
 * @description function to get Wellness Verbiage from given currentWellnessScore
 * @param score
 * @returns an object {wellness: value}
 */
export const getWellnessVerbiage = (score: number) => {
  const newConditions: any = {};
  if (score <= 3) {
    newConditions.wellness = WELLNESS_CONDITION.CONCERN;
  } else if (score === 4) {
    newConditions.wellness = WELLNESS_CONDITION.GOOD;
  } else if (score > 4) {
    newConditions.wellness = WELLNESS_CONDITION.POSITIVE;
  }
  return newConditions;
};
