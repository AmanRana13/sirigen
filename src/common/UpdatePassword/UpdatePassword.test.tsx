import {fireEvent, render, screen} from '../../utilities/test-utils';
import UpdatePassword from './UpdatePassword';

describe('UpdatePassword ', () => {
  test('should render UpdatePassword fields with Change password heading', () => {
    render(
      <UpdatePassword
        showCancelBtn={true}
        heading='Change password'
        showOldPasswordField={true}
      />,
    );
    const element = screen.getByText(/Change Password/i);
    expect(element).toBeInTheDocument();
  });

  test('should render UpdatePassword fields with labels', () => {
    render(<UpdatePassword alwaysShowPassCriteria={true} />);
    const enterNewPasswordLabel = screen.getAllByText(/Enter New Password/i);
    expect(enterNewPasswordLabel[0]).toBeInTheDocument();

    const reEnterPasswordLabel = screen.getByText(/Re-enter New Password/i);
    expect(reEnterPasswordLabel).toBeInTheDocument();
  });

  test('Component with change password heading also having cancel button', () => {
    render(
      <UpdatePassword
        showCancelBtn={true}
        heading='Change password'
        showOldPasswordField={true}
      />,
    );
    const element = screen.getByText(/cancel/i);
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });

  test('when new password and re-enter password has different value', () => {
    render(<UpdatePassword alwaysShowPassCriteria={true} />);
    const element = screen.getByTestId(/choosePasswordForm/i);

    const passwordTextfield = screen.getAllByPlaceholderText(
      /Enter Password/i,
    ) as HTMLInputElement[];

    expect(passwordTextfield[0].value).toEqual('');
    fireEvent.change(passwordTextfield[0], {
      target: {value: 'TestPassword@0731'},
    });
    expect(passwordTextfield[0].value).toEqual('TestPassword@0731');

    fireEvent.click(screen.getByTestId('newPasswordIconBtn'));
    fireEvent.mouseDown(screen.getByTestId('newPasswordIconBtn'));

    expect(passwordTextfield[1].value).toEqual('');
    fireEvent.change(passwordTextfield[1], {
      target: {value: 'TestPassword@0u7687'},
    });
    expect(passwordTextfield[1].value).toEqual('TestPassword@0u7687');
    fireEvent.click(screen.getByTestId('reEnterPasswordIconBtn'));
    fireEvent.mouseDown(screen.getByTestId('reEnterPasswordIconBtn'));

    fireEvent.click(screen.getByTestId(/submitButton/i));
    expect(element).toBeInTheDocument();
  });

  test('when new password and re-enter password are same and follow all validations', () => {
    render(<UpdatePassword alwaysShowPassCriteria={true} />);
    const element = screen.getByTestId(/choosePasswordForm/i);

    const passwordTextfield = screen.getAllByPlaceholderText(
      /Enter Password/i,
    ) as HTMLInputElement[];

    fireEvent.change(passwordTextfield[0], {
      target: {value: 'TestPassword@0751'},
    });

    fireEvent.change(passwordTextfield[1], {
      target: {value: 'TestPassword@0751'},
    });

    fireEvent.click(screen.getByTestId(/submitButton/i));
    expect(element).toBeInTheDocument();
  });

  test('when new password and re-enter password contain sequence of numbers', () => {
    render(<UpdatePassword alwaysShowPassCriteria={true} />);
    const passwordTextfield = screen.getAllByPlaceholderText(
      /Enter Password/i,
    ) as HTMLInputElement[];

    fireEvent.change(passwordTextfield[0], {
      target: {value: 'TestPassword@07890'},
    });

    fireEvent.change(passwordTextfield[1], {
      target: {value: 'TestPassword@07890'},
    });

    expect(
      screen.getByText(/At least one number with no sequence of numbers/i),
    ).toHaveStyle('color: #CC0000');
  });
});
