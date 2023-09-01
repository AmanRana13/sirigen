import {
  katzSurveyData,
  mockCompletedSurveyData,
  mockSurveyData,
} from '_mocks_/adlAssessmentMockData';
import {fireEvent, render, screen} from '../../../../utilities/test-utils';
import KatzAssessment from './KatzAssessment.component';
import {store} from 'store';
import {postKatzAssessment} from './KatzAssessment.action';
import {AssessmentStatus} from 'globals/enums';

describe('Testing katz assessment assessment component', () => {
  test('should render katz assessment assesment component', () => {
    render(<KatzAssessment />, {
      initialState: {
        assessments: {
          surveys: mockSurveyData,
          loading: false,
          assessmentId: '213',
          history: {
            data: [],
            lastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
          isHistory: false,
          dateTime: '',
          isCompleted: false,
          versionNumber: 1,
        },
      },
    });
    const assessment = screen.getByTestId('KatzAssessmentComponent');
    expect(assessment).toBeInTheDocument();
  });

  test('testing save, submit and reset buttons functionality', () => {
    render(<KatzAssessment />, {
      initialState: {
        assessments: {
          surveys: mockSurveyData,
          loading: false,
          assessmentId: '213',
          history: {
            data: [],
            lastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
          isHistory: false,
          dateTime: '',
          isCompleted: false,
          versionNumber: 1,
        },
      },
    });
    const assessment = screen.getByTestId('KatzAssessmentComponent');
    expect(assessment).toBeInTheDocument();

    //when we click on save button
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    const assessmentData = {
      survey: katzSurveyData,
      type: AssessmentStatus.Save,
      totalScore: 4,
      versionNumber: 1,
      isUnMount: false,
      seniorID: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
      assessmentId: '123',
    };
    store.dispatch(postKatzAssessment(assessmentData));
    const incompleteTag = screen.getByText(/Incomplete/i);
    expect(incompleteTag).toBeInTheDocument();

    //when we click on submit button
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
    expect(incompleteTag).toBeInTheDocument();

    //when we click on reset button
    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);
    //when we click on submit button
    const overlaySubmitButton = screen.getByText(/Submit/i);
    fireEvent.click(overlaySubmitButton);
    const resetSuccessText = screen.findByText(
      /Katz-Index of Independence assessment has been reset successfully/i,
    );
    expect(resetSuccessText).toBeTruthy();
  });

  test('should render close button when we click on view button', () => {
    render(<KatzAssessment />, {
      initialState: {
        assessments: {
          surveys: mockCompletedSurveyData,
          loading: false,
          assessmentId: '',
          history: {
            data: [
              {
                date: '11/30/2022',
                time: '07:37 AM',
                totalScore: 6,
                careAgentName: 'Srijan Admin',
                formData: mockCompletedSurveyData,
                isViewing: true,
              },
            ],
            lastEvaluatedKey: null,
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
          isHistory: true,
          dateTime: '11/23/2022 10:39 AM',
          isCompleted: true,
          viewingAssessmentIndex: 0,
        },
      },
    });
    const assessment = screen.getByTestId('KatzAssessmentComponent');
    expect(assessment).toBeInTheDocument();

    //when we click on view button
    const viewButton = screen.getByText(/View/i);
    fireEvent.click(viewButton);

    //when we click on close button
    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);
  });
});
