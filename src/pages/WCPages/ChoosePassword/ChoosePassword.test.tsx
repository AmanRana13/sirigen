/* eslint-disable max-len */
import {fireEvent, render, screen} from '../../utilities/test-utils';

import ChoosePassword from './ChoosePassword';

describe('ChoosePassword Component', () => {
  test('should render form in ChoosePassword component', () => {
    render(<ChoosePassword />);
    const element = screen.getByTestId(/choosePasswordForm/i);
    expect(element).toBeInTheDocument();
  });

  test('when new password and re-enter password has different value', () => {
    render(<ChoosePassword />);
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
    render(<ChoosePassword />);
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
    render(<ChoosePassword />);
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
