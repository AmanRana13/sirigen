import {render, screen} from '../../../utilities/test-utils';
import Assessment from './Assessment.component';
describe('Testing Assessment tab in admin sideMenu bar', () => {
  test('should render Assessment tab ', () => {
    const element = render(<Assessment />);
    expect(element).toBeTruthy();
  });
});
