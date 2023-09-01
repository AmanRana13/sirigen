import {renderWithReactHookForm} from '../../../../utilities/test-utils';
import {DatePicker} from './DatePicker.component';

describe('DatePicker Component', () => {
  test('should render DatePicker component', () => {
    const {queryByTestId} = renderWithReactHookForm(
      <DatePicker
        name='date'
        errorField={undefined}
        errorText=''
        defaultValue=''
        rules='Required Field'
        disablePast={true}
        label='Date'
        required={true}
        maxDate=''
        disabled={true}
      />,
    );
    const element = queryByTestId(/datePicker-component/i);

    expect(element).toBeInTheDocument();
  });
});
