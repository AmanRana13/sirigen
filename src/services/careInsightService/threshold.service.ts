import {API} from 'globals/api';
import {VitalState} from 'globals/enums';
// eslint-disable-next-line max-len
import {
  IThresholdVitalsData,
  IGetBaselineRes,
  IGetActualRes,
  ITimestamp,
} from 'pages/WCPages/SeniorCareInsights/ThresholdSettings/ThresholdSettings.type';
import {
  getAvgOfTwoValue,
  roundOff,
  getExistingVitalsData,
} from 'globals/global.functions';
import {getClientTimezone} from 'globals/date.functions';
import {THRESHOLD_END_POINTS} from 'globals/apiEndPoints';

interface IGetVitalsResponse {
  created_date: Date;
  current_state: VitalState;
  measurement_name: string;
  model_number: string;
  modification_date: Date;
  senior_id: string;
  threshold_mapping: any;
  vendor_name: string;
  baseline_info: IGetBaselineRes | null;
  timestamp: ITimestamp;
  actual_info: IGetActualRes | null;
}

/**
 * @function getThresholdService
 * @description method to get all thresholds via api response.
 * @param {object} params API PAYLOAD
 * @returns promise response
 */
export async function getThresholdService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: THRESHOLD_END_POINTS.GET_THRESHOLD,
      method: 'get',
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @description Service to get all the threshold vitals list
 * @param {object} params API PAYLOAD
 * @returns promise response
 */
export async function getVitalsService<T>(
  params: T,
  vitalInsightBody: any,
): Promise<any> {
  const clientTimezone = getClientTimezone();

  const vitalInsightEndPointMap: any = getExistingVitalsData(clientTimezone);

  try {
    const response = await API<IGetVitalsResponse>({
      url: THRESHOLD_END_POINTS.GET_VITALS,
      method: 'post',
      data: params,
    });

    const resVitalsData: IGetVitalsResponse[] = response.data || [];
    const activeVitalsData: IThresholdVitalsData[] = [];
    const inActiveVitalsData: IThresholdVitalsData[] = [];

    await Promise.all(
      resVitalsData.map((vital) => {
        const measurementName: any = vital.measurement_name;

        if (vitalInsightEndPointMap[measurementName]) {
          const data: IThresholdVitalsData = {
            seniorId: vital.senior_id,
            measurementUnit:
              vitalInsightEndPointMap[vital.measurement_name].measurementUnit,
            measurementName: vital.measurement_name,
            currentState: vital.current_state,
            measurementTitle:
              vitalInsightEndPointMap[vital.measurement_name].label ||
              vital.measurement_name,
            vendorName: vital.vendor_name,
            modelNumber: vital.model_number,
            createdDate: vital.created_date,
            selected: false,
            baseline: {
              high: Number(roundOff(vital.baseline_info?.high)),
              low: Number(roundOff(vital.baseline_info?.low)),
              avg: Number(
                roundOff(
                  getAvgOfTwoValue(
                    parseFloat(`${vital.baseline_info?.high}`),
                    parseFloat(`${vital.baseline_info?.low}`),
                  ),
                ),
              ),
            },
            actual: {
              high: Number(roundOff(vital.actual_info?.high)),
              low: Number(vital.actual_info?.low),
              avg: Number(
                roundOff(
                  getAvgOfTwoValue(
                    parseFloat(`${vital.actual_info?.high}`),
                    parseFloat(`${vital.actual_info?.low}`),
                  ),
                ),
              ),
            },
            timestamp: {
              start: vital.timestamp?.start,
              end: vital.timestamp?.end,
            },
            threshold: {
              upHigh: vital.baseline_info?.upper_action_pct,
              upLow: vital.baseline_info?.upper_attention_pct,
              lowHigh: vital.baseline_info?.lower_attention_pct,
              lowLow: vital.baseline_info?.lower_action_pct,
            },
            isDisable: vitalInsightEndPointMap[measurementName].isDisable,
          };
          if (
            (vital.current_state === VitalState.ASSIGNED ||
              vital.current_state === VitalState.ACTIVE_INSIGHT) &&
            !vitalInsightEndPointMap[measurementName].isDisable
          ) {
            activeVitalsData.push(data);
          } else {
            inActiveVitalsData.push(data);
          }
        }
      }),
    );

    return {activeVitalsData, inActiveVitalsData};
  } catch (error) {
    const errorMessage = error.response.data.message;
    throw new Error(`${errorMessage}`);
  }
}

