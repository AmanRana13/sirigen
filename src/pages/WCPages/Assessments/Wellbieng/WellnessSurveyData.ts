export const defaultValues = {
  engagement: {measurement_name: '', value: '', comment: ''},
  happiness: {measurement_name: '', value: '', comment: ''},
  purpose: {measurement_name: '', value: '', comment: ''},
  social: {measurement_name: '', value: '', comment: ''},
  relax: {measurement_name: '', value: '', comment: ''},
  comfort: {measurement_name: '', value: '', comment: ''},
  energy: {measurement_name: '', value: '', comment: ''},
};

export const formData = (answer: string) => {
  const defaultOptions = [
    {
      value: 'low',
      label: 'Low',
    },
    {
      value: 'medium',
      label: 'Medium',
    },
    {
      value: 'high',
      label: 'High',
    },
  ];
  switch (answer) {
    case 'relax': {
      return {
        moreOption: {
          header: 'Level of Stress:',
          options: defaultOptions,
        },
        options: [
          {
            value: 'Relaxed/Calm',
            label: 'Relaxed',
            isMoreOption: false,
            score: 1,
          },
          {
            value: 'Stressed/Anxiety',
            label: 'Stressed',
            isMoreOption: true,
            score: 0,
          },
        ],
      };
    }
    case 'happiness': {
      return {
        moreOption: {
          header: 'Level of Sad:',
          options: defaultOptions,
        },
        options: [
          {
            isMoreOption: false,

            value: 'Happy/Cheerful',
            label: 'Happy',
            score: 1,
          },
          {
            isMoreOption: true,

            value: 'Sad/Depressed',
            label: 'Sad',
            score: 0,
          },
        ],
      };
    }
    case 'energy': {
      return {
        moreOption: {
          header: 'Level of Tired:',
          options: defaultOptions,
        },
        options: [
          {
            isMoreOption: false,

            value: 'Rested/Energized',
            label: 'Rested',
            score: 1,
          },
          {
            isMoreOption: true,

            value: 'Tired/Fatigued',
            label: 'Tired',
            score: 0,
          },
        ],
      };
    }
    case 'purpose': {
      return {
        moreOption: {
          header: 'Level of No Purpose:',
          options: defaultOptions,
        },
        options: [
          {
            isMoreOption: false,

            value: 'Sense of Purpose',
            label: 'Purpose',
            score: 1,
          },
          {
            isMoreOption: true,

            value: 'Aimless/Insignificant',
            label: 'No Purpose',
            score: 0,
          },
        ],
      };
    }
    case 'engagement': {
      return {
        moreOption: {
          header: 'Level of Bored:',
          options: defaultOptions,
        },
        options: [
          {
            isMoreOption: false,

            value: 'Busy/Engaged',
            label: 'Busy',
            score: 1,
          },
          {
            isMoreOption: true,

            value: 'Bored/Uneventful',
            label: 'Bored',
            score: 0,
          },
        ],
      };
    }
    case 'social': {
      return {
        moreOption: {
          header: 'Level of Lonely:',
          options: defaultOptions,
        },
        options: [
          {
            isMoreOption: false,

            value: 'Socially Active/Fulfilled',
            label: 'Social',
            score: 1,
          },
          {
            isMoreOption: true,

            value: 'Lonely/Isolated',
            label: 'Lonely',
            score: 0,
          },
        ],
      };
    }
    case 'comfort': {
      return {
        moreOption: {
          header: 'Level of Pain:',
          options: defaultOptions,
        },
        options: [
          {
            isMoreOption: false,

            value: 'Feeling Good/Content',
            label: 'Pain Free',
            score: 1,
          },
          {
            isMoreOption: true,

            value: 'Pain/Aching/Discomfort',
            label: 'Pain',
            score: 0,
          },
        ],
      };
    }
    default: {
      break;
    }
  }
};
