import {render} from '../../../../../../../utilities/test-utils';
import {SleepCycle} from '../SleepCycle.component';
import mockResponse from '_mocks_/sleepCycle.mock.json';

describe('SleepCycle Component', () => {
  it('should render sleep cycle component', () => {
    const {getByTestId} = render(<SleepCycle graphData={mockResponse} />);
    const element = getByTestId('sleep-cycle-graph');
    expect(element).toBeInTheDocument();
  });
});
