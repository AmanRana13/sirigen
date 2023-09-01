import {render, screen} from '../../utilities/test-utils';
import {DepthGraph} from './DepthGraph';

describe('DepthGraph Component', () => {
  test('should render DepthGraph component', () => {
    render(<DepthGraph />);
    const element = screen.getByText('Deep');
    expect(element).toBeTruthy();
  });
});
