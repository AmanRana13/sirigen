import {render} from 'utilities/test-utils';

import Header from './Header.component';

describe('Preview: Header', () => {
  test('renders Header component without children', () => {
    const {queryByTestId} = render(
      <Header />,
    );
    const element = queryByTestId('preview-header');
    expect(element).toBeInTheDocument();
  });
  test('renders Header component with children', () => {
    const {queryByTestId} = render(
      <Header><div data-testid='preview-header-child'>Child</div></Header>,
    );
    const element = queryByTestId('preview-header');
    expect(element).toBeInTheDocument();
    const child = queryByTestId('preview-header-child');
    expect(child).toBeInTheDocument();
  });
});
