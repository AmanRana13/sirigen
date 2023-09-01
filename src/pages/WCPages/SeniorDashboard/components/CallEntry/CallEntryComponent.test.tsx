import {render, screen, fireEvent} from 'utilities/test-utils';
import {CallEntryComponent} from './CallEntry.component';
import userInfo from '_mocks_/userInfo.mock.json';
import {setLocalStorage} from 'globals/global.functions';
import {
  updateCallEntryInbound,
  updateCallEntryOutbound,
} from './CallEntry.action';

let seniorInfo = {
  accountID: '355ee3d4f7614f429113b4da17f49ed3',
  seniorID: 'senior-f18173fa564c42a2a6622db899072c45',
  timezone: 'America/New_York',
};
const props = {
  getCompletedCallDetail: jest.fn(),
  resetCallEntryData: jest.fn(),
  updateCallEntryInbound: jest.fn(),
  updateCallEntryOutbound: jest.fn(),
};

beforeAll(() => {
  setLocalStorage('userInfo', userInfo);
  global.window = Object.create(window);
  const url =
    'http://localhost:3000/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/';
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
      pathname:
        '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/',
    },
  });
});

describe('callEntry component', () => {
  test('should render callEntry component', async () => {
    render(<CallEntryComponent {...props} />, {
      initialState: {
        callEntry: {
          callEntryData: [{call_direction: 'outbound', call_id: 123456}],
        },
      },
    });
    const element = screen.queryByTestId(/callEntryComponent/i);

    expect(element).toBeTruthy();
  });

  test('test to check Add Task button is rendered or not', async () => {
    render(<CallEntryComponent {...props} />, {
      initialState: {
        callEntry: {
          callEntryData: [{call_direction: 'outbound', call_id: '123456'}],
        },
      },
    });
    const element = screen.getByTestId(/add-task-button/i);
    fireEvent.click(element);
    expect(element).toBeEnabled();
  });
  test('should render call complete button', async () => {
    const dispatch: any = jest.fn();
    render(<CallEntryComponent {...props} />, {
      initialState: {
        callEntry: {
          callEntryData: [{call_direction: 'outbound', call_id: '123456'}],
        },
      },
    });
    const element = screen.queryByRole('button', {name: /Call Complete/i});
    fireEvent.click(element);
    dispatch(updateCallEntryOutbound());
    expect(element).toBeTruthy();
  });
  test('should render call complete button when call type is inbound', async () => {
    const dispatch: any = jest.fn();
    render(<CallEntryComponent {...props} />, {
      initialState: {
        callEntry: {
          callEntryData: [{call_direction: 'inbound', call_id: '123456'}],
        },
      },
    });
    const element = screen.queryByRole('button', {name: /Call Complete/i});
    fireEvent.click(element);
    await dispatch(updateCallEntryInbound());
    expect(element).toBeTruthy();
  });
});
