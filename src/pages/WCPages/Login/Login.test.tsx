import {screen, render, fireEvent} from '../../utilities/test-utils';
import Login from './Login.component';
import {store} from '../../store';
import {loginUser} from './Login.action';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';

describe('Test Login Component', () => {
  test('should render Login Component', () => {
    render(<Login />);
    const element = screen.getByTestId(/login-component/i);
    expect(element).toBeInTheDocument();
  });

  test('dhould redirect when we click on Forgot Password link', () => {
    render(<Login />);
    const element = screen.getByText(/Forgot your password?/i);
    fireEvent.click(element);

    global.window = Object.create(window);
    const url = 'http://localhost:3000/forgot-password';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '/forgot-password',
      },
    });
    expect(window.location.pathname).toBe('/forgot-password');
  });

  test('should render Login Component when we fill and click on login button', () => {
    render(<Login />);
    const emailTextField = screen.getByTestId(/emailTextField/i);
    fireEvent.change(emailTextField, {target: {value: 'test@gmail.com'}});
    expect(emailTextField).toBeInTheDocument();

    const passwordTextField = screen.getByTestId(/passwordTextField/i);
    fireEvent.change(passwordTextField, {target: {value: 'test456'}});
    expect(passwordTextField).toBeInTheDocument();

    const showPasswordIcon = screen.getByTestId(/showPasswordIcon/i);
    fireEvent.click(showPasswordIcon);
    fireEvent.mouseDown(showPasswordIcon);

    const logInButton = screen.getByText(/Log In/i);
    fireEvent.click(logInButton);

    expect(logInButton).toBeInTheDocument();
  });
});

const authStateMockData = {
  username: '',
  isAuthenticated: false,
  loading: true,
  sessionInterval: null,
  isTimeoutModel: false,
  userRole: [],
  roleConfig: {
    defaultPage: appRoutesEndpoints.homePage,
    defaultHomeRoute: 'dashboard',
    accessLabel: 'Agent',
    careInsightPrivileges: {
      isAlerts: true,
      isApproveAlert: false,
      isApproveSummary: false,
      isCIRangeMilestoneNotification: false,
      isLocationData: true,
      isAlertActionNotification: true,
      isSummaryActionNotification: true,
      isAlarms: true,
    },
  },
  userName: {
    first_name: '',
    last_name: '',
    middle_name: '',
  },
};

describe('Test Login Action Creators', () => {
  test('test loginUser action creator when user credentials are invalid', () => {
    store.dispatch(loginUser({email: 'test@gmail.com', password: 'password'}));
    expect(store.getState().auth).toEqual(authStateMockData);
  });
});
