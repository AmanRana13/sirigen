import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from '../../../../utilities/test-utils';
import {
  getCareAgents,
  addEditAgent,
  GET_CARE_AGENTS,
  RESET_CARE_AGENTS,
  RESET_PAGINATION,
  END_PAGINATION,
  disableAgent,
} from './CareAgentAccount.actions';
import {openDialog, openOverlayDialog} from 'store/commonReducer/common.action';
import {DIALOG_TYPES} from 'globals/global.constants';
import * as Service from 'services/careAgentAccountService/careAgentAccount.service';
import AgentAccount from './AgentAccount.component';
import {store} from '../../../../store/store';
import * as agentService from 'services/adminServices/agentAccount.service';

jest.mock('services/careAgentAccountService/careAgentAccount.service');
jest.mock('services/adminServices/agentAccount.service');
beforeEach(() => jest.clearAllMocks());
const dispatch: any = jest.fn();
const mockedInitialValues = {
  allCareAgentAccounts: [],
  isPaginate: true,
};
const mockedValues2 = {
  allCareAgentAccounts: [],
  isPaginate: false,
};
const mockedValues = {
  allCareAgentAccounts: [
    {
      accessRole: 'admin',
      email: 'jocoh90685@3dinews.com',
      employeeId: '7777',
      extension: '8798',
      isFirstLogin: false,
    },
  ],

  isPaginate: true,
};
const mokedDailog = {
  boldMessage: undefined,
  data: undefined,
  dialogTitle: 'Add User',
  firstMessage: undefined,
  isFailButton: undefined,
  isOpen: true,
  onSuccessButton: undefined,
  secondMessage: undefined,
  successButtonText: undefined,
  type: 'ADD_AGENT',
};
const data = {
  employee_id: '123',
  name: {first_name: 'test', last_name: 'case'},
  email: 'testcase@gmail.com',
  access: 'admin',
  phone_number: {
    number: '9889876453',
    ext: '2341',
  },
};

const careAgentAccount = {
  allCareAgentAccounts: [
    {
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
  ],
};
describe('AgentAccount Component', () => {
  test('should render AgentAccount component', () => {
    const {queryByTestId} = render(<AgentAccount />, {
      initialState: {careAgentAccount: careAgentAccount},
    });
    const element = queryByTestId(/admin-agent-account/i);

    expect(element).toBeInTheDocument();
  });
  test('should render AgentAccount button', () => {
    render(<AgentAccount />);
    const element = screen.getByRole('button', {name: 'Add User'});

    expect(element).toBeInTheDocument();
  });
  test('should render edit', async () => {
    render(<AgentAccount />, {
      initialState: {careAgentAccount: careAgentAccount},
    });
    store.dispatch(
      openDialog({
        type: DIALOG_TYPES.ADD_AGENT,
        data: careAgentAccount.allCareAgentAccounts[0],
        dialogTitle: 'Edit User',
      }),
    );

    expect(store.getState().common.dialog).toStrictEqual({
      isOpen: true,
      dialogTitle: 'Edit User',
      data: careAgentAccount.allCareAgentAccounts[0],
      firstMessage: undefined,
      id: undefined,
      isFailButton: undefined,
      onSuccessButton: undefined,
      secondMessage: undefined,
      showAlertIcon: undefined,
      successButtonText: undefined,
      type: DIALOG_TYPES.ADD_AGENT,
      boldMessage: undefined,
      cancelButtonText: undefined,
    });
  });
  test('should render disable', async () => {
    render(<AgentAccount />, {
      initialState: {
        common: {
          careAgentList: {
            data: careAgentAccount.allCareAgentAccounts,
            currentPage: 1,
            totalRows: 1,
          },
        },
      },
    });
    await store.dispatch(
      disableAgent(careAgentAccount.allCareAgentAccounts[0]),
    );
    store.dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.SUCCESS,
        firstMessage: `User ${careAgentAccount.allCareAgentAccounts[0].name.firstName} ${careAgentAccount.allCareAgentAccounts[0].name.lastName} disabled successfully`,
      }),
    );
    expect(store.getState().common.overlayDialog).toStrictEqual({
      data: undefined,
      firstMessage: `User ${careAgentAccount.allCareAgentAccounts[0].name.firstName} ${careAgentAccount.allCareAgentAccounts[0].name.lastName} disabled successfully`,
      isOpen: true,
      isLogout: undefined,
      secondMessage: undefined,
      type: 'SUCCESS',
    });
  });

  test(' on Click add user button Dailog open', () => {
    render(<AgentAccount />);

    const button = screen.getByRole('button', {name: 'Add User'});
    act(() => {
      fireEvent.click(button);

      store.dispatch(
        openDialog({type: DIALOG_TYPES.ADD_AGENT, dialogTitle: 'Add User'}),
      );
    });
    const title = screen.getByText(/add user/i);
    expect(title).toBeInTheDocument();
  });
});

describe('getCareAgents ', () => {
  test('should render getCareAgents ', () => {
    const element = getCareAgents('');
    expect(element).not.toBeFalsy();
  });
});
describe(' getCareAgents', () => {
  test('should render getCareAgents ', () => {
    const element = store.dispatch(getCareAgents());
    expect(store.getState().careAgentAccount).toEqual(mockedInitialValues);
  });
  test('should render GET_CARE_AGENTS', () => {
    const element = store.dispatch({
      type: GET_CARE_AGENTS,
      payload: [
        {
          accessRole: 'admin',
          email: 'jocoh90685@3dinews.com',
          employeeId: '7777',
          extension: '8798',
          isFirstLogin: false,
        },
      ],
    });
    expect(store.getState().careAgentAccount).toEqual(mockedValues);
  });
  test('should render RESET_CARE_AGENTS', () => {
    const element = store.dispatch({
      type: RESET_CARE_AGENTS,
    });
    expect(store.getState().careAgentAccount).toEqual(mockedInitialValues);
  });
  test('should render RESET_PAGINATION', () => {
    const element = store.dispatch({
      type: RESET_PAGINATION,
    });
    expect(store.getState().careAgentAccount).toEqual(mockedInitialValues);
  });
  test('should render END_PAGINATION', () => {
    const element = store.dispatch({
      type: END_PAGINATION,
    });
    expect(store.getState().careAgentAccount).toEqual(mockedValues2);
  });
  test('api call on dispatch getCareAgents ', async () => {
    await store.dispatch(getCareAgents());

    expect(Service.getCareAgentService).toHaveBeenCalledTimes(1);
    await waitFor(() => null);
  });
  test('api call on dispatch getCareAgents and dispatch END_PAGINATION', async () => {
    store.dispatch(getCareAgents());
    store.dispatch({type: END_PAGINATION});
    await waitFor(() => Service.getCareAgentService);
    expect(store.getState().careAgentAccount).toEqual(mockedValues2);
  });
  test('api call on dispatch addEditAgent ', async () => {
    dispatch(
      addEditAgent({
        data: data,
        existingEmail: 'testcase@gmail.com',
        triggerOtp: jest.fn(),
      }),
    );

    const params = {
      employee_id: data.employee_id,
      name: {first_name: data.name.first_name, last_name: data.name.last_name},
      email: data.email,
      access: data.access,
      phone_number: {
        number: data.phone_number.number,
        ext: data.phone_number.ext,
      },
      is_active: true,
    };
    await waitFor(() => agentService.addAgentService(params));
    expect(agentService.addAgentService).toHaveBeenCalledTimes(1);
  });
});
