import {LocationStatus, ZoneType} from 'globals/enums';
import {API_LOAD_STATE} from 'globals/global.constants';
import {
  CLOSE_DIALOG,
  EMPTY_PAGINATION_DATA,
  GET_PAGINATION_DATA,
  GET_PAGINATION_DATA_SUCCESSFUL,
  OPEN_DIALOG,
  OPEN_OVERLAY_DIALOG,
  CLOSE_OVERLAY_DIALOG,
  SET_SENIOR_DETAIL,
  SET_SENIOR_IMAGE,
  EMPTY_SENIOR_DETAIL,
  EMPTY_CAREGIVER_INFO,
  EMPTY_PROVIDER_INFO,
  EMPTY_SENIOR_IMAGE,
  SET_SENIOR_LOCATION,
  SET_SENIOR_LOCATE_ME_ERROR,
  EMPTY_LOCATE_ME_POST_API_RESPONSE,
  EMPTY_SENIOR_LOCATION,
  GET_MONTH_ENABLE_DATES,
  EMPTY_LOCATION_DATES,
  SET_CAREGIVER_INFO,
  SET_PROVIDER_INFO,
  SET_MEDICAL_CONDITION,
  RESET_MEDICAL_CONDITION,
  GET_SENIOR_LIST,
  GET_SENIOR_LIST_FAIL,
  GET_SENIOR_LIST_SUCCESS,
  GET_SENIOR_SEARCH_LIST_SUCCESS,
  RESET_SENIOR_LIST,
  UPDATE_SENIOR_LIST_PAGE_NUMBER,
  GET_CARE_AGENT_LIST,
  GET_CARE_AGENT_LIST_SUCCESS,
  GET_CARE_AGENT_SEARCH_LIST_SUCCESS,
  GET_CARE_AGENT_LIST_FAIL,
  UPDATE_CARE_AGENT_LIST_PAGE_NUMBER,
  RESET_CARE_AGENT_LIST,
  SET_HOME_WC,
  SENIOR_HOME_SEARCH,
  RESET_HOME_SEARCH,
  SET_HOME_ZONE,
  SET_SENIOR_ZONE,
} from './common.action';
import {capitalizeFirstLetter} from 'globals/global.functions';

export const INITIAL_STATE = {
  currentTableData: {
    data: [],
    lastEvaluatedKey: '',
    loadingStatus: API_LOAD_STATE.NOT_LOADED,
  },
  dialog: {
    isOpen: false,
    type: '',
    isFailButton: true,
    data: {},
  },
  overlayDialog: {
    isOpen: false,
    type: '',
    firstMessage: '',
    secondMessage: '',
    data: {},
  },
  seniorDetail: {
    basicInfo: {
      user_id: '',
      height: {
        feet: '',
        inch: '',
      },
      weight: '',
      academic_level: '',
      career: '',
      primary_spoken_language: '',
      other_spoken_language: '',
      preferred_name: '',
      home_phone: '',
      emergency_phone: null,
      email: '',
      faith: '',
      other_faith: null,
      home_technology: '',
      race: '',
      other_race: null,
      pets: [],
      other_pets: '',
      social_media_links: [],
      life_event: '',
      home_entry: '',
      created_date: '',
      radius: {
        value: '',
        radius_measurement: '',
      },
    },
    minimalInfo: {
      name: {
        first_name: '',
        last_name: '',
        middle_name: '',
      },
      mobile_number: '',
      gender: '',
      dob: '',
      user_id: '',
      account_id: '',
      created_date: '',
      email: '',
      address: {
        state: '',
        city: '',
        street: '',
        zipcode: '',
        timezone: '',
        coordinates: {
          latitude: '',
          longitude: '',
        },
      },
      isResident: false,
      zone: ZoneType.WHITE,
    },
    isLoading: true,
    nameInitials: '',
  },
  careGiverInfo: [],
  medicalConditions: [],
  providerInfo: {
    doctor: [],
    dentist: [],
    pharmacy: [],
  },
  profilePic: {
    format: '',
    image: '',
  },
  seniorLocation: {
    locationData: {
      atHome: LocationStatus.NO_LOCATION,
      currentCoordinates: {
        latitude: null,
        longitude: null,
        timestamp: null,
      },
      timeAwayFromHome: null,
      lastUpdated: null,
      historyData: [],
    },
    calenderDates: [],
    locateMeResponse: '',
  },
  seniorList: {
    data: [],
    lastEvaluatedKey: '',
    searchLastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
    selectedHomeWc: {
      fullName: 'All Wellness Coaches',
      userId: '',
    },
    selectedHomeZone: '',
    seniorHomeSearch: '',
  },
  careAgentList: {
    data: [],
    lastEvaluatedKey: '',
    searchLastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
  },
};

