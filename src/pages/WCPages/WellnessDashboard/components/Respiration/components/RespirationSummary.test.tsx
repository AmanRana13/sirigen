import {render} from '../../../../../../utilities/test-utils';
import {RespirationSummary} from './RespirationSummary.component';

describe('RespirationSummary Component', () => {
  test('should render RespirationSummary component', () => {
    const {queryByTestId} = render(<RespirationSummary summary='' />);
    const element = queryByTestId(/respiration-summary/i);

    expect(element).toBeInTheDocument();
  });
});
