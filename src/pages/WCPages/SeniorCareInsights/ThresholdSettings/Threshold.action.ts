//@TODO: NEED TO REMOVE THE COMMENTED CODE LATER ON
import moment from 'moment';

import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {hideToast, showToast} from 'common/Toast';
import {ThresholdOperations, ToastMessageType, VitalState} from 'globals/enums';

import {DATE_FORMAT, DIALOG_TYPES} from 'globals/global.constants';
import {
  sortBy,
  convertArrayToObject,
  getCurrentSenior,
} from 'globals/global.functions';
import {
  getVitalsService,
  updateVitalStateService,
  submitThresholdConfigService,
  getRefreshedBaselineService,
  IDownloadDetailDataPayload,
  downloadDetailedDataService,
} from 'services/careInsightService/threshold.service';
import {openDialog} from 'store/commonReducer/common.action';
import {IOpenDialogProps} from 'store/commonReducer/common.action.types';
import {
  IThresholdBaselineRange,
  IThresholdBaselineRangeData,
  IThresholdVitalsData,
  IVitalUpdatePayload,
  IVitalUpdateThresholdPayload,
} from './ThresholdSettings.type';

export const GET_VITALS = 'GET_VITALS';
export const GET_VITALS_SUCCESS = 'GET_VITALS_SUCCESS';
export const GET_VITALS_FAILS = 'GET_VITALS_FAILS';
export const GET_ACTIVE_VITALS = 'GET_ACTIVE_VITALS';
export const GET_INACTIVE_VITALS = 'GET_INACTIVE_VITALS';
export const UPDATE_VITALS = 'UPDATE_VITALS';
export const SET_SELECTED_VITALS = 'SET_SELECTED_VITALS';
export const REMOVE_SELECTED_VITAL = 'REMOVE_SELECTED_VITAL';
export const UPDATE_VITAL_STATE = 'UPDATE_VITAL_STATE';

/**
 * @description action creator to fetch the vitals data of the senior
 * @returns void
 */
export const getVitals = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({type: GET_VITALS});
    dispatch(showApplicationLoader());
    const {
      user_id,
      account_id,
      created_date,
    } = getState().common.seniorDetail.minimalInfo;

    const body = {
      senior_id: user_id,
    };
    const endTime: any = moment().format('x');
    const startTime: any = moment(created_date).format('x');

    const vitalInsightBody = {
      start_timestamp: startTime * 1000000,
      end_timestamp: endTime * 1000000,
      senior_id: user_id,
      account_id,
    };

    const response = await getVitalsService(body, vitalInsightBody);
    const vitalsData = {
      active: sortBy(response.activeVitalsData, 'measurementTitle'),
      inactive: sortBy(response.inActiveVitalsData, 'measurementTitle'),
    };
    dispatch({
      type: GET_VITALS_SUCCESS,
      payload: {
        ...vitalsData,
      },
    });
    dispatch(hideApplicationLoader());
    return vitalsData;
  } catch (error) {
    dispatch(
      showToast(`${GET_VITALS_FAILS}:- ${error}`, ToastMessageType.Error),
    );
    dispatch(hideApplicationLoader());
  }
};

export const getHeartRateData = (start: any, end: any) => async (
  dispatch: any,
  getState: any,
) => {
  try {
    dispatch(showApplicationLoader());
    const {user_id, account_id} = getState().common.seniorDetail.minimalInfo;
    const {
      selectedVital: {measurementName},
      vitals: {active, inactive},
    } = getState().seniorCareInsights.thresholds;
    const vitalInsightBody = {
      start_timestamp: start,
      end_timestamp: end,
      // start_timestamp: 1643763008000000000,
      // end_timestamp: 1655005382000000000,
      senior_id: user_id,
      account_id,
    };

    const response: any = await getRefreshedBaselineService(
      measurementName,
      vitalInsightBody,
    );
    active.forEach((vitalsData: any) => {
      if (vitalsData.measurementName === measurementName) {
        vitalsData.array = [...response];
        vitalsData.tableFilterValue = null;
      }
    });
    dispatch(updateVitals(active, inactive));
    dispatch(hideApplicationLoader());
  } catch (error) {
    dispatch(hideApplicationLoader());
  }
};

