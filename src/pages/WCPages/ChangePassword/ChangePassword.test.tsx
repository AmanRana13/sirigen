import {render, screen} from '../../utilities/test-utils';
import ChangePassword from './ChangePassword';

describe('ChangePassword ', () => {
  test('should render ChangePassword ', () => {
    render(<ChangePassword />);
    const element = screen.getByText(/Change Password/i);

    expect(element).toBeInTheDocument();
  });
});
