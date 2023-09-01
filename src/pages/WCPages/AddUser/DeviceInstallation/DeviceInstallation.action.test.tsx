import {store} from '../../../store/store';
import {
  saveDevicesDetail,
  getDevicesInfo,
  deleteDevicesDetail,
} from './Devices.action';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import * as Services from 'services/deviceService/device.service';

jest.mock('services/deviceService/device.service');

global.fetch = jest.fn(() =>
  Promise.resolve({json: () => ({status: 'ok', data: 'data'})}),
);
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo)),
);

describe('api call on dispatch getDevicesInfo', () => {
  test('api call to fetch deviceInfo', async () => {
    store.dispatch(getDevicesInfo());

    global.fetch();
    Services.getDevicesService();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('dispatch saveDevicesDetail cation', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      saveDevicesDetail({
        data: {
          defaultValue: {
            assigned_device_type: 'Withings Data Hub',
            date_returned: null,
            device_install_date: '',
            device_serial: '',
            mfg_date: null,
            model_number: '',
            reason_for_return: '',
            vendor: 'Withings',
          },
          deviceName: 'Withings Hub',
          type: 'withings_hub',
        },
        height: {
          feet: '5.0',
          inch: '11.0',
        },
        weight: '178.0',
        timezone: 'America/Los_Angeles',
      }),
    );
    global.fetch();
    await store.dispatch(hideApplicationLoader());
    await store.dispatch(getDevicesInfo());
    expect(store.getState().applicationLoader).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('dis[patch deleteDevicesDetail action', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      deleteDevicesDetail({
        data: {
          defaultValue: {
            assigned_device_type: 'Withings Data Hub',
            date_returned: null,
            device_install_date: '',
            device_serial: '',
            mfg_date: null,
            model_number: '',
            reason_for_return: '',
            vendor: 'Withings',
          },
          deviceName: 'Withings Hub',
          type: 'withings_hub',
        },
        deviceName: 'Withings Hub',
      }),
    );
    global.fetch();
    await store.dispatch(hideApplicationLoader());
    await store.dispatch(getDevicesInfo());
    expect(store.getState().applicationLoader).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
