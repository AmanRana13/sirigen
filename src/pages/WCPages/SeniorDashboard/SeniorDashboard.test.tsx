import {render} from 'utilities/test-utils';
import loginInfo from '_mocks_/loginInfo.mock.json';

import SeniorDashboard from './SeniorDashboard.component';

describe('SeniorDashboard', () => {
  beforeAll(() => {
    localStorage.setItem('userInfo', JSON.stringify(loginInfo));

    global.window = Object.create(window);
    const url =
      'http://localhost:3000/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname:
          '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/dashboard',
      },
    });
  });

  test('renders SeniorDashboard component', () => {
    const {getByTestId} = render(<SeniorDashboard />);
    const element = getByTestId('senior-dashboard');
    expect(element).toBeInTheDocument();
  });
});
