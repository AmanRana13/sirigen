import {render, screen} from '../../../utilities/test-utils';
import ErrorDialog from './ErrorDialog';

describe('test ErrorDialog', () => {
  test('should render ErrorDialog', () => {
    render(<ErrorDialog />, {
      initialState: {
        common: {
          overlayDialog: {
            isOpen: true,
            type: 'ERROR',
            data: {
              errorCode: 2032,
              errorMessage:
                'Medical Device is in violation of the following constraint: Device with same mac attach to same senior',
            },
          },
        },
      },
    });

    const element = screen.getByTestId(/errorDialog/i);

    expect(element).toBeInTheDocument();
  });
});
