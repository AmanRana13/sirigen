import {render} from 'utilities/test-utils';
import SOSTable from './SOSTable.component';

const mockData: any[] = [
  {
    time: 1661874463000000000,
    status_message: 'fall',
    location_based_on_beacon: 'home',
    event_timestamp: 1661876424000000000,
    type: 'SOS',
  },
  {
    time: 1661883105000000000,
    status_message: 'fall',
    location_based_on_beacon: 'home',
    event_timestamp: 1661883122000000000,
    type: 'SOS',
  },
  {
    time: 1661964119000000000,
    status_message: 'fall',
    location_based_on_beacon: 'away',
    event_timestamp: 1661964182000000000,
    type: 'Fall',
  },
];
describe('Testing SOSTable Component', () => {
  test('should render SOSTable component', () => {
    const {queryByTestId} = render(<SOSTable data={[]} />);
    const element = queryByTestId(/SOSTableContainer/i);

    expect(element).toBeInTheDocument();
  });

  test('should render Loader', () => {
    const {queryByTestId} = render(<SOSTable data={[]} loading />);
    const element = queryByTestId(/loader/i);

    expect(element).toBeInTheDocument();
  });

  test('should render data', () => {
    const {queryAllByTestId} = render(<SOSTable data={mockData} />);
    const rows = queryAllByTestId(/table-row/i);
    expect(rows).toHaveLength(3);
  });
});
