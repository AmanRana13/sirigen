import {render, screen} from '../../utilities/test-utils';
import {InputFields} from './InputFields.component';

describe('InputFields Component', () => {
  test('should render Input Fields component', () => {
    render(
      <InputFields
      isError={true}
      initialValue='test'
      label='test'
      isLabel={true}
      inputProps={{
        name: 'extension',
        placeholder: 'xxxx',
        maxLength: 4,
      }}
      eventProps={{
        onChange: jest.fn(),
        value:'',
      }}
      />,
    );
    const element = screen.queryByTestId(/field-label/i);

    expect(element).toBeInTheDocument();
  });
});