/**
 * @description add active vitals
 * @param selectedItem the selected item that needs to be added
 */
export const addActiveVitals = (selectedItem: IThresholdVitalsData) => (
  dispatch: any,
  getState: any,
) => {
  const {active, inactive} = getState().seniorCareInsights.thresholds.vitals;
  const inActiveList = inactive.filter(
    (data: any) => data.measurementName !== selectedItem.measurementName,
  );
  selectedItem.selected = false;

  active.push(selectedItem);
  dispatch(updateVitals(active, inActiveList));
};

/**
 * @description remove active vitals
 * @param selectedItem the selected item that needs to be removed
 */
export const removeActiveVitals = (selectedItem: IThresholdVitalsData) => (
  dispatch: any,
  getState: any,
) => {
  const {active, inactive} = getState().seniorCareInsights.thresholds.vitals;
  const {selectedVital} = getState().seniorCareInsights.thresholds;

  for (let index = 0; index < active.length; index++) {
    const element: IThresholdVitalsData = active[index];

    if (element.measurementName === selectedItem.measurementName) {
      active.splice(index, 1);

      if (element.measurementName === selectedVital?.measurementName) {
        dispatch(removeSelectedVital());
      }
    }
  }

  selectedItem.selected = false;
  inactive.push(selectedItem);
  dispatch(updateVitals(active, inactive));
};

export const updateHistoryDateFilter = (value: any) => (
  dispatch: any,
  getState: any,
) => {
  const {
    selectedVital,
    vitals: {active, inactive},
  } = getState().seniorCareInsights.thresholds;
  active.forEach((vitalsData: any) => {
    if (vitalsData.measurementName === selectedVital.measurementName) {
      vitalsData.tableFilterValue = value;
    }
  });
  dispatch(updateVitals(active, inactive));
};
/**
 * @description update vitals list
 * @param active active vital list
 * @param inactive inactive vital list
 */
const updateVitals = (active: any, inactive: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_VITALS,
    payload: {
      active: sortBy(active, 'measurementTitle'),
      inactive: sortBy(inactive, 'measurementTitle'),
    },
  });
};

/**
 * @description update selected vitals
 * @param selectedItem the selected item that needs to be selected
 */
export const setSelectedVital = (selectedItem: IThresholdVitalsData) => (
  dispatch: any,
  getState: any,
) => {
  const {active} = getState().seniorCareInsights.thresholds.vitals;
  active.forEach((data: any) => {
    if (data.measurementName === selectedItem.measurementName) {
      data.selected = true;
    } else {
      data.selected = false;
    }
  });
  dispatch({
    type: SET_SELECTED_VITALS,
    payload: {
      active: sortBy(active, 'measurementTitle'),
      selectedItem,
    },
  });
};

export const removeSelectedVital = () => (dispatch: any) => {
  dispatch({type: REMOVE_SELECTED_VITAL});
};

/**
 * @description update vital state to assign
 * @param {IThresholdVitalsData} selectedItem selected vital data
 * @returns void
 */
export const assignVitalState = (selectedItem: IThresholdVitalsData) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(addActiveVitals(selectedItem));
  dispatch(hideToast());

  try {
    const seniorId = getState().common.seniorDetail.minimalInfo.user_id;
    const body: IVitalUpdatePayload = {
      senior_id: seniorId,
      measurement_name: selectedItem.measurementName,
      state: VitalState.ASSIGNED,
    };

    await updateVitalStateService(body);
    dispatch(
      showToast('Vital assigned successfully.', ToastMessageType.Success),
    );
  } catch (error) {
    dispatch(removeActiveVitals(selectedItem));
    dispatch(showToast('Vital state assign failed.', ToastMessageType.Error));
  }
};

/**
 * @description update vital state to unassign
 * @param {IThresholdVitalsData} selectedItem selected vital data
 * @returns void
 */
