import {render} from '../../utilities/test-utils';
import Admin from './Admin';

describe('Admin Component', () => {
  test('should render Admin component', () => {
    const {queryByTestId} = render(<Admin />);
    const element = queryByTestId(/admin-page-wrapper/i);

    expect(element).toBe(null);
  });
});
