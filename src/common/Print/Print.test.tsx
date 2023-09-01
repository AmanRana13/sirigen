import { PrintTemplates } from 'globals/enums';
import {render} from 'utilities/test-utils';

import Print from './Print.component';

const metaData = {
  "name": "Abhay Katiyar",
  "preferredName": "cris",
  "accountId": "70cdf821fd1e47ffa7a23aea9735d147",
  "age": "17",
  "gender": "Female",
  "dateTime": "02/24/2023\n          06:04 PM",
  "careAgentName": "Srijan Admin",
  "status": "submit",
  "caregiverName": "",
  "version": 8
}

const RenderPrintTemplate = (type: string) => render(
  <Print />,
  {
    initialState: {
      print: {
        type,
        data: {
          data: [],
          meta: metaData
        }
      }
    }
  }
)

describe('Print: Print', () => {
  test('renders Print component with Default Template', () => {
    const { getByTestId } = RenderPrintTemplate('')
    const element = getByTestId('print-layout');
    expect(element).toBeInTheDocument();
  });

  test('renders Print component with Holistic Template', () => {
    const { getByTestId } = RenderPrintTemplate(PrintTemplates.HOLISTIC)
    const element = getByTestId('holistic-template');
    expect(element).toBeInTheDocument();
  });

  test('renders Print component with Lawton-Brody Template', () => {
    const { getByTestId } = RenderPrintTemplate(PrintTemplates.LAWTON)
    const element = getByTestId('lawton-template');
    expect(element).toBeInTheDocument();
  });

  test('renders Print component with Katz-Independence Template', () => {
    const { getByTestId } = RenderPrintTemplate(PrintTemplates.KATZ)
    const element = getByTestId('katz-template');
    expect(element).toBeInTheDocument();
  });

  test('renders Print component with CareGiver-Strain Template', () => {
    const { getByTestId } = RenderPrintTemplate(PrintTemplates.CAREGIVER_STRAIN)
    const element = getByTestId('caregiver-strain-template');
    expect(element).toBeInTheDocument();
  });

  test('renders Print component with MedicalCondition Template', () => {
    const { getByTestId } = RenderPrintTemplate(PrintTemplates.MEDICAL_CONDITION)
    const element = getByTestId('print-medical-condition');
    expect(element).toBeInTheDocument();
  });
});
