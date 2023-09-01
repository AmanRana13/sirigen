import {GraphAPIRegexUrls} from 'utilities/GraphAPI';
import {
  cleanup,
  fireEvent,
  mockAxios,
  render,
  waitFor,
} from '../../../../../utilities/test-utils';
import Activity from './Activity.container';
import GraphAPIMocks from '_mocks_/GraphAPI';

const mockState = {
  currentState: 'day',
  startTime: 1680633000000000000,
  endTime: 1680719399999000000,
  reRender: true,
  sleepStartTime: null,
  sleepEndTime: null,
};
describe('Activity Component', () => {
  afterEach(() => {
    mockAxios.reset();
    cleanup();
  });

  test('should render Activity component with activity data', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [200, GraphAPIMocks.activitySeries];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityGoal).reply(function () {
      return [200, GraphAPIMocks.activityGoal];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityScore).reply(function () {
      return [200, GraphAPIMocks.activityScore];
    });
    const {queryByTestId} = render(<Activity />, {
      initialState: {
        wellnessDashboard: mockState,
      },
    });
    const element = await waitFor(() => queryByTestId('activity-container'));
    expect(element).toBeInTheDocument();
  });
  test('should render ActivityGoal Button', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [200, GraphAPIMocks.activitySeries];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityGoal).reply(function () {
      return [200, GraphAPIMocks.activityGoal];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityScore).reply(function () {
      return [200, GraphAPIMocks.activityScore];
    });
    const {queryByTestId, getByTestId} = render(<Activity />, {
      initialState: {
        wellnessDashboard: mockState,
      },
    });
    const element = await waitFor(() => queryByTestId('activity-container'));
    expect(element).toBeInTheDocument();

    const button = await waitFor(() => getByTestId('activity-goal-button'));
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Edit');
    fireEvent.click(button);
    expect(button).toHaveTextContent('Save');
  });
  test('should render ActivityGoal Input', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [200, GraphAPIMocks.activitySeries];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityGoal).reply(function () {
      return [200, GraphAPIMocks.activityGoal];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityScore).reply(function () {
      return [200, GraphAPIMocks.activityScore];
    });
    const {queryByTestId, getByTestId} = render(<Activity />, {
      initialState: {
        wellnessDashboard: mockState,
      },
    });
    const element = await waitFor(() => queryByTestId('activity-container'));
    expect(element).toBeInTheDocument();

    const goal = await waitFor(() => getByTestId('activity-goal-input'));
    expect(goal).toBeInTheDocument();
  });
  test('should render ActivityGraph', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [200, GraphAPIMocks.activitySeries];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityGoal).reply(function () {
      return [200, GraphAPIMocks.activityGoal];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityScore).reply(function () {
      return [200, GraphAPIMocks.activityScore];
    });
    const {queryByTestId, queryAllByTestId} = render(<Activity />, {
      initialState: {
        wellnessDashboard: mockState,
      },
    });
    const element = await waitFor(() => queryByTestId('activity-container'));
    expect(element).toBeInTheDocument();

    const graph = await waitFor(() => queryByTestId('circular-graph'));
    expect(graph).toBeInTheDocument();
    const circles = await waitFor(() =>
      queryAllByTestId('circular-graph-circle'),
    );
    expect(circles).toHaveLength(3);
  });
  test('should render ActivityCard', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [200, GraphAPIMocks.activitySeries];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityGoal).reply(function () {
      return [200, GraphAPIMocks.activityGoal];
    });
    mockAxios.onGet(GraphAPIRegexUrls.activityScore).reply(function () {
      return [200, GraphAPIMocks.activityScore];
    });
    const {queryByTestId, queryAllByTestId} = render(<Activity />, {
      initialState: {
        wellnessDashboard: mockState,
      },
    });
    const element = await waitFor(() => queryByTestId('activity-container'));
    expect(element).toBeInTheDocument();
    const cards = await waitFor(() => queryAllByTestId('activity-card'));
    expect(cards).toHaveLength(3);
  });
});
