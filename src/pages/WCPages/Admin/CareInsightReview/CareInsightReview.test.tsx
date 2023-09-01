import {store} from 'store';
import {
  act,
  fireEvent,
  getByRole,
  render,
  screen,
} from '../../../utilities/test-utils';
import {
  approveCareInsight,
  declineCareInsight,
} from './CareInsightReview.action';
import CareInsightReview from './CareInsightReview.component';
const mockedState = {
  careInsightReview: {
    allCareInsightReviews: [
      {
        seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
        accountId: '0b0bdebe65c34269915d61bde3486267',
        careInsightId: 'afca66e9414449e4a753fc237b38b5b5',
        dateGenerated: 1654673117000,
        dateUpdated: 1654673117000,
        status: 'sent_for_approval',
        agent: 'Srijan',
        vitalSign: null,
        vitalLabel: '-',
        meassurementUnit: '-',
        type: 'summary',
        message: 'Test',
        variable: '',
        range: {
          goodLower: null,
          goodUpper: null,
        },
        reading: null,
        seniorName: {
          firstName: 'Jeff',
          middleName: '',
          lastName: 'Barbieri',
        },
      },
    ],
    isPaginate: true,
  },
};
describe('CareInsightReview Component', () => {
  test('should render CareInsightReview component', () => {
    const {queryByTestId} = render(<CareInsightReview />);
    const element = queryByTestId(/care-insight-review/i);
    expect(element).toBeInTheDocument();
  });

  test('should render CareInsightReview component when we have data in redux state', () => {
    const {queryByTestId} = render(<CareInsightReview />, {
      initialState: mockedState,
    });
    const element = queryByTestId(/care-insight-review/i);
    expect(element).toBeInTheDocument();
  });
  test('test when we approve the care insight', async () => {
    const dispatch: any = jest.fn();
    render(<CareInsightReview />, {
      initialState: mockedState,
    });
    const ExpandButton = screen.getByTestId(/iconButton/i);
    await fireEvent.click(ExpandButton);
    const approveButton = screen.getByText(/Approve/i);
    fireEvent.click(approveButton);
    const careInsightId = 'afca66e9414449e4a753fc237b38b5b5';
    const message = 'Test';
    const seniorId = 'senior-33246c5ba7234859a52006df7e0a4645';
    const type = 'summary';
    await dispatch(approveCareInsight(careInsightId, message, type, seniorId));
    expect(approveButton).toBeInTheDocument();
  });
  test('should able to change the message txt', async () => {
    render(<CareInsightReview />, {
      initialState: mockedState,
    });
    const iconButton = screen.getByTestId(/iconButton/i);
    fireEvent.click(iconButton);
    const inputField = await screen.findByTestId(/inputField/i);
    fireEvent.change(inputField, {target: {value: 'test'}});
    expect(inputField).toHaveValue('test');
  });
  test('should render decline button in care insight', async () => {
    render(<CareInsightReview />, {
      initialState: mockedState,
    });
    const careInsightId = 'afca66e9414449e4a753fc237b38b5b5';
    const ExpandButton = screen.getByTestId(/iconButton/i);
    await fireEvent.click(ExpandButton);
    const declineButton = screen.getByText(/Decline/i);
    fireEvent.click(declineButton);
    store.dispatch(declineCareInsight([careInsightId]));
    expect(declineButton).toBeInTheDocument();
  });
});
