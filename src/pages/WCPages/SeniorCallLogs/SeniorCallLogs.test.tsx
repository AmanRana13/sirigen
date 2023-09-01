/* eslint-disable max-len */
import {fireEvent, render} from '../../utilities/test-utils';
import SeniorCallLogs from './SeniorCallLogs.container';
import SeniorCallLogsComponent from './SeniorCallLogs.component';
import {store} from 'store';
import {fetchCallNotes} from './SeniorCallLogs.action';

describe('SeniorCallLogs Container', () => {
  test('should render SeniorCallLogs Container', () => {
    const {queryByTestId} = render(<SeniorCallLogs />);
    const element = queryByTestId(/senior-call-logs/i);

    expect(element).toBeFalsy();
  });
});

const props = {
  computedMatch: {
    isExact: true,
    params: {
      accountID: '355ee3d4f7614f429113b4da17f49ed3',
      careInsightTab: undefined,
      seniorID: 'senior-f18173fa564c42a2a6622db899072c45',
      tab: 'call-logs',
      timezone: 'America-New_York',
    },
    path: '/senior/:seniorID/:accountID/:timezone/:tab/:careInsightTab?',
    url:
      '/senior/senior-f18173fa564c42a2a6622db899072c45/355ee3d4f7614f429113b4da17f49ed3/America-New_York/call-logs',
  },
  currentPage: 1,
  index: 2,
  exact: true,
  fetchCallNotes: store.dispatch(() =>
    fetchCallNotes({
      account_id: '0b0bdebe65c34269915d61bde3486267',
      call_id: 'c1c7b1e8782141e4bece3131e0ac42de',
      senior_id: 'senior-33246c5ba7234859a52006df7e0a4645',
    }),
  ),
  getCallLogs: jest.fn(),
  history: {
    action: 'REPLACE',
    block: jest.fn(),
    createHref: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    length: 14,
    listen: jest.fn(),
    location: {
      hash: '',
      key: '0hmpvi',
      pathname:
        '/senior/senior-f18173fa564c42a2a6622db899072c45/355ee3d4f7614f429113b4da17f49ed3/America-New_York/call-logs',
      search: '',
      state: undefined,
    },
    push: jest.fn(),
    replace: jest.fn(),
  },
  isAuthenticated: true,
  isDataLoading: 2,
  location: {
    hash: '',
    key: '0hmpvi',
    pathname:
      '/senior/senior-f18173fa564c42a2a6622db899072c45/355ee3d4f7614f429113b4da17f49ed3/America-New_York/call-logs',
    search: '',
    state: undefined,
  },
  match: {
    isExact: true,
    params: {
      accountID: '355ee3d4f7614f429113b4da17f49ed3',
      careInsightTab: undefined,
      seniorID: 'senior-f18173fa564c42a2a6622db899072c45',
      tab: 'call-logs',
      timezone: 'America-New_York',
    },
    path: '/senior/:seniorID/:accountID/:timezone/:tab/:careInsightTab?',
    url:
      '/senior/senior-f18173fa564c42a2a6622db899072c45/355ee3d4f7614f429113b4da17f49ed3/America-New_York/call-logs',
  },
  meta: {
    description: '',
    title: 'Senior Dashboard',
  },
  path: '/senior/:seniorID/:accountID/:timezone/:tab/:careInsightTab?',
  staticContext: undefined,
  updateCallNotes: jest.fn(),
};

const data = [
  {
    account_id: '355ee3d4f7614f429113b4da17f49ed3',
    call_direction: 'outbound',
    call_id: 'd925f6146fec43cdafcae25be0c3834a',
    call_priority: 'High',
    call_reason: '11 dec',
    call_status: 'completed',
    call_time: '2021-10-11T18:15:11+05:30',
    call_time_zone: '+05:30',
    call_type: 'Welfare',
    callee_id: 'caregiver-ba3001286aa14313a09111debaf7aee5',
    callee_last_call_time: '2021-12-10T22:31:00',
    callee_type: 'caregiver',
    careagent_id: 'careagent-fb2382aacd3545ccb14c9df5dc882963-karyn-brown',
    careagent_name: 'Karyn',
    created_date: '2021-10-07T08:33:06.008571+00:00',
    duration: 45,
    modification_date: '2022-03-09T11:11:51.203610+00:00',
    senior_id: 'senior-f18173fa564c42a2a6622db899072c45',
    start_time: '2021-12-11T04:01:00+05:30',
    start_time_zone: '+05:30',
  },
  {
    account_id: '355ee3d4f7614f429113b4da17f49ed3',
    call_direction: 'outbound',
    call_id: '5f8dce47d7cb4bbab5a073c3a7935fbd',
    call_priority: 'Medium',
    call_reason: 'call complete',
    call_status: 'completed',
    call_time: '2021-10-07T08:39:17+00:00',
    call_time_zone: '+00:00',
    call_type: 'Welfare',
    callee_id: 'senior-f18173fa564c42a2a6622db899072c45',
    callee_last_call_time: '2021-12-25T12:37:00',
    callee_type: 'senior',
    careagent_id: 'careagent-fb2382aacd3545ccb14c9df5dc882963-cc-internal-team',
    careagent_name: 'Internal',
    created_date: '2021-10-07T08:38:41.165409+00:00',
    duration: 30,
    modification_date: '2022-03-09T11:11:51.203699+00:00',
    senior_id: 'senior-f18173fa564c42a2a6622db899072c45',
    start_time: '2021-12-25T18:07:00+05:30',
    start_time_zone: '+05:30',
  },
];
describe('SeniorCallLogs Component', () => {
  test('should render SeniorCallLogs component', () => {
    const {queryByTestId} = render(
      <SeniorCallLogsComponent data={data} {...props} />,
    );
    const element = queryByTestId(/senior-call-Box/i);

    expect(element).toBeInTheDocument();
  });
  test('should render No Record Found in SeniorCallLogs component if there is no data', () => {
    const {getByText} = render(
      <SeniorCallLogsComponent data={[]} {...props} />,
    );
    const element = getByText(/No Record Found/i);

    expect(element).toBeInTheDocument();
  });
  test('should render SeniorCallLogs component', () => {
    const {getAllByTestId} = render(
      <SeniorCallLogsComponent data={data} {...props} />,
    );
    const element = getAllByTestId(/expandRowIcon/i);
    fireEvent.click(element[0]);

    expect(element[0]).toBeInTheDocument();
  });
  test('should render Edit button in SeniorCallLogs component', () => {
    const {getAllByTestId} = render(
      <SeniorCallLogsComponent data={data} {...props} />,
    );
    const element = getAllByTestId(/callLogEditButton/i);
    fireEvent.click(element[0]);
    expect(element[0]).toBeInTheDocument();
  });
});
