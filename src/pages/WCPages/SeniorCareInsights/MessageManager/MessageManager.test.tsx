import MessageManager from './MessageManager';
import {render} from '../../../utilities/test-utils';
import {create} from '_mocks_/redux-mock';
import {CREATE_SUMMARY} from 'store/eventsReducer/Events.action';
import {fireEvent} from '@testing-library/react';
import {mockSeniorData} from '_mocks_/commonMocks';
import {store} from 'store';
import {
  expandCareInsight,
  getCareInsightTransaction,
} from './MessageManager.action';

const mockData = {
  seniorId: 'senior-042ec8bb092f4442b65fb8705f82f324',
  accountId: '1fc17069353f4da7b15f632748b429ed',
  careInsightId: 'f693a73d2c1f469ea3db7256ad5fcd61|1651037450000000000',
  dateGenerated: 1651037450000,
  dateUpdated: 1651473557000,
  status: 'no_action',
  agent: 'Srijan',
  vitalSign: 'heart_rate_measurement',
  vitalLabel: 'Heart Rate',
  meassurementUnit: 'bpm',
  type: 'action',
  message: '',
  variabl: 'upper',
  range: {
    goodLower: 57,
    goodUpper: 63.1,
  },
  reading: 92,
  seniorName: {},
};

describe('MessageManager', () => {
  let component: any;
  beforeEach(() => {
    component = render(<MessageManager />, {
      initialState: {
        common: mockSeniorData,
        messageManager: {
          careInsightHistory: [mockData],
          careInsightSubHistory: {
            'f693a73d2c1f469ea3db7256ad5fcd61|1651037450000000000': [mockData],
          },
          isPaginate: true,
        },
        events: {
          summary: {
            'senior-042ec8bb092f4442b65fb8705f82f324': {
              eventType: 'summary',
              viewState: 2,
              fullName: '',
              seniorId: 'senior-39f816cb6c1e4d36a10af3c86fca6440',
              startDate: '',
              endDate: '',
              careInsightHistory: [],
              message: 'hyfgbnm',
              accountId: null,
              seniorTimezone: '',
              eventId:
                'senior-39f816cb6c1e4d36a10af3c86fca6440-4a8f5e289faa4979aaaed97c051705af',
            },
          },
        },
      },
    });
  });

  afterEach(() => {
    component = null;
  });

  test('renders MessageManager component', () => {
    const {getByTestId} = component;
    const element = getByTestId('message-manager');

    expect(element).toBeInTheDocument();
  });

  describe('Create Summary Button', () => {
    test('should render Create Summary button', () => {
      const {getByTestId} = component;
      const element = getByTestId('create-summary');

      expect(element).toBeInTheDocument();
    });

    test('should click on create summary button', async () => {
      const {getByTestId} = component;
      const {store, invoke} = create();

      invoke((dispatch: any) => {
        dispatch(CREATE_SUMMARY);
      });

      fireEvent.click(getByTestId('create-summary'));

      expect(store.dispatch).toHaveBeenCalledWith(CREATE_SUMMARY);
    });
  });

  test('should display careInsight history when we click on Expand Icon', async () => {
    const {getByTestId} = component;
    const element = getByTestId('message-manager');

    const id = 'f693a73d2c1f469ea3db7256ad5fcd61|1651037450000000000';
    await store.dispatch(expandCareInsight(id));
    await store.dispatch(getCareInsightTransaction(id));
    expect(element).toBeInTheDocument();
  });
});
