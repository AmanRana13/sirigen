import {
  renderWithReactHookForm,
  fireEvent,
  screen,
} from '../../../../utilities/test-utils';
import {Menu} from './Menu.component';

const props = {
  disabled: false,
  label: 'Call Type:',
  menu: true,
  name: 'callType',
  required: true,
  rules: {
    required: 'Required Field',
  },
  validation: {
    required: 'Required Field',
  },
  value: '',
};
describe('Menu Component', () => {
  test('should render Menu component', () => {
    renderWithReactHookForm(
      <Menu
        input='Menu'
        menuItems={[
          {key: 'Fall Detected', value: 'Fall Detected'},
          {key: 'SOS Emergency', value: 'SOS Emergency'},
        ]}
        errorField={undefined}
        errorText=''
        defaultValue=''
        handleChange={jest.fn()}
        {...props}
      />,
    );
    const element = screen.getByTestId(/menu-component/i);
    expect(screen.getByRole('button', {name: 'Select'})).toBeEnabled();
    fireEvent.change(element, {
      target: {value: 'Fall Detected'},
    });
    expect(element).toBeInTheDocument();
  });
});
