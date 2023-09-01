import {render} from 'utilities/test-utils';
import AppVersion from './AppVersion';

describe('AppVersion', () => {
  test('renders AppVersion component', () => {
    const {queryByTestId} = render(<AppVersion />);
    const element = queryByTestId('app-version');
    expect(element).toBeInTheDocument();
  });
});
