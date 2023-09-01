/* eslint-disable max-len */
import {EventsType} from 'globals/enums';
import {CREATE_SUMMARY} from 'store/eventsReducer/Events.action';
import {
  REMOVE_ALL_EVENTS,
  CLOSE_EVENT,
  CREATE_ALERT,
  MAXIMIZE_EVENT,
} from './Events.action';
import eventsReducer from './Events.reducer';
import {intialStateEvents} from './Events.state';
import {summaryData, updatedEvent, mockAlertData, mockAlertData1} from '../../_mocks_/EventsReducerMocks'

let intialState: any = intialStateEvents;

describe('eventsReducer', () => {
  beforeEach(() => {
    intialState = intialStateEvents;
  });
  afterEach(() => {
    intialState = null;
  });
  test('should return the initial state', () => {
    expect(eventsReducer(undefined, {type: ''})).toEqual(intialState);
  });

  test('should REMOVE_ALL_EVENTS', () => {
    expect(eventsReducer(undefined, {type: REMOVE_ALL_EVENTS})).toEqual(
      intialState,
    );
  });

  test('should CREATE_SUMMARY', () => {
    

    intialState.summary = {
      ...intialState.summary,
      ...summaryData,
    };

    expect(
      eventsReducer(undefined, {type: CREATE_SUMMARY, payload: {summaryData}}),
    ).toEqual(intialState);
  });

  test('should CLOSE_EVENT', () => {

    expect(
      eventsReducer(undefined, {
        type: CLOSE_EVENT,
        payload: {eventType: 'summary', updatedEvent},
      }),
    ).toEqual(intialState);
  });

  test('should CREATE_ALERT', () => {
    intialState.alert = {
      ...intialState.alert,
      ...mockAlertData,
    };
    expect(
      eventsReducer(undefined, {
        type: CREATE_ALERT,
        payload: {alertData: mockAlertData},
      }),
    ).toEqual(intialState);
  });

  test('should MAXIMIZE_EVENT', () => {

    intialState.alert = {
      ...intialState.alert,
      ...mockAlertData1,
    };
    expect(
      eventsReducer(undefined, {
        type: MAXIMIZE_EVENT,
        payload: {
          eventId:
            'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000',
          eventType: EventsType.Alert
        },
      }),
    ).toEqual(intialState);
  });
});
