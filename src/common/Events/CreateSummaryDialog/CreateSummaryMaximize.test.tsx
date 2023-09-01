import Events from '../Events';
import {render, fireEvent, screen} from '../../../utilities/test-utils';
import {store} from 'store';
import {postSummaryMessage} from 'store/eventsReducer/Summary.action';
import {closeEvent} from 'store/eventsReducer/Events.action';
import {EventsType} from 'globals/enums';

const mockedSummary = {
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
};
const mockedCareInsightHistory = [
  {
    seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
    accountId: '0b0bdebe65c34269915d61bde3486267',
    careInsightId: 'f53e8bb4f8ca485ca49bc5e17b726603|1641576926000000000',
    dateGenerated: 1641576926000,
    dateUpdated: 1641579348000,
    status: 'abandoned',
    agent: 'system',
    vitalSign: 'heart_rate_measurement',
    vitalLabel: 'Heart Rate',
    meassurementUnit: 'bpm',
    type: 'action',
    message: '',
    variable: 'upper',
    range: {
      goodLower: 42,
      goodUpper: 70.1,
    },
    reading: 97,
  },
];
const mockedSummaryWithDetails = {
  'senior-33246c5ba7234859a52006df7e0a4645': {
    eventType: 'summary',
    viewState: 0,
    fullName: 'Jeff  Barbieri',
    seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
    startDate: '12/01/2021',
    endDate: '01/09/2022',
    careInsightHistory: mockedCareInsightHistory,
    message: '',
    accountId: '0b0bdebe65c34269915d61bde3486267',
    seniorTimezone: 'America/Los_Angeles',
    eventId: 'senior-33246c5ba7234859a52006df7e0a4645',
  },
};
describe('CreateSummaryMaximize', () => {
  test('should not render CreateSummaryMaximize component', () => {
    const {queryByTestId} = render(<Events />, {
      events: {
        summary: {},
        alert: {},
        milestone: {},
      },
    });

    const element = queryByTestId('summary-maximize');

    expect(element).not.toBeInTheDocument();
  });

  test('should render CreateSummaryMaximize component', () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: mockedSummary,
          alert: {},
          milestone: {},
        },
      },
    });

    const element = getByTestId('summary-maximize');

    expect(element).toBeInTheDocument();
  });

  test('should update the state when type on summary message', () => {
    const {getByLabelText} = render(<Events />, {
      initialState: {
        events: {
          summary: mockedSummaryWithDetails,
          alert: {},
          milestone: {},
        },
      },
    });

    const inputComponent: any = getByLabelText('summary-message-input');

    fireEvent.change(inputComponent, {target: {value: 'Test text'}});

    expect(inputComponent.value).toBe('Test text');
  });

  describe('Clear Button', () => {
    test('should disabled when not date selected', () => {
      const {getByLabelText} = render(<Events />, {
        initialState: {
          events: {
            summary: mockedSummary,
            alert: {},
            milestone: {},
          },
        },
      });

      const clearButton: any = getByLabelText('clear-button');

      expect(clearButton).toHaveAttribute('disabled');
    });

    test('should click on clear button to clear dates and message', () => {
      const {getByLabelText} = render(<Events />, {
        initialState: {
          events: {
            summary: mockedSummaryWithDetails,
            alert: {},
            milestone: {},
          },
        },
      });

      const clearButton: any = getByLabelText('clear-button');

      fireEvent.click(clearButton);

      const inputComponent: any = getByLabelText('summary-message-input');

      expect(inputComponent.value).toBe('');
    });
  });
  test('should render close button', () => {
    const {getByText} = render(<Events />, {
      initialState: {
        events: {
          summary: mockedSummary,
          alert: {},
          milestone: {},
        },
      },
    });

    const closeButton = getByText('Close');

    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton);
    const overlayCloseButton = screen.getByText(/Close/i);
    fireEvent.click(overlayCloseButton);
    const element = screen.queryByTestId('summary-maximize');
    store.dispatch(
      closeEvent('senior-33246c5ba7234859a52006df7e0a4645', EventsType.Summary),
    );
  });

  test('should click on submit button to submit ', async () => {
    const {getByTestId, findByText} = render(<Events />, {
      initialState: {
        events: {
          summary: mockedSummaryWithDetails,
          alert: {},
          milestone: {},
        },
      },
    });

    const submitButton: any = getByTestId('event-send');

    fireEvent.click(submitButton);
    const seniorId = 'senior-33246c5ba7234859a52006df7e0a4645';
    const eventId = 'senior-33246c5ba7234859a52006df7e0a4645';
    const message = '';
    await store.dispatch(postSummaryMessage(seniorId, eventId, message));
    expect(findByText(/Summary message submitted successfully/i)).toBeTruthy();
  });
});
