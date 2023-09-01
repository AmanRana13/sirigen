/* eslint-disable max-len */
import {fireEvent, render, screen} from '../../../utilities/test-utils';
import MedicalCondition from './MedicalCondition.component';
const mockData = [
  {
    date_of_onset: '2-17-2022',
    condition: 'Severe Acute Respiratory Syndrome (SARS) 1',
    notes: 'Lorem IpSum',
    severity_level: 'minor',
  },
  {
    date_of_onset: '2-17-2022',
    condition: 'Severe Acute Respiratory Syndrome (SARS) 12',
    notes: 'Lorem IpSum',
    severity_level: 'minor',
  },
  {
    date_of_onset: '2-17-2022',
    condition: 'Severe Acute Respiratory Syndrome (SARS) 123',
    notes: 'Lorem IpSum',
    severity_level: 'minor',
  },
];
const mockHistoryData = [
  {
    date: '02/23/2023',
    tiem: '02:26 PM',
    version: 10,
    wellnessCoachName: 'Srijan Admin',
    formData: [
      {
        condition: 'Fever',
        severity_level: 'minor',
        date_of_onset: '2023-02-07T18:30:00+00:00',
        notes: '',
      },
    ],
    assessmentId: '7721f1c722ac4ffa92aec7845571c82c',
    careAgentId: 'admin-56939a52e94744b5ac9b4d4a0194098f',
  },
];
const RenderComponent = () => {
  render(<MedicalCondition heading='Medical Condition-Disease Assessment' />, {
    initialState: {
      common: {
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
          data: mockHistoryData,
          lastEvaluatedKey: '',
          loading: false,
          totalRows: 0,
          currentPage: 1,
        },
        dateTime: '',
        assessmentId: '213',
        assessmentStatus: 'save',
        isCompleted: false,
        versionNumber: 1,
        searchResult: [
          'Severe Acute Respiratory Syndrome (SARS) 123344556',
          'Neonatal Severe Hyperparathyroidism',
          'Severe asthma',
        ],
      },
    },
  });
};
describe('MedicalConditionAssessment Component', () => {
  test('should render MedicalConditionAssessment component', () => {
    RenderComponent();
    const element = screen.getAllByText(
      /Medical Condition-Disease Assessment/i,
    );
    expect(element.length).toBeGreaterThan(1);
  });

  test('should display draft if assessment status is save ', () => {
    RenderComponent();
    const element = screen.getByText(/Draft/i);
    expect(element).toBeInTheDocument();
  });

  test('should display search input to search medical condition ', () => {
    RenderComponent();
    const element = screen.getByTestId(/SearchBar/i);
    expect(element).toBeInTheDocument();
  });

  test('should be able to search any medical condition with search input field ', () => {
    RenderComponent();
    const element = screen.getByPlaceholderText(
      'Search with minimum 3 characters',
    );
    fireEvent.change(element, {target: {value: 'Sev'}});
    expect(element).toHaveValue('Sev');
  });

  test('should be able to see error text if user hit add medicalcondition button without selecting any medical condition populated in the search dropDown ', async () => {
    RenderComponent();
    const addMedicalConditionButton = screen.getByText('Add Medical Condition');
    fireEvent.click(addMedicalConditionButton);
    const errorText = screen.getByText('Please select a Condition');
    expect(errorText).toBeInTheDocument();
  });

  test('should be able change severity level in medical condition table ', async () => {
    RenderComponent();
    await new Promise((r) => setTimeout(r, 2000));
    const severityLevel = screen.getAllByRole('radiogroup');
    expect(severityLevel.length).toBe(3);
  });

  test('should be able date of onSet in medical condition table ', async () => {
    RenderComponent();
    await new Promise((r) => setTimeout(r, 2000));
    const dateOfOnset = screen.getAllByPlaceholderText('MM/DD/YYYY');
    expect(dateOfOnset.length).toEqual(3);
  });

  test('should be able write note in medical condition table ', async () => {
    RenderComponent();
    await new Promise((r) => setTimeout(r, 2000));
    const notes = screen.getAllByPlaceholderText('Please enter notes here');
    expect(notes.length).toEqual(3);
    fireEvent.change(notes[0], {target: {value: 'Sev'}});
    expect(notes[0]).toHaveValue('Sev');
  });

  test('should render close button when we click on view button', () => {
    RenderComponent();

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
