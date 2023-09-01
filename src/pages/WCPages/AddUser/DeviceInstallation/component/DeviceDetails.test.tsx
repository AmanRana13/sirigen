import {mockSeniorData} from '_mocks_/commonMocks';
import {fireEvent, render} from '../../../../utilities/test-utils';
import DeviceDetails from './DeviceDetails';
const mockedState = mockSeniorData;
const deviceDetail = {
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
};
describe('DeviceDetails', () => {
  test('should render DeviceDetails', () => {
    const {queryByTestId} = render(
      <DeviceDetails
        deviceDetail={deviceDetail}
        infoMsg=' Height in profile info is required to save the device'
      />,
      {initialState: {common: mockedState}},
    );
    const element = queryByTestId(/device-details/i);

    expect(element).toBeTruthy();
  });
  test('should render save button DeviceDetails', () => {
    const {getAllByRole} = render(
      <DeviceDetails
        deviceDetail={deviceDetail}
        infoMsg=' Height in profile info is required to save the device'
      />,
      {initialState: {common: mockedState}},
    );
    const element = getAllByRole('button', {name: /Save/i});
    fireEvent.click(element[0]);
    expect(element[0]).toBeTruthy();
  });
});
