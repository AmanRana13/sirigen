import {store} from 'store';
import {fireEvent, render, screen} from '../../../../utilities/test-utils';

import HolisticAssessmentAdmin from './HolisticAsssessmentAdmin.component';
import {postHolisticAssessmentAdmin} from './HolisticAssessmentAdmin.action';
import {HolisticAssessmentAdminStatus} from 'globals/enums';
const mockedState = {
  holisticAssessmentAdmin: {
    formId: 'e548d831c0ad4e429274146851958172',
    formStatus: 'submit',
    history: {
      currentPage: 1,
      data: [
        {
          adminName: 'Srijan Admin',
          createdDateAndTime: '2022-10-07T09:33:58.407647+00:00',
          form: [
            {
              data: [
                {
                  always: 0,
                  never: 0,
                  question: 'Do you feel happy in your home?',
                  sometimes: 0,
                },
              ],
              header: 'heading_three',
            },
          ],
        },
      ],
      formStatus: 'submit',
      publishedDateAndTime: null,
      versionNumber: 1,
    },
    isHistory: false,
    publishDateTime: null,
    survey: [
      {
        header: 'General',
        data: [
          {
            always: 0,
            never: 0,
            question: 'Do you feel happy in your home?',
            sometimes: 0,
          },
          {
            always: 0,
            never: 0,
            question: 'Do you interact with your family members?',
            sometimes: 0,
          },
          {
            always: 0,
            never: 0,
            question: 'testujnjmnsdkj',
            sometimes: 0,
          },
          {
            always: 0,
            never: 0,
            question: 'test',
            sometimes: 0,
          },
          {
            always: 0,
            never: 0,
            question: 'testujnjmnsdkj',
            sometimes: 0,
          },
          {
            always: 0,
            never: 0,
            question: 'n',
            sometimes: 0,
          },
        ],
      },
    ],
    versionNumber: 1,
  },
};
describe('Testing  holisticAssessmentAdmin Component', () => {
  test('should render holisticAssessmentAdmin Component', () => {
    render(<HolisticAssessmentAdmin />, {initialState: mockedState});
    const element = screen.getByTestId(/holisticAssessmentAdminComponent/i);
    expect(element).toBeInTheDocument();
  });

  test('admin should be able to save holistic Assessment with incomplete tag', () => {
    render(<HolisticAssessmentAdmin />, {initialState: mockedState});
    const params: any = {
      type: HolisticAssessmentAdminStatus.Save,
      versionNumber: '9',
      surveyData: [
        {
          header: 'General',
          data: [
            {
              always: 0,
              never: 0,
              question: 'Do you feel happy in your home?',
              sometimes: 0,
            },
            {
              always: 0,
              never: 0,
              question: 'Do you interact with your family members?',
              sometimes: 0,
            },
            {
              always: 0,
              never: 0,
              question: 'testujnjmnsdkj',
              sometimes: 0,
            },
            {
              always: 0,
              never: 0,
              question: 'test',
              sometimes: 0,
            },
            {
              always: 0,
              never: 0,
              question: 'testujnjmnsdkj',
              sometimes: 0,
            },
            {
              always: 0,
              never: 0,
              question: 'n',
              sometimes: 0,
            },
          ],
        },
      ],
      formId: '9876',
    };
    const element = screen.getByText(/Save/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    store.dispatch(postHolisticAssessmentAdmin(params));
    expect(screen.findByText('Incomplete')).toBeTruthy();
  });

  test('should render close button when we click on view button', () => {
    render(<HolisticAssessmentAdmin />, {initialState: mockedState});

    //when we click on view button
    const viewButton = screen.getAllByText(/View/i);
    fireEvent.click(viewButton[0]);

    //when we click on close button
    const closeButton = screen.getByText(/Close/i);
    expect(closeButton).toBeInTheDocument();

    //hide close button on clicking close button
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  test('should render incomplete tag if admin click submit button with blank question in any section in holisticAssessmentAdmin Component', () => {
    render(<HolisticAssessmentAdmin />, {initialState: mockedState});
    const addQuestion = screen.getByText(/Add Question/i);
    fireEvent.click(addQuestion);
    const submitButton = screen.getByText(/Submit Now/i);
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(screen.findByText('Incomplete')).toBeTruthy();
  });

  test('should render submit button in holisticAssessmentAdmin Component', () => {
    render(<HolisticAssessmentAdmin />, {initialState: mockedState});
    const element = screen.getByText(/Submit Now/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(
      screen.findByText(
        'Are you sure you want to submit the Holistic Assessment questions?',
      ),
    ).toBeTruthy();
  });
  test('should render submit Later button in holisticAssessmentAdmin Component on checking checkbox', () => {
    render(<HolisticAssessmentAdmin />, {initialState: mockedState});
    const submitLaterCheckBox = screen.getByRole('checkbox');

    expect(submitLaterCheckBox).toBeInTheDocument();
    fireEvent.click(submitLaterCheckBox);
    expect(submitLaterCheckBox).toBeChecked();
    const element = screen.getByText(/Submit Later/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(
      screen.findByText(
        'Are you sure you want to schedule the Holistic Assessment questions to publish later ?',
      ),
    ).toBeTruthy();
  });
});
