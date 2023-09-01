import {render} from '../../../../../../../utilities/test-utils';
import {SleepDepth} from '../SleepDepth.component';
import mockResponse from '_mocks_/sleepDepth.mock.json';

describe('SleepDepth Component', () => {
  it('should render sleep depth component', () => {
    const {getByTestId} = render(<SleepDepth graphData={mockResponse} />);
    const element = getByTestId('sleep-depth-graph');
    expect(element).toBeInTheDocument();
  });
});
