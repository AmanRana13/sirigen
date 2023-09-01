/* eslint-disable max-len */
import {store} from 'store';
import {fireEvent, render, screen} from '../../../utilities/test-utils';
import WellnessSurvey from './WellnessSurvey.component';
import {defaultValues} from './WellnessSurveyData';
import {postWellnessSurvey} from './WellnessSurvey.action';
import {IPostWellnessSurvey} from './WellnessSurvey.type';
import {AssessmentStatus} from 'globals/enums';

const completedWellnessSurveyMock = {
  engagement: {measurement_name: 'Busy/Engaged', value: '', comment: ''},
  happiness: {measurement_name: 'Happy/Cheerful', value: '', comment: ''},
  purpose: {measurement_name: 'Sense of Purpose', value: '', comment: ''},
  social: {
    measurement_name: 'Socially Active/Fulfilled',
    value: '',
    comment: '',
  },
  relax: {measurement_name: 'Relaxed/Calm', value: '', comment: ''},
  comfort: {measurement_name: 'Feeling Good/Content', value: '', comment: ''},
  energy: {measurement_name: 'Rested/Energized', value: '', comment: ''},
};
const defaultSurvey = {
  engagement: {measurement_name: 'Busy/Engaged', value: '', comment: ''},
  happiness: {measurement_name: 'Happy/Cheerful', value: '', comment: ''},
  purpose: {measurement_name: 'Sense of Purpose', value: '', comment: ''},
  social: {
    measurement_name: 'Socially Active/Fulfilled',
    value: '',
    comment: '',
  },
  relax: {measurement_name: '', value: '', comment: ''},
  comfort: {measurement_name: 'Feeling Good/Content', value: '', comment: ''},
  energy: {measurement_name: 'Rested/Energized', value: '', comment: ''},
};
const RenderWellnessSurvey = () => {
  render(<WellnessSurvey heading='Wellness Survey' />, {
    initialState: {
      assessments: {
        surveys: defaultSurvey,
        isHistory: false,
        history: {
          data: [],
          lastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
        dateTime: '',
        assessmentId: '',
        isCompleted: false,
        versionNumber: '1',
      },
    },
  });
};
describe('WellnessSurvey Component', () => {
  test('should render WellnessSurvey component', () => {
    RenderWellnessSurvey();
    const element = screen.queryByTestId(/wellnessSurveyComponent/i);
    expect(element).toBeInTheDocument();
  });
  test('testing save, submit and reset buttons functionality', () => {
    RenderWellnessSurvey();
    const assessment = screen.getByTestId('wellnessSurveyComponent');
    expect(assessment).toBeInTheDocument();

    //when we click on save button
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);
    const incompleteTag = screen.getByText(/Incomplete/i);
    const assessmentData = {
      data: defaultSurvey,
      type: AssessmentStatus.Save,
      versionNumber: '9',
      assessmentId: '988',
      accountID: 'bc66b758376045d98dd881c7695f68da',
      seniorID: 'senior-01d4b5025c954ce4a63d85871631d403',
    };
    store.dispatch(postWellnessSurvey(assessmentData));
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
      /Wellness Survey has been reset successfully/i,
    );
    expect(resetSuccessText).toBeTruthy();
  });

  test('should render close button when we click on view button', () => {
    render(<WellnessSurvey heading='Wellness Survey' />, {
      initialState: {
        assessments: {
          surveys: defaultValues,
          isHistory: true,
          history: {
            data: [
              {
                id: '34325',
                surveys: completedWellnessSurveyMock,
                assessmentId: '153db7f186a64b8caebe8d6f91582e96',
                dateTime: '03/23/2023 12:25 PM',
                date: '11/30/2022',
                time: '07:37 AM',
                careAgentId: 'admin-56939a52e94744b5ac9b4d4a0194098f',
              },
            ],
            lastEvaluatedKey: '',
            currentPage: 1,
          },
          dateTime: '',
          assessmentId: '1234',
          isCompleted: false,
          versionNumber: '1',
        },
      },
    });

    const assessment = screen.getByTestId('wellnessSurveyComponent');
    expect(assessment).toBeInTheDocument();

    //when we click on view button
    const viewButton = screen.getByText(/View/i);
    fireEvent.click(viewButton);

    //when we click on close button
    const closeButton = screen.getByText(/Close/i);
    expect(closeButton).toBeInTheDocument();

    //hide close button on clicking close button
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });
});
