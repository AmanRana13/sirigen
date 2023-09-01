import {render, screen} from 'utilities/test-utils';
import SeniorWCMapping from './SeniorWCMapping.component';

describe('SeniorWCMapping Assignment component', () => {
  test('renders SeniorWCMapping Assignment', () => {
    render(<SeniorWCMapping />);
    const text = screen.getByText(/Wellness Coaches/i);
    expect(text).toBeInTheDocument();
  });
});