export const unAssignVitalState = (
  selectedItem: IThresholdVitalsData,
) => async (dispatch: any, getState: any) => {
  dispatch(removeActiveVitals(selectedItem));
  dispatch(hideToast());

  try {
    const seniorId = getState().common.seniorDetail.minimalInfo.user_id;

    const body: IVitalUpdatePayload = {
      senior_id: seniorId,
      measurement_name: selectedItem.measurementName,
      state: VitalState.UNASSIGNED,
    };

    await updateVitalStateService(body);
    dispatch(
      showToast('Vital unassigned successfully.', ToastMessageType.Success),
    );
  } catch (error) {
    dispatch(addActiveVitals(selectedItem));
    dispatch(showToast('Vital state unassign failed.', ToastMessageType.Error));
  }
};

/**
 * @description update vital state to active_insight
 * @param {VitalState} vitalState vital state
 * @returns void
 */
export const updateVitalStateActiveInsight = (vitalState: VitalState) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(hideToast());

  try {
    const seniorId = getState().common.seniorDetail.minimalInfo.user_id;

    const {
      selectedVital,
      vitals: {active, inactive},
    } = getState().seniorCareInsights.thresholds;

    const body: IVitalUpdatePayload = {
      senior_id: seniorId,
      measurement_name: selectedVital.measurementName,
      state: vitalState,
    };

    await updateVitalStateService(body);

    active.forEach((vitalsData: IThresholdVitalsData) => {
      if (vitalsData.measurementName === selectedVital.measurementName) {
        vitalsData.currentState = vitalState;
      }
    });

    dispatch(updateVitals(active, inactive));

    dispatch(
      showToast(
        `Care insight turned ${
          vitalState === VitalState.ACTIVE_INSIGHT ? 'ON' : 'OFF'
        } successfully.`,
        ToastMessageType.Success,
      ),
    );
  } catch (error) {
    dispatch(
      showToast('Vital state active insight failed.', ToastMessageType.Error),
    );
  }
};

/**
 * @description update threshold config
 * @param {IThresholdVitalsData} selectedItem selected vital data
 * @returns void
 */
export const submitThresholdConfig = (
  inputFields: any,
  thresholdRange: IThresholdBaselineRangeData[],
  actual: any,
  baseline: any,
) => async (dispatch: any, getState: any) => {
  try {
    const thresholdRangeObject: IThresholdBaselineRange = convertArrayToObject(
      thresholdRange,
      'name',
    );
    const seniorInfo = getCurrentSenior();
    const seniorId = getState().common.seniorDetail.minimalInfo.user_id;
    const selectedVital = getState().seniorCareInsights.thresholds
      .selectedVital;
    const timestamp = {
      end: selectedVital.array[0].time,
      start:
        selectedVital.array[Object.entries(selectedVital.array).length - 1]
          .time,
    };
    const body: IVitalUpdateThresholdPayload = {
      timezone: seniorInfo.timezone,
      senior_id: seniorId,
      measurement_name: selectedVital.measurementName,
      baseline_info: {
        high: baseline.high,
        low: baseline.low,
        upper_action_pct: Number(inputFields.upHigh) || null,
        upper_attention_pct: Number(inputFields.upLow) || null,
        lower_attention_pct: Number(inputFields.lowHigh) || null,
        lower_action_pct: Number(inputFields.lowLow) || null,
      },
      actual_info: {
        high: actual.high,
        low: actual.low,
      },
      timestamp: timestamp,
      threshold: {
        definition: {
          action: [
            {
              operation: ThresholdOperations.GT,
              value: thresholdRangeObject.upperHigh.value,
              message: '',
              event: 'action',
              range: 'upper',
            },
            {
              operation: ThresholdOperations.LT,
              value: thresholdRangeObject.lowerLow.value,
              message: '',
              event: 'action',
              range: 'lower',
            },
          ],
        },
      },
    };

    if (selectedVital.currentState !== VitalState.ACTIVE_INSIGHT) {
      const openDialogProp: IOpenDialogProps = {
        boldMessage: 'Are you sure you want to Submit?',
        secondMessage: 'Submitting will Switch "ON" the Care Insight Messages',
        successButtonText: 'Submit',
        type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
        isFailButton: true,
        onSuccessButton: async () => {
          dispatch(showApplicationLoader());
          await submitThresholdConfigService(body);
          dispatch(updateVitalData(inputFields, timestamp));
          dispatch(updateVitalStateActiveInsight(VitalState.ACTIVE_INSIGHT));
          dispatch(hideApplicationLoader());
          dispatch(
            showToast('Updated successfully.', ToastMessageType.Success),
          );
          window.scrollTo({top: 0, behavior: 'smooth'});
        },
      };

      dispatch(openDialog({...openDialogProp}));
    }
  } catch (error) {
    dispatch(hideApplicationLoader());

    dispatch(showToast('Update failed', ToastMessageType.Error));
  }
};

