import {fireEvent, render, screen} from '../../../utilities/test-utils';
import MessageActionDialog from './MessageActionDialog';

describe('test MessageActionDialog', () => {
  test('should render MessageActionDialog and check cancel button functionality', () => {
    render(<MessageActionDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: 'ADMIN_ACTION_DIALOG',
            isFailButton: true,
            boldMessage:
              'Are you sure you want to disable the user Admin Vimient',
            successButtonText: 'Confirm',
          },
        },
      },
    });

    const element = screen.getByTestId(/messageActionDialog/i);
    expect(element).toBeInTheDocument();

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();
  });
});
