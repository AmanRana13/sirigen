import {fireEvent, render} from 'utilities/test-utils';

import PrintButton from './PrintButton.component';

describe('Print: PrintButton', () => {
  test('renders PrintButton component', () => {
    const {queryByTestId} = render(<PrintButton show />);
    const element = queryByTestId('print-button');
    expect(element).toBeInTheDocument();
  });
  test('renders PrintButton component', () => {
    const {getByTestId} = render(<PrintButton show />);
    const element = getByTestId('print-button');
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });

  test('do not render PrintButton component if show is not true', () => {
    const {queryByTestId} = render(<PrintButton />);
    const element = queryByTestId('print-button');
    expect(element).not.toBeInTheDocument();
  });

  test('renders custom PrintButton component', () => {
    const {queryByTestId} = render(
      <PrintButton
        show
        component={() => (
          <button data-testid='print-button-custom'>Custom Print</button>
        )}
      />,
    );
    const element = queryByTestId('print-button-custom');
    expect(element).toBeInTheDocument();
  });
});
