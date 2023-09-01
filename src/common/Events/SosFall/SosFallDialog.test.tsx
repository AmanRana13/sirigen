import {render, fireEvent, screen} from '../../../utilities/test-utils';
import SosFallDialog from './SosFallDialog';
import {AlarmStatus} from 'globals/enums';
import {updateAlarmStatus} from 'store/alarmReducer/Alarm.action';
import * as Services from 'services/alarmService/alarm.service';
import {sosAlarmInitialState} from '_mocks_/EventsReducerMocks';
import {store} from 'store';

jest.mock('services/alarmService/alarm.service');

const props = {
  position: 'fixed',
  eventType: 'sos',
  viewState: '',
  fullName: 'test',
  seniorId: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
  accountId: '7a97969b5658469b807c8b2797ec62ee',
  seniorTimezone: 'America-New_York',
  alarmId: '',
  eventId: '',
  startTime: '2021-05-07T00:00:00+05:30',
  detailList: [],
  lastAlertTime: '',
  lastCallTime: '',
};

describe('SosFallDialog', () => {
  test('should render sos fall dialog', () => {
    render(<SosFallDialog alertType='Sos' {...props} />);
    const dialog = screen.getByTestId(/sosFallDialog/i);
    expect(dialog).toBeInTheDocument();
  });
  test('should render fall dialog', () => {
    render(<SosFallDialog alertType='Fall' {...props} />);
    const dialog = screen.getByTestId(/sosFallDialog/i);
    expect(dialog).toBeInTheDocument();
  });
  test('should render show Timer', () => {
    render(<SosFallDialog {...props} alertType='Fall' />, {
      initialState: {
        ...sosAlarmInitialState,
      },
    });
    const timer = screen.getByTestId(/timer/);
    expect(timer).toBeInTheDocument();
  });
  test('should call handleTimer function', async () => {
    render(<SosFallDialog {...sosAlarmInitialState} />, {
      initialState: {
        ...sosAlarmInitialState,
      },
    });

    const testMockFunction = (callback: any) => {
      return callback();
    };

    const handleTimer = jest.fn();
    testMockFunction(handleTimer);
    expect(handleTimer).toHaveBeenCalled();
  });
  test('should render Assign to me button', () => {
    render(<SosFallDialog {...sosAlarmInitialState} />);
    const button = screen.getByTestId(/event-send/i);
    expect(button).toBeInTheDocument();
  });
  test('should dispatch updateAlarmAction and call api to update status on click Assign to me button', async () => {
    const dispatch: any = jest.fn();
    render(<SosFallDialog {...sosAlarmInitialState} />);
    const button = screen.getByTestId(/event-send/i);
    fireEvent.click(button);
    await store.dispatch(
      updateAlarmStatus(sosAlarmInitialState.alarmId, AlarmStatus.ASSIGNED),
    );

    expect(Services.updateAlarmStatusService).toHaveBeenCalledTimes(2);
  });
});
