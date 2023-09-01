import { store } from '../../../../store/store';
import {render} from '../../../../utilities/test-utils';
import CareInsightsComponent from '../CareInsights';
import { getDashboardCareInsight, getWellnessSurveyMessage } from './CareInsights.action';

describe('CareInsightsComponent Component', () => {
  const careInsightHistoryData = [
    {
      seniorId: 'senior-33246c5ba7234859a52006df7e0a4645',
      accountId: null,
      careInsightId: '121106415866432ca597cd7b938f539d',
      dateGenerated: 1654246814000,
      dateUpdated: 1654246814000,
      status: 'approved',
      agent: 'Srijan',
      vitalSign: null,
      vitalLabel: '-',
      meassurementUnit: '-',
      type: 'summary',
      message: 'Tesst summ. admin',
      variable: '',
      range: {
        goodLower: null,
        goodUpper: null,
      },
      reading: null,
      seniorName: {},
    },
  ];

  test('should render CareInsightsComponent component', () => {
    const component = render(<CareInsightsComponent />, {
      initialState: {
        seniorDashboard: {
          careInsightHistory: {
            data: [],
            loading: false,
          },
        },
      },
    });
    const element = component.queryByTestId(/care-insights/i);

    expect(element).toBeInTheDocument();
  });

  test('should render CareInsightsComponent component', async() => {
    const component = render(<CareInsightsComponent />, {
      initialState: {
        seniorDashboard: {
          careInsightHistory: {
            data: careInsightHistoryData,
            loading: false,
          },
        },
      },
    });
await store.dispatch(getDashboardCareInsight())
    const element = component.queryByTestId(/care-insights/i);
    expect(element).toBeInTheDocument();
  });
  });
