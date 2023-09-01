import {render, screen} from '../../../../../utilities/test-utils';
import {HeartRateActivity} from './HeartRateActivity';

const props = {
  summary: {
    data: {
      last: 107,
      max: 107,
      mean: 105,
      min: 103,
      time: 1652695856000000000,
    },
    loading: false,
    notFound: false,
    subTitle: '05/16/2022',
  },
  heartRateActivity: [{x: '05/16', y: 105}],
  activityChartData: [[], []],
  minMaxData: [{x: '05/16', y: 103, y0: 107}],
  type: 'month',
};
describe('Test HeartRateActivity', () => {
  test('should render HeartRateActivity', () => {
    render(<HeartRateActivity {...props} />, {
      initialState: {
        wellnessDashboard: {
          currentState: 'month',
          startTime: 1651343400000000000,
          endTime: 1654021799999000000,
          reRender: true,
          sleepStartTime: null,
          sleepEndTime: null,
        },
      },
    });
    const element = screen.getByTestId(/heart-rate-activity/i);

    expect(element).toBeInTheDocument();
  });
});
