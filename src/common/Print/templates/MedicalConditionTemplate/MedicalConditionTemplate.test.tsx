import { mockData } from 'common/Preview/templates/MedicalCondition/MedicalConditionTemplate.test';
import {render} from 'utilities/test-utils';
import MedicalConditionTemplate from './MedicalConditionTemplate.component';

describe('Print: MedicalConditionTemplate', () => {
    test('renders MedicalConditionTemplate component', () => {
      const {queryByTestId, queryAllByTestId} = render(
        <MedicalConditionTemplate data={mockData} />,
      );
      const element = queryByTestId('print-medical-condition');
      expect(element).toBeInTheDocument();
      const sections = queryAllByTestId('print-medical-condition-section');
      expect(sections).toHaveLength(9);
    });
});
