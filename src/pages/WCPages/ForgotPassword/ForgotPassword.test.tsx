import userEvent from '@testing-library/user-event';
import {render, fireEvent, screen} from '../../utilities/test-utils';
import ForgotPassword from './ForgotPassword';
import { REGEX} from 'globals/global.constants';
import { forgotPassword } from './ForgotPassword.action';

describe('ForgotPassword', () => {
  test('should render ForgotPassword', () => {
    const {queryByTestId} = render(<ForgotPassword />);
    const element = queryByTestId(/Forgotpassword/i);

    expect(element).toBeTruthy();
  });
  test('should render ForgotPassword heading', () => {
    const {queryByRole} = render(<ForgotPassword />);
    const element = queryByRole('heading');

    expect(element).toBeInTheDocument();
  });
  test('should render ForgotPassword banner', () => {
    const {queryByRole} = render(<ForgotPassword />);
    const element = queryByRole('banner');

    expect(element).toBeInTheDocument();
  });
  test('should render ForgotPassword input field', () => {
    const {queryByRole} = render(<ForgotPassword />);
    const element = queryByRole('textbox');

    expect(element).toBeInTheDocument();
  });
  test('should render ForgotPassword onChange input field', () => {
    render(<ForgotPassword />);
    userEvent.type(screen.getByRole('textbox'), 'Test@gmail.com');

    expect(screen.getByRole('textbox')).toHaveValue('Test@gmail.com');
  });

  test('should render ForgotPassword reset button', () => {
    const {queryByRole} = render(<ForgotPassword />);
    const element = queryByRole('button', {name: /Reset Password/i});
expect(element).toBeInTheDocument();
  });
  test('should validate the email', () => {
    render(<ForgotPassword />);
    userEvent.type(screen.getByRole('textbox'), 'Test@gmail.com');

    fireEvent.click(screen.getByText(/Reset Password/i));
    const isValid: any = RegExp(REGEX.EMAIL).test('Test@gmail.com');
    expect(isValid).toBeTruthy();
  });
  test('should dispatch ForgotPassword action on click reset password button',async () => {
   render(<ForgotPassword />)
   const dispatch=jest.fn()
    fireEvent.change(screen.getByRole('textbox'), 'Test@gmail.com');
    const element = screen.getByRole('button', {name: /Reset Password/i});
    fireEvent.click(element)
    await dispatch(forgotPassword('Test@gmail.com'))
    expect(element).toBeTruthy();
  });
});
