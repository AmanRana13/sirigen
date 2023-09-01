import {render, screen} from '../../../utilities/test-utils';
import LimitDialog from './LimitDialog';

describe('test LimitDialog', () => {
  test('should render LimitDialog', () => {
    render(<LimitDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            firstMessage: 'test',
          },
        },
      },
    });

    const element = screen.getByText(/Okay/i);

    expect(element).toBeInTheDocument();
  });
});
