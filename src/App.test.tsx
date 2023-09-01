import App from './App';
import {render} from './utilities/test-utils';

test('renders learn react link', async () => {
  const {findByText} = render(<App />);
  const linkElement = findByText(/Welcome Back/i);
  expect(linkElement).toBeTruthy();
});
