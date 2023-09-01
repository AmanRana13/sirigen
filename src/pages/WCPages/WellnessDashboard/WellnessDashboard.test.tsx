/* eslint-disable max-len */
import {render} from '../../../utilities/test-utils';
import WellnessDashboard from './WellnessDashboard.component';

const props = {
  computedMatch: {
    isExact: true,
    params: {
      accountID: '355ee3d4f7614f429113b4da17f49ed3',
      seniorID: 'senior-f18173fa564c42a2a6622db899072c45',
      timezone: 'America-New_York',
    },
    path: '/senior/:seniorID/:accountID/:timezone/wellness-dashboard',
    url:
      '/senior/senior-f18173fa564c42a2a6622db899072c45/355ee3d4f7614f429113b4da17f49ed3/America-New_York/wellness-dashboard',
  },
  exact: true,
  history: {
    action: 'POP',
  },
  location: {
    hash: '',
    pathname:
      '/senior/senior-f18173fa564c42a2a6622db899072c45/355ee3d4f7614f429113b4da17f49ed3/America-New_York/wellness-dashboard',
    search: '',
    state: undefined,
  },
};

describe('WellnessDashboard Component', () => {
  test('should render WellnessDashboard component ', () => {
    const {queryByTestId} = render(<WellnessDashboard {...props} />);
    const element = queryByTestId(/wellnessDashboard-component/i);

    expect(element).toBeFalsy();
  });
});
