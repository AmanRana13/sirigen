import {render, screen} from '../../../../utilities/test-utils';
import CorporateManagement from './CorporateManagement.component';

describe('Corporate Management  component ', () => {
  test('should render CorporateManagement component ', () => {
    render(<CorporateManagement />);
    const element = screen.getByTestId(/corporate-management/i);

    expect(element).toBeInTheDocument();
  });
});
