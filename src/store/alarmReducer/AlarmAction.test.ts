import {AlarmStatus, AlarmType, EventsType} from 'globals/enums';
import {store} from 'store/store';
import {createAlarmDialog} from './Alarm.action';
const data = {
  accountId: 'f2c3889fc0f9448d844be611578efc79',
  seniorId: 'senior-f300a4c4515d41ddabbac003cf07c32c',
  status: AlarmType.FALL,
  timestamp: 1643252265000,
  alarmId: 'ae10a04a060745fd91297b295e8c7536|1643252265000000000',
  alarmStatus: AlarmStatus.PENDING,
  lastAlertTime: 1643252265000,
  lastCallTime: 1643252265000,
  lastLocation: {
    lat: 234567,
    lng: 345677,
  },
};
const mockData = {
  summary: {},
  alert: {},
  isRenderLocation: true,
  milestone: {},
  sos: {},
  fallDetection: {},
};
describe('alarm action', () => {
  test('createAlarmDialog', async () => {
    await store.dispatch(createAlarmDialog(data));
    expect(store.getState().events).toEqual(mockData);
  });
});
