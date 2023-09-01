import {store} from '../../../../../store/store';
import {render} from '../../../../../utilities/test-utils';
import {getSleepDaily} from './sleep.action';
import {SleepMonth} from './SleepMonth.component';
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo)),
);
afterEach(() => jest.clearAllMocks());
const startTime = 1643529600000000000;
const endTime = 1643615999000000000;
describe('test SleepMonth component', () => {
  test('should render SleepMonth component', async () => {
    const {queryByTestId} = render(<SleepMonth />, {
      initialState: {
        wellnessDashboard: {
          startTime: startTime,
          endTime: endTime,
          reRender: true,
        },
      },
    });
    await store.dispatch(getSleepDaily(startTime, endTime));
    const element = queryByTestId(/sleep-month-component/i);

    expect(element).toBeInTheDocument();
  });
});