const constructSeniorListOnZoneChange = (state: any, payload: any) => {
  const newSeniorList =
    state?.seniorList?.data?.map((seniorData: any) => {
      const seniorId = payload?.seniorId;
      if (seniorId === seniorData.senior_id) {
        return {
          ...seniorData,
          minimal: {
            ...seniorData.minimal,
            zone: payload?.zone || '',
          },
        };
      } else {
        return {
          ...seniorData,
        };
      }
    }) || [];
  return newSeniorList;
};

export const commonReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_PAGINATION_DATA:
      return {
        ...state,
        currentTableData: {
          ...state.currentTableData,
          loadingStatus: API_LOAD_STATE.PROGRESS,
        },
      };

    case GET_PAGINATION_DATA_SUCCESSFUL:
      return {
        ...state,
        currentTableData: {
          ...state.currentTableData,
          loadingStatus: API_LOAD_STATE.SUCCESSFUL,
          ...action.payload,
        },
      };

    case EMPTY_PAGINATION_DATA:
      return {
        ...state,
        currentTableData: {
          ...state.currentTableData,
          data: [],
          lastEvaluatedKey: {},
          loadingStatus: API_LOAD_STATE.NOT_LOADED,
        },
      };

    case OPEN_DIALOG: {
      return {
        ...state,
        dialog: {
          ...state.dialog,
          isOpen: true,
          dialogTitle: action.payload.dialogTitle,
          type: action.payload.type,
          firstMessage: action.payload.firstMessage,
          data: action.payload.data,
          boldMessage: action.payload.boldMessage,
          secondMessage: action.payload.secondMessage,
          onSuccessButton: action.payload.onSuccessButton,
          successButtonText: action.payload.successButtonText,
          cancelButtonText: action.payload.cancelButtonText,
          isFailButton: action.payload.isFailButton,
          showAlertIcon: action.payload.showAlertIcon,
          id: action.payload.id,
        },
      };
    }
    case OPEN_OVERLAY_DIALOG: {
      return {
        ...state,
        overlayDialog: {
          ...state.overlayDialog,
          isOpen: true,
          type: action.payload.type,
          firstMessage: action.payload.firstMessage,
          secondMessage: action.payload.secondMessage,
          data: action.payload.data,
          isLogout: action.payload.isLogout,
        },
      };
    }

    case CLOSE_DIALOG: {
      return {
        ...state,
        dialog: {
          ...state.dialog,
          isOpen: false,
          dialogTitle: '',
          type: '',
          firstMessage: '',
          boldMessage: '',
          secondMessage: '',
          successButtonText: '',
          onSuccessButton: () => null,
          isFailButton: true,
        },
      };
    }
    case CLOSE_OVERLAY_DIALOG: {
      return {
        ...state,
        overlayDialog: {
          ...state.overlayDialog,
          isOpen: false,
          type: '',
          firstMessage: '',
          secondMessage: '',
        },
      };
    }
    //@TODO need to move this logic into services
    case SET_SENIOR_DETAIL:
      return {
        ...state,
        seniorDetail: {
          ...state.seniorDetail,
          isLoading: false,
          nameInitials: `${action.payload.seniorDetail?.minimalInfo?.name?.first_name.charAt(
            0,
          )} ${action.payload.seniorDetail?.minimalInfo?.name?.last_name.charAt(
            0,
          )}`,
          basicInfo: {
            ...state.seniorDetail.basicInfo,
            user_id: action.payload.seniorDetail?.basicInfo?.user_id,
            height: {
              feet: action.payload.seniorDetail?.basicInfo?.height?.feet || 0,
              inch: action.payload.seniorDetail?.basicInfo?.height?.inch || 0,
            },
            weight: action.payload.seniorDetail?.basicInfo?.weight,

            academic_level:
              action.payload.seniorDetail?.basicInfo?.academic_level,
            career: action.payload.seniorDetail?.basicInfo?.career,
            primary_spoken_language:
              action.payload.seniorDetail?.basicInfo?.primary_spoken_language,
            other_spoken_language:
              action.payload.seniorDetail?.basicInfo?.other_spoken_language,
            preferred_name:
              action.payload.seniorDetail?.basicInfo?.preferred_name,
            home_phone: action.payload.seniorDetail?.basicInfo?.home_phone,
            emergency_phone:
              action.payload.seniorDetail?.basicInfo?.emergency_phone,
            email: action.payload.seniorDetail?.basicInfo?.email,
            faith: action.payload.seniorDetail?.basicInfo?.faith,
            other_faith: action.payload.seniorDetail?.basicInfo?.other_faith,
            home_technology:
              action.payload.seniorDetail?.basicInfo?.home_technology,
            race: action.payload.seniorDetail?.basicInfo?.race,
            other_race: action.payload.seniorDetail?.basicInfo?.other_race,
            pets: action.payload.seniorDetail?.basicInfo?.pets,
            other_pets: action.payload.seniorDetail?.basicInfo?.other_pets,
            social_media_links:
              action.payload.seniorDetail?.basicInfo?.social_media_links,
            life_event: action.payload.seniorDetail?.basicInfo?.life_event,
            home_entry: action.payload.seniorDetail?.basicInfo?.home_entry,
            created_date: action.payload.seniorDetail?.basicInfo?.created_date,
            radius: {
              value: action.payload.seniorDetail?.basicInfo?.radius?.value,
              radius_measurement:
                action.payload.seniorDetail?.basicInfo?.radius
                  ?.radius_measurement || '',
            },
          },
          minimalInfo: {
            ...state.seniorDetail.minimalInfo,
            name: {
              first_name:
                action.payload.seniorDetail?.minimalInfo?.name?.first_name,
              last_name:
                action.payload.seniorDetail?.minimalInfo?.name?.last_name,
              middle_name:
                action.payload.seniorDetail?.minimalInfo?.name?.middle_name,
            },
            mobile_number:
              action.payload.seniorDetail?.minimalInfo?.mobile_number,
            gender: action.payload.seniorDetail?.minimalInfo?.gender,
            dob: action.payload.seniorDetail?.minimalInfo?.dob,
            user_id: action.payload.seniorDetail?.minimalInfo?.user_id,
            account_id: action.payload.seniorDetail?.minimalInfo?.account_id,
            created_date:
              action.payload.seniorDetail?.minimalInfo?.created_date,
            email: action.payload.seniorDetail?.minimalInfo?.email,
            address: {
              state:
                action.payload.seniorDetail?.minimalInfo?.address?.state || '',
              city:
                action.payload.seniorDetail?.minimalInfo?.address?.city || '',
              street:
                action.payload.seniorDetail?.minimalInfo?.address?.street || '',
              zipcode:
                action.payload.seniorDetail?.minimalInfo?.address?.zipcode ||
                '',
              timezone:
                action.payload.seniorDetail?.minimalInfo?.address?.timezone ||
                '',
              coordinates: {
                latitude:
                  action.payload.seniorDetail?.minimalInfo?.address?.coordinates
                    ?.latitude,
                longitude:
                  action.payload.seniorDetail?.minimalInfo?.address?.coordinates
                    ?.longitude,
              },
            },
            isResident:
              action.payload.seniorDetail?.minimalInfo?.is_resident || false,
            zone:
              capitalizeFirstLetter(
                action.payload.seniorDetail?.minimalInfo?.zone,
              ) || ZoneType.WHITE,
          },
        },
      };
    case SET_CAREGIVER_INFO:
      return {
        ...state,
        careGiverInfo: action.payload.careGiverInfo,
      };
    case SET_PROVIDER_INFO:
      return {
        ...state,
        providerInfo: {
          ...state.providerInfo,
          doctor: [
            ...state.providerInfo.doctor,
            ...action.payload.providerInfo.doctor,
          ],
          dentist: [
            ...state.providerInfo.dentist,
            ...action.payload.providerInfo.dentist,
          ],
          pharmacy: [
            ...state.providerInfo.pharmacy,
            ...action.payload.providerInfo.pharmacy,
          ],
        },
      };
    case SET_SENIOR_IMAGE:
      return {
        ...state,
        ...action.payload,
      };
    case EMPTY_SENIOR_DETAIL:
      return {
        ...state,
        seniorDetail: INITIAL_STATE.seniorDetail,
      };
    case EMPTY_CAREGIVER_INFO:
      return {
        ...state,
        careGiverInfo: INITIAL_STATE.careGiverInfo,
      };
    case EMPTY_PROVIDER_INFO:
      return {
        ...state,
        providerInfo: INITIAL_STATE.providerInfo,
      };
    case EMPTY_SENIOR_IMAGE:
      return {
        ...state,
        profilePic: INITIAL_STATE.profilePic,
      };
    case SET_SENIOR_LOCATION:
      return {
        ...state,
        seniorLocation: {
          ...state.seniorLocation,
          locationData: {
            ...action.payload.seniorLocation.locationData,
          },
          calenderDates: {...state.seniorLocation.calenderDates},
        },
      };
    case EMPTY_LOCATE_ME_POST_API_RESPONSE:
      return {
        ...state,
        seniorLocation: {
          ...state.seniorLocation,
          locateMeResponse: INITIAL_STATE.seniorLocation.locateMeResponse,
        },
      };
    case SET_SENIOR_LOCATE_ME_ERROR:
      return {
        ...state,
        seniorLocation: {
          ...state.seniorLocation,
          locateMeResponse: action.payload.seniorLocation.locateMeResponse,
        },
      };
    case EMPTY_SENIOR_LOCATION:
      return {
        ...state,
        seniorLocation: {
          ...state.seniorLocation,
          locationData: INITIAL_STATE.seniorLocation.locationData,
          calenderDates: {...state.seniorLocation.calenderDates},
        },
      };
    case EMPTY_LOCATION_DATES:
      return {
        ...state,
        seniorLocation: {
          ...state.seniorLocation,
          calenderDates: INITIAL_STATE.seniorLocation.calenderDates,
        },
      };
    case GET_MONTH_ENABLE_DATES: {
      return {
        ...state,
        seniorLocation: {
          ...state.seniorLocation,
          locationData: {...state.seniorLocation.locationData},
          calenderDates: {
            ...state.seniorLocation.calenderDates,
            ...action.payload.calenderDates,
          },
        },
      };
    }
    case SET_MEDICAL_CONDITION: {
      return {...state, medicalConditions: action.payload};
    }
    case RESET_MEDICAL_CONDITION: {
      return {
        ...state,
        medicalConditions: INITIAL_STATE.medicalConditions,
      };
    }
    case GET_SENIOR_LIST:
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          loading: API_LOAD_STATE.PROGRESS,
        },
      };
    case GET_SENIOR_LIST_SUCCESS:
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          searchLastEvaluatedKey: '',
        },
      };
    case GET_SENIOR_SEARCH_LIST_SUCCESS:
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          searchLastEvaluatedKey: action.payload?.searchLastEvaluatedKey || '',
        },
      };

    case GET_SENIOR_LIST_FAIL:
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          loading: API_LOAD_STATE.ERROR,
        },
      };

    case UPDATE_SENIOR_LIST_PAGE_NUMBER: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          currentPage: action.payload,
        },
      };
    }

    case SET_SENIOR_ZONE: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          data: constructSeniorListOnZoneChange(state, action.payload),
        },
      };
    }

    case RESET_SENIOR_LIST: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          data: [],
          lastEvaluatedKey: '',
          searchLastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
      };
    }
    case GET_CARE_AGENT_LIST:
      return {
        ...state,
        careAgentList: {
          ...state.careAgentList,
          loading: API_LOAD_STATE.PROGRESS,
        },
      };
    case GET_CARE_AGENT_LIST_SUCCESS:
      return {
        ...state,
        careAgentList: {
          ...state.careAgentList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          searchLastEvaluatedKey: '',
        },
      };
    case GET_CARE_AGENT_SEARCH_LIST_SUCCESS:
      return {
        ...state,
        careAgentList: {
          ...state.careAgentList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          searchLastEvaluatedKey: action.payload?.searchLastEvaluatedKey || '',
        },
      };

    case GET_CARE_AGENT_LIST_FAIL:
      return {
        ...state,
        careAgentList: {
          ...state.careAgentList,
          loading: API_LOAD_STATE.ERROR,
        },
      };

    case UPDATE_CARE_AGENT_LIST_PAGE_NUMBER: {
      return {
        ...state,
        careAgentList: {
          ...state.careAgentList,
          currentPage: action.payload,
        },
      };
    }

    case RESET_CARE_AGENT_LIST: {
      return {
        ...state,
        careAgentList: {
          data: [],
          lastEvaluatedKey: '',
          searchLastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
      };
    }

    case SET_HOME_WC: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          selectedHomeWc: action.payload,
        },
      };
    }

    case SET_HOME_ZONE: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          selectedHomeZone: action.payload,
        },
      };
    }

    case SENIOR_HOME_SEARCH: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          seniorHomeSearch: action.payload,
        },
      };
    }

    case RESET_HOME_SEARCH: {
      return {
        ...state,
        seniorList: {
          ...state.seniorList,
          selectedHomeWc: {
            fullName: 'All Wellness Coaches',
            userId: '',
          },
          seniorHomeSearch: '',
        },
      };
    }

    default:
      return state;
  }
};
