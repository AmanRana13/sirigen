import {render, screen} from 'utilities/test-utils';
import SeniorCoachAssignment from './SeniorCoachAssignment.component';

describe('SeniorCoachAssignment Assignment component', () => {
  test('renders SeniorCoachAssignment Assignment', () => {
    render(<SeniorCoachAssignment />);
    const text = screen.getByText(/Unassigned Seniors/i);
    expect(text).toBeInTheDocument();
  });
});
