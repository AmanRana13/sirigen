/* eslint-disable max-len */
import {store} from 'store';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '../../../utilities/test-utils';
import CaregiverStrainAssessment from './CaregiverStrainAssessment.component';
import CaregiverStrainTable from './components/CaregiverStrainTable.component';
import {postCaregiverStrainAssessment} from './CaregiverStrainAssessment.action';
import {AssessmentStatus} from 'globals/enums';

const mockData: any = [
  {
    regular: 0,
    no: 0,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 0,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 0,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 0,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
];
const completedMock = [
  {
    regular: 0,
    no: 1,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 0,
    sometimes: 1,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 1,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 1,
    sometimes: 0,
    question: ' MY SLEEP IS DISTURBED',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
];
const caregiverList = [
  {
    alternateNumber: null,
    caregiverType: 'primary',
    emergencyContact: false,
    id: 'caregiver-414091a7ee23475182e80f2deebe2092',
    mobileNumber: '9876543210',
    name: {
      firstName: 'manu',
      lastName: 'dogra',
      middleName: null,
    },
  },
];
beforeAll(() => {
  global.window = Object.create(window);
  const url =
    'http://localhost:3000/senior/senior-11cca3e1a63e4c7589e9b18ea96f37b3/7a97969b5658469b807c8b2797ec62ee/America-New_York/assessments/caregiver-strain-assessment';
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
      pathname:
        'senior/senior-11cca3e1a63e4c7589e9b18ea96f37b3/7a97969b5658469b807c8b2797ec62ee/America-New_York/assessments/caregiver-strain-assessment',
    },
  });
});
const RenderComponent = () => {
  render(<CaregiverStrainAssessment heading='Caregiver Strain Assessment' />, {
    initialState: {
      common: {
        careGiverInfo: caregiverList,
        seniorDetail: {
          minimalInfo: {
            user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
          },
        },
      },
      assessments: {
        surveys: mockData,
        isHistory: false,
        loading: false,
        history: {
          data: [],
          lastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
        dateTime: '',
        assessmentId: '213',
        isCompleted: false,
        versionNumber: 1,
      },
    },
  });
};

describe('CaregiverStrainAssessment Component', () => {
  test('should render caregiver input field with empty caregiver list', () => {
    render(
      <CaregiverStrainAssessment heading='Caregiver Strain Assessment' />,
      {
        initialState: {
          common: {
            careGiverInfo: [],
            seniorDetail: {
              minimalInfo: {
                user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
              },
            },
          },
          assessments: {
            surveys: mockData,
            isHistory: false,
            history: {
              data: [],
              lastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1,
            },
            dateTime: '',
            loading: false,
            assessmentId: '',
            isCompleted: true,
            versionNumber: 0,
          },
        },
      },
    );
    const element = screen.getByText('-');
    expect(element).toBeInTheDocument();
  });

  test('should render CaregiverStrainAssessment component', () => {
    RenderComponent();
    const element = screen.queryByTestId(/caregiverStrainAssessmentComponent/i);
    expect(element).toBeInTheDocument();
  });

  test('when we click on submit button with unfilled data it should show incomplete text', async () => {
    RenderComponent();
    const Input = screen.getByRole('button', {name: 'Select a Caregiver'});
    fireEvent.mouseDown(Input);

    const listbox = within(screen.getByRole('listbox'));

    await fireEvent.click(listbox.getByText('Manu Dogra (Primary)'));
    const submitButton = screen.getByTestId('submitBtn');
    fireEvent.click(submitButton);

    const incompleteText = await waitFor(() => screen.getByText(/Incomplete/i));
    expect(incompleteText).toBeInTheDocument();
  });

  test('when we click on save button with unfilled data it should save the progress', async () => {
    RenderComponent();
    const Input = screen.getByRole('button', {name: 'Select a Caregiver'});
    fireEvent.mouseDown(Input);

    const listbox = within(screen.getByRole('listbox'));

    await fireEvent.click(listbox.getByText('Manu Dogra (Primary)'));

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);
    const assessmentData = {
      survey: completedMock,
      caregiverName: 'albert',
      caregiverId: 'caregiver-123',
      type: AssessmentStatus.Save,
      totalScore: 13,
      versionNumber: 7,
      isUnMount: false,
      assessmentId: '123',
      seniorID: 'senior-042ec8bb092f4442b65fb8705f82f324',
    };
    store.dispatch(postCaregiverStrainAssessment(assessmentData));
    expect(
      screen.findByText(
        /Caregiver Strain assessment has been saved successfully/i,
      ),
    ).toBeTruthy();
  });

  test('when we click on reset button form should be reset', async () => {
    RenderComponent();
    const Input = screen.getByRole('button', {name: 'Select a Caregiver'});
    fireEvent.mouseDown(Input);

    const listbox = within(screen.getByRole('listbox'));

    await fireEvent.click(listbox.getByText('Manu Dogra (Primary)'));

    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);
    expect(
      screen.findByText(/Are you sure you want to RESET the Assessment?/i),
    ).toBeTruthy();
  });

  test('when we click on submit button with filled data ', async () => {
    render(
      <CaregiverStrainAssessment heading='Caregiver Strain Assessment' />,
      {
        initialState: {
          common: {
            careGiverInfo: caregiverList,
            seniorDetail: {
              minimalInfo: {
                user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
              },
            },
          },
          assessments: {
            surveys: completedMock,
            isHistory: false,
            history: {
              data: [],
              lastEvaluatedKey: '',
              loading: false,
              totalRows: 0,
              currentPage: 1,
            },
            dateTime: '',
            assessmentId: '213',
            isCompleted: false,
            versionNumber: 1,
          },
        },
      },
    );

    const Input = screen.getByRole('button', {name: 'Select a Caregiver'});
    fireEvent.mouseDown(Input);

    const listbox = within(screen.getByRole('listbox'));

    fireEvent.click(listbox.getByText('Manu Dogra (Primary)'));
    const submitButton = screen.getByTestId('submitBtn');
    fireEvent.click(submitButton);
    expect(
      screen.findByText(
        /Caregiver Strain assessment has been submitted successfully/i,
      ),
    ).toBeTruthy();
  });

  test('should render caregiverStrainAssessmentTable Component', () => {
    render(
      <CaregiverStrainTable
        isCaregiverSelected='caregiverId'
        isLoading={false}
        tableData={mockData}
        setTableData={jest.fn()}
        formError={false}
        isHistory={false}
        setResponses={jest.fn()}
      />,
    );
    const element = screen.queryByTestId(/caregiverStrainTableComponent/i);
    expect(element).toBeInTheDocument();
  });

  test('should render caregiver input field with caregiver list', () => {
    RenderComponent();
    const Input = screen.getByRole('button', {name: 'Select a Caregiver'});
    fireEvent.mouseDown(Input);

    const listbox = within(screen.getByRole('listbox'));

    fireEvent.click(listbox.getByText('Manu Dogra (Primary)'));

    expect(Input).toHaveTextContent('Manu Dogra (Primary)');
  });
});
