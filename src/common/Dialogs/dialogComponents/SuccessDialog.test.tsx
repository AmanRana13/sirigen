import {render, screen} from '../../../utilities/test-utils';
import SuccessDialog from './SuccessDialog';

describe('test SuccessDialog', () => {
  test('should render SuccessDialog', () => {
    render(<SuccessDialog error={false} />, {
      initialState: {
        common: {
          overlayDialog: {
            isOpen: true,
            firstMessage: 'test1',
            secondMessage: 'test2',
          },
        },
      },
    });

    const element = screen.getByTestId(/successDialog/i);

    expect(element).toBeInTheDocument();
  });
});
