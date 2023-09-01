import Events from './Events';
import {render} from 'utilities/test-utils';
import {alertMockData} from '_mocks_/eventMockData';
import {
  callEntryInitialState,
  fallAlarmInitialState,
  sosAlarmInitialState,
} from '_mocks_/EventsReducerMocks';
import {EventViewState} from 'globals/enums';

describe('Events', () => {
  test('should render one MaximizeView component', () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: {
            'senior-33246c5ba7234859a52006df7e0a4645': {
              eventType: 'summary',
              viewState: 0,
              fullName: 'Jeff  Barbieri',
              seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
              startDate: '',
              endDate: '',
              careInsightHistory: [],
              message: '',
              accountId: '0b0bdebe65c34269915d61bde3486267',
              seniorTimezone: 'America/Los_Angeles',
              eventId: 'senior-33246c5ba7234859a52006df7e0a4645',
            },
          },
          alert: {},
          milestone: {},
        },
      },
    });
    const element = getByTestId('MaximizeView');
    expect(element).toBeInTheDocument();
  });

  test('should render more than one MaximizeView component', () => {
    const {getAllByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: {
            'senior-33246c5ba7234859a52006df7e0a4645': {
              eventType: 'summary',
              viewState: 0,
              fullName: 'Jeff  Barbieri',
              seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
              startDate: '',
              endDate: '',
              careInsightHistory: [],
              message: '',
              accountId: '0b0bdebe65c34269915d61bde3486267',
              seniorTimezone: 'America/Los_Angeles',
              eventId: 'senior-33246c5ba7234859a52006df7e0a4645',
            },
          },
          alert: alertMockData,
          milestone: {},
        },
      },
    });

    const element = getAllByTestId('MaximizeView');

    expect(element.length).toBeGreaterThan(0);
  });
  test('should render sosFallComponent component', () => {
    const {getAllByTestId} = render(<Events />, {
      initialState: {
        alarms: {
          sos: {
            'senior-f300a4c4515d41ddabbac003cf07c32c-ae10a04a060745fd91297b295e8c7536|1643252265000000000': {
              ...sosAlarmInitialState,
            },
          },
          fall: {
            'senior-f300a4c4515d41ddabbac003cf07c32c-ae10a04a060745fd91297b295e8c7536|1643252265000000000': {
              ...fallAlarmInitialState,
            },
          },
        },
      },
    });

    const element = getAllByTestId('MaximizeView');

    expect(element.length).toBe(2);
  });
  test('should render callEntryComponent component', () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        callEntry: {
          events: {
            'senior-f300a4c4515d41ddabbac003cf07c32c-ae10a04a060745fd91297b295e8c7536|1643252265000000000': {
              ...callEntryInitialState,
            },
          },
        },
      },
    });

    const element = getByTestId('callEntryDialog');

    expect(element).toBeInTheDocument();
  });
  test('should render summary in MinimizeView ', () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: {
            'senior-33246c5ba7234859a52006df7e0a4645': {
              eventType: 'summary',
              viewState: EventViewState.Minimize,
              fullName: 'Jeff  Barbieri',
              seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
              startDate: '',
              endDate: '',
              careInsightHistory: [],
              message: '',
              accountId: '0b0bdebe65c34269915d61bde3486267',
              seniorTimezone: 'America/Los_Angeles',
              eventId: 'senior-33246c5ba7234859a52006df7e0a4645',
            },
          },
          alert: {},
          milestone: {},
        },
      },
    });

    const element = getByTestId('minimized');

    expect(element).toBeInTheDocument();
  });
});
