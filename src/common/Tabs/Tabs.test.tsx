import {render} from '../../utilities/test-utils';
import {TabPanel} from './Tabs.component';

describe('TabPanel Component', () => {
  test('should render TabPanel component', () => {
    const {queryByTestId} = render(<TabPanel />);
    const element = queryByTestId(/tabs-component/i);

    expect(element).toBeInTheDocument();
  });
});
