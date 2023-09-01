import {render, fireEvent, screen} from '../../utilities/test-utils';
import SeniorWellnessPlan from './SeniorWellnessPlan.component';
import {MockedGoalRowData} from '_mocks_/goalMockedData';
import {store} from 'store';
import {postGoals} from 'store/goals/goals.action';
import {updateWellnessPlan} from './SeniorWellnessPlan.action';

const updateMockData = {
  leftField: {
    situation: {
      error: false,
      errorText: '',
      value: 'testing',
    },
    background: {
      error: false,
      errorText: '',
      value: 'testing',
    },
    assessment: {
      error: false,
      errorText: '',
      value: 'testing',
    },
    recommendation: {
      error: false,
      errorText: '',
      value: 'testing',
    },
  },
  memberPriority: [
    {
      seq: 1,
      value: 'testing',
      error: false,
      errorText: '',
    },
  ],
  challenges: [
    {
      seq: 1,
      value: 'testing',
      error: false,
      errorText: '',
    },
  ],
  isNextVersion: true,
  selectedSeniorCareGiver: {
    value: 'senior-2b24e2b2c6724a52841f9a494d246fef',
    label: 'Senior - Abhay Katiyar',
  },
};
const mockedState = {
  common: {
    seniorDetail: {
      minimalInfo: {
        name: {
          first_name: 'Kaptan',
          last_name: 'SleepMat',
          middle_name: 'Singh',
        },
        mobile_number: '9999999999',
        gender: 'Male',
        dob: '1979-06-11T18:30:00+00:00',
        user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
        account_id: '1fc17069353f4da7b15f632748b429ed',
        created_date: '2021-08-04T06:53:21.268517+00:00',
        email: 'kaptan.singh@clearcaptions.com',
      },
      basicInfo: {
        user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
        height: {
          feet: '5.0',
          inch: '11.0',
        },
        weight: '178.0',
        address: {
          state: 'LA',
          city: 'My City',
          street: 'My Street',
          zipcode: '90001',
          timezone: 'America/Los_Angeles',
        },
        academic_level: 'Masters Degree',
        career: 'My Career',
        primary_spoken_language: 'English',
        other_spoken_language: null,
        preferred_name: 'Kaptan Singh',
        home_phone: '9999999999',
        emergency_phone: '8888888888',
        email: null,
        faith: 'Hindu',
        other_faith: null,
        home_technology: null,
        home_gate_code: null,
        race: null,
        other_race: null,
        pets: ['dogs', 'cats'],
        other_pets: null,
        social_media_links: [null],
        life_event: null,
        lock_box_code: null,
        created_date: '2021-08-04T06:59:46.893378+00:00',
      },
      isLoading: false,
    },
  },
  goals: MockedGoalRowData,
};
describe('SeniorWellnessPlan Component', () => {
  test('should render SeniorWellnessPlan component', () => {
    const {queryByTestId} = render(<SeniorWellnessPlan />, {
      initialState: mockedState,
    });
    const element = queryByTestId(/senior-wellness-plan/i);

    expect(element).toBeInTheDocument();
  });
  test('should render Add New Wellness Plan button', () => {
    render(<SeniorWellnessPlan />, {initialState: mockedState});
    const button = screen.getByRole('button', {name: /Add New Wellness Plan/i});
    expect(button).toBeTruthy;
  });
  test('should render onClick Add New Wellness Plan button', () => {
    render(<SeniorWellnessPlan />);
    const button = screen.getByRole('button', {name: /Add New Wellness Plan/i});
    fireEvent.click(
      screen.getByRole('button', {name: /Add New Wellness Plan/i}),
    );

    expect(button).not.toBeInTheDocument();
  });
  test('should render HandleSaveButton', () => {
    const {queryByTestId} = render(<SeniorWellnessPlan />);
    fireEvent.click(
      screen.getByRole('button', {name: /Add New Wellness Plan/i}),
    );
    const button = queryByTestId(/handle-save/i);

    expect(button).toBeTruthy();
  });
  test('should save the wellnessPlan on click handleSaveButton', () => {
    const selectedSeniorCareGiver = {
      value: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
      label: 'Senior - Abhay Katiyar',
    };
    const updatedGoals = [
      {
        resource: [],
        id: 'ea7d7e305e0742c19d7212d50900cc39',
        goal: "Chronic Conditions: Parkinson's",
        action:
          'Stop Smoking - Create a plan with your Care Agent on smoking cessation.',
        status: 'completed',
        progress: 100,
        startDate: '12/28/2022',
        targetDate: '04/24/2023',
        notes: 'Lorem Ipsum 17',
        createdDate: '2',
        isEdited: true,
      },
    ];
    const deletedGoals: any = [];

    const {getByTestId} = render(<SeniorWellnessPlan />);
    fireEvent.click(
      screen.getByRole('button', {name: /Add New Wellness Plan/i}),
    );
    const button = getByTestId(/handle-save/i);
    fireEvent.click(button);
    store.dispatch(
      updateWellnessPlan(
        updateMockData.leftField,
        updateMockData.memberPriority,
        updateMockData.challenges,
        updateMockData.isNextVersion,
        updateMockData.selectedSeniorCareGiver,
      ),
    );
    store.dispatch(
      postGoals(selectedSeniorCareGiver, updatedGoals, deletedGoals),
    );
    const successMessage = screen.findByText(
      'Wellness Plan has been successfully saved',
    );
    expect(successMessage).toBeTruthy();
  });
});
