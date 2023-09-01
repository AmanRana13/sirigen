import {render} from '../../utilities/test-utils';
import AddUserPage from '../AddUser';

describe('AddUserPage Component', () => {
  test('should render AddUserPage component', () => {
    const {queryByTestId} = render(<AddUserPage noHeader={undefined} />);
    const element = queryByTestId(/add-user/i);

    expect(element).toBeInTheDocument();
  });
});
