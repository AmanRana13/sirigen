import {CareInsightStatus, EventsType} from '../../globals/enums';
/* eslint-disable max-len */
import {
  closeEvent,
  getAllAlarmEvents,
  maximizeEvent,
  minimizeEvent,
  removeAllEvents,
} from './Events.action';
import {store} from '../store';
import {
  createAlertDialog,
  createApproveAlert,
  postAlertDialog,
} from './Alerts.action';

describe('events action creators', () => {
  describe('when user minimize summary', () => {
    test('should dispatch MINIMIZE_EVENT', () => {
      const mockData = {
        summary: {},
        alert: {
          'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000': {
            viewState: 1,
          },
        },
        isRenderLocation: true,
        milestone: {},
        sos: {},
        fallDetection: {},
      };

      store.dispatch(
        minimizeEvent(
          'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000',
          EventsType.Alert,
        ),
      );

      expect(store.getState().events).toEqual(mockData);
    });
  });
  test('should dispatch MaxiMIZE_EVENT', () => {
    const mockData = {
      summary: {},
      alert: {
        'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000': {
          viewState: 0,
        },
      },
      isRenderLocation: true,
      milestone: {},
      sos: {},
      fallDetection: {},
    };

    store.dispatch(
      maximizeEvent(
        'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000',
        EventsType.Alert,
      ),
    );

    expect(store.getState().events).toEqual(mockData);
  });
  test('should dispatch removeAllEvents', () => {
    const mockData = {
      summary: {},
      alert: {},
      milestone: {},
      isRenderLocation: true,
      sos: {},
      fallDetection: {},
    };

    store.dispatch(removeAllEvents());

    expect(store.getState().events).toEqual(mockData);
  });
  test('should dispatch closeEvent', () => {
    const mockData = {
      summary: {},
      alert: {},
      milestone: {},
      isRenderLocation: true,
      sos: {},
      fallDetection: {},
    };
    const eventId =
      'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000';
    const eventType = EventsType.Alert;
    store.dispatch(closeEvent(eventId, eventType));

    expect(store.getState().events).toEqual(mockData);
  });

  test('should dispatch getAllAlarmEvents action', async () => {
    await store.dispatch(getAllAlarmEvents());
  });
  test('should dispatch postAlertDialog action', async () => {
    const careInsightId =
      'f693a73d2c1f469ea3db7256ad5fcd61|1651037450000000000';
    const status = CareInsightStatus.NoAction;
    const message = '';
    await store.dispatch(postAlertDialog(careInsightId, status, message));
  });
  test('should dispatch createAlertDialog action', async () => {
    const data = {
      seniorId: 'senior-f300a4c4515d41ddabbac003cf07c32c',
      accountId: 'f2c3889fc0f9448d844be611578efc79',
    };
    await store.dispatch(createAlertDialog(data));
  });
  test('should dispatch createApproveAlert action', async () => {
    const data = {
      seniorId: 'senior-f300a4c4515d41ddabbac003cf07c32c',
      accountId: 'f2c3889fc0f9448d844be611578efc79',
      careInsightId: 'f693a73d2c1f469ea3db7256ad5fcd61|1651037450000000000',
      message: '',
      dateGenerated: '11/07/2022',
    };
    await store.dispatch(createApproveAlert(data));
  });
});
