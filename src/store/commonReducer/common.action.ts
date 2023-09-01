import {push} from 'redux-first-history';
import {ISeniorLocationData} from './../../services/locationService/seniorLocationService.types';
import {
  DATE_FORMAT,
  DIALOG_TYPES,
  REGEX,
  LocationLocateMeError,
} from 'globals/global.constants';
import {
  IGetSeniorDetailPayload,
  IGetSeniorLocationParams,
  IOpenDialogProps,
} from './common.action.types';

import {
  getCurrentResidentID,
  getCurrentSenior,
  getLocalStorage,
  getTimestamp,
  setLocalStorage,
} from 'globals/global.functions';
import moment from 'moment';
import {getImage} from 'pages/WCPages/AddUser/ProfileInfo/ProfileInfo.action';
import {
  getSeniorLocationHistoryService,
  getSeniorLocationPostAPIService,
  getSeniorLocationService,
} from 'services/locationService/seniorLocationService';
import {ISeniorLocationParams} from 'services/locationService/seniorLocationService.types';
import {
  convertEndDateInUTCTz,
  convertStartDateInUTCTz,
  convertUTCSecondsToUnixNanoSeconds,
} from 'globals/date.functions';
import {INITIAL_STATE} from './common.reducer';
import {resetPasswordService} from 'services/userService/userService';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
// eslint-disable-next-line max-len
import {validateEmailAddressService} from 'services/addUserService/validateEmailAddressAndMobileService';
import {
  getBasicInfoService,
  getCareGiverService,
  getDentistInfoService,
  getDoctorInfoService,
  getMinimalInfoService,
  getPharmacyInfoService,
} from 'services/commonService/common.service';
import {getDevicesInfo} from 'pages/WCPages/AddUser/DeviceInstallation/Devices.action';
import {GetSeniorData, Roles} from 'globals/enums';
import {APPLICATION_CODE} from 'globals/applicationCodes';
import {showToast} from 'common/Toast';

export * from './seniorList/seniorList.action';
export * from './careAgentList/careAgentList.action';

export const GET_PAGINATION_DATA = 'GET_PAGINATION_DATA';
export const GET_PAGINATION_DATA_SUCCESSFUL = 'GET_PAGINATION_DATA_SUCCESSFUL';
export const GET_PAGINATION_DATA_FAILED = 'GET_PAGINATION_DATA_FAILED';
export const EMPTY_PAGINATION_DATA = 'EMPTY_PAGINATION_DATA';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const OPEN_OVERLAY_DIALOG = 'OPEN_OVERLAY_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const CLOSE_OVERLAY_DIALOG = 'CLOSE_OVERLAY_DIALOG';
export const SET_SENIOR_DETAIL = 'SET_SENIOR_DETAIL';
export const SET_CAREGIVER_INFO = 'SET_CAREGIVER_INFO';
export const SET_PROVIDER_INFO = 'SET_PROVIDER_INFO';
export const SET_SENIOR_IMAGE = 'SET_SENIOR_IMAGE';
export const EMPTY_SENIOR_DETAIL = 'EMPTY_SENIOR_DETAIL';
export const EMPTY_CAREGIVER_INFO = 'EMPTY_CAREGIVER_INFO';
export const EMPTY_PROVIDER_INFO = 'EMPTY_PROVIDER_INFO';

export const EMPTY_SENIOR_IMAGE = 'EMPTY_SENIOR_IMAGE';
export const SET_SENIOR_LOCATION = 'SET_SENIOR_LOCATION';
export const SET_SENIOR_LOCATE_ME_ERROR = 'SET_SENIOR_LOCATE_ME_ERROR';
export const EMPTY_LOCATE_ME_POST_API_RESPONSE =
  'EMPTY_LOCATE_ME_POST_API_RESPONSE';
export const EMPTY_SENIOR_LOCATION = 'EMPTY_SENIOR_LOCATION';
export const GET_MONTH_ENABLE_DATES = 'GET_MONTH_ENABLE_DATES';
export const EMPTY_LOCATION_DATES = 'EMPTY_LOCATION_DATES';

