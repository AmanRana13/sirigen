import {API} from 'globals/api';
import {SENIOR_SERVICE_END_POINTS} from 'globals/apiEndPoints';

/**
 * @function getCareGiverService
 * @description method to get care giver data via api response.
 * @param {*} params
 * @returns caregiver accounts.
 */
export async function getCareGiverService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_CARE_GIVER,
      method: 'get',
      params: params,
    });

    const results = response.data.caregivers;
    return mapCareGiverPayload(results);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * @function getMinimalInfoService
 * @description method to get minimal info via api response.
 * @param {*} params
 * @returns minimal info.
 */
export async function getMinimalInfoService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_MINIMAL_INFO,
      method: 'get',
      params: params,
    });

    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * @function getBasicInfoService
 * @description method to get basic info via api response.
 * @param {*} params
 * @returns basic info.
 */
export async function getBasicInfoService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_BASIC_INFO,
      method: 'get',
      params: params,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * @function getDoctorInfoService
 * @description method to get doctor info via api response.
 * @param {*} params
 * @returns doctor info.
 */
export async function getDoctorInfoService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_DOCTOR_INFO,
      method: 'get',
      params: params,
    });
    return mapProviderPayload(response.data);
  } catch (error) {
    return error;
  }
}

/**
 * @function getPharmacyInfoService
 * @description method to get pharmacy info via api response.
 * @param {*} params
 * @returns pharmacy info.
 */
export async function getPharmacyInfoService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_PHARMACY_INFO,
      method: 'get',
      params: params,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

/**
 * @function getDentistInfoService
 * @description method to get dentist info via api response.
 * @param {*} params
 * @returns dentist info.
 */
export async function getDentistInfoService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_DENTIST_INFO,
      method: 'get',
      params: params,
    });
    return mapProviderPayload(response.data);
  } catch (error) {
    return error;
  }
}

const mapCareGiverPayload = (payload: any) => {
  return payload?.map((data: any) => {
    return {
      id: data.caregiver_id,
      name: {
        firstName: data.basic_info.name.first_name,
        middleName: data.basic_info.name.middle_name,
        lastName: data.basic_info.name.last_name,
      },
      caregiverType: data.senior_info.caregiver_type,
      emergencyContact: data.senior_info.emergency_contact,
      mobileNumber: data.basic_info.mobile_number,
      alternateNumber: data.basic_info.alternate_number,
      relationship: data.senior_info.relationship_with_senior,
    };
  });
};

const mapProviderPayload = (payload: any) => {
  return payload?.map((data: any) => {
    return {
      id: data.provider_id,
      name: {
        firstName: data.name.first_name,
        middleName: data.name.middle_name,
        lastName: data.name.last_name,
      },
      contactPhone: data.contact_phone,
      providerName: data.provider_name,
      speciality: data.speciality,
      isPrimary: data.is_primary,
    };
  });
};
