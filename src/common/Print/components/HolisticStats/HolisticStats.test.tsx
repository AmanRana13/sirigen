import {render} from 'utilities/test-utils';

import HolisticStats from './HolisticStats.component';

export const upToSixSectionsData = [
    {
        "surveyName": "emotionalSurvey",
        "surveyData": [
            {
                "always": 0,
                "never": 1,
                "question": "Are you satisfied with how often you see family and friends?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Are you happy when preparing for a visit with family and friends?",
                "sometimes": 1
            },
            {
                "always": 1,
                "never": 0,
                "question": "Do you feel fulfilled socially after a visit with family and friends?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Is loneliness an important problem for you?",
                "sometimes": 1
            },
            {
                "always": 0,
                "never": 1,
                "question": "Do you create friendships to help you not feel lonely?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Are you comfortable going to social events to meet new people?",
                "sometimes": 1
            }
        ]
    },
    {
        "surveyName": "intellectualSurvey",
        "surveyData": [
            {
                "always": 1,
                "never": 0,
                "question": "Did your career define who you felt you were as a person?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you look for ways to use your creative skills?",
                "sometimes": 1
            },
            {
                "always": 0,
                "never": 1,
                "question": "Are you open to new ideas?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you seek personal growth by learning a new skill?",
                "sometimes": 1
            },
            {
                "always": 1,
                "never": 0,
                "question": "Do you learn about different topics that interest you?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Does learning something new excite you?",
                "sometimes": 1
            }
        ]
    },
    {
        "surveyName": "physicalSurvey",
        "surveyData": [
            {
                "always": 0,
                "never": 1,
                "question": "Do you participate in physical activity regularly?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you feel rested in the morning after sleeping?",
                "sometimes": 1
            },
            {
                "always": 1,
                "never": 0,
                "question": "Do you sleep 7-9 hours most nights?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you think you maintain a healthy diet that includes vegetables?",
                "sometimes": 1
            },
            {
                "always": 0,
                "never": 1,
                "question": "Do you stay hydrated and drink water throughout the day?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you seek advice from a health care professional?",
                "sometimes": 1
            }
        ]
    },
    {
        "surveyName": "spiritualSurvey",
        "surveyData": [
            {
                "always": 1,
                "never": 0,
                "question": "Do you take time to consider what is important in life?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you have a belief system in place?",
                "sometimes": 1
            },
            {
                "always": 0,
                "never": 1,
                "question": "Do your values guide your decisions and actions?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you have a sense of purpose in your life?",
                "sometimes": 1
            },
            {
                "always": 1,
                "never": 0,
                "question": "Are you active in communities or causes you care about?",
                "sometimes": 0
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you utilise resources to improve your well-being?",
                "sometimes": 1
            }
        ]
    }
]

const moreThanSixSectionsData = [
    {
        "surveyName": "personalLifeBalanceSurvey",
        "surveyData": [
            {
                "always": 0,
                "never": 1,
                "question": "Are you doing well in your personal life?",
                "sometimes": 0
            },
            {
                "always": 1,
                "never": 0,
                "question": "Is there any stress in your personal life?",
                "sometimes": 0
            }
        ]
    },
    {
        "surveyName": "workLifeBalanceSurvey",
        "surveyData": [
            {
                "always": 0,
                "never": 0,
                "question": "Are you doing well at your work?",
                "sometimes": 1
            },
            {
                "always": 0,
                "never": 0,
                "question": "Do you have stress related to work?",
                "sometimes": 1
            }
        ]
    },
    {
        "surveyName": "happinessSurvey",
        "surveyData": [
            {
                "always": 0,
                "never": 0,
                "question": "Are you happy?",
                "sometimes": 1
            }
        ]
    },
    ...upToSixSectionsData
]

describe('Print: HolisticStats', () => {
  test('renders HolisticStats component', () => {
    const {queryByTestId} = render(
      <HolisticStats data={upToSixSectionsData}/>,
    );
    const element = queryByTestId('print-holistic-stats');
    expect(element).toBeInTheDocument();
    const table = queryByTestId('holistic-stats-table');
    expect(table).toBeInTheDocument();
  });

  test('renders Multiple tables for more than 6 sections', () => {
    const {queryAllByTestId} = render(
      <HolisticStats data={moreThanSixSectionsData}/>,
    );
    const tables = queryAllByTestId('holistic-stats-table');
    expect(tables).toHaveLength(2);
  });
});
