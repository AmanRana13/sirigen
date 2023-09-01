import {render} from 'utilities/test-utils';
import ResidentDetailSummary from './ResidentDetailSummary';

describe(' ResidentDetailsCard component', () => {
  test('should render ResidentDetailsCard  component', () => {
    const {queryByTestId} = render(<ResidentDetailSummary  />);
    const element = queryByTestId(/Resident-detail-component/i);
    expect(element).toBeTruthy();
  });
});
