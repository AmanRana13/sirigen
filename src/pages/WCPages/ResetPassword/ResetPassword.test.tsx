import {showToast} from 'common/Toast';
import {store} from 'store';
import {fireEvent, render, screen} from '../../utilities/test-utils';
import {resetPasswordAPI} from './ResetPassword.action';
import ResetPassword from './ResetPassword.component';

describe('ResetPassword Component', () => {
  test('should render ResetPassword component', () => {
    const {queryByTestId} = render(<ResetPassword />);
    const element = queryByTestId(/reset-password-component/i);
    expect(element).toBeInTheDocument();
  });

  test('should render Email input field in ResetPassword component', () => {
    render(<ResetPassword />);
    const emailTextBox = screen.getByRole('textbox');
    fireEvent.change(emailTextBox, {target: {value: 'test@gmail.com'}});
    expect(emailTextBox).toHaveValue('test@gmail.com');
  });
  test('should render password input field in ResetPassword component', () => {
    render(<ResetPassword />);
    const inputPasswordFields = screen.getAllByPlaceholderText('*****');
    fireEvent.change(inputPasswordFields[0], {
      target: {
        value: 'Test@0524',
      },
    });
    fireEvent.change(inputPasswordFields[1], {
      target: {
        value: 'Test@0524',
      },
    });
    expect(inputPasswordFields[0]).toHaveValue('Test@0524');
    expect(inputPasswordFields[1]).toHaveValue('Test@0524');
  });
  test('should render submit button in ResetPassword component', async () => {
    const {findByText} = render(<ResetPassword />);
    const data = {email: 'test@gmail.com', password: 'Test', reset_code: 23432};
    const resetPasswordButton = screen.getByRole('button');
    fireEvent.click(resetPasswordButton);
    await store.dispatch(resetPasswordAPI(data));
    await store.dispatch(showToast('password reset successfull.', 'success'));
    expect(findByText(/password reset successfull./i)).toBeTruthy();
  });
  test('should render error message in confirm password not matched in ResetPassword component', () => {
    render(<ResetPassword />);
    const errorMessage = screen.getByTestId('errorMessage');
    const inputPasswordFields = screen.getAllByPlaceholderText('*****');
    fireEvent.change(inputPasswordFields[0], {
      target: {
        value: 'Test@0524',
      },
    });
    fireEvent.change(inputPasswordFields[1], {
      target: {
        value: 'Test@05245',
      },
    });

    expect(inputPasswordFields[0]).toHaveValue('Test@0524');
    expect(inputPasswordFields[1]).toHaveValue('Test@05245');
    expect(errorMessage).toBeInTheDocument();
  });
});