export const SET_STATIC_MESSAGES = 'SET_STATIC_MESSAGES';
export const SET_MEDICAL_CONDITION = 'SET_MEDICAL_CONDITION';
export const RESET_MEDICAL_CONDITION = 'RESET_MEDICAL_CONDITION';

/**
 * @description action creator to fetch the table data for pagination
 * @param {function} apiFn call back to get the table data
 * @param {numebr} rowsPerPage Display total number of rows in table
 * @param {string} cacheKey key to store data in localstorage
 * @param {number} currentPage current table page
 * @returns void
 */
export const getPaginationData =
  (apiFn: any, rowsPerPage: number, cacheKey: string, currentPage: number) =>
  async (dispatch: any) => {
    try {
      // get the existing data from local storage, if not empty
      let cacheData = getLocalStorage(cacheKey) || {
        data: [],
        lastEvaluatedKey: {},
      };

      // calculate the total number of pages with respect to current available data
      const totalPages = Math.ceil(cacheData.data.length / rowsPerPage);

      // if cache data is not present or current page is equal to total pages
      // get the data from api, else store existing data
      if (
        (cacheData.lastEvaluatedKey && currentPage === totalPages) ||
        !cacheData.data.length
      ) {
        dispatch({type: GET_PAGINATION_DATA});
        const res = await apiFn(cacheData.lastEvaluatedKey);
        cacheData.lastEvaluatedKey = res.lastEvaluatedKey;
        cacheData.data = [...cacheData.data, ...res.data];

        cacheData.data = cacheData.data.sort(function (a: any, b: any): any {
          return moment(b.call_time).valueOf() - moment(a.call_time).valueOf();
        });

        setLocalStorage(cacheKey, cacheData);

        dispatch({type: GET_PAGINATION_DATA_SUCCESSFUL, payload: cacheData});
      } else {
        dispatch({type: GET_PAGINATION_DATA_SUCCESSFUL, payload: cacheData});
      }
    } catch (error) {
      dispatch({type: GET_PAGINATION_DATA_FAILED});
    }
  };

/**
 * @description action creator to fetch the table data for pagination
 * @param {Function} apiFn call back to get the table data
 * @param {number} rowsPerPage Display total number of rows in table
 * @param {string} cacheKey key to store data in localstorage
 * @param {number} currentPage current table page
 * @returns void
 */
export const getPaginationDataIsolated =
  (
    apiFn: any,
    rowsPerPage: number,
    cacheKey: string,
    currentPage: number,
    onSuccess: any,
    onError: any,
    tableData?: any,
    lastEvaluatedKey?: any,
    searchQuery?: string | null,
    onSearchSuccess?: any,
  ) =>
  async (dispatch: any) => {
    if (cacheKey) {
      dispatch(
        getPaginationDataWithCache(
          apiFn,
          rowsPerPage,
          cacheKey,
          currentPage,
          onSuccess,
          onError,
        ),
      );
    } else {
      dispatch(
        getPaginationDataWithoutCache(
          apiFn,
          rowsPerPage,
          currentPage,
          onSuccess,
          onError,
          tableData,
          lastEvaluatedKey,
          searchQuery,
          onSearchSuccess,
        ),
      );
    }
  };

/**
 * @description action creator to fetch the table data for pagination
 * @param {Function} apiFn call back to get the table data
 * @param {number} currentPage current table page
 * @param {number} offset offset to fetch Data
 * @param {number} limit limit of length of data in single fetch
 * @param onSuccess
 * @param onError
 * @param tableData
 * @returns void
 */
