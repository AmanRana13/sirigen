import {render} from '../../../../utilities/test-utils';
import DeviceForm from './DeviceForm';

const props = {
  name: 'navigil',
  label: 'Connect with Navigil',
  placeHolder: 'Navigil Id',
  defaultValue: 1200000905,
  size: 4,
  required: true,
  disabled: true,
  validation: {
    required: 'Required Field',
  },
  onSumbit: jest.fn(),
};

describe('DeviceForm Component', () => {
  test('should render DeviceForm component', () => {
    const {queryByTestId} = render(<DeviceForm {...props} />);
    const element = queryByTestId(/device-form/i);

    expect(element).toBeInTheDocument();
  });
});
