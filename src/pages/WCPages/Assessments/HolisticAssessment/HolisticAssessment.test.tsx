/* eslint-disable max-len */
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../utilities/test-utils';
import HolisticAssessment from './HolisticAssessment.component';
import {holisticAssessmentStateMockData} from '../../../_mocks_/holisticAssessmentMocks';

describe('HolisticAssessment Component', () => {
  test('should render HolisticAssessment component', () => {
    render(<HolisticAssessment heading='Holistic Assessment' />, {
      initialState: {
        assessments: {
          surveys: holisticAssessmentStateMockData.formData,
          isHistory: false,
          history: {
            data: [],
            lastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
          dateTime: '',
          assessmentId: holisticAssessmentStateMockData.assessmentId,
          isCompleted: false,
          versionNumber: 3,
        },
      },
    });
    const element = screen.queryByTestId(/holisticAssessmentComponent/i);
    expect(element).toBeInTheDocument();
  });

  test('when we click on submit button with unfilled data it should show incomplete text', async () => {
    const component = render(
      <HolisticAssessment heading='Holistic Assessment' />,
      {
        initialState: {
          assessments: {
            surveys: holisticAssessmentStateMockData.formData,
            isHistory: false,
            history: {
              data: [],
              lastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1,
            },
            dateTime: '',
            assessmentId: holisticAssessmentStateMockData.assessmentId,
            isCompleted: false,
            versionNumber: 3,
          },
        },
      },
    );
    const submitButton = component.getByTestId('submitBtn');
    fireEvent.click(submitButton);

    const incompleteText = await waitFor(() => screen.getByText(/Incomplete/i));
    expect(incompleteText).toBeInTheDocument();
  });

  test('when we click on save button with unfilled data it should show incomplete text ', async () => {
    render(<HolisticAssessment heading='Holistic Assessment' />, {
      initialState: {
        assessments: {
          surveys: holisticAssessmentStateMockData.formData,
          isHistory: false,
          history: {
            data: [],
            lastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
          dateTime: '',
          assessmentId: holisticAssessmentStateMockData.assessmentId,
          isCompleted: false,
          versionNumber: 3,
        },
      },
    });

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    const incompleteText = await waitFor(() => screen.getByText(/Incomplete/i));
    expect(incompleteText).toBeInTheDocument();
  });

  test('it should display previous history assessment data after clicking on view button', async () => {
    const component = render(
      <HolisticAssessment heading='Holistic Assessment' />,
      {
        initialState: {
          assessments: {
            surveys: holisticAssessmentStateMockData.formData,
            isHistory: true,
            history: holisticAssessmentStateMockData.history,
            dateTime: '',
            assessmentId: holisticAssessmentStateMockData.assessmentId,
            isCompleted: false,
            versionNumber: 3,
          },

          common: {
            seniorDetail: {
              minimalInfo: {user_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3'},
            },
          },
        },
      },
    );

    const viewElement = component.getByText(/view/i);
    fireEvent.click(viewElement);

    const closeButton = await waitFor(() =>
      screen.findByRole('button', {name: /close/i}),
    );
    fireEvent.click(closeButton);

    const resetButton = await waitFor(() => component.findByText(/reset/i));
    expect(resetButton).toBeInTheDocument();
  });
});
