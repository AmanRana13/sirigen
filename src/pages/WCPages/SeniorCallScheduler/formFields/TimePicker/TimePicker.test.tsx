import {renderWithReactHookForm} from '../../../../utilities/test-utils';
import {TimePicker} from './TimePicker.component';

describe('TimePicker Component', () => {
  test('should render TimePicker component', () => {
    const {queryByTestId} = renderWithReactHookForm(
      <TimePicker
        className=''
        name='John'
        errorField={undefined}
        errorText='Error Text'
        defaultValue=''
        rules=''
        label='Time'
        required={true}
        disabled={false}
        onClose={jest.fn()}
        onOpen={jest.fn()}
      />,
    );
    const element = queryByTestId('timePicker-component');
    expect(element).toBeInTheDocument();
  });
});