/**
 * @description update threshold range values in the active vital list
 * @param inputFields
 * @returns
 */
export const updateVitalData = (inputFields: any, timestamp: any) => (
  dispatch: any,
  getState: any,
) => {
  const {
    selectedVital,
    vitals: {active, inactive},
  } = getState().seniorCareInsights.thresholds;

  active.forEach((vitalsData: IThresholdVitalsData) => {
    if (vitalsData.measurementName === selectedVital.measurementName) {
      vitalsData.threshold = {
        upHigh: Number(inputFields.upHigh) || 0,
        upLow: Number(inputFields.upLow),
        lowHigh: Number(inputFields.lowHigh),
        lowLow: Number(inputFields.lowLow) || 0,
      };
      vitalsData.timestamp = timestamp;
    }
  });

  dispatch(updateVitals(active, inactive));
};

/**
 * @description Update the threshold value when on change of active fields.
 * @param fieldEvent Event
 * @returns void
 */
export const updateOnChangeActiveRange = (fieldEvent: any) => (
  dispatch: any,
  getState: any,
) => {
  const {
    selectedVital,
    vitals: {active, inactive},
  } = getState().seniorCareInsights.thresholds;

  const value = fieldEvent.target.value;

  active.forEach((vitalsData: any) => {
    if (vitalsData.measurementName === selectedVital.measurementName) {
      vitalsData.threshold = {
        ...vitalsData.threshold,
        [fieldEvent.target.name]: value,
      };
    }
  });

  dispatch(updateVitals(active, inactive));
};

/**
 * @description reset threshold range values in the selected active vital
 * @returns void
 */
export const resetVitalThresholdData = () => async (
  dispatch: any,
  getState: any,
) => {
  try {
    dispatch(showApplicationLoader());

    const {
      selectedVital,
      vitals: {active, inactive},
    } = getState().seniorCareInsights.thresholds;
    const seniorInfo = getCurrentSenior();
    const seniorId = getState().common.seniorDetail.minimalInfo.user_id;

    const body: IVitalUpdateThresholdPayload = {
      timezone: seniorInfo.timezone,
      senior_id: seniorId,
      measurement_name: selectedVital.measurementName,
      actual_info: {
        high: selectedVital.actual.high,
        low: selectedVital.actual.low,
      },
      baseline_info: {
        high: selectedVital.baseline.high,
        low: selectedVital.baseline.low,
        upper_action_pct: null,
        upper_attention_pct: null,
        lower_attention_pct: null,
        lower_action_pct: null,
      },
      timestamp: {
        end: selectedVital.array[0].time,
        start:
          selectedVital.array[Object.entries(selectedVital.array).length - 1]
            .time,
      },
      threshold: {
        definition: {
          action: [
            {
              operation: ThresholdOperations.GT,
              value: null,
              message: '',
              event: 'action',
              range: 'upper',
            },
            {
              operation: ThresholdOperations.LT,
              value: null,
              message: '',
              event: 'action',
              range: 'lower',
            },
          ],
        },
      },
    };
    await submitThresholdConfigService(body);

    active.forEach((vitalsData: any) => {
      if (vitalsData.measurementName === selectedVital.measurementName) {
        vitalsData.threshold = {
          upHigh: '',
          upLow: '',
          lowHigh: '',
          lowLow: '',
        };
        vitalsData.tableFilterValue = null;
      }
    });

    dispatch(updateVitals(active, inactive));

    dispatch(hideApplicationLoader());
    dispatch(
      showToast('Range score cleared successfully.', ToastMessageType.Success),
    );
  } catch (error) {
    dispatch(hideApplicationLoader());

    dispatch(showToast('Update failed', ToastMessageType.Error));
  }
};

