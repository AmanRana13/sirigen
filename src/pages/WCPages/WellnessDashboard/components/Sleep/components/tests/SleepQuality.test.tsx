import {render} from '../../../../../../../utilities/test-utils';
import {SleepQuality} from '../SleepQuality.component';
import mockResponse from '_mocks_/sleepQuality.mock.json';

describe('SleepQuality Component', () => {
  it('should render sleep quality component', () => {
    const {getByTestId} = render(<SleepQuality sleepSummary={mockResponse} />);
    const element = getByTestId('sleep-quality-graph');
    expect(element).toBeInTheDocument();
  });
});
