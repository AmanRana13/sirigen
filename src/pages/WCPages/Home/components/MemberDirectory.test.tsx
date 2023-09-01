import APIMocks from '_mocks_/API';
import {cleanup, fireEvent, mockAxios, render, waitFor} from '../../../utilities/test-utils';
import {MemberDirectory} from './MemberDirectory';
import MOCK_URL_REGEX from '_mocks_/mockUrlRegex';
import { Roles } from 'globals/enums';
global.scrollTo = jest.fn();

const authState = { 
  auth: {
    userRole: [Roles.CareAgent],
    isAuthenticated: true,
    userName: {middle_name: 'Dev', first_name: 'Srijan', last_name: 'Team'},
  }
}


describe('MemberDirectory Component', () => {
  afterEach(() => {
    mockAxios.resetHandlers();
    cleanup();
  })

  test('should render MemberDirectory component', async () => {
    mockAxios.onGet(MOCK_URL_REGEX.seniorList).reply(function () {
      return [
       200,
       APIMocks.seniorList
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.seniorMapping).reply(function () {
      return [
       200,
       APIMocks.seniorMapping
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.insightAggr).reply(function () {
      return [
       200,
       APIMocks.insightAggr
      ];
    });
    mockAxios.onPost(MOCK_URL_REGEX.multipleImages).reply(function () {
      return [
       200,
       APIMocks.multipleImages
      ];
    });
    const {getByTestId} = render(
      <MemberDirectory getCallScheduleList={jest.fn()} />,
      {
        initialState: {
          common: {
            seniorList: {
              data: [],
              lastEvaluatedKey: '',
              searchLastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1
            },
          }
        },
      },
    );
    const element = await waitFor(() => getByTestId(/member-directory/i));
    expect(element).toBeInTheDocument();
  });

  test('should render MemberDirectory component: No Record Found', async () => {
    mockAxios.onGet(MOCK_URL_REGEX.seniorList).reply(function () {
      return [
       200,
       {
          ...APIMocks.seniorList,
          data: {
            ...APIMocks.seniorList.data,
          }
       }
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.seniorMapping).reply(function () {
      return [
       200,
       {
        ...APIMocks.seniorMapping,
        data: {}
       }
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.insightAggr).reply(function () {
      return [
       200,
       APIMocks.insightAggr
      ];
    });
    const {getByText} = render(
      <MemberDirectory getCallScheduleList={jest.fn()} />,
      {
        initialState: {
          common: {
            seniorList: {
              data: [],
              lastEvaluatedKey: '',
              searchLastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1
            },
          }
        },
      },
    );
    const element = await waitFor(() => getByText(/No Record Found/i));
    expect(element).toBeInTheDocument();
  });

  test('should render MemberDirectory component: navigateToDashboard', async () => {
    mockAxios.onGet(MOCK_URL_REGEX.seniorList).reply(function () {
      return [
       200,
       APIMocks.seniorList
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.seniorMapping).reply(function () {
      return [
       200,
       APIMocks.seniorMapping
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.insightAggr).reply(function () {
      return [
       200,
       APIMocks.insightAggr
      ];
    });
    mockAxios.onPost(MOCK_URL_REGEX.multipleImages).reply(function () {
      return [
       200,
       APIMocks.multipleImages
      ];
    });
    const {getAllByTestId} = render(
      <MemberDirectory getCallScheduleList={jest.fn()} />,
      {
        initialState: {
          common: {
            seniorList: {
              data: [],
              lastEvaluatedKey: '',
              searchLastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1
            },
          }
        },
      },
    );
    const elements = await waitFor(() => getAllByTestId(/navigateToDashboard/i));
    expect(elements).toHaveLength(5);
    const element = elements[0];
    fireEvent.click(element);
  });

  test('should render MemberDirectory component: openSchedulerForm', async () => {
    mockAxios.onGet(MOCK_URL_REGEX.seniorList).reply(function () {
      return [
       200,
       APIMocks.seniorList
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.seniorMapping).reply(function () {
      return [
       200,
       APIMocks.seniorMapping
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.insightAggr).reply(function () {
      return [
       200,
       APIMocks.insightAggr
      ];
    });
    mockAxios.onPost(MOCK_URL_REGEX.multipleImages).reply(function () {
      return [
       200,
       APIMocks.multipleImages
      ];
    });
    const {getAllByTestId} = render(
      <MemberDirectory getCallScheduleList={jest.fn()} />,
      {
        initialState: {
          common: {
            seniorList: {
              data: [],
              lastEvaluatedKey: '',
              searchLastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1
            },
          }
        },
      },
    );
    const elements = await waitFor(() => getAllByTestId(/openSchedulerForm/i));
    expect(elements).toHaveLength(5);
    const element = elements[0];
    fireEvent.click(element);
  });

  test('should render MemberDirectory component: pendingCall', async () => {
    mockAxios.onGet(MOCK_URL_REGEX.seniorList).reply(function () {
      return [
       200,
       APIMocks.seniorList
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.seniorMapping).reply(function () {
      return [
       200,
       APIMocks.seniorMapping
      ];
    });
    mockAxios.onGet(MOCK_URL_REGEX.insightAggr).reply(function () {
      return [
       200,
       APIMocks.insightAggr
      ];
    });
    mockAxios.onPost(MOCK_URL_REGEX.multipleImages).reply(function () {
      return [
       200,
       APIMocks.multipleImages
      ];
    });
    const {getAllByTestId} = render(
      <MemberDirectory getCallScheduleList={jest.fn()} />,
      {
        initialState: {
          common: {
            seniorList: {
              data: [],
              lastEvaluatedKey: '',
              searchLastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1
            },
          },
          ...authState
        },
      },
    );
    const elements = await waitFor(() => getAllByTestId(/pending-call/i));
    expect(elements).toHaveLength(5);
    const element = elements[0];
    fireEvent.click(element);
  });
});
