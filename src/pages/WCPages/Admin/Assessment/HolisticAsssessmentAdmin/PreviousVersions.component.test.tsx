import {render, screen} from '../../../../utilities/test-utils';
import PreviousVersions from './PreviousVersions.component';
describe('Testing previous version in admin holistic assessment', () => {
  test('should render previous version ', () => {
    render(<PreviousVersions />);
    const element = screen.getByTestId(/assessmentHistoryComponent/i);
    expect(element).toBeTruthy();
  });
});
