import {fireEvent, render, screen} from '../../utilities/test-utils';
import Assessments from './Assessments.component';
import AssessmentsRoutesComponent from './AssessmentsRoutes.component';
const list = [
  {
    name: 'wellness-survey',
    label: 'Wellness Survey',
    route: `wellness-survey`,
    isDisabled: false,
    isCompleted: true,
  },
  {
    name: 'holistic-assessment',
    label: 'Holistic Assessment',
    route: `/`,
    isDisabled: false,
    isCompleted: true,
  },
  {
    name: 'medical-condition',
    label: 'Medical Condition-Disease Assessment',
    route: `medical-condition`,
    isDisabled: false,
    isCompleted: true,
  },
  {
    name: 'adl-assessment',
    label: 'ADL Assessment',
    isSelected: false,
    isDisabled: false,
    isCompleted: true,
    subOptions: [
      {
        name: 'lawton-brody',
        label: 'Lawton-Brody ADL',
        route: 'adl-assessment/lawton-brody',
        isDisabled: false,
        isCompleted: true,
      },
      {
        name: 'katz-independence',
        label: 'Katz Index of Independence in ADL',
        route: 'adl-assessment/katz-independence',
        isDisabled: false,
        isCompleted: true,
      },
    ],
  },
  {
    name: 'profile-information',
    label: 'Profile Information',
    route: `profile-information`,
    isDisabled: true,
    isCompleted: true,
  },
  {
    name: 'provider-information',
    label: 'Provider Information',
    route: `provider-information`,
    isDisabled: true,
    isCompleted: true,
  },
  {
    name: 'medical-information',
    label: 'Medical Information',
    route: `medical-information`,
    isDisabled: true,
    isCompleted: true,
  },
  {
    name: 'caregiver-strain-assessment',
    label: 'Caregiver Strain Assessment',
    route: `caregiver-strain-assessment`,
    isDisabled: false,
    isCompleted: true,
  },
];
describe('assessment component', () => {
  test('should render assessment component', () => {
    render(<Assessments />);
    const assessment = screen.getByTestId('assesssment');
    expect(assessment).toBeInTheDocument();
  });

  test('should render assessmentsRoutes component', () => {
    render(<AssessmentsRoutesComponent routeList={list} />);
    const assessment = screen.getByText('Holistic Assessment');
    expect(assessment).toBeInTheDocument();
  });
});
