import {fireEvent, render, screen} from '../../utilities/test-utils';
import {OnboardingInfo} from './OnboardingInfo.component'

describe('OnboardingInfo Component', () => {
  test('should render OnboardingInfo component', () => {
    const {queryByTestId} = render(<OnboardingInfo props={jest.fn()} />);
    const element = queryByTestId(/add-user/i);
    expect(element).toBeInTheDocument();
  });
});