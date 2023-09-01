/* eslint-disable max-len */
import {render, act, fireEvent} from '@testing-library/react';
import useAutoScroll from './useAutoScroll';

describe('useAutoScroll hook', () => {
  test('it should return ref and scrollToFirstError function and scroll to the first error', async () => {
    const TestComponent = () => {
      const {ref, scrollToFirstError} = useAutoScroll();
      expect(ref).toBeDefined();
      expect(scrollToFirstError).toBeDefined();

      return (
        <div ref={ref}>
          <div data-error='error'>
            <input type='text' data-testid='error-element' />
          </div>
          <div data-error='error'>
            <input type='text' data-testid='error-element' />
          </div>
          <div data-error='error'>
            <input type='text' data-testid='error-element' />
          </div>
          <button onClick={scrollToFirstError}>Submit</button>
        </div>
      );
    };
    const {getByText, getAllByTestId} = render(<TestComponent />);

    const button = getByText('Submit');
    const errorElement = getAllByTestId('error-element');

    act(() => {
      fireEvent.click(button);
    });

    // scroll To First Error after clicking on submit button
    expect(errorElement[0].getBoundingClientRect().top).toBeLessThanOrEqual(0);
  });
});
