import {render} from 'utilities/test-utils';

import ADLSection from './ADLSection.component';

const dummyData = {
        "surveyName": "0",
        "surveyData": {
            "title": "BATHING",
            "options": [
                {
                    "score": '1',
                    "value": '1',
                    "label": "Bathes self completely or needs help in bathing."
                },
                {
                    "score": '0',
                    "value": '0',
                    "label": "Need help with bathing more than one part of the body."
                }
            ]
        }
    }
describe('Print: ADLSection', () => {
  test('renders ADLSection component', () => {
    const {queryByTestId} = render(
        <ADLSection
            key={dummyData.surveyName}
            title={dummyData.surveyData?.title}
            options={dummyData.surveyData?.options}
        />,
    );
    const element = queryByTestId('adl-section');
    expect(element).toBeInTheDocument();
  });
});