/**
 * @description action creator to refresh the baseline value on clicking of refresh button.
 * @returns void
 */
export const refreshBaseline = () => async (dispatch: any, getState: any) => {
  try {
    const {
      selectedVital: {measurementName},
      vitals: {active, inactive},
    } = getState().seniorCareInsights.thresholds;

    const {user_id, account_id} = getState().common.seniorDetail.minimalInfo;
    const vitalInsightBody = {
      limit: 1000,
      senior_id: user_id,
      account_id,
    };
    dispatch(showApplicationLoader());

    const response: any = await getRefreshedBaselineService(
      measurementName,
      vitalInsightBody,
    );
    active.forEach((vitalsData: any) => {
      if (vitalsData.measurementName === measurementName) {
        vitalsData.array = [...response];
        vitalsData.tableFilterValue = null;
      }
    });
    dispatch(updateVitals(active, inactive));
    dispatch(hideApplicationLoader());
    dispatch(
      showToast('Baseline refreshed successfully.', ToastMessageType.Success),
    );
  } catch (error) {
    dispatch(hideApplicationLoader());

    dispatch(showToast('Refresh failed', ToastMessageType.Error));
  }
};

/**
 * @description action creator to download the file
 * @param params
 * @returns void
 */
export const downloadThresholdData = (
  params: IDownloadDetailDataPayload,
) => async (dispatch: any, getState: any) => {
  try {
    dispatch(showApplicationLoader());
    const {selectedVital} = getState().seniorCareInsights.thresholds;
    const {
      first_name,
      last_name,
    } = getState().common.seniorDetail.minimalInfo.name;
    const response = await downloadDetailedDataService(
      params,
      selectedVital.measurementName,
    );

    const date = moment().format(DATE_FORMAT);
    const time = moment().format('h:mm A');
    // create blob url
    const url = window.URL.createObjectURL(new Blob([response.file]));

    // create anchor element to download the blob file.
    const link = document.createElement('a');
    link.href = url;

    // eslint-disable-next-line max-len
    const fileName = `Sr_${first_name}_${last_name}-${selectedVital.measurementTitle}-${date}-${time}.xlsx`;

    link.setAttribute('download', fileName);

    document.body.appendChild(link);
    link.click();
    link.remove(); // removing anchor element after dfile download
    dispatch(hideApplicationLoader());
  } catch (err) {
    dispatch(hideApplicationLoader());
    dispatch(showToast('Download Summary Failed!', ToastMessageType.Error));
  }
};

export const createDashedLine = (data: any, baseline: any) => {
  if (!data) return;
  let array: any = [];
  let array2: any = [];
  data.forEach((interup: any, index: any) => {
    const lastIndex = data[index - 1];
    const currentIndex = data[index];
    const nextIndex = data[index + 1];
    if (interup.y >= baseline.high || interup.y <= baseline.low) {
      if (index > 0 && index < data.length - 1) {
        array.push({
          x: lastIndex?.x,
          y: lastIndex?.y,
        });
        array2.push({
          x: lastIndex?.x,
          y: null,
        });
        array.push({
          x: currentIndex?.x,
          y: currentIndex?.y,
        });
        array2.push({
          x: currentIndex?.x,
          y: null,
        });
        array.push({
          x: nextIndex?.x,
          y: nextIndex?.y,
        });
        array2.push({
          x: nextIndex?.x,
          y: null,
        });
      }
    }
    if (interup.y < baseline.high && interup.y > baseline.low) {
      if (nextIndex?.y < baseline.high && nextIndex?.y > baseline.low) {
        array2.push({
          x: currentIndex?.x,
          y: currentIndex?.y,
        });
        array.push({
          x: nextIndex?.x,
          y: null,
        });
      } else {
        array2.push({
          x: currentIndex?.x,
          y: currentIndex?.y,
        });
        array.push({
          x: currentIndex?.x,
          y: null,
        });
      }
    }
  });
  return [array, array2];
};
