import {render, screen} from '../../../utilities/test-utils';
import {DeviceIntegrationComponent} from './DeviceIntegration.component';
import DeviceIntegration from './DeviceIntegration.container';
import {
  connectWithingDevice,
  fetchDeviceIntegrationInfo,
} from './DeviceIntegration.action';
import {setLocalStorage} from 'globals/global.functions';
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() => setLocalStorage('accountInfo', accountInfo));
beforeEach(() => jest.clearAllMocks());
describe('DeviceIntegration Container', () => {
  test('should render DeviceIntegration container', async () => {
    render(<DeviceIntegration props={jest.fn()} />);

    const element = screen.queryByTestId(/date-picker/i);

    expect(element).toBeInTheDocument();
  });
});
describe('DeviceIntegration Component', () => {
  test('should render DeviceIntegration component', () => {
    const {queryByTestId} = render(
      <DeviceIntegrationComponent
        navigilInfo={{
          assigned_device_type: 'Navigil 580 Watch',
          created_date: '2021-07-20T11:05:29.193328+00:00',
          date_returned: '2021-07-16T11:04:00+00:00',
          device_id: '66226179913f46f49333e1161c027bc4',
          device_install_date: '2021-07-15T11:04:00+00:00',
          device_serial: '234324',
          device_type: 'watch',
          mfg_date: '2021-07-01T11:04:00+00:00',
          model_number: '123',
          modification_date: '2021-07-21T11:19:26.036999+00:00',
          reason_for_return: 'asdasd',
          senior_id: 'senior-f18173fa564c42a2a6622db899072c45',
          vendor: 'Navigil',
        }}
        connectWithingDevice={jest.fn()}
        connectNavigilDevice={jest.fn()}
      />,
    );
    const element = queryByTestId(/date-picker/i);

    expect(element).toBeInTheDocument();
  });
});
describe('DeviceIntegration actions', () => {
  test('should dispatch fetchDeviceIntegrationInfo', async () => {
    const dispatch: any = jest.fn();
    const state = {};
    const mockedAction = fetchDeviceIntegrationInfo();
    await mockedAction(dispatch);
    const {calls} = dispatch.mock;
    expect(calls).toHaveLength(2);
  });

  test('should dispatch connectWithingDevice  ', async () => {
    const dispatch: any = jest.fn();
    const state = {};
    const mockedAction = connectWithingDevice('');
    await mockedAction(dispatch);
    const {calls} = dispatch.mock;
    expect(calls).toHaveLength(3);
  });
});
