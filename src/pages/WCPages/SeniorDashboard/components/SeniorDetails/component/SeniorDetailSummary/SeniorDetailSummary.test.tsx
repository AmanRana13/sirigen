import {render} from '../../../../../../utilities/test-utils';
import SeniorDetailSummary from './SeniorDetailSummary';

describe('SeniorDetailSummary Component', () => {
  test('should render SeniorDetailSummary component', () => {
    const {queryByTestId} = render(<SeniorDetailSummary />);
    const element = queryByTestId(/senior-detail-component/i);

    expect(element).toBeInTheDocument();
  });
});
