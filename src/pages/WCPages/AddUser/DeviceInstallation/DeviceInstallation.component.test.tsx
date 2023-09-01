import {render, screen} from '../../../utilities/test-utils';
import {setLocalStorage} from 'globals/global.functions';
import DevicesComponent from './DeviceInstallation.component';
import {getDevicesInfo} from './Devices.action';
const devices = [
  {
    data: {
      deviceName: 'Watch',
      device_type: 'watch',
      defaultValue: {
        device_install_date: null,
        vendor: 'Navigil',
        assigned_device_type: 'Navigil 580 Watch',
        model_number: '',
        device_serial: '',
        mfg_date: null,
        date_returned: null,
        reason_for_return: '',
      },
      infoMsg: '',
    },
  },
];
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
const dispatch: any = jest.fn();
beforeAll(() => {
  setLocalStorage('accountInfo', accountInfo);
  dispatch(getDevicesInfo());
});
beforeEach(() => jest.clearAllMocks());
describe('DeviceInstallation Component', () => {
  test('should render DeviceInstallation Component', async () => {
    // eslint-disable-next-line max-len
    render(
      <DevicesComponent
        saveDevicesDetail={jest.fn()}
        deleteDevicesDetail={jest.fn()}
      />,
      {initialState: {devices}},
    );
    const element = screen.queryByTestId(/devices-component/i);
    expect(element).toBeInTheDocument();
  });
});
