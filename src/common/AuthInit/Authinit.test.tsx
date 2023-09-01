import userInfo from '_mocks_/userInfo.mock.json';
import {render} from 'utilities/test-utils';
import {sosAlarmInitialState} from '_mocks_/EventsReducerMocks';
import {setLocalStorage} from 'globals/global.functions';
import AuthInit from './AuthInit';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
const mockedData = {
  isAuthenticated: true,
  roleConfig: {
    accessLabel: 'Agent',
    careInsightPrivileges: {
      isAlarms: true,
      isAlertActionNotification: true,
      isAlerts: true,
      isApproveAlert: false,
      isApproveSummary: false,
      isCIRangeMilestoneNotification: false,
      isSummaryActionNotification: true,
    },
  },
  defaultHomeRoute: 'dashboard',
  defaultPage: appRoutesEndpoints.homePage,
};
beforeAll(() => setLocalStorage('userInfo', userInfo));
describe('Authinit', () => {
  test('render Authinit component ', () => {
    const component = render(<AuthInit />, {
      initialState: {auth: mockedData, alarms: {sos: sosAlarmInitialState}},
    });
    expect(component).toBeTruthy();
  });
});
