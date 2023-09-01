import {render, screen} from '../../../../utilities/test-utils';
import FacilityManagement from './FacilityManagement.component';

describe('Facility Management  component ', () => {
  test('should render Facility management component ', () => {
    render(<FacilityManagement />);
    const element = screen.getByTestId(/facility-management/i);

    expect(element).toBeInTheDocument();
  });
});