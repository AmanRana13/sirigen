/* eslint-disable max-len */
export const allFormData = {
  emotionalSurvey: [
    {
      always: 0,
      never: 1,
      question: 'Are you satisfied with how often you see family and friends?',
      sometimes: 0,
    },
    {
      always: 1,
      never: 0,
      question:
        'Are you happy when preparing for a visit with family and friends?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question:
        'Do you feel fulfilled socially after a visit with family and friends?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Is loneliness an important problem for you?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do you create friendships to help you not feel lonely?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question:
        'Are you comfortable going to social events to meet new people?',
      sometimes: 0,
    },
  ],
  intellectualSurvey: [
    {
      always: 0,
      never: 1,
      question: 'Did your career define who you felt you were as a person?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question:
        'Do you look for ways to use your creative and critical thinking skills?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Are you open to new ideas?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do you seek personal growth by learning a new skill?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question:
        'Do you learn about different topics that interest you from books, magazines, newspapers, or by web surfing?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Does learning something new excite you?',
      sometimes: 0,
    },
  ],
  physicalSurvey: [
    {
      always: 0,
      never: 0,
      question: 'Do you participate in physical activity regularly?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do you feel rested in the morning after sleeping?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 1,
      question: 'Do you sleep 7-9 hours most nights?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question:
        'Do you think you maintain a healthy diet that includes fruit and vegetables?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do you stay hydrated and drink water throughout the day?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question:
        'Do you seek advice from a health care professional if you have a health concern you cannot solve on your own?',
      sometimes: 0,
    },
  ],
  spiritualSurvey: [
    {
      always: 0,
      never: 0,
      question:
        'Do you take time to consider what is important in life? (who you are, where you belong, next steps)',
      sometimes: 1,
    },
    {
      always: 0,
      never: 0,
      question:
        'Do you have a belief system in place? (religious, agnostic, atheist, spiritual, etc.)',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do your values guide your decisions and actions?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do you have a sense of purpose in your life?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Are you active in communities or causes you care about?',
      sometimes: 0,
    },
    {
      always: 0,
      never: 0,
      question: 'Do you utilize resources to improve your well-being?',
      sometimes: 0,
    },
  ],
};

export const holisticAssessmentStateMockData = {
  formData: allFormData,
  assessmentId: '8c362b5f4cc341c392861d5039c6db0c',
  history: {
    data: [
      {
        date: '06/02/2022',
        time: '10:54 PM',
        totalScore: 42,
        formData: [
          {
            header: 'emotional_survey',
            data: allFormData.emotionalSurvey,
          },
          {
            header: 'intellectual_survey',
            data: allFormData.intellectualSurvey,
          },
          {
            header: 'physical_survey',
            data: allFormData.physicalSurvey,
          },
          {
            header: 'spiritual_survey',
            data: allFormData.spiritualSurvey,
          },
        ],
      },
    ],
    lastEvaluatedKey: '',
    loading: false,
    totalRows: 0,
    currentPage: 1,
  },
  isHistory: false,
  dateTime: '',
};

export const mockParam = {
  survey: allFormData,
  type: 'submit',
  surveyCount: {},
  totalScore: 0,
  versionNumber: 1,
  careAgentName: {
    first_name: 'test',
    last_name: 'test',
  },
};
