import {render} from 'utilities/test-utils';

import Header from './Header.component';

describe('Print: Header', () => {
  test('renders Header component without children', () => {
    const {queryByTestId} = render(
      <Header />,
    );
    const element = queryByTestId('print-header');
    expect(element).toBeInTheDocument();
  });
  test('renders Header component with children', () => {
    const {queryByTestId} = render(
      <Header><div data-testid='print-header-child'>Child</div></Header>,
    );
    const element = queryByTestId('print-header');
    expect(element).toBeInTheDocument();
    const child = queryByTestId('print-header-child');
    expect(child).toBeInTheDocument();
  });
});
