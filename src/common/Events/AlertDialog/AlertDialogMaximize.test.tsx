import Events from '../Events';
import {render, fireEvent} from '../../../utilities/test-utils';
import {store} from 'store';
import {
  closeEvent,
  minimizeEvent,
  updateNoActionStatus,
} from 'store/eventsReducer/Events.action';
import {EventsType} from 'globals/enums';

const alertInitialStateWithNoMessage = {
  'senior-f300a4c4515d41ddabbac003cf07c32c-ae10a04a060745fd91297b295e8c7536|1643252265000000000': {
    eventType: 'alert',
    viewState: 0,
    fullName: 'Melissa Rose',
    seniorId: 'senior-f300a4c4515d41ddabbac003cf07c32c',
    startDate: '01/20/2022',
    endDate: '01/27/2022',
    careInsightHistory: [
      {
        seniorId: 'senior-f300a4c4515d41ddabbac003cf07c32c',
        accountId: 'f2c3889fc0f9448d844be611578efc79',
        careInsightId: 'ae10a04a060745fd91297b295e8c7536|1643252265000000000',
        dateGenerated: 1643252265000,
        dateUpdated: 1643254248000,
        status: 'abandoned',
        agent: 'system',
        vitalSign: 'heart_rate_measurement',
        vitalLabel: 'Heart Rate',
        meassurementUnit: 'bpm',
        type: 'action',
        message: '',
        variable: 'upper',
        range: {
          goodLower: 46.6,
          goodUpper: 82.4,
        },
        reading: 112,
      },
    ],
    message: '',
    accountId: 'f2c3889fc0f9448d844be611578efc79',
    seniorTimezone: 'America/Chicago',
    eventId:
      'senior-f300a4c4515d41ddabbac003cf07c32c-ae10a04a060745fd91297b295e8c7536|1643252265000000000',
    alertId: 'ae10a04a060745fd91297b295e8c7536|1643252265000000000',
    detailList: [
      {
        label: 'Date/Time Generated',
        value: '01/27/2022 @ 08:27 AM',
      },
      {
        label: 'Vital Sign',
        value: 'Heart Rate',
      },
      {
        label: 'Variable',
        value: 'Upper',
      },
      {
        label: 'Current',
        value: '112 bpm',
      },
      {
        label: 'Range',
        value: '46.6-82.4 bpm',
      },
    ],
    dateGenerated: 1643252265000,
  },
};

