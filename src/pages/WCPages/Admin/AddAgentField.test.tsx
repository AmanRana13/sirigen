import {DIALOG_TYPES} from 'globals/global.constants';
import {store} from 'store';
import {openOverlayDialog} from 'store/commonReducer/common.action';
import {fireEvent, render, screen} from '../../utilities/test-utils';
import {AddAgentFields} from './AddAgentFields.component';
import {
  addEditAgent,
  resendOtp,
} from './Accounts/AgentAccount/CareAgentAccount.actions';
const mockedValues = {
  profileInfo: {
    isEmailExists: false,
    isPhoneExists: false,
    errorEmailMessage: '',
    errorNumberMessage: '',
  },
};
const props = {
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
    isFirstLogin: true,
    location: {
      zipcode: '33033',
      city: 'Homestead',
      state: 'Florida',
    },
    shift: 'day',
  },
};
describe('AddAgentFields Component', () => {
  test('should render AddAgentFields component', () => {
    const {queryByTestId} = render(<AddAgentFields {...props} />, {
      initialState: mockedValues,
    });
    const element = queryByTestId(/addAgentForm/i);
    expect(element).toBeTruthy();
  });

  test('should  validate the existing email component', () => {
    const {queryByText} = render(<AddAgentFields {...props} />, {
      initialState: {
        profileInfo: {
          isEmailExists: true,
          isPhoneExists: true,
          errorEmailMessage: '',
          errorNumberMessage: '',
        },
      },
    });
    const element = queryByText(/Email already exists/i);
    expect(element).toBeTruthy();
  });

  test('should show validation for duplicate employee id if enter existing empId', () => {
    const {queryByText} = render(<AddAgentFields {...props} />, {
      initialState: {
        profileInfo: {
          isEmailExists: false,
          isPhoneExists: false,
          isEmpIdExists: true,
          errorEmailMessage: '',
          errorNumberMessage: '',
        },
      },
    });
    const element = queryByText(/Employee Id already exists/i);
    expect(element).toBeTruthy();
  });

  test('should render AddAgentFields component', () => {
    const dispatch: any = jest.fn();
    const {getByRole} = render(<AddAgentFields {...props} />, {
      initialState: mockedValues,
    });
    const element = getByRole('button', {name: /submit/i});
    fireEvent.click(element);
    dispatch(addEditAgent({agent: jest.fn()})), expect(element).toBeTruthy();
  });

  test('should render resendOtp link in AddAgentFields component', async () => {
    const {getByText} = render(<AddAgentFields {...props} />, {
      initialState: mockedValues,
    });
    const element = getByText(/Resend OTP/i);
    expect(element).toBeTruthy();
    fireEvent.click(element);
    await store.dispatch(resendOtp('test@gmail.com'));
    await store.dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.SUCCESS,
        firstMessage: 'OTP is successfully sent to email test@gmail.com',
      }),
    );
    expect(store.getState().common.overlayDialog).toStrictEqual({
      data: undefined,
      firstMessage: 'OTP is successfully sent to email test@gmail.com',
      isOpen: true,
      secondMessage: undefined,
      type: 'SUCCESS',
      isLogout: undefined,
    });
  });
  test('should render 7 input fields', () => {
    const {getAllByRole} = render(<AddAgentFields {...props} />, {
      initialState: mockedValues,
    });
    const inputFields = getAllByRole('textbox');
    expect(inputFields.length).toBe(7);
  });

  test('should be able to change the value of input fields', () => {
    const {getAllByRole} = render(<AddAgentFields {...props} />, {
      initialState: mockedValues,
    });
    const inputFields = getAllByRole('textbox');
    fireEvent.change(inputFields[0], {target: {value: '3456'}});
    expect(inputFields[0]).toHaveValue('3456');
  });

  test('should get required field validation if we hit submit button with any blank field', () => {
    const {getAllByRole} = render(<AddAgentFields props={{}} />, {
      initialState: mockedValues,
    });
    const inputFields = getAllByRole('textbox');
    fireEvent.change(inputFields[0], {target: {value: '3456'}});
    expect(inputFields[0]).toHaveValue('3456');
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    const validationMessage = screen.getAllByText('Required Field');
    expect(validationMessage.length).toBeGreaterThan(1);
  });
});
