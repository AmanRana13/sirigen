/* eslint-disable max-len */
import {
  render,
  fireEvent,
  act,
  screen,
  waitForElementToBeRemoved,
  mockAxios,
  cleanup,
  waitFor,
} from '../../../../../utilities/test-utils';
import Sleep from './Sleep.container';
import {
  getSleepDaily,
  getSleepHR,
  getSleepPhase,
  getSleepDepth,
} from './sleep.action';
import {SleepComponent} from './Sleep.component';
import { store } from 'store';
import { GraphAPIRegexUrls } from 'utilities/GraphAPI';
import { SleepWeek } from './SleepWeek.component';
import { SleepMonth } from './SleepMonth.component';
import GraphAPIMocks from '_mocks_/GraphAPI';

global.window = Object.create(window);
const url =
  'http://localhost:3000/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/wellness-dashboard?initialExpand=sleep';
Object.defineProperty(window, 'location', {
  value: {
    href: url,
    pathname:
      '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/wellness-dashboard',
  },
});

const mockState = {
  currentState: 'day',
  startTime: 1680650860000000000,
  endTime: 1680680320000000000,
  reRender: true
}

const startTime = 1643529600000000000;
const endTime = 1643615999000000000;
const summaryCycleTimestamps = [
  {start_time: 1643524680000000000, end_time: 1643562660000000000},
];
describe('SleepComponent', () => {
  afterEach(() => {
    mockAxios.reset();
    cleanup();
  });
  test('should render sleep with data', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.sleepDaily).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepDaily
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepDepth).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepDepth
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepPhase).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepPhase
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepHR).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepHR
      ];
    });
    const {getByTestId} = render(
      <Sleep />,
      {
        initialState: {
          wellnessDashboard: mockState
        }
      }
    );
    const element = await waitFor(() => getByTestId(/sleep-quality-container/i));

    expect(element).toBeInTheDocument();
  })
  test('should render sleepWeek with data', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.sleepDaily).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepDaily
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepDepth).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepDepth
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepPhase).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepPhase
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepHR).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepHR
      ];
    });
    const {getByTestId} = render(
      <SleepWeek />,
      {
        initialState: {
          wellnessDashboard: {
            ...mockState,
            currentState: 'week'
          }
        }
      }
    );
    const element = await waitFor(() => getByTestId(/sleep-week-component/i));

    expect(element).toBeInTheDocument();
  })
  test('should render sleepMonth with data', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.sleepDaily).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepDaily
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepDepth).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepDepth
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepPhase).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepPhase
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.sleepHR).reply(function () {
      return [
       200,
       GraphAPIMocks.sleepHR
      ];
    });
    const {getByTestId} = render(
      <SleepMonth />,
      {
        initialState: {
          wellnessDashboard: {
            ...mockState,
            currentState: 'month'
          }
        }
      }
    );
    const element = await waitFor(() => getByTestId(/sleep-month-component/i));

    expect(element).toBeInTheDocument();
  })
  test('should render sleep component', () => {
    const {getByTestId} = render(<Sleep />, {});
    const element = getByTestId('sleep-quality-container');
    expect(element).toBeInTheDocument();
  });

  test('should render sleep container for Day', () => {
    const {getByTestId} = render(<Sleep />, {
      initialState: {
        wellnessDashboard: {
          startTime: startTime,
          endTime: endTime,
          reRender: true,
          currentState: 'day',
          sleepStartTime: null,
          sleepEndTime: null,
        },
      },
    });
    const element = getByTestId('sleep-quality-container');
    expect(element).toBeInTheDocument();
  });
    test('should render sleep container for Default', () => {
    const {getByText} = render(<Sleep />, {
      initialState: {
        wellnessDashboard: {
          startTime: startTime,
          endTime: endTime,
          reRender: true,
          sleepStartTime: null,
          sleepEndTime: null,
        },
      },
    });
    const element = getByText('Loading...');
    expect(element).toBeInTheDocument();
  });
  test('should render sleep component', () => {
    const {getByTestId} = render(
      <SleepComponent dailyRecapDateHandler={jest.fn()} />,
      {
        initialState: {
          wellnessDashboard: {
            startTime: startTime,
            endTime: endTime,
            reRender: true,
            currentState: 'day',
          },
        },
      },
    );
    const element = getByTestId('sleep-quality-container');
    expect(element).toBeInTheDocument();
  });
  test('should render sleep week component', () => {
    const {getByTestId} = render(<Sleep />, {});
    const element = getByTestId('week-button');
    fireEvent.click(element);
  });

  test('should render sleep month component', async () => {
    let component: any;
    await act(async () => {
      component = render(<Sleep />);

      const element = component.getByTestId('month-button');
      fireEvent.click(element);
      await waitForElementToBeRemoved(screen.queryAllByRole('progressbar'));
    });
  });

  test('should call getSleepDaily action', async () => {
      const res = await store.dispatch(getSleepDaily(startTime, endTime));
       expect(res).toBeTruthy();
  });

  test('should call getSleepHR action', async () => {
    const res = await store.dispatch(getSleepHR(summaryCycleTimestamps));
    expect(res).toBeTruthy();
  });
 test('should call getSleepPhase action', async () => {
      const res = await store.dispatch(getSleepPhase(summaryCycleTimestamps));
    expect(res).toBeTruthy();
  });

  test('should call getSleepDepth action', async () => {
      const res = await store.dispatch(getSleepDepth(startTime, endTime));
      expect(res).toBeTruthy();
  });
});
