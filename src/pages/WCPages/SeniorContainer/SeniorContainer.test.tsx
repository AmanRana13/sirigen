/* eslint-disable max-len */
import MOCK_URL_REGEX from '_mocks_/mockUrlRegex';
import {render, waitFor, history, MockRouteWrapper, mockAxios, cleanup} from '../../utilities/test-utils';
import SeniorContainer from './SeniorContainer.container';
import { Roles } from 'globals/enums';
import APIMocks from '_mocks_/API';

const authState = { 
  initialState: {
    auth: {
      userRole: [Roles.CareAgent],
      isAuthenticated: true,
      userName: {middle_name: 'Dev', first_name: 'Srijan', last_name: 'Team'},
    }
  }
}

const mockPath = '/senior/:seniorID/:accountID/:timezone/:tab/*'

describe('SeniorContainer', () => {
  mockAxios.onGet(MOCK_URL_REGEX.assessmentStatusSuper).reply(function () {
    return [
     200,
     APIMocks.assessmentStatusSuper
    ];
  });
  mockAxios.onGet(MOCK_URL_REGEX.assessmentStatusUser).reply(function () {
    return [
     200,
     APIMocks.assessmentStatusUser
    ];
  });
  test('should render SeniorContainer', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/test')
    render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
  });

  test('should render OnboardingInfo Subsection', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/onboarding-info')
    const {getAllByText} = render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
    const elements = await waitFor(() => getAllByText(/Profile Info/i));
    expect(elements).toHaveLength(2);
  });

  test('should render WellnessPlan Subsection', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/wellness-plan')
    const {getByTestId} = render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
    const element = await waitFor(() => getByTestId('senior-wellness-plan'));
    expect(element).toBeInTheDocument();
  });

  test('should render Assessments Subsection', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/assessments')
    const {getByTestId} = render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
    const element = await waitFor(() => getByTestId('assesssment'));
    expect(element).toBeInTheDocument();
  });

  test('should render CallSchedule Subsection', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/call-schedule')
    const {getByTestId} = render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
    const element = await waitFor(() => getByTestId('seniorCallSchedule'));
    expect(element).toBeInTheDocument();
  });

  test('should render CallLogs Subsection', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/call-logs')
    const {getByTestId} = render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
    const element = await waitFor(() => getByTestId('senior-call-box'));
    expect(element).toBeInTheDocument();
  });

  test('should render CareInsights Subsection', async () => {
    history.push('/senior/senior-2334501efc4c46ec9575fcb15b0f7657/ee52218a9b8b46d586e9e06a48d126f4/America-New_York/care-insights')
    const {getByTestId} = render((
      <MockRouteWrapper path={mockPath}>
        <SeniorContainer props={jest.fn()} />
      </MockRouteWrapper>
    ), authState);
    const element = await waitFor(() => getByTestId('SeniorCareInsights'));
    expect(element).toBeInTheDocument();
  });
  mockAxios.reset();
  cleanup();
});
