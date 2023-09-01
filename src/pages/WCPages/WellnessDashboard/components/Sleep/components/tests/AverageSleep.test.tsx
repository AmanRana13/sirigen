import {render} from '../../../../../../../utilities/test-utils';
import {AverageSleep} from '../AverageSleep.component';
import mockResponse from '_mocks_/averageSleep.mock.json';

describe('AverageSleep Component', () => {
  it('should render average sleep component', () => {
    const {getByTestId} = render(
      <AverageSleep graphData={mockResponse} interupptionGraph={[]} />,
    );
    const element = getByTestId('average-sleep-graph');
    expect(element).toBeInTheDocument();
  });
});
