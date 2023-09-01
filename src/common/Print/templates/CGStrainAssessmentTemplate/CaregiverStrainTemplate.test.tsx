import {render} from 'utilities/test-utils';
import CaregiverStrainAssessementTemplate from './CaregiverStrainTemplate.component';
const mockData = [
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
    question: ' CAREGIVING IS INCONVENIENCE',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 1,
    sometimes: 0,
    question: ' CAREGIVING IS A PHYSICAL STRAIN',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
  {
    regular: 0,
    no: 1,
    sometimes: 0,
    question: ' CAREGIVING IS CONFINING',
    example:
      ' the person I care for is in and out of bed or wanders around at night.',
  },
];
describe('Print: CaregiverStrainAssessmentTemplate', () => {
  test('renders CaregiverStrainAssessmentTemplate component', () => {
    const {queryByTestId} = render(
      <CaregiverStrainAssessementTemplate
        data={mockData}
        caregiverName={'test'}
      />,
    );
    const element = queryByTestId('caregiver-strain-template');
    expect(element).toBeInTheDocument();
  });
});