export const getPaginationOffsetData =
  (
    apiFn: any,
    rowsPerPage: number,
    currentPage: number,
    offset: number = 0,
    limit: number = 10,
    onSuccess: any,
    onError: any,
    tableData: any,
  ) =>
  async (dispatch: any) => {
    try {
      // get the existing data from tableData, if not empty
      const data: any = {
        data: tableData.length > 0 ? [...tableData] : [],
      };
      const totalPages = Math.ceil(data.data.length / rowsPerPage);
      if ((offset >= 0 && currentPage === totalPages) || !data.data.length) {
        // runs on last page or empty data
        const res = await dispatch(apiFn(data.offset, limit));
        data.data = [...data.data, ...res.data];
        const len = res?.data?.len || 0;
        if (len < limit) {
          data.offset = -1; // -1 means stop further fetching of data
        } else {
          data.offset = offset + limit;
        }
        // onSuccess is feeded 3 params newData, newOffset, apiFn response
        dispatch(onSuccess(data.data, data.offset, res.response));
      }
    } catch (error) {
      console.log(error);
      dispatch(onError(error));
    }
  };

const getPaginationDataWithoutCache =
  (
    apiFn: any,
    rowsPerPage: number,
    currentPage: number,
    onSuccess: any,
    onError: any,
    tableData: any,
    lastEvaluatedKey: any,
    searchQuery?: string | null,
    onSearchSuccess?: any,
  ) =>
  async (dispatch: any) => {
    try {
      // get the existing data from tableData, if not empty
      const data: any = {
        data: tableData.length > 0 ? [...tableData] : [],
        lastEvaluatedKey: lastEvaluatedKey || '',
      };

      const totalPages = Math.ceil(data.data.length / rowsPerPage);
      if (
        (data.lastEvaluatedKey && currentPage === totalPages) ||
        !data.data.length
      ) {
        const res = await dispatch(apiFn(searchQuery, data.lastEvaluatedKey));

        data.lastEvaluatedKey = res.lastEvaluatedKey;
        data.data = [...data.data, ...res.data];

        if (searchQuery) {
          dispatch(onSearchSuccess(data));
        } else {
          dispatch(onSuccess(data));
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(onError(error));
    }
  };

const getPaginationDataWithCache =
  (
    apiFn: any,
    rowsPerPage: number,
    cacheKey: string,
    currentPage: number,
    onSuccess: any,
    onError: any,
  ) =>
  async (dispatch: any) => {
    try {
      // get the existing data from local storage, if not empty
      let cacheData = getLocalStorage(cacheKey) || {
        data: [],
        lastEvaluatedKey: '',
      };

      // calculate the total number of pages with respect to current available data
      const totalPages = Math.ceil((cacheData.data.length || 1) / rowsPerPage);

      // if cache data is not present or current page is equal to total pages
      // get the data from api, else store existing data
      if (
        (cacheData.lastEvaluatedKey && currentPage === totalPages) ||
        !cacheData.data.length
      ) {
        const res = await dispatch(apiFn(cacheData.lastEvaluatedKey));

        cacheData.lastEvaluatedKey = res.lastEvaluatedKey;
        cacheData.data = [...cacheData.data, ...res.data];

        setLocalStorage(cacheKey, cacheData);

        dispatch(onSuccess(cacheData));
      } else {
        dispatch(onSuccess(cacheData));
      }
    } catch (error) {
      dispatch(onError(error));
    }
  };

/**
 * @description action creator to clear out exisitng table data of particular key
 * @param {*} cacheKey local storage key to remove.
 * @returns void
 */
export const emptyPaginationData =
  (cacheKey: string) => (dispatch: any, getState: any) => {
    const currentSeniorId =
      getState().common?.seniorDetail?.minimalInfo?.user_id;
    localStorage.removeItem(`${cacheKey}-${currentSeniorId}`);
    dispatch({type: EMPTY_PAGINATION_DATA});
  };

/**
 * @description action to open the dialog(pop-up)
 * @param {string} message message which needs to display
 * @param {DIALOG_TYPES} dialogType type of dialog to open
 * @returns void
 */
export const openDialog =
  ({
    firstMessage,
    boldMessage,
    secondMessage,
    onSuccessButton,
    cancelButtonText,
    successButtonText,
    type,
    isFailButton,
    data,
    dialogTitle,
    showAlertIcon,
    id,
  }: IOpenDialogProps) =>
  (dispatch: any) => {
    dispatch({
      type: OPEN_DIALOG,
      payload: {
        firstMessage,
        boldMessage,
        secondMessage,
        type,
        onSuccessButton,
        successButtonText,
        cancelButtonText,
        isFailButton,
        data,
        dialogTitle,
        showAlertIcon,
        id,
      },
    });
  };

export const closeDialog = () => (dispatch: any) => {
  dispatch({type: CLOSE_DIALOG});
};

export const openOverlayDialog =
  ({
    firstMessage,
    secondMessage,
    data,
    type,
    isAutoSave,
    isLogout,
  }: IOpenDialogProps) =>
  (dispatch: any) => {
    if (isAutoSave) {
      dispatch(showToast('Auto Saved Successfully!', 'success'));
    } else {
      dispatch({
        type: OPEN_OVERLAY_DIALOG,
        payload: {
          firstMessage,
          secondMessage,
          data,
          type,
          isLogout,
        },
      });
    }
  };

export const closeOverlayDialog = () => (dispatch: any) => {
  dispatch({type: CLOSE_OVERLAY_DIALOG});
};

export const setSeniorDetail =
  (...args: GetSeniorData[]) =>
  async (dispatch: any, getState: any) => {
    const userRole: Roles[] = getState().auth.userRole;

    if (args.length === 0) {
      dispatch(fetchSeniorDetail());
      dispatch(getDevicesInfo());

      // do not call getCareGiver & getProviderDetail for Warehouse employee and BDM
      if (
        !userRole.includes(Roles.WarehouseEmployee) &&
        !userRole.includes(Roles.BDM)
      ) {
        dispatch(getCareGiver());
        dispatch(getProviderDetail());
      }

      return;
    }

    if (args.includes(GetSeniorData.SENIOR)) {
      dispatch(fetchSeniorDetail());
    }

    if (args.includes(GetSeniorData.CAREGIVER)) {
      dispatch(getCareGiver());
    }

    if (args.includes(GetSeniorData.PROVIDER)) {
      dispatch(getProviderDetail());
    }

    if (args.includes(GetSeniorData.DEVICES)) {
      dispatch(getDevicesInfo());
    }
  };

export const fetchSeniorDetail = (param?: any) => async (dispatch: any) => {
  const {accountID, seniorID} = getCurrentSenior();
  dispatch(showApplicationLoader());
  try {
    const params: IGetSeniorDetailPayload = {
      senior_id: param ? param.seniorID : seniorID,
      account_id: param ? param.accountID : accountID,
    };

    const minimalInfo = await getMinimalInfoService(params);
    const basicInfo = await getBasicInfoService(params);

    dispatch({
      type: SET_SENIOR_DETAIL,
      payload: {
        seniorDetail: {
          minimalInfo,
          basicInfo,
        },
      },
    });
    dispatch(hideApplicationLoader());
    return {
      minimalInfo,
      basicInfo,
    };
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

export const getCareGiver = () => async (dispatch: any) => {
  const {accountID, seniorID} = getCurrentSenior();
  dispatch(showApplicationLoader());
  try {
    const params: IGetSeniorDetailPayload = {
      senior_id: seniorID,
      account_id: accountID,
    };

    const careGiverInfo = await getCareGiverService(params);
    dispatch({
      type: SET_CAREGIVER_INFO,
      payload: {
        careGiverInfo: careGiverInfo,
      },
    });
    dispatch(hideApplicationLoader());
    return careGiverInfo;
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

export const getProviderDetail = () => async (dispatch: any) => {
  const {accountID, seniorID} = getCurrentSenior();
  dispatch(showApplicationLoader());
  try {
    const params: IGetSeniorDetailPayload = {
      senior_id: seniorID,
      account_id: accountID,
    };

    const doctorInfo = await getDoctorInfoService(params);
    const dentistInfo = await getDentistInfoService(params);
    const pharmacyInfo = await getPharmacyInfoService({
      senior_id: params.senior_id,
    });

    dispatch({
      type: SET_PROVIDER_INFO,
      payload: {
        providerInfo: {
          doctor: doctorInfo,
          dentist: dentistInfo,
          pharmacy: pharmacyInfo,
        },
      },
    });
    dispatch(hideApplicationLoader());
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

export const setSeniorImage = () => async (dispatch: any) => {
  const seniorInfo = {...getCurrentSenior()};
  const image = await dispatch(
    getImage({
      senior_id: seniorInfo.seniorID,
      account_id: seniorInfo.accountID,
    }),
  );

  const profileImage = image.images?.find(
    (data: any) => data?.image_id === image.profile.id,
  );
  dispatch({
    type: SET_SENIOR_IMAGE,
    payload: {
      profilePic: {
        format: profileImage?.format,
        image: profileImage?.image_body || '',
      },
    },
  });
};

export const emptySeniorDetail = () => (dispatch: any) => {
  dispatch({
    type: EMPTY_SENIOR_DETAIL,
  });
  dispatch({
    type: EMPTY_CAREGIVER_INFO,
  });
  dispatch({
    type: EMPTY_PROVIDER_INFO,
  });
};

export const emptySeniorImage = () => (dispatch: any) => {
  dispatch({
    type: EMPTY_SENIOR_IMAGE,
  });
};

/**
 * @function getSeniorFullName
 * @description action creator to get full name of senior
 * @returns {string} senior full name
 */
export const getSeniorFullName = () => (dispatch: any, getState: any) => {
  const {
    name: {first_name, last_name, middle_name},
  } = getState().common.seniorDetail.minimalInfo;

  return `${first_name ? first_name : ''} ${middle_name ? middle_name : ''} ${
    last_name ? last_name : ''
  }`;
};

/**
 * @function getSeniorLocation
 * @description action creator to get senior location
 * @returns void
 */
export const getSeniorLocation =
  ({
    isHistory = false,
    date,
    startTime,
    endTime,
    isResident = false,
  }: IGetSeniorLocationParams) =>
  async (dispatch: any, getState: any) => {
    const {
      radius: {value},
    } = getState().common.seniorDetail.basicInfo;

    if (!value) {
      return;
    }
    try {
      const {accountID, seniorID, timezone} = isResident
        ? getCurrentResidentID()
        : getCurrentSenior();

      const {coordinates: homeCoordinates} =
        getState().common.seniorDetail.minimalInfo.address;
      const {radius} = getState().common.seniorDetail.basicInfo;

      const start_timestamp = convertUTCSecondsToUnixNanoSeconds(
        convertStartDateInUTCTz(
          moment(date).format(DATE_FORMAT),
          timezone,
          startTime,
        ),
      );

      const end_timestamp = convertUTCSecondsToUnixNanoSeconds(
        convertEndDateInUTCTz(
          moment(date).format(DATE_FORMAT),
          timezone,
          endTime,
        ),
      );

      const params: ISeniorLocationParams = {
        start_timestamp, //1626750309000000000
        end_timestamp, //1628313586000000000
        senior_id: seniorID || '',
        account_id: accountID || '',
        history: isHistory,
        home_lat: homeCoordinates.latitude,
        home_lng: homeCoordinates.longitude,
        home_radius: radius.value,
        home_radius_unit: radius.radius_measurement,
        timezone: timezone || '',
      };
      dispatch({type: EMPTY_SENIOR_LOCATION});
      let seniorLocationData: ISeniorLocationData =
        await getSeniorLocationService(params);

      if (!homeCoordinates.latitude) {
        seniorLocationData = {...INITIAL_STATE.seniorLocation.locationData};
      }
      dispatch({
        type: SET_SENIOR_LOCATION,
        payload: {
          seniorLocation: {
            locationData: {
              ...seniorLocationData,
            },
          },
        },
      });
    } catch (error) {
      console.error({error});
      return error;
    }
  };

export const postLocationAPICall = () => async (dispatch: any) => {
  const {seniorID} = getCurrentSenior();
  try {
    const params = {
      senior_id: seniorID,
    };

    dispatch(emptyPostApiResponse());
    dispatch(showApplicationLoader());

    const seniorLocateMeError = await getSeniorLocationPostAPIService(params);
    dispatch(hideApplicationLoader());
    dispatch(setSeniorLocateMeError(seniorLocateMeError));
  } catch (error) {
    dispatch(hideApplicationLoader());

    const errorCode = error?.response?.data?.application_code;

    if (errorCode === APPLICATION_CODE.deviceNotReachableCode) {
      dispatch(
        setSeniorLocateMeError(LocationLocateMeError.deviceNotReachable),
      );
    } else {
      dispatch(
        setSeniorLocateMeError(LocationLocateMeError.locationNotFetched),
      );
    }
  }
};

export const setSeniorLocateMeError =
  (errorMessage: string) => (dispatch: any) => {
    dispatch({
      type: SET_SENIOR_LOCATE_ME_ERROR,
      payload: {
        seniorLocation: {
          locateMeResponse: errorMessage,
        },
      },
    });
  };

export const emptyPostApiResponse = () => async (dispatch: any) => {
  dispatch({type: EMPTY_LOCATE_ME_POST_API_RESPONSE});
};

export const resetSeniorLocation = () => (dispatch: any) => {
  dispatch({type: EMPTY_SENIOR_LOCATION});
};

export const resetLocationDates = () => (dispatch: any) => {
  dispatch({type: EMPTY_LOCATION_DATES});
};

/**
 * @function getSeniorCalenderDates
 * @description action creator to get all dates which has location data for a particular month
 * @returns void
 */
export const getSeniorCalenderDates = (month: any) => async (dispatch: any) => {
  const {accountID, seniorID, timezone} = getCurrentSenior();

  const start_timestamp = convertUTCSecondsToUnixNanoSeconds(
    convertStartDateInUTCTz(
      moment(month).startOf('month').format(DATE_FORMAT),
      timezone,
    ),
  );
  const end_timestamp = convertUTCSecondsToUnixNanoSeconds(
    convertEndDateInUTCTz(
      moment(month).endOf('month').format(DATE_FORMAT),
      timezone,
    ),
  );
  const monthKey = moment(getTimestamp(start_timestamp))
    .tz(timezone || moment.tz.guess())
    .format('MM-YYYY');
  const params = {
    senior_id: seniorID,
    account_id: accountID,
    start_timestamp,
    end_timestamp,
    timezone,
  };
  let seniorLocationDates = await getSeniorLocationHistoryService(params);
  await dispatch({
    type: GET_MONTH_ENABLE_DATES,
    payload: {
      calenderDates: {[`${monthKey}`]: {...seniorLocationDates}},
    },
  });
  return seniorLocationDates.calenderDates;
};

export const resetPassword =
  (otp: any, email: any, password: any) => async (dispatch: any) => {
    const params = {
      reset_code: otp,
      email: email,
      password: password,
    };
    try {
      dispatch(showApplicationLoader());
      await resetPasswordService(params);
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `You have successfully changed your password.`,
          secondMessage: `Please login again`,
        }),
      );
      dispatch(push('/login'));
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
      return error;
    }
  };

export const showError = (error: any) => (dispatch: any) => {
  dispatch(
    openOverlayDialog({
      type: DIALOG_TYPES.ERROR,
      data: {
        errorCode: error?.response?.data?.application_code,
        errorMessage: error?.response?.data?.message,
      },
    }),
  );
};

export const isValidEmail = (email: string) => async (dispatch: any) => {
  const param = {
    email: email,
  };
  try {
    dispatch(showApplicationLoader());
    let emailExist = false;
    if (RegExp(REGEX.EMAIL).test(email)) {
      const response = await validateEmailAddressService(param);
      emailExist = response.data.email_exists;
    }
    dispatch(hideApplicationLoader());
    return emailExist;
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
    return true;
  }
};
