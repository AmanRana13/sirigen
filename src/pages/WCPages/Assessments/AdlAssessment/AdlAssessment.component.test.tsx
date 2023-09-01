/* eslint-disable max-len */
import {fireEvent, render, screen} from '../../../utilities/test-utils';
import AdlAssessmentTable from './AdlAssessmentTable';
import {ScoreTable} from './ADLScoreTabel';

const mockTableData = [
  {
    score: 1,
    value: 1,
    label:
      'Operates telephone on own initiative-looks up and 1-dials numbers, etc.',
  },
  {
    score: 0,
    value: 1,
    label:
      'Dials a few well-known numbers, direction, personal assistance or total care.',
  },
  {
    score: 0,
    value: 1,
    label: 'Answers telephone but does not dial',
  },
  {
    score: 0,
    value: 1,
    label: 'Does not use telephone at all',
  },
];
const mockSurveyData = [
  {
    title: 'A. Ability to Use Telephone',
    options: mockTableData,
  },
  {
    title: 'B. Shopping',
    options: [
      {
        score: 0,
        value: 1,
        label: 'Takes care of all shopping needs independently',
      },
      {
        score: 0,
        value: 0,
        label: 'Shops independently for small purchases',
      },
      {
        score: 0,
        value: 0,
        label: 'Needs to be accompanied on any shopping trip',
      },
      {
        score: 0,
        value: 0,
        label: 'Completely unable to shop',
      },
    ],
  },
  {
    title: 'C. Food Preparation',
    options: [
      {
        score: 0,
        value: 1,
        label: 'Plans, prepares and serves adequate meals independently',
      },
      {
        score: 0,
        value: 0,
        label: 'Prepares adequate meals if supplied with ingredients',
      },
      {
        score: 0,
        value: 0,
        label:
          'Heats, serves and prepares meals, or prepares meals, or prepares meals but does not maintain adequate diet',
      },
      {
        score: 0,
        value: 0,
        label: 'Needs to have meals prepared and served',
      },
    ],
  },
  {
    title: 'D. Housekeeping',
    options: [
      {
        score: 0,
        value: 1,
        label:
          'Maintains house alone or with occasional assistance (e.g. "heavy work domestic help")',
      },
      {
        score: 0,
        value: 1,
        label: 'Performs light daily tasks such as dish washing, bed making',
      },
      {
        score: 0,
        value: 1,
        label:
          'Performs light daily tasks but cannot maintain acceptable level of cleanliness',
      },
      {
        score: 0,
        value: 1,
        label: 'Needs help with all home maintenance tasks',
      },
      {
        score: 0,
        value: 0,
        label: 'Does not participate in any housekeeping task',
      },
    ],
  },
  {
    title: 'E. Laundry',
    options: [
      {
        score: 0,
        value: 1,
        label: 'Does personal laundry completely',
      },
      {
        score: 0,
        value: 1,
        label: 'Launders small items-rinses stockings, etc.',
      },
      {
        score: 0,
        value: 0,
        label: 'All laundry must be done by others',
      },
    ],
  },
  {
    title: 'F. Mode of Transportation',
    options: [
      {
        score: 0,
        value: 1,
        label:
          'Travels independently on public transportation or drives own car',
      },
      {
        score: 0,
        value: 1,
        label:
          'Arranges own travel via taxi, but does not otherwise use public transportation',
      },
      {
        score: 0,
        value: 1,
        label: 'Travels on public transportation when accompanied by another',
      },
      {
        score: 0,
        value: 0,
        label:
          'Travel limited to taxi or automobile with assistance of another',
      },
      {
        score: 0,
        value: 0,
        label: 'Does not travel at all',
      },
    ],
  },
  {
    title: 'G. Responsibility for Own Medications',
    options: [
      {
        score: 0,
        value: 1,
        label:
          'Is responsible for taking medication in correct dosages at correct time',
      },
      {
        score: 0,
        value: 0,
        label:
          'Takes responsibility if medication is prepared in advance in separate dosage.',
      },
      {
        score: 0,
        value: 0,
        label: 'Is not capable of dispensing own medication',
      },
    ],
  },
  {
    title: 'H. Ability to Handle Finances',
    options: [
      {
        score: 0,
        value: 1,
        label:
          'Manages financial matters independently (budgets, writes checks, pays rent, bills, goes to bank), collects and keeps track of income',
      },
      {
        score: 0,
        value: 1,
        label:
          'Manages day-to-day purchases, but needs help with banking, major purchases, etc.',
      },
      {
        score: 0,
        value: 0,
        label: 'Incapable of handling money',
      },
    ],
  },
];

describe('Testing ADL assessment table component', () => {
  test('should render ADL assesment table component with empty data', () => {
    const aDLAssessmentTableprops = {
      key: 'test key',
      labelPrefix: 'A.',
      label: 'test Lable',
      surveyState: [],
      tableData: [],
      setTableData: jest.fn(),
      formError: false,
      isHistory: false,
    };
    render(<AdlAssessmentTable {...aDLAssessmentTableprops} />);
    const assessment = screen.getByTestId('AdlAssessmentTableComponent');
    expect(assessment).toBeInTheDocument();
  });

  test('should render ADL assesment table component with data', () => {
    const aDLAssessmentTableprops = {
      key: 'test key',
      labelPrefix: 'A.',
      label: 'test Lable',
      surveyState: mockSurveyData,
      tableData: mockTableData,
      setTableData: jest.fn(),
      formError: false,
      isHistory: false,
    };
    render(<AdlAssessmentTable {...aDLAssessmentTableprops} />);
    const assessment = screen.getByTestId('AdlAssessmentTableComponent');
    expect(assessment).toBeInTheDocument();

    const assessmentRadioButton = screen.getAllByRole('radio');
    fireEvent.click(assessmentRadioButton[1]);
    expect(assessmentRadioButton[1]).toBeTruthy();
  });
});

describe('Testing ADL assessment score table component', () => {
  test('should render ADL assesment score table component', () => {
    render(<ScoreTable surveyCount={5} />);
    const assessment = screen.getByTestId('AdlScoreTableComponent');
    expect(assessment).toBeInTheDocument();
  });
});
