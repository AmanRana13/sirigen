import {render} from 'utilities/test-utils';
import CaregiverStrainSection from './CaregiverStrainSection.component';

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

describe('Print: CaregiverStrainSection', () => {
  test('renders CaregiverStrainSection component', () => {
    const {queryByTestId, queryByText} = render(
      <CaregiverStrainSection data={mockData} caregiverName='test' />,
    );
    const element = queryByTestId('print-caregiverStrain-section');
    expect(element).toBeInTheDocument();
  });
});
