import {render} from 'utilities/test-utils';
import Header from '../Header/Header.component';

import PrintLayout from './PrintLayout.component';

const HeaderContent = () => (
  <Header>
    Header Content
  </Header>
)

describe('Print: PrintLayout', () => {
  test('renders PrintLayout component', () => {
    const {queryByTestId} = render(
      <PrintLayout header={HeaderContent}>
        Child
      </PrintLayout>,
    );
    const element = queryByTestId('print-layout');
    expect(element).toBeInTheDocument();
  });
  test('renders children component', () => {
    const {queryByTestId} = render(
      <PrintLayout header={HeaderContent}>
        <div data-testid='print-child'>Child</div>
      </PrintLayout>,
    );
    const element = queryByTestId('print-child');
    expect(element).toBeInTheDocument();
  })
});
