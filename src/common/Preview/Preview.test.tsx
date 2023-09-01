import { PreviewTemplates } from 'globals/enums';
import {fireEvent, render, waitForElementToBeRemoved} from 'utilities/test-utils';

import Preview from './Preview.component';

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

describe('Preview: Preview', () => {
  test('renders Preview component', () => {
    const { getByTestId } = render(<Preview />);

    const element = getByTestId('preview');
    expect(element).toBeInTheDocument();

    const button = getByTestId('preview-button');
    expect(button).toBeInTheDocument();
  });

  test('renders template as per Redux State', () => {
    const { getByTestId } = render(
      <Preview />,
      {
        initialState: {
          preview: {
            type: PreviewTemplates.MEDICAL_CONDITION,
            data: {
              data: [],
              meta: metaData
            }
          }
        }
      }
    );

    const button = getByTestId('preview-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const element = getByTestId('preview-medical-condition');
    expect(element).toBeInTheDocument();    
  });

  test('closes preview on hitting close button', async () => {
    'preview-close-button'
    const { getByTestId, queryByTestId } = render(
      <Preview />,
      {
        initialState: {
          preview: {
            type: PreviewTemplates.MEDICAL_CONDITION,
            data: {
              data: [],
              meta: metaData
            }
          }
        }
      }
    );

    const button = getByTestId('preview-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const element = getByTestId('preview-medical-condition');
    expect(element).toBeInTheDocument();
    const closeButton = getByTestId('preview-close-button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(queryByTestId('preview-medical-condition'));
  })
});
