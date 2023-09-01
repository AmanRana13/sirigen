//@TODO: NEED TO REMOVE THE COMMENTED CODE LATER ON
import {VitalState} from '../../../../globals/enums';

export interface IVitalBaseline {
  low: number;
  high: number;
  avg: number;
}

export interface IVitalActual {
  low: number;
  high: number;
  avg: number;
}
type VitalThresholdTypes = number | string | null | undefined;
export interface IVitalThreshold {
  upHigh: VitalThresholdTypes;
  upLow: VitalThresholdTypes;
  lowHigh: VitalThresholdTypes;
  lowLow: VitalThresholdTypes;
}

export interface IThresholdVitalsData {
  seniorId: string;
  timestamp: {
    start: number;
    end: number;
  };
  measurementName: string;
  currentState: VitalState;
  measurementTitle: string;
  selected: boolean;
  baseline: IVitalBaseline;
  actual: IVitalActual;
  threshold: IVitalThreshold;
  measurementUnit: string;
  vendorName: string;
  modelNumber: string;
  createdDate: Date;
  isDisable: boolean;
}

export interface IThresholdSettingsProps {
  isAbc: boolean;
  value: string | number;
  xyz?: string;
}

export interface IVitals {
  active: IThresholdVitalsData[];
  inactive: IThresholdVitalsData[];
}

export interface IThresholds {
  vitals: IVitals;
  selectedVital: string;
}
export interface ITresholdStates {
  thresholds: IThresholds;
}

export interface IVitalUpdatePayload {
  senior_id: string;
  measurement_name: string;
  state: VitalState;
}

export interface IGetBaselineRes {
  high: any;
  low: any;
  upper_action_pct: number | null;
  upper_attention_pct: number | null;
  lower_attention_pct: number | null;
  lower_action_pct: number | null;
}
export interface ITimestamp {
  start: number;
  end: number;
}
export interface IGetActualRes {
  high: number;
  low: number;
}

export interface IThresholdBaselineRangeData {
  dependent: string;
  disabled: boolean;
  label: string;
  name: string;
  rules: (avg: number, val: number) => number;
  seq: number;
  value: number;
}

export interface IThresholdBaselineRange {
  lowerHigh: IThresholdBaselineRangeData;
  lowerLow: IThresholdBaselineRangeData;
  upperHigh: IThresholdBaselineRangeData;
  upperLow: IThresholdBaselineRangeData;
}

// Payload types
interface IRangeDataPayload {
  operation: string;
  value: number | null;
  message: string;
  event: string;
  range: string;
}

interface IRangePayload {
  action: IRangeDataPayload[];
  // attention: IRangeDataPayload[];
  // good_news: IRangeDataPayload[];
}

interface IThresholdDefinitionPayload {
  definition: IRangePayload;
}

export interface IVitalUpdateThresholdPayload {
  senior_id: string;
  measurement_name: string;
  baseline_info: IGetBaselineRes;
  actual_info: IGetActualRes;
  timestamp: ITimestamp;
  threshold: IThresholdDefinitionPayload;
  timezone: string | undefined | null;
}
