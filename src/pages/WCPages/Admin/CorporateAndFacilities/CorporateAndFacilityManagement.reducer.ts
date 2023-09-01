import {API_LOAD_STATE} from 'globals/global.constants';
import {
  GET_CORPORATE_MANAGEMENT_LIST,
  GET_CORPORATE_MANAGEMENT_LIST_SUCCESS,
  GET_CORPORATE_MANAGEMENT_SEARCH_LIST_SUCCESS,
  GET_CORPORATE_MANAGEMENT_LIST_FAIL,
  UPDATE_CORPORATE_MANAGEMENT_LIST_PAGE_NUMBER,
  RESET_CORPORATE_MANAGEMENT_LIST,
} from './CorporateManagement/CorporateManagement.action';

import {
  GET_FACILITY_MANAGEMENT_LIST,
  GET_FACILITY_MANAGEMENT_LIST_SUCCESS,
  GET_FACILITY_MANAGEMENT_SEARCH_LIST_SUCCESS,
  GET_FACILITY_MANAGEMENT_LIST_FAIL,
  UPDATE_FACILITY_MANAGEMENT_LIST_PAGE_NUMBER,
  RESET_FACILITY_MANAGEMENT_LIST,
} from './FacilityManagement/FacilityManagement.action';

export const INITIAL_STATE = {
  corporateManagementList: {
    data: [],
    lastEvaluatedKey: '',
    searchLastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
  },
  facilityManagementList: {
    data: [],
    lastEvaluatedKey: '',
    searchLastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
  },
};

export const corporateAndFacilitiesReducer = (
  state = INITIAL_STATE,
  action: any,
) => {
  switch (action.type) {
    case GET_CORPORATE_MANAGEMENT_LIST:
      return {
        ...state,
        corporateManagementList: {
          ...state.corporateManagementList,
          loading: API_LOAD_STATE.PROGRESS,
        },
      };
    case GET_CORPORATE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        corporateManagementList: {
          ...state.corporateManagementList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          searchLastEvaluatedKey: '',
        },
      };
    case GET_CORPORATE_MANAGEMENT_SEARCH_LIST_SUCCESS:
      return {
        ...state,
        corporateManagementList: {
          ...state.corporateManagementList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          searchLastEvaluatedKey: action.payload?.searchLastEvaluatedKey || '',
        },
      };

    case GET_CORPORATE_MANAGEMENT_LIST_FAIL:
      return {
        ...state,
        corporateManagementList: {
          ...state.corporateManagementList,
          loading: API_LOAD_STATE.ERROR,
        },
      };

    case UPDATE_CORPORATE_MANAGEMENT_LIST_PAGE_NUMBER: {
      return {
        ...state,
        corporateManagementList: {
          ...state.corporateManagementList,
          currentPage: action.payload,
        },
      };
    }

    case RESET_CORPORATE_MANAGEMENT_LIST: {
      return {
        ...state,
        corporateManagementList: {
          data: [],
          lastEvaluatedKey: '',
          searchLastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
      };
    }
    case GET_FACILITY_MANAGEMENT_LIST:
      return {
        ...state,
        facilityManagementList: {
          ...state.facilityManagementList,
          loading: API_LOAD_STATE.PROGRESS,
        },
      };
    case GET_FACILITY_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        facilityManagementList: {
          ...state.facilityManagementList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          lastEvaluatedKey: action.payload.lastEvaluatedKey,
          searchLastEvaluatedKey: '',
        },
      };
    case GET_FACILITY_MANAGEMENT_SEARCH_LIST_SUCCESS:
      return {
        ...state,
        facilityManagementList: {
          ...state.facilityManagementList,
          loading: API_LOAD_STATE.SUCCESSFUL,
          data: action.payload.data,
          searchLastEvaluatedKey: action.payload?.searchLastEvaluatedKey || '',
        },
      };

    case GET_FACILITY_MANAGEMENT_LIST_FAIL:
      return {
        ...state,
        facilityManagementList: {
          ...state.facilityManagementList,
          loading: API_LOAD_STATE.ERROR,
        },
      };

    case UPDATE_FACILITY_MANAGEMENT_LIST_PAGE_NUMBER: {
      return {
        ...state,
        facilityManagementList: {
          ...state.facilityManagementList,
          currentPage: action.payload,
        },
      };
    }

    case RESET_FACILITY_MANAGEMENT_LIST: {
      return {
        ...state,
        facilityManagementList: {
          data: [],
          lastEvaluatedKey: '',
          searchLastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
      };
    }
    default:
      return state;
  }
};
