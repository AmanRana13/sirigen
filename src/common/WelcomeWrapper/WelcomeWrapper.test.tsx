import {render} from 'utilities/test-utils';
import WelcomeWrapper from './WelcomeWrapper.component';

describe('Testing WelcomeWrapper Component', () => {
  test('should render WelcomeWrapper component', () => {
    const {queryByTestId, queryByText} = render(<WelcomeWrapper>CHILD</WelcomeWrapper>);
    const element = queryByTestId(/home-component/i);
    expect(element).toBeInTheDocument();
    const child = queryByText(/CHILD/);
    expect(child).toBeInTheDocument();
  });
});
