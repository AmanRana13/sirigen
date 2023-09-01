import { DIALOG_TYPES } from 'globals/global.constants';
import {render, screen} from '../../utilities/test-utils';
import { data } from './dialogComponents/Resources/ResourcesDialog.test';
import Dialogs from './Dialogs.component';


describe('test Dialog Component', () => {
  test('should render Limit Dialog', () => {
    render(<Dialogs/>, {
      initialState: {
        common: {dialog:{
            type:'LIMIT',
            isOpen: true,
            firstMessage: 'test',
        }
          
        },
      },
    });
    const element = screen.getByTestId('limitDailog');
    expect(element).toBeInTheDocument();
  });
  test('should render messageActionDialog Dialog', () => {
    render(<Dialogs/>, {
      initialState: {
        common: {dialog:{
            type:'MESSAGE_ACTION_DIALOG',
            isOpen: true,
            firstMessage: 'test',
        }
          
        },
      },
    });
    const element = screen.getByTestId('messageActionDialog');
    expect(element).toBeInTheDocument();
  });
  
  test('should render DailyRecapDialog Dialog', () => {
    render(<Dialogs/>, {
      initialState: {
        common: {dialog:{
            type:'DAILY_RECAP',
            isOpen: true,
           data: {
                heartRateData: [{x: 60, y: 120}],
                rangeMap: {
                  high: 80,
                  low: 160,
                },
              },
        }
          
        },
      },
    });
    const element = screen.getByTestId('DailyRecapDialog');
    expect(element).toBeInTheDocument();
  });
  test('should render AddAgentForm Dialog', () => {
    render(<Dialogs/>, {
      initialState: {
        common: {dialog:{
            type:'ADD_AGENT',
            isOpen: true,
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
        }
          
        },
      },
    });
    const element = screen.getByTestId('addAgentForm');
    expect(element).toBeInTheDocument();
  });
  
  test('should render AdminActionDialog Dialog', () => {
    render(<Dialogs/>, {
      initialState: {
        common: {dialog:{
            type:'ADMIN_ACTION_DIALOG',
            isOpen: true,
            isFailButton: true,
            boldMessage:
              'Are you sure you want to disable the user Admin Vimient',
            successButtonText: 'Confirm',
        }
          
        },
      },
    });
    const element = screen.getByTestId('adminActionDialog');
    expect(element).toBeInTheDocument();
  });

  test('should render Resources Dialog', () => {
    render(<Dialogs/>, {
      initialState: {
        common: {
          dialog:{
            type: DIALOG_TYPES.RESOURCES,
            isOpen: true,
            data
          }
        },
      },
    });
    const element = screen.getByTestId('resourcesDialog');
    expect(element).toBeInTheDocument();
  });

});