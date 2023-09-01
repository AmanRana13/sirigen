import {render} from 'utilities/test-utils';
import FacilitySummaryTable from './FacilitySummaryTable.component';

const mockData: any[] = [
  {
    seniorId: 'senior-f137e97a909b4829adf9798b4c2cd277',
    accountId: null,
    careInsightId: '5beada03b00341e7a103b687885bf79e',
    dateGenerated: 1690404751000,
    dateUpdated: 1690404856000,
    status: 'approved',
    agent: 'Yogi',
    vitalSign: null,
    vitalLabel: '-',
    meassurementUnit: '-',
    type: 'summary',
    message: 'TEST SUMMARY 29108198',
    variable: '',
    range: {
      goodLower: null,
      goodUpper: null,
    },
    reading: null,
    seniorName: {},
  },
  {
    seniorId: 'senior-f137e97a909b4829adf9798b4c2cd277',
    accountId: null,
    careInsightId: '5884c4d1edb04f468f01d005ede72e81',
    dateGenerated: 1690404717000,
    dateUpdated: 1690404861000,
    status: 'approved',
    agent: 'Yogi',
    vitalSign: null,
    vitalLabel: '-',
    meassurementUnit: '-',
    type: 'summary',
    message: 'TEST SUMMARY 2010101',
    variable: '',
    range: {
      goodLower: null,
      goodUpper: null,
    },
    reading: null,
    seniorName: {},
  },
  {
    seniorId: 'senior-f137e97a909b4829adf9798b4c2cd277',
    accountId: null,
    careInsightId: '709c47012abb4644b3d264a258cf1aec',
    dateGenerated: 1690404701000,
    dateUpdated: 1690404866000,
    status: 'approved',
    agent: 'Yogi',
    vitalSign: null,
    vitalLabel: '-',
    meassurementUnit: '-',
    type: 'summary',
    message: 'TEST SUMMARY 2.019192',
    variable: '',
    range: {
      goodLower: null,
      goodUpper: null,
    },
    reading: null,
    seniorName: {},
  },
  {
    seniorId: 'senior-f137e97a909b4829adf9798b4c2cd277',
    accountId: null,
    careInsightId: '330849fb615649e4925f0ddcc0a4e01a',
    dateGenerated: 1690404683000,
    dateUpdated: 1690404871000,
    status: 'approved',
    agent: 'Yogi',
    vitalSign: null,
    vitalLabel: '-',
    meassurementUnit: '-',
    type: 'summary',
    message: 'TEST SUMMARY 2.000',
    variable: '',
    range: {
      goodLower: null,
      goodUpper: null,
    },
    reading: null,
    seniorName: {},
  },
  {
    seniorId: 'senior-f137e97a909b4829adf9798b4c2cd277',
    accountId: null,
    careInsightId: '8b77b3c1dbc94033920b3fb0dd7e7634',
    dateGenerated: 1690402594000,
    dateUpdated: 1690402632000,
    status: 'approved',
    agent: 'Yogi',
    vitalSign: null,
    vitalLabel: '-',
    meassurementUnit: '-',
    type: 'facility_summary',
    message: 'TEST FACILITY SUMMARY 001',
    variable: '',
    range: {
      goodLower: null,
      goodUpper: null,
    },
    reading: null,
    seniorName: {},
  },
];
describe('Testing FacilitySummaryTable Component', () => {
  test('should render FacilitySummaryTable component', () => {
    const {queryByTestId} = render(<FacilitySummaryTable data={[]} />);
    const element = queryByTestId(/facilitySummaryTableContainer/i);

    expect(element).toBeInTheDocument();
  });
  test('should render Loader', () => {
    const {queryByTestId} = render(<FacilitySummaryTable data={[]} loading />);
    const element = queryByTestId(/loader/i);

    expect(element).toBeInTheDocument();
  });
  test('should render data', () => {
    const {queryAllByTestId} = render(<FacilitySummaryTable data={mockData} />);
    const rows = queryAllByTestId(/table-row/i);
    expect(rows).toHaveLength(5);
  });
});
