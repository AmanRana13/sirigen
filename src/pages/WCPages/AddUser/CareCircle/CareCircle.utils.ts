import get from 'lodash.get';
import {
  emptyStringToNull,
  maskPhoneNumber,
  unmaskPhoneNumber,
} from 'globals/global.functions';
import {CaregiverType} from 'globals/enums';
import {
  ICareCircleRadioArray,
  ICareGiverData,
  IFetchCareGiverData,
} from './CareCircle.type';
/**
 * @description function to group caregiverData on the basis of property
 * @param objectArray
 * @param property
 * @returns
 */
export const groupBy = (objectArray: ICareGiverData[], property: string) => {
  return objectArray.reduce(function (acc: any, obj: any) {
    let key = get(obj, property);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

/**
 * @description to get caregiver list on the basis of primary caregiver
 * @param caregivers
 * @returns
 */
export const sortCareGiverInfo = (caregivers: ICareGiverData[]) => {
  return caregivers.sort(function (a: ICareGiverData, b: ICareGiverData) {
    if (
      a.senior_info.caregiver_type == CaregiverType.PRIMARY &&
      b.senior_info.caregiver_type !== CaregiverType.PRIMARY
    ) {
      return -1;
    }
    if (
      a.senior_info.caregiver_type != CaregiverType.PRIMARY &&
      b.senior_info.caregiver_type == CaregiverType.PRIMARY
    ) {
      return 1;
    }
    return 0;
  });
};

/**
 * @function getMaskedCareGiver
 * @description to get caregiver with masked phone numbers
 * @param {ICareGiverData} caregiver
 * @returns {ICareGiverData} caregiver
 */
export const getMaskedCareGiver = (
  careGiver: ICareGiverData,
): ICareGiverData => {
  const {basic_info: basicInfo, senior_info: seniorInfo} = careGiver;
  const response: ICareGiverData = {
    ...careGiver,
    basic_info: {
      mobile_number: maskPhoneNumber(basicInfo?.mobile_number),
      email: basicInfo?.email,
      gender: basicInfo?.gender,
      location: basicInfo?.location,
      name: basicInfo?.name,
    },
    senior_info: {
      alternate_number: maskPhoneNumber(seniorInfo?.alternate_number),
      best_day_to_contact: seniorInfo?.best_day_to_contact || '',
      best_time_to_contact: seniorInfo?.best_time_to_contact || '',
      caregiver_type: seniorInfo?.caregiver_type,
      emergency_contact: seniorInfo?.emergency_contact,
      has_power_of_attorney: seniorInfo?.has_power_of_attorney,
      is_living_with_senior: seniorInfo?.is_living_with_senior,
      relationship_with_senior: seniorInfo?.relationship_with_senior,
    },
  };
  return response;
};

/**
 * @description to get sequenced list of caregivers
 * @param careGiverList
 * @returns
 */
export const sequenceCaregiverInfo = (careGiverList: any) => {
  if (careGiverList && careGiverList.length > 0) {
    let priorityCareGivers: any = [];
    const SequenceCareGivers = groupBy(
      careGiverList,
      'senior_info.contact_priority_sequence',
    );
    const keys = Object.keys(SequenceCareGivers).sort(function (
      a: any,
      b: any,
    ) {
      return a - b;
    });
    keys.forEach((key) => {
      const caregivers = sortCareGiverInfo(SequenceCareGivers[`${key}`]);
      priorityCareGivers = [...priorityCareGivers, ...caregivers];
    });
    return priorityCareGivers.map(getMaskedCareGiver);
  }
  return null;
};

/**
 * @function fetchCaregivers,
 * @description to get updated value of caregiver
 * @param IFetchCareGiverData (data)
 * @param IFormData[] (forms)
 * @param string emergencyContactCareGiverId
 * @returns addition Array and modification array
 */
export const fetchCaregivers = (
  data: IFetchCareGiverData,
  careCircleRadioArray: ICareCircleRadioArray[],
  emergencyContactCareGiverId: string,
) => {
  let addition: ICareGiverData[] = [];
  let modification: ICareGiverData[] = [];
  data?.caregivers.forEach((caregiver: ICareGiverData, index: number) => {
    caregiver.basic_info.mobile_number = unmaskPhoneNumber(
      caregiver?.basic_info?.mobile_number || '',
    );
    caregiver.senior_info.alternate_number = unmaskPhoneNumber(
      caregiver?.senior_info?.alternate_number || '',
    );
    caregiver.senior_info.caregiver_type = careCircleRadioArray[index].value;
    caregiver.senior_info.is_living_with_senior =
      careCircleRadioArray[index].livingWithSenior;
    caregiver.senior_info.has_power_of_attorney =
      careCircleRadioArray[index].powerOfAttorney;
    caregiver.senior_info.emergency_contact =
      careCircleRadioArray[index].emergencyContact;

    if (caregiver.caregiver_id) {
      modification.push(emptyStringToNull(caregiver));

      if (caregiver.caregiver_id === emergencyContactCareGiverId) {
        modification[index].senior_info['emergency_contact'] = true;
      } else {
        modification[index].senior_info['emergency_contact'] = false;
      }
    } else {
      addition.push(emptyStringToNull(caregiver));
    }
  });
  return {addition, modification};
};
