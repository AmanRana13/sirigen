/* eslint-disable max-len */
import { GraphAPIRegexUrls } from 'utilities/GraphAPI';
import {cleanup, mockAxios, render, waitFor} from '../../../../../utilities/test-utils';
import { RespirationComponent } from './Respiration.component';
import Respiration from './Respiration.container';
import GraphAPIMocks from '_mocks_/GraphAPI';

const mockState = {
  currentState: 'day',
  startTime: 1680633000000000000,
  endTime: 1680719399999000000,
  reRender: true,
  sleepStartTime: null,
  sleepEndTime: null,
}


describe('Respiration Component', () => {
  afterEach(() => {
    mockAxios.reset();
    cleanup();
  });
  test('should render Respiration Container', async () => {
    const {getByTestId} = render(
      <Respiration />
    );
    const element = await waitFor(() => getByTestId(/respiration/i));
    expect(element).toBeInTheDocument();
  });

  test('should render Respiration component with initial data', async () => {
    const {getByTestId} = render(
      <RespirationComponent />,
      {
        initialState: {
          wellnessDashboard: mockState
        }
      }
    );
    const element = await waitFor(() => getByTestId(/respiration/i));

    expect(element).toBeInTheDocument();
  });

  test('should render Respiration component with initial data, Respiration & activity', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [
       200,
       GraphAPIMocks.activitySeries
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.respirationExtreme).reply(function () {
      return [
       200,
       GraphAPIMocks.respirationExtreme
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.respiration).reply(function () {
      return [
       200,
       GraphAPIMocks.respiration
      ];
    });
    const {getByTestId} = render(
      <RespirationComponent />,
      {
        initialState: {
          wellnessDashboard: mockState
        }
      }
    );

    const element = await waitFor(() => getByTestId(/respiration-activity/i));

    expect(element).toBeInTheDocument();
  });

  test('should render Respiration component with currentState not day', async () => {
    mockAxios.onGet(GraphAPIRegexUrls.activitySeries).reply(function () {
      return [
       200,
       GraphAPIMocks.activitySeries
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.respirationExtreme).reply(function () {
      return [
       200,
       GraphAPIMocks.respirationExtreme
      ];
    });
    mockAxios.onGet(GraphAPIRegexUrls.respiration).reply(function () {
      return [
       200,
       GraphAPIMocks.respiration
      ];
    });

    const {getByTestId} = render(
      <RespirationComponent />,
      {
        initialState: {
          wellnessDashboard: {
            ...mockState,
            currentState: 'month'
          }
        }
      }
    );

    const element = await waitFor(() => getByTestId(/respiration-activity/i));

    expect(element).toBeInTheDocument();
  });
});
