import { convertMiliSecondsToNanoSeconds } from 'globals/date.functions';
import { store } from '../../../../../store/store';
import {render} from '../../../../../utilities/test-utils';
import { getSleepDaily } from './sleep.action';
import {SleepWeek} from './SleepWeek.component';
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>{
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo))
 });
afterEach(() => jest.clearAllMocks());
const startTime = 1661670000000000000;
const endTime = 1643615999000000000;
const endTimePlusOne=1662361199999
describe('test SleepWeek component', () => {
  test('should render SleepWeek component', async() => {
    const {queryByTestId} = render(<SleepWeek />, {
      initialState: {
        wellnessDashboard: {
          startTime: startTime,
          endTime: endTime,
          reRender: true,
        },
      },
    });
    await store.dispatch(getSleepDaily(startTime, endTime));
    await store.dispatch(getSleepDaily(startTime, convertMiliSecondsToNanoSeconds(endTimePlusOne)));
    const element = queryByTestId(/sleep-week-component/i);

    expect(element).toBeInTheDocument();
  });
});
