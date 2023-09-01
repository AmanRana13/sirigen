import {AlarmStatus, AlarmType} from 'globals/enums';

export interface IAlarmAPIResponse {
  senior_id: string;
  account_id: string;
  status: AlarmType;
  alarm_status: AlarmStatus;
  alarm_id: string;
  timestamp: number;
  last_location: {
    lat: number;
    lng: number;
  };
  last_alert: {
    time: number;
  };
  last_call: {
    time: number;
  };
}

export interface IAlarmData {
  accountId: string;
  seniorId: string;
  status: AlarmType;
  timestamp: number | undefined;
  alarmId: string;
  alarmStatus: AlarmStatus;
  lastAlertTime: number | undefined;
  lastCallTime: any;
  lastLocation: {
    lat: number;
    lng: number;
  };
}
