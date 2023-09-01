import {render, screen} from '../../utilities/test-utils';
import Home from './Home.component';

describe('HomeComponent ', () => {
  test('should render HomeComponent ', () => {
    render(<Home />);
    const element = screen.getByText(/Welcome/i);

    expect(element).toBeInTheDocument();
  });
});
