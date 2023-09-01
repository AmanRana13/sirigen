import {render} from 'utilities/test-utils';

import Footer from './Footer.component';

describe('Print: Footer', () => {
  test('renders Footer component', () => {
    const {queryByTestId} = render(
      <Footer />,
    );
    const element = queryByTestId('print-footer');
    expect(element).toBeInTheDocument();
  });
});
