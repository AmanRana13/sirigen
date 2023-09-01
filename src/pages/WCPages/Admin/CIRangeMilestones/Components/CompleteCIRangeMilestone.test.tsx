import {render, screen} from '../../../../utilities/test-utils';
import CompletedCIRangeMilestones from './CompletedCIRangeMilestones.component';
describe('Testing  CompletedCIRangeMilestones Component', () => {
  test('should render CompletedCIRangeMilestones Component', () => {
    render(<CompletedCIRangeMilestones />);
    const element = screen.getByTestId(/CompletedCIRangeMilestones/i);
    expect(element).toBeInTheDocument();
  });
});
