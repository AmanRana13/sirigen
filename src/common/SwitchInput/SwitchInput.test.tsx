import {render} from '../../utilities/test-utils';
import SwitchInput from './SwitchInput';

describe('SwitchInput Component', () => {
  test('should render SwitchInput component', () => {
    const {queryByTestId} = render(
      <SwitchInput
        label='Care Insight Message'
        checked={false}
        handleChange={jest.fn()}
      />,
    );
    const element = queryByTestId(/switch-input-component/i);

    expect(element).toBeInTheDocument();
  });
});
