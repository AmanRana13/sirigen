import {render} from '../../../utilities/test-utils';
import Assignment from './Assignment.component';
describe('Testing Assignment tab in admin sideMenu bar', () => {
  test('should render Assignment tab ', () => {
    const element = render(<Assignment />);
    expect(element).toBeTruthy();
  });
});