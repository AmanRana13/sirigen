import {render, screen} from 'utilities/test-utils';

import {DoubleProgress} from './DoubleProgress';

describe('DoubleProgress', () => {
  test('renders DoubleProgress component', () => {
    render(<DoubleProgress innerValue={20} outerValue={45} value='30' />);
    const element = screen.queryByText('30');
    expect(element).toBeInTheDocument();
  });

  test('renders DoubleProgress component with outerValue greater than 50', () => {
    render(<DoubleProgress innerValue={20} outerValue={70} value='30' />);
    const element = screen.queryByText('30');
    expect(element).toBeInTheDocument();
  });

  test('renders DoubleProgress component with no value', () => {
    render(<DoubleProgress innerValue={20} outerValue={70} value='' />);
    const element = screen.queryByText('-');
    expect(element).toBeInTheDocument();
  });
});
