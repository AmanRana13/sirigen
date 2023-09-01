/* eslint-disable max-len */
import {cleanup, mockAxios, render, waitFor} from '../../../../../utilities/test-utils';
import HeartRate from './HeartRate.container';
import {HeartRateComponent} from './HeartRate.component';
import { GraphAPIRegexUrls } from 'utilities/GraphAPI';
import GraphAPIMocks from '_mocks_/GraphAPI';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      vitalData: {
        summaryMessage: '',
        date: new Date('04-05-2023'),
        heartRateData: [{x: 60, y: 120}],
        rangeMap: {
          high: 80,
          low: 160,
        },
      }
    }
  })
}));

const mockState = {
  currentState: 'day',
  startTime: 1680633000000000000,
  endTime: 1680719399999000000,
  reRender: true,
  sleepStartTime: null,
  sleepEndTime: null,
}


describe('HeartRate Component', () => {
  afterEach(() => {
    mockAxios.reset();
    cleanup();
  });
  test('should render HeartRate container', async () => {
    const {getByTestId} = render(<HeartRate />);
    const element = await waitFor(() => getByTestId(/heart-rate-component/i));
    expect(element).toBeInTheDocument();
  });

  test('should render HeartRate component', async () => {
    const {getByTestId} = render(
      <HeartRateComponent />,
    );
    const element = await waitFor(() => getByTestId(/heart-rate-component/i));

    expect(element).toBeInTheDocument();
  });

  test('should render HeartRate Day text', async () => {
    const {getByText} = render(<HeartRate />);
    const element = await waitFor(() => getByText(/Day/i));
    expect(element).toBeInTheDocument();
  });

  test('should render Current text in HeartRate component', async () => {
    const { getByText } = render(<HeartRateComponent />);
    const element = await waitFor(() => getByText(/Current/i));

    expect(element).toBeInTheDocument();
  });

  test('should render Heart Rate/Activity text', async () => {
    const { getByText } = render(<HeartRateComponent />);
    const element = await waitFor(() => getByText('Heart Rate/Activity'));
    expect(element).toBeInTheDocument();
  });

  test('should render HeartRate component with initial data', async () => {
    const {getByTestId} = render(
      <HeartRateComponent />,
      {
        initialState: {
          wellnessDashboard: mockState
        }
      }
    );
    const element = await waitFor(() => getByTestId(/heart-rate-component/i));

    expect(element).toBeInTheDocument();
  });

  test('should render HeartRate component with initial data, heartrate & activity', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [
       200,
       GraphAPIMocks.activitySeries
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.heartExtreme).reply(function () {
      return [
       200,
       GraphAPIMocks.heartExtreme
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.heart).reply(function () {
      return [
       200,
       GraphAPIMocks.heart
      ];
    });
    const {getByTestId} = render(
      <HeartRateComponent />,
      {
        initialState: {
          wellnessDashboard: mockState
        }
      }
    );

    const element = await waitFor(() => getByTestId(/heart-rate-component/i));

    expect(element).toBeInTheDocument();
  });

  test('should render HeartRate component with initial data, activity without heartrate', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [
       200,
       GraphAPIMocks.activitySeries
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.heartExtreme).reply(function () {
      return [
       200,
       GraphAPIMocks.heartExtreme
      ];
    });
    const {getByTestId} = render(
      <HeartRateComponent />,
      {
        initialState: {
          wellnessDashboard: mockState
        }
      }
    );

    const element = await waitFor(() => getByTestId(/heart-rate-component/i));

    expect(element).toBeInTheDocument();
  });

  test('should render HeartRate component with currentState not day', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [
       200,
       GraphAPIMocks.activitySeries
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.heartExtreme).reply(function () {
      return [
       200,
       GraphAPIMocks.activitySeries
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.heart).reply(function () {
      return [
       200,
       GraphAPIMocks.heart

      ];
    });
    const {getByTestId} = render(
      <HeartRateComponent />,
      {
        initialState: {
          wellnessDashboard: {
            ...mockState,
            currentState: 'month'
          }
        }
      }
    );

    const element = await waitFor(() => getByTestId(/heart-rate-component/i));

    expect(element).toBeInTheDocument();
  });
});