describe('AlertDialogComponent', () => {
  test('should not render AlertDialogComponent component', () => {
    const {queryByTestId} = render(<Events />, {
      events: {
        summary: {},
        alert: {},
        milestone: {},
      },
    });
    const element = queryByTestId('alert-maximize');
    expect(element).not.toBeInTheDocument();
  });

  test('should render AlertDialogComponent component', () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          alert: alertInitialStateWithNoMessage,
          summary: {},
          milestone: {},
        },
      },
    });

    const element = getByTestId('alert-maximize');

    expect(element).toBeInTheDocument();
  });

  test('should validate message field and disable click', () => {
    const {getByLabelText, queryByTestId} = render(<Events />, {
      initialState: {
        events: {
          alert: alertInitialStateWithNoMessage,
          summary: {},
          milestone: {},
        },
      },
    });

    const inputComponent: any = getByLabelText('alert-message-input');
    const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et massa id ex porttitor faucibus. Etiam in ultrices mauris. Pellentesque sed nibh varius, aliquam velit non, vulputate dolor. Aliquam volutpat eleifend turpis, in congue metus convallis quis. Proin pulvinar felis eget mi dapibus varius. Pellentesque lobortis viverra nisl, malesuada dapibus leo facilisis et. Nunc sed augue at purus laoreet luctus in eget leo. Sed posuere aliquet dui a sagittis. Mauris ut purus quis ex posuere blandit. Maecenas gravida congue enim et molestie. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent eu purus imperdiet, mollis diam quis, congue nunc. Etiam efficitur urna ac nunc volutpat, vitae faucibus orci varius. Vivamus efficitur molestie pulvinar. Integer faucibus nisi purus. Sed vestibulum hendrerit magna, id tempus ligula elementum a. Praesent porta lacinia sagittis. Donec massa dui, lacinia vitae quam in, tristique facilisis enim. Cras egestas tristique leo, eu fermentum dolor facilisis ut. Donec odio mi, commodo non lectus sit amet, sollicitudin bibendum elit. Morbi condimentum orci non enim porttitor, id dictum augue eleifend.
    Suspendisse maximus lorem metus, ac congue nulla euismod nec. Donec eget varius magna. Praesent a lacus eget magna blandit pharetra at vel diam. Sed congue semper arcu, a mattis nunc dapibus sed. Nullam id posuere nulla. Vivamus et condimentum arcu. Maecenas euismod dui nec enim mollis, non sollicitudin massa tempus. Curabitur aliquam leo diam, ac tincidunt ipsum placerat eget. Praesent pretium quam at eros consectetur, nec dignissim orci semper. Sed aliquet vestibulum quam, molestie interdum nunc imperdiet sit amet. In venenatis tincidunt odio, nec lobortis nulla aliquet ac. Vivamus sed ullamcorper risus.
    Vivamus ultricies, neque vel rutrum pretium, augue metus dictum quam, in rhoncus urna ipsum in arcu. Nulla facilisi. In porta mauris quis massa consectetur vehicula. Suspendisse ut metus varius, tempor dui in, fringilla dolor. In turpis.`;
    fireEvent.change(inputComponent, {
      target: {
        value: message,
      },
    });
    const element = queryByTestId('event-send');
    expect(element).toBeDisabled();
  });

  test('should update the state when type on summary message', () => {
    const {getByLabelText} = render(<Events />, {
      initialState: {
        events: {
          summary: {},
          alert: alertInitialStateWithNoMessage,
          milestone: {},
        },
      },
    });
    const inputComponent: any = getByLabelText('alert-message-input');

    fireEvent.change(inputComponent, {target: {value: 'Test text'}});

    expect(inputComponent.value).toBe('Test text');
  });

  test('no action button triggered', async () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: {},
          alert: alertInitialStateWithNoMessage,
          milestone: {},
        },
      },
    });
    const element: any = getByTestId('event-noaction');
    fireEvent.click(element);
    const alertId = 'd9a418680e0f4c3d92e08a576ee1ede3|1641516736000000000';
    await store.dispatch(updateNoActionStatus([alertId]));
  });

  test('cancel button triggered', async () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: {},
          alert: alertInitialStateWithNoMessage,
          milestone: {},
        },
      },
    });
    const element: any = getByTestId('event-close');
    fireEvent.click(element);
    const mockData = {
      summary: {},
      alert: {},
      milestone: {},
      isRenderLocation: true,
      sos: {},
      fallDetection: {},
    };
    const eventId =
      'senior-f300a4c4515d41ddabbac003cf07c32c-ae10a04a060745fd91297b295e8c7536|1643252265000000000';
    const eventType = EventsType.Alert;
    await store.dispatch(closeEvent(eventId, eventType));
    expect(store.getState().events).toEqual(mockData);
  });

  test('minimize alert dialog', () => {
    const {getByTestId} = render(<Events />, {
      initialState: {
        events: {
          summary: {},
          alert: alertInitialStateWithNoMessage,
          milestone: {},
        },
      },
    });
    const element: any = getByTestId('event-minimize');
    fireEvent.click(element);
    const mockData = {
      summary: {},
      alert: {
        'senior-042ec8bb092f4442b65fb8705f82f324-c563f31290d44dd1ad23cfddbab95954|1645549980000000000': {
          viewState: 1,
        },
      },
      milestone: {},
      isRenderLocation: true,
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
