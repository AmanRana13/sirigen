import {render} from 'utilities/test-utils';
import MedicalConditionSection from './MedicalConditionSection.component';
import { IMedicalConditionData } from "pages/Assessments/MedicalCondition/MedicalCondition.types";

const mockData: IMedicalConditionData = {
    condition: "Fever",
    severity_level: "minor",
    date_of_onset: "2023-02-12T18:30:00+00:00",
    notes: "Lorem ipsum dolor sit amet."
}

describe('Preview: MedicalConditionSection', () => {
    test('renders MedicalConditionSection component', () => {
      const {queryByTestId} = render(
        <MedicalConditionSection data={mockData} />,
      );
      const element = queryByTestId('preview-medical-condition-section');
      expect(element).toBeInTheDocument();
    });
});
