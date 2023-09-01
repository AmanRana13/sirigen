import userInfo from '_mocks_/userInfo.mock.json';
import {AlarmStatus} from 'globals/enums';
import {APPLICATION_EVENTS} from 'globals/global.constants';
import * as Services from 'pages/WCPages/SeniorDashboard/components/CallEntry/CallEntry.action';
import {updateAlarmStatus} from 'store/alarmReducer/Alarm.action';
import {callEntryInitialState} from '_mocks_/EventsReducerMocks';
import {fireEvent, render, screen, within} from '../../../utilities/test-utils';
import CallEntryDailog from './CallEntryDialog';
import {setLocalStorage} from 'globals/global.functions';
import {store} from 'store';
beforeAll(() => setLocalStorage('userInfo', userInfo));

const props = {
  position: 'fixed',
  fullName: 'test',
  seniorMobile: '8789087689',
  callType: 'summary',
  accountId: '7a97969b5658469b807c8b2797ec62ee',
  seniorId: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
  startTime: '',
  lastAlertTime: '',
  lastCallTime: '',
  alarmId: '',
  eventId: '',
  seniorTimezone: 'America-New_York',
};

describe('callEntry Dialog ', () => {
  test('should render CallEntry Dialog ', () => {
    render(<CallEntryDailog {...props} />);

    const element = screen.queryByTestId(/callEntryDialog/i);

    expect(element).toBeTruthy();
  });

  test('should render note text field  ', () => {
    render(<CallEntryDailog {...props} />);

    const element = screen.getAllByRole('textbox');

    expect(element).toHaveLength(2);
  });
  test('should change note on change event  ', () => {
    render(<CallEntryDailog {...props} />);

    const element = screen.getAllByRole('textbox');
    fireEvent.change(element[0], {target: {value: 'fall'}});
    expect(element[0]).toHaveValue('fall');
  });
  test('should render Call Complete button  ', () => {
    render(<CallEntryDailog {...props} />);

    const element = screen.queryByTestId(/callComplete/i);

    expect(element).toBeTruthy();
  });

  test('should not complete Call on click callComplete button if note and disposition is not filled   ', async () => {
    render(<CallEntryDailog {...props} />);
    const element = screen.getByTestId(/callComplete/i);
    fireEvent.click(element);
    const required = await screen.getAllByText(/Required Field/i);
    expect(required).toBeTruthy();
  });

  test('should render disposition input field', () => {
    const {getByRole} = render(<CallEntryDailog {...props} />);
    const Input = getByRole('button', {name: 'Select'});
    fireEvent.mouseDown(Input);

    const listbox = within(getByRole('listbox'));

    fireEvent.click(listbox.getByText(/False alarm/i));

    expect(Input).toHaveTextContent(/False alarm/i);
  });
  test('should render Add Action Button  ', () => {
    render(<CallEntryDailog {...props} />);
    const element = screen.getByRole('button', {name: 'Add Task'});
    expect(element).toBeTruthy();
  });
  test('should render only one task in Action Items initially  ', async () => {
    render(<CallEntryDailog {...props} />);
    const label = await screen.getAllByTestId('actionItems');

    expect(label.length).toBe(1);
  });
  test('should change action on change event  ', () => {
    render(<CallEntryDailog {...props} />);

    const element = screen.getAllByRole('textbox');
    fireEvent.change(element[1], {target: {value: 'fall'}});
    expect(element[1]).toHaveValue('fall');
  });
  test('should add new task on click Add Action Button  ', async () => {
    render(<CallEntryDailog {...props} />);
    const element = screen.getByRole('button', {name: 'Add Task'});
    fireEvent.click(element);
    const label = await screen.getAllByTestId('actionItems');
    expect(label.length).toBe(2);
  });
  test('should render delete Action Button  ', () => {
    render(<CallEntryDailog {...props} />);
    const element = screen.getByTestId('deleteTask');
    expect(element).toBeTruthy();
  });
  test('should delete task on click Action Button  ', async () => {
    render(<CallEntryDailog {...props} />);
    const element = screen.getByTestId('deleteTask');
    fireEvent.click(screen.getByRole('button', {name: 'Add Task'}));
    const ActionItems = await screen.getAllByTestId('actionItems');
    fireEvent.click(element);
    const newActionItems = await screen.getAllByTestId('actionItems');

    expect(newActionItems.length).toBe(ActionItems.length - 1);
  });

  test('should complete Call on click callComplete button if note and disposition is filled correctly   ', async () => {
    render(
      <CallEntryDailog
        {...callEntryInitialState}
        position={{left: 10, right: 10}}
      />,
    );
    const dispatch: any = jest.fn();

    const disposition = screen.getByRole('button', {name: 'Select'});
    fireEvent.mouseDown(disposition);
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText(/False alarm/i));
    const note = screen.getAllByRole('textbox');
    fireEvent.change(note[0], {target: {value: 'fall'}});
    const completeButton = screen.getByTestId(/callComplete/i);
    fireEvent.click(completeButton);
    const callInfo = {
      account_id: '1fc17069353f4da7b15f632748b429ed',
      senior_id: 'senior-f300a4c4515d41ddabbac003cf07c32c',
      start_time: 1643252265000,
      duration: 0,
      callee_type: 'senior',
      call_priority: 'high',
      careagent_id: 'careagent-929eb5d99fa24eeabe2…fddede5f9',
    };

    const data = {
      call_reason: '',
      call_type: APPLICATION_EVENTS['sos'].label,
      callNotes: note[0],
      actionItems: '',
      disposition: disposition.textContent,
    };
    store.dispatch(Services.updateCallEntryInbound(callInfo, data, 'outbound'));
    await store.dispatch(
      updateAlarmStatus(callEntryInitialState.alarmId, AlarmStatus.COMPLETED),
    );
    await store.dispatch(
      Services.closeCallEntry(callEntryInitialState.eventId),
    );

    expect(store.getState().callEntry).toEqual({callEntryData: [], events: {}});
  });
});
