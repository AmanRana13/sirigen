interface IFieldValue {
  data: string | unknown;
  annotation: string;
}
interface ISeniorPersonaForm {
  field_type: string;
  field_id: string;
  label_text: string;
  field_value: IFieldValue;
}
const seniorPersonaForm: ISeniorPersonaForm[] = [
  {
    field_type: 'textbox',
    field_id: 'goals',
    label_text: 'Goals',
    field_value: {
      data: '',
      annotation:
        '(Be more physically active, eat healthier, be more socially active)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'personality',
    label_text: 'Personality',
    field_value: {
      data: '',
      annotation: '(Patient, Independent, warm, always willing to help)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'stress_point',
    label_text: 'Stress Point',
    field_value: {
      data: '',
      annotation:
        '(Loud noises, people who talk loud, family not getting along)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'needs',
    label_text: 'Needs/Wants',
    field_value: {
      data: '',
      annotation:
        '(Become more independent, Stay in touch with family and old friends, Exercise daily)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'motivation',
    label_text: 'Motivation',
    field_value: {
      data: '',
      annotation: '(To teach her friends how to use technology)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'fears',
    label_text: 'Fears/Frustations',
    field_value: {
      data: '',
      annotation:
        '(Has slight hand tremors, Early stage demantia so she has to write things down)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'barries',
    label_text: 'Barries/Limitations',
    field_value: {
      data: '',
      annotation:
        '(Dealing with fixed budget, complex health conditions, hard of hearing)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'skills',
    label_text: 'Skills/Knowledge',
    field_value: {
      data: '',
      annotation:
        '(Gardening, wood working, basic auto mechanics, trained paramedicy)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'hobbies',
    label_text: 'Hobbies/Favorite Activities',
    field_value: {
      data: '',
      annotation: '(Knitting, checkers, bingo, gardening, collect rare coins)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'favorite_activities',
    label_text: 'Favorite Online Activities',
    field_value: {
      data: '',
      annotation:
        '(Watching baking videos, looking at Food Network, skyping with Family, social media)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'devices',
    label_text: 'Devices/Technology Used',
    field_value: {
      data: '',
      annotation: '(Computer with Windows, iPhone 10s, new iPad Mini4)',
    },
  },
  {
    field_type: 'textbox',
    field_id: 'favorite_food',
    label_text: 'Favorite Foods',
    field_value: {
      data: '',
      annotation: '(Pizza, pies, pasta dishes, salads, fruits, eggs, toast)',
    },
  },
];

export {seniorPersonaForm};
