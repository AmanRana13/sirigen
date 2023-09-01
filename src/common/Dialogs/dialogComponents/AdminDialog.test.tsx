import {render, screen} from '../../../utilities/test-utils';
import AdminDialog from './AdminDialog';

describe('test Admin Dialog ', () => {
  test('should render Admin Dialog  ', () => {
    render(<AdminDialog />, {
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

    const element = screen.getByTestId(/addAgentForm/i);
    expect(element).toBeInTheDocument();
  });
});
