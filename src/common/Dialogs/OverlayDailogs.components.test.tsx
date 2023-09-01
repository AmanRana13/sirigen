import {render, screen} from '../../utilities/test-utils';
import OverlayDialogs from './OverlayDialogs.component';

describe('test OverlayDialogs Component', () => {
  test('should render SuccessDialog', () => {
    render(<OverlayDialogs />, {
      initialState: {
        common: {
          overlayDialog: {
            type: 'SUCCESS',
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
  test('should render ErrorDialog', () => {
    render(<OverlayDialogs />, {
      initialState: {
        common: {
          overlayDialog: {
            isOpen: true,
            type: 'ERROR',
            data: {
              errorCode: 2032,
              errorMessage:
                // eslint-disable-next-line max-len
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
