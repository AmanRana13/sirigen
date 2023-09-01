import {render} from 'utilities/test-utils';

import LawtonBrodyAssessmentTemplate from './LawtonBrodyAssessmentTemplate.component';
import { ILawtonBrodySectionData } from './LawtonBrodyAssessmentTemplate.types';

const dummyData: ILawtonBrodySectionData[] = [
    {
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
    },
    {
        "surveyName": "1",
        "surveyData": {
            "title": "DRESSING",
            "options": [
                {
                    "score": '1',
                    "value": '1',
                    "label": " Get clothes from closets and drawers and puts on clothes."
                },
                {
                    "score": '0',
                    "value": '0',
                    "label": "Needs help with dressing self or needs to be completely dressed."
                }
            ]
        }
    },
    {
        "surveyName": "2",
        "surveyData": {
            "title": "TOILETING",
            "options": [
                {
                    "score": '1',
                    "value": '1',
                    "label": "Goes to toilet, gets on and off, arranges clothes."
                },
                {
                    "score": '0',
                    "value": '0',
                    "label": "Needs help transferring to the toilet."
                }
            ]
        }
    },
    {
        "surveyName": "3",
        "surveyData": {
            "title": "TRANSFERRING",
            "options": [
                {
                    "score": '1',
                    "value": '1',
                    "label": "Moves in and out of bed or chair unassisted."
                },
                {
                    "score": '0',
                    "value": '0',
                    "label": "Needs help in moving from bed to chair."
                }
            ]
        }
    },
    {
        "surveyName": "4",
        "surveyData": {
            "title": "CONTINENCE",
            "options": [
                {
                    "score": '1',
                    "value": '1',
                    "label": "Exercises complete self control over urination."
                },
                {
                    "score": '0',
                    "value": '0',
                    "label": "Is partially or totally incontinent of bowel or bladder."
                }
            ]
        }
    },
    {
        "surveyName": "5",
        "surveyData": {
            "title": "FEEDING",
            "options": [
                {
                    "score": '1',
                    "value": '1',
                    "label": "Gets food from plate into mouth without help."
                },
                {
                    "score": '0',
                    "value": '0',
                    "label": "Needs partial or total help with feeding."
                }
            ]
        }
    }
]

describe('Print: LawtonBrodyAssessmentTemplate', () => {
  test('renders LawtonBrodyAssessmentTemplate component', () => {
    const {queryByTestId} = render(
      <LawtonBrodyAssessmentTemplate data={dummyData} />,
    );
    const element = queryByTestId('lawton-template');
    expect(element).toBeInTheDocument();
  });
});
