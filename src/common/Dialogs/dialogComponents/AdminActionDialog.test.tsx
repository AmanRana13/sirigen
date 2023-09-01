import {fireEvent, render, screen} from '../../../utilities/test-utils';
import AdminActionDialog from './AdminActionDialog';

describe('test AdminAction Dialog ', () => {
  test('should render AdminAction Dialog  ', () => {
    render(<AdminActionDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: 'ADD_AGENT',
            data: {
              userId: 'admin-46ed20369e5d4231a38c0f967bba0b13',
              employeeId: '7777',
              name: {
                firstName: 'Admin',
                lastName: 'Login',
                middleName: null,
              },
              email: 'jocoh90685@3dinews.com',
              phone: '3456787637',
              extension: '8798',
              accessRole: 'admin',
              isFirstLogin: false,
            },
            dialogTitle: 'Edit',
          },
        },
      },
    });

    const element = screen.getByTestId(/adminActionDialog/i);
    expect(element).toBeInTheDocument();
  });
  test('should render AdminAction Dialog  ', () => {
    render(<AdminActionDialog />, {
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

    const element = screen.getByTestId(/adminActionDialog/i);
    expect(element).toBeInTheDocument();

    const cancelButton = screen.getByTestId(/cancelButton/i);
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();

    const submitButton = screen.getByTestId(/submitButton/i);
    fireEvent.click(submitButton);
    expect(submitButton).toBeInTheDocument();
  });
});