/**
 * @description API service to update the vital state
 * @param {IVitalUpdatePayload} params API PAYLOAD
 * @returns promise response
 */
export async function updateVitalStateService<IVitalUpdatePayload>(
  params: IVitalUpdatePayload,
): Promise<any> {
  return await API<IGetVitalsResponse>({
    url: THRESHOLD_END_POINTS.UPDATE_VITAL_STATE,
    method: 'post',
    data: params,
  });
}

/**
 * @description API service to update the threshold config
 * @param {IVitalUpdateThresholdPayload} params API PAYLOAD
 * @returns promise response
 */
export async function submitThresholdConfigService(params: any): Promise<any> {
  return await API({
    url: THRESHOLD_END_POINTS.UPDATE_THRESHOLD_CONFIG,
    method: 'post',
    data: params,
  });
}

/**
 * @description Service to fetch the vital data
 * @param measurementName
 * @param payload
 * @returns
 */
export const getVitalDataService = (measurementName: any, payload: any) => {
  const clientTimezone = getClientTimezone();

  const vitalInsightEndPointMap: any = getExistingVitalsData(clientTimezone);

  const selectedVitalConfig = vitalInsightEndPointMap[measurementName];

  return API({
    url: `${THRESHOLD_END_POINTS.MEASUREMENT}${selectedVitalConfig.apiEndPoint}`,
    method: 'get',
    params: selectedVitalConfig.payload
      ? {
          ...payload,
          ...selectedVitalConfig.payload,
        }
      : payload,
  });
};

interface IBaselineValues {
  high: number;
  low: number;
}

/**
 * @description service to fetch the vital baseline
 * @param measurementName vital name
 * @param payload
 * @returns {IBaselineValues} Baseline vlaues
 */
export const getRefreshedBaselineService = async (
  measurementName: any,
  payload: any,
): Promise<IBaselineValues | Error> => {
  const baselineValues: IBaselineValues = {
    high: 0,
    low: 0,
  };
  let array = [];

  try {
    const res = await getVitalDataService(measurementName, payload);

    const resData = res.data.data;

    if (measurementName === 'activity_measurement') {
      baselineValues.high = Number(roundOff(resData.max_high_activity));
      baselineValues.low = Number(roundOff(resData.min_high_activity));
    } else {
      array = resData;
    }

    return array;
  } catch (error) {
    return new Error(`${error}`);
  }
};

export interface IDownloadDetailDataPayload {
  senior_id: string;
  account_id: string;
  start_timestamp?: number;
  end_timestamp?: number;
}

/**
 * @description API service to download the detailed data
 * @param {IDownloadDetailDataPayload} params API PAYLOAD
 * @returns promise response
 */
export async function downloadDetailedDataService<IDownloadDetailDataPayload>(
  params: IDownloadDetailDataPayload,
  vitalName: string,
): Promise<any> {
  const clientTimezone = getClientTimezone();
  const summaryEndpoint: any = getExistingVitalsData(clientTimezone);

  return await API({
    url: `${THRESHOLD_END_POINTS.MEASUREMENT}${summaryEndpoint[vitalName].downloadEndPoint}`,
    method: 'get',
    params: summaryEndpoint[vitalName].reportPayload
      ? {
          ...params,
          ...summaryEndpoint[vitalName].reportPayload,
        }
      : params,
    headers: {
      'Content-Type': 'blob',
    },
    responseType: 'arraybuffer',
  });
}
