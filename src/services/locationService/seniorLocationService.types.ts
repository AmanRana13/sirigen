import {LocationStatus} from 'globals/enums';

export interface ISeniorLocationData {
  atHome: LocationStatus;
  currentCoordinates: ICoordinates;
  timeAwayFromHome: number | null;
  lastUpdated: number | undefined | null;
  historyData: IHistoryData[];
}
interface ICoordinates {
  latitude: number | null;
  longitude: number | null;
  timestamp: number | null;
}
interface IHistoryData {
  latitude: number;
  longitude: number;
  timestamp: number | undefined;
}

export interface ISeniorLocationParams {
  start_timestamp: number;
  end_timestamp: number;
  senior_id: string;
  account_id: string;
  home_lat: string;
  home_lng: string;
  home_radius: string;
  home_radius_unit: string;
  desc?: boolean;
  history?: boolean;
  timezone: string;
}

export interface ISeniorLocationHistoryParams {
  senior_id: string;
  account_id: string;
  start_timestamp: number;
  end_timestamp: number;
  timezone: string | undefined;
}
