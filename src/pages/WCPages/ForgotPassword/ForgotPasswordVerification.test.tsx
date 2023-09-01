import { hideApplicationLoader } from 'common/ApplicationLoader';
import {render, fireEvent, screen} from '../../utilities/test-utils';
import { forgotPasswordVerification } from './ForgotPassword.action';
import ForgotPasswordVerification from './ForgotPasswordVerification';
import {store} from '../../store/store'

describe('ForgotPasswordVerification', () => {
  test('should render ForgotPasswordVerification', () => {
    const {queryByTestId} = render(<ForgotPasswordVerification />);
    const element = queryByTestId(/ForgotPasswordVerification/i);

    expect(element).toBeInTheDocument();
  });
  test('should render ForgotPasswordVerification heading', () => {
    const {queryByText} = render(<ForgotPasswordVerification />);
    const element = queryByText(/Forgot Password/i);

    expect(element).toBeInTheDocument();
  });
  test('should render ForgotPasswordVerification heading', () => {
    const {queryByText} = render(<ForgotPasswordVerification />);
    const element = queryByText('We have sent a code to your email', {
      exact: false,
    });

    expect(element).toBeTruthy();
  });

  test('should render ForgotPasswordVerification input field', () => {
    const {queryByRole} = render(<ForgotPasswordVerification />);
    const element = queryByRole('textbox');

    expect(element).toBeInTheDocument();
  });
  test('should render ForgotPasswordVerification input field and can take input', () => {
    const {getByRole} = render(<ForgotPasswordVerification />);
    const element = getByRole('textbox');
    fireEvent.change(element, {target: {value: '243122'}});
    expect(element).toHaveValue('243122');
  });
  test('should render ForgotPasswordVerification Resend code', () => {
    const {queryByText} = render(<ForgotPasswordVerification />);
    const element = queryByText(/resend code/i);

    expect(element).toBeInTheDocument();
  });

  test('should render ForgotPasswordVerification submit button', () => {
    const {queryByRole} = render(<ForgotPasswordVerification />);
    const element = queryByRole('button', {name: /submit/i});
       expect(element).toBeInTheDocument();
  });
  test('should dispatch ForgotPasswordVerification action on click submit button', async() => {
    const {getByRole} = render(<ForgotPasswordVerification />);
    const element = getByRole('textbox');
    fireEvent.change(element, {target: {value: '243122'}});
    const button = getByRole('button', {name: /submit/i});
     fireEvent.click(button)
    await store.dispatch(forgotPasswordVerification('test@gmail.com', '243122'));
     await store.dispatch(hideApplicationLoader());
     expect(store.getState().applicationLoader).toBeTruthy();
     
  
  });
});
