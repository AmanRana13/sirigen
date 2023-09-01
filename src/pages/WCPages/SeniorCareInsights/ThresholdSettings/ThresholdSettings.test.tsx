import {store} from 'store';
import {mockSeniorData} from '_mocks_/commonMocks';
import {render} from '../../../utilities/test-utils';
import {getVitals} from './Threshold.action';
import ThresholdSettings from './ThresholdSettings';

const selectedVital = {
  seniorId: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
  measurementUnit: 'Beats Per Minute (BPM)',
  measurementName: 'heart_rate_measurement',
  currentState: 'active_insight',
  measurementTitle: 'Heart Rate',
  vendorName: 'Navigil',
  modelNumber: '123456789',
  createdDate: '2021-10-26T04:36:09.431637',
  selected: true,
  actual: {
    high: 285,
    low: 1,
    avg: 143,
  },
  baseline: {
    high: 182,
    low: 140,
    avg: 161,
  },
  timestamp: {
    start: 132432543543,
    end: 342424124134324,
  },
  threshold: {
    upHigh: 45,
    upLow: null,
    lowHigh: null,
    lowLow: 40,
  },
  array: {
    0: {time: 12344556656, event_time: 1234566342, heart_rate: 45},
    1: {
      time: 1663659946000000000,
      event_timestamp: 1663660329000000000,
      heart_rate: 137,
    },
    2: {
      time: 1663659944000000000,
      event_timestamp: 1663660329000000000,
      heart_rate: 136,
    },
  },
  tableFilterValue: null,
};

describe('ThresholdSettings Component', () => {
  test('should render ThresholdSettings component', async () => {
    const {queryByTestId} = render(<ThresholdSettings />, {
      initialState: {
        common: mockSeniorData,
        seniorCareInsights: {
          thresholds: {
            selectedVital,
            vitals: {
              active: [{...selectedVital, currentState: 'assigned'}],
              inactive: [],
            },
          },
        },
      },
    });
    await store.dispatch(getVitals());
    const element = queryByTestId(/threshold-settings/i);

    expect(element).toBeInTheDocument();
  });
});
