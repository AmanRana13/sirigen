import {render} from '../../../../utilities/test-utils';
import {InputTextBox} from './InputTextBox.component';

describe('InputTextBox Component', () => {
  test('should render InputTextBox component', () => {
    const {queryByTestId} = render(
      <InputTextBox
        label=''
        required={false}
        helperText=''
        inline={false}
        unitValue=''
        spacing={false}
        readOnly={false}
        register={null}
        multiline={false}
        extraComponent
        center={false}
        errorField={undefined}
        errorText=''
        input='label'
        defaultValue=''
      />,
    );
    const element = queryByTestId(/inputTextBox-component/i);

    expect(element).toBeInTheDocument();
  });
});
