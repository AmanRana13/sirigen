export interface IDailyRecapPayload {
  summaryMessage: string;
  date: number;
  rangeMap?: IDailyRecapRangeMap;
  heartRateData: IHeartRateData[];
}

export interface IHeartRateData {
  x: string;
  y: number;
}

export interface IDailyRecapRangeMap {
  high: number;
  low: number;
}
