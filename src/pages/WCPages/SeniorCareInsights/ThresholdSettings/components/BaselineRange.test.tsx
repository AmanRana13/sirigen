import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {store} from 'store';
import {render, screen, fireEvent} from '../../../../utilities/test-utils';
import {
  downloadThresholdData,
  refreshBaseline,
  submitThresholdConfig,
} from '../Threshold.action';
import BaselineRange from './BaselineRange';
import ThresholdGraphMemo from './Threshold.graph.component';
import Chart from './ThresholdChart';
import ThresholdFields from './ThresholdFields';
import ThresholdHistory from './ThresholdHistory';

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
const props = {
  highCutOff: 123,
  lowCutOff: 18,
  selectedVital: selectedVital,
  actual: {high: 285, avg: 143, low: 1},
  baseline: {high: 195, avg: 108, low: 21},
  percentile: {high: 0.99, low: 0.01},
  setPercentile: jest.fn(),
};
const disabled = [
  {
    name: 'upperHigh',
    dependent: 'upHigh',
    rules: (lowLow: any, bsLow: any) => (lowLow / 100) * bsLow,
    label: 'High',
    disabled: true,
    value: 87.8,
    seq: 1,
    order: 2,
  },
  {
    dependent: 'lowLow',
    disabled: true,
    label: 'Low',
    name: 'lowerLow',
    order: 4,
    rules: (lowLow: any, bsLow: any) => (lowLow / 100) * bsLow,
    seq: 5,
    value: 112,
  },
];
const timestamp = {start: 132432543543, end: 342424124134324};
describe('BaselineRange Component', () => {
  test('test BaselineRange component', () => {
    render(<BaselineRange />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            selectedVital,
          },
        },
      },
    });

    const element = screen.getByTestId(/baseline-range/i);
    expect(element).toBeInTheDocument();
  });

  test('test BaselineRange component when refresh button is clicked', async () => {
    render(<BaselineRange />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            selectedVital: {...selectedVital, currentState: 'assigned'},
          },
        },
      },
    });

    const refreshButton = screen.getByTestId(/refresh/i);
    fireEvent.click(refreshButton);
    await store.dispatch(refreshBaseline());
    await store.dispatch(
      showToast('Baseline refreshed successfully.', 'success'),
    );
    expect(store.getState().toast).toStrictEqual({
      duration: 4000,
      message: 'Baseline refreshed successfully.',
      open: true,
      type: 'success',
    });

    expect(screen.findByText(/Baseline refreshed successfully/i)).toBeTruthy();
  });
  test('test Threshold component submit button', async () => {
    render(<ThresholdFields {...props} />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            selectedVital,
          },
        },
      },
    });
    const element = screen.getByText(/Submit/i);
    fireEvent.click(element);
    await store.dispatch(
      submitThresholdConfig(
        props.selectedVital,
        disabled,
        props.actual,
        props.baseline,
      ),
    );
    expect(element).toBeInTheDocument();
  });
});

describe('thresholdGraph Component', () => {
  test('test should render threshold graph component', () => {
    render(<ThresholdGraphMemo {...props} />);

    const element = screen.getByTestId(/thresholdGraph/i);
    expect(element).toBeInTheDocument();
  });
  test('test should increase the percentile high value on clicking increase button in  threshold graph component', () => {
    render(<ThresholdGraphMemo {...props} />);

    const increaseButton = screen.getByTestId(/percentileHighIncrease/i);
    fireEvent.click(increaseButton);
    expect(props.percentile.high).toBe(0.99);
  });
  test('test should decrease the percentile high value on clicking decrease button in  threshold graph component', () => {
    render(<ThresholdGraphMemo {...props} />);

    const decreaseButton = screen.getByTestId(/percentileHighDecrease/i);
    fireEvent.click(decreaseButton);
    expect(props.setPercentile).toHaveBeenCalledTimes(1);
  });
  test('test should increase the percentile Low value on clicking increase button in  threshold graph component', () => {
    render(<ThresholdGraphMemo {...props} />);

    const increaseButton = screen.getByTestId(/percentileLowIncrease/i);
    fireEvent.click(increaseButton);
    expect(props.setPercentile).toHaveBeenCalledTimes(1);
  });
  test('test should decrease the percentile low value on clicking decrease button in  threshold graph component', () => {
    render(<ThresholdGraphMemo {...props} />);

    const decreaseButton = screen.getByTestId(/percentileLowDecrease/i);
    fireEvent.click(decreaseButton);

    expect(props.percentile.low).toBe(0.01);
  });
  test('test should render chart in threshold graph component', () => {
    render(<Chart {...props} />);

    const element = screen.getByTestId(/heart-rate-chart/i);
    expect(element).toBeInTheDocument();
  });
});
describe('thresholdHistory Component', () => {
  test('test should render threshold history component', () => {
    render(
      <ThresholdHistory
        tableData={selectedVital.array}
        highCutOff={123}
        lowCutOff={18}
        filter={null}
        timestamp={timestamp}
      />,
      {
        initialState: {
          seniorCareInsights: {
            thresholds: {
              selectedVital,
            },
          },
        },
      },
    );

    const element = screen.getByTestId(/thresholdHistoryComponent/i);
    expect(element).toBeInTheDocument();
  });
  test('test should render download link in threshold history component', async () => {
    render(
      <ThresholdHistory
        tableData={selectedVital.array}
        highCutOff={123}
        lowCutOff={18}
        filter={null}
        timestamp={timestamp}
      />,
      {
        initialState: {
          seniorCareInsights: {
            thresholds: {
              selectedVital,
            },
          },
        },
      },
    );

    const downloadLink = screen.getByText(/DownLoad/i);
    expect(downloadLink).toBeInTheDocument();
    fireEvent.click(downloadLink);
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      downloadThresholdData({
        senior_id: 'senior-33246c5ba7234859a52006df7e0a4645',
        account_id: '0b0bdebe65c34269915d61bde3486267',
        start_timestamp: timestamp.start,
        end_timestamp: timestamp.end,
      }),
    );
    await store.dispatch(hideApplicationLoader());
    expect(store.getState().applicationLoader).toBeTruthy();
  });
});
