import {FORM_ERROR_MESSAGES, REGEX} from 'globals/global.constants';

const homeMedicalDevicesField = [
  {
    name: 'home_medical_devices',
    label: 'Home Medical Devices',
    helperText: 'Current medical devices',
  },
  {
    name: 'home_medical_device_reason',
    label: 'Reason for usage',
  },
  {
    name: 'home_medical_device_usage_date',
    label: 'Usage Date',
    date: true,
  },
];

const addictionsField = [
  {
    name: 'value',
    label: 'Addictions',
    isSelectValueDisable: false,
    menu: true,
    menuItems: [
      'Alcohol',
      'Tobacco',
      'Opioids',
      'Cocaine',
      'Cannabis',
      'Amphetamines',
      'Inhalants',
    ],
  },
  {
    name: 'data',
    label: 'How Long?',
  },
  {
    mode: true,
  },
];

const otherExamsField = [
  {
    name: 'value',
    label: 'Other Exams',
    helperText: '(physical or mental examination)',
  },
  {
    name: 'date',
    label: 'Exam date',
    date: true,
  },
  {
    mode: true,
  },
];

const injuriesField = [
  {
    name: 'value',
    label: 'Injuries',
  },
  {
    name: 'date',
    label: 'Injury date',
    date: true,
  },
  {
    mode: true,
  },
];

const vaccinesField = [
  {
    name: 'value',
    label: 'Vaccines',
  },
  {
    name: 'date',
    label: 'Vaccines date',
    date: true,
  },
  {
    mode: true,
  },
];

const medicalLimitationsField = [
  {
    name: 'value',
    label: 'Medical Limitations/Disabilities',
  },
  {
    name: 'date',
    label: 'Date Diagnosed',
    date: true,
  },
  {
    mode: true,
  },
];

const historyFormData = [
  {
    name: 'pacemaker_user',
    label: 'Does the Senior have PaceMaker',
    helperText: 'Select',
    menu: true,
    required: true,
    validation: {
      required: 'Required Field',
    },
    menuItems: ['Yes', 'No'],
  },
  {
    name: 'pacemaker_implementation_date',
    label: 'Date Implemented',
    date: true,
    validation: {
      required: 'Required Field',
    },
    required: true,
  },
  {
    name: 'allergies',
    label: 'Allergies/Dietary Concern',
    helperText: '(food allergies, household allergies)',
  },
  {
    name: 'last_physical_examination',
    label: 'Last Physical Exam',
    date: true,
  },
  {
    blank: true,
  },
  {
    blank: true,
  },
  {
    type: 'addictions',
    formData: addictionsField,
    section: true,
  },
  {
    type: 'other_exams',
    formData: otherExamsField,
    section: true,
  },
  {
    type: 'injuries',
    formData: injuriesField,
    section: true,
  },
  {
    type: 'vaccines',
    formData: vaccinesField,
    section: true,
  },
  {
    type: 'disabilities',
    formData: medicalLimitationsField,
    section: true,
  },
  ...homeMedicalDevicesField,
];

const prescriptionForm = [
  {
    name: 'medication_name',
    label: 'Medication Name',
    required: true,
    validation: {
      required: 'Required Field',
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  {
    name: 'medication_type',
    label: 'Medications Type',
  },
  {
    name: 'is_food_required',
    label: 'With or without food',
    menu: true,
    menuItems: ['With food', 'Without food'],
  },
  {
    name: 'strength',
    label: 'Strength/Strength Unit',
  },
  {
    name: 'dose',
    label: 'Dose (per day)',
    required: true,
    validation: {
      required: 'Required Field',
      pattern: {
        value: /^\s*\d+\s*$/,
        message: 'only allow numeric value.',
      },
    },
  },
  {
    name: 'frequency',
    label: 'Frequency',
    required: true,
    validation: {
      required: 'Required Field',
      max: {
        value: 6,
        message: 'Max. value not to exceed 6',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  {
    name: 'dose_form',
    label: 'Dose Form',
    menu: true,
    required: true,
    validation: {
      required: 'Required Field',
    },
    menuItems: [
      'Tablet/Pill',
      'Half-Tablet/Pill',
      'Tablet & Half',
      'Liquid-Filled Capsule',
      'Gummy',
      'Chewable',
      'Powder',
      'Liquid',
      'Injectable',
      'Other',
    ],
  },
  {
    name: 'duration_of_medication',
    label: 'Duration of Medication Cycle',
  },
  {
    name: 'reason',
    label: 'Reason for taking the medication',
  },
  {
    name: 'prescribed_date',
    label: 'Date Prescribed',
    date: true,
  },
  {
    name: 'remaining_pills',
    label: 'Pills per bottle/container',
    validation: {
      pattern: {
        value: /^\d*$/,
        message: 'only allow numeric value.',
      },
    },
  },
  {
    name: 'remaining_refill',
    label: 'Remaining Refils',
    validation: {
      pattern: {
        value: /^\d*$/,
        message: 'only allow numeric value.',
      },
    },
  },
  {
    name: 'refill_date',
    label: 'Refill Date',
    disableFutureDate: false,
    date: true,
  },
  {
    name: 'allergies',
    label: 'Drug allergies',
  },
  {
    name: 'comment',
    label: 'Comments',
  },
  {
    formData: [
      {
        name: 'day',
        helperText: 'Select',
        menu: true,
        menuItems: [
          'Everyday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
    ],
    section: true,
  },
];

const defaultPrescriptionValue = {
  medication_id: '',
  medication_name: '',
  medication_type: '',
  is_food_required: '',
  strength: '',
  dose: '',
  dose_form: '',
  frequency: '',
  duration_of_medication: '',
  reason: '',
  prescribed_date: '',
  remaining_pills: '',
  remaining_refill: '',
  refill_date: '',
  allergies: '',
  comment: '',
  medication_schedule: [
    {
      day: '',
    },
  ],
};

const defaultHistoryValues = [
  {
    pacemaker_user: '',
    pacemaker_implementation_date: '',
    allergies: '',
    last_physical_examination: '',
    addictions: [{value: '', data: ''}],
    other_exams: [{value: '', data: ''}],
    injuries: [{value: '', data: ''}],
    vaccines: [{value: '', data: ''}],
    disabilities: [{value: '', data: ''}],
    home_medical_devices: '',
    home_medical_device_reason: '',
    home_medical_device_usage_date: '',
  },
];

export {
  defaultHistoryValues,
  defaultPrescriptionValue,
  historyFormData,
  prescriptionForm,
};
