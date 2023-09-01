import {render} from 'utilities/test-utils';
import MedicalConditionTemplate from './MedicalConditionTemplate.component';
import { IMedicalConditionData } from "pages/Assessments/MedicalCondition/MedicalCondition.types";
import { parseAssessmentMetaData } from 'common/Preview/Preview.utility';
import AssessmentMetaDataModel from 'common/Print/models/AssessmentMetaDataModel';

const metaData: AssessmentMetaDataModel = {
  "name": "Abhay Katiyar",
  "preferredName": "cris",
  "accountId": "70cdf821fd1e47ffa7a23aea9735d147",
  "age": "17",
  "gender": "Female",
  "dateTime": "02/24/2023\n          06:04 PM",
  "careAgentName": "Srijan Admin",
  "status": "submit",
  "caregiverName": "",
  "version": '8'
}

export const mockData: IMedicalConditionData[] = [
    {
        condition: "Fever",
        severity_level: "minor",
        date_of_onset: "2023-02-12T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Drug addiction",
        severity_level: "extreme",
        date_of_onset: "2023-02-07T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Adnexal mass",
        severity_level: "moderate",
        date_of_onset: "2023-02-15T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Asthma",
        severity_level: "moderate",
        date_of_onset: "2023-02-14T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Excessive sleepiness (somnolence)",
        severity_level: "major",
        date_of_onset: "2023-02-20T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Hearing aid",
        severity_level: "moderate",
        date_of_onset: "2023-02-14T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Autosomal dominant polycystic kidney disease (ADPKD)",
        severity_level: "major",
        date_of_onset: "2023-02-07T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Autism spectrum disorder (ASD)",
        severity_level: "minor",
        date_of_onset: "2023-02-01T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    },
    {
        condition: "Atrial septal defect (ASD)",
        severity_level: "major",
        date_of_onset: "2023-02-07T18:30:00+00:00",
        notes: "Lorem ipsum dolor sit amet."
    }
]

describe('Preview: MedicalConditionTemplate', () => {
    test('renders MedicalConditionTemplate component', () => {
      const {queryByTestId, queryAllByTestId} = render(
        <MedicalConditionTemplate data={mockData} meta={parseAssessmentMetaData(metaData)} />,
      );
      const element = queryByTestId('preview-medical-condition');
      expect(element).toBeInTheDocument();
      const meta = queryByTestId('preview-meta-box');
      expect(meta).toBeInTheDocument();
      const sections = queryAllByTestId('preview-medical-condition-section');
      expect(sections).toHaveLength(9);
    });
});
