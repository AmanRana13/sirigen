import {EventViewState} from 'globals/enums';
import {
  CLOSE_EVENT,
  CREATE_SUMMARY,
  MAXIMIZE_EVENT,
  MINIMIZE_EVENT,
  CREATE_ALERT,
  CREATE_MILESTONE,
  REMOVE_ALL_EVENTS,
} from './Events.action';
import {
  IEventsAction,
  IEventsInitialState,
  intialStateEvents,
} from './Events.state';
import {UPDATE_IS_RENDER_LOCATION} from './locationData.action';

const eventsReducer = (
  state: IEventsInitialState = intialStateEvents,
  action: IEventsAction,
) => {
  switch (action.type) {
    case CREATE_SUMMARY:
      return {
        ...state,
        summary: {
          ...state.summary,
          ...action.payload.summaryData,
        },
      };
    case CREATE_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          ...action.payload.alertData,
        },
      };
    case CREATE_MILESTONE:
      return {
        ...state,
        milestone: {
          ...state.milestone,
          ...action.payload.milestoneData,
        },
      };
    case MINIMIZE_EVENT:
      return {
        ...state,
        [action.payload.eventType]: {
          ...state[action.payload.eventType],
          [action.payload.eventId]: {
            ...state[action.payload.eventType][action.payload.eventId],
            ...action.payload.data,
            viewState: EventViewState.Minimize,
          },
        },
      };

    case MAXIMIZE_EVENT:
      return {
        ...state,
        [action.payload.eventType]: {
          ...state[action.payload.eventType],
          [action.payload.eventId]: {
            ...state[action.payload.eventType][action.payload.eventId],
            viewState: EventViewState.Maximize,
          },
        },
      };

    case CLOSE_EVENT:
      return {
        ...state,
        [action.payload.eventType]: action.payload.updatedEvent,
      };

    case REMOVE_ALL_EVENTS:
      return {...intialStateEvents};

    case UPDATE_IS_RENDER_LOCATION:
      return {
        ...state,
        isRenderLocation: action.payload,
      };

    default:
      return state;
  }
};

export default eventsReducer;
