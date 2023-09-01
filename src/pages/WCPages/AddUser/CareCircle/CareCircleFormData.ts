import {FORM_ERROR_MESSAGES, REGEX, US_STATES} from 'globals/global.constants';
import {IFormData, IRadioInputState} from './CareCircle.type';

export const formData: IFormData[] = [
  {
    name: 'basic_info.name.first_name',
    label: 'First Name',
    required: true,
    helperText: 'John',
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 50,
        message: 'Max 50 character allowed',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  {
    name: 'basic_info.name.middle_name',
    label: 'Middle Name',
    required: false,
    helperText: 'Radcliff',
  },
  {
    name: 'basic_info.name.last_name',
    label: 'Last Name',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 50,
        message: 'Max 50 character allowed',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    helperText: 'Doe',
  },
  {
    name: 'basic_info.gender',
    label: 'Gender',
    required: true,
    menu: true,
    validation: {
      required: 'Required Field',
    },
    menuItems: ['Male', 'Female', 'Other'],
  },
  {
    name: 'basic_info.mobile_number',
    label: 'Mobile Phone',
    masked: true,
    required: true,
    validation: {
      required: 'Required Field',
      minLength: {
        value: 14,
        message: '10 digits required',
      },
    },
    helperText: '(xxx) xxx-xxxx',
  },
  {
    name: 'senior_info.alternate_number',
    label: 'Home/Alternate Phone',
    validation: {
      minLength: {
        value: 14,
        message: '10 digits required',
      },
    },
    masked: true,
    helperText: '(xxx) xxx-xxxx',
  },
  {
    name: 'basic_info.email',
    label: 'Email',
    required: true,
    validation: {
      required: 'Required Field',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    helperText: 'error@mail.com',
    isResendOTP: true,
  },
  {
    name: 'senior_info.relationship_with_senior',
    label: 'Relationship with senior',
    required: true,
    menu: true,
    validation: {
      required: 'Required Field',
    },
    menuItems: [
      'Son',
      'Daughter',
      'Spouse',
      'Sister',
      'Brother',
      'Father',
      'Mother',
      'Uncle',
      'Aunt',
      'Brother In Law',
      'Sister In Law',
      'Niece',
      'Nephew',
      'Friend',
      'Roommate',
      'Other',
    ],
  },
  {
    name: 'basic_info.location.street',
    label: 'Flat, House no.,Building,Apartment',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 50,
        message: 'Max 50 character is allowed',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    helperText: '',
  },
  {
    name: 'basic_info.location.city',
    label: 'City',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 25,
        message: 'Max 25 character is allowed',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    helperText: '',
  },
  {
    name: 'basic_info.location.state',
    label: 'State',
    required: true,
    validation: {
      required: 'Required Field',
    },
    menu: true,
    menuItems: US_STATES,
  },
  {
    name: 'basic_info.location.zipcode',
    label: 'Zip code',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 5,
        message: 'Max 5 character is allowed',
      },

      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    helperText: '',
  },
  {
    name: 'senior_info.best_day_to_contact',
    label: 'Best Day to Contact',
    menu: true,
    menuItems: ['Anyday', 'Weekday Only', 'Weekend Only'],
  },
  {
    name: 'senior_info.best_time_to_contact',
    label: 'Best Time to Contact',
    menu: true,
    menuItems: ['Anytime', 'Before 12 Noon', 'After 12 Noon'],
  },
  {emptyBox: true},
  {
    radio: true,
    name: 'senior_info.caregiver_type',
    validation: {
      required: true,
    },
    options: [
      {
        value: 'primary',
        label: 'Primary Caregiver',
      },
      {
        value: 'secondary',
        label: 'Secondary Caregiver',
      },
      {
        value: 'alternate',
        label: 'Alternate Contact',
      },
    ],
  },

  {
    checkbox: true,
    options: [
      {
        name: 'senior_info.has_power_of_attorney',
        label: 'Power of Attorney',
      },
      {
        name: 'senior_info.is_living_with_senior',
        label: 'Living with Senior',
      },
      {
        name: 'senior_info.emergency_contact',
        label: 'Emergency Contact',
      },
    ],
  },
];
export const defaultValues = {
  basic_info: {
    mobile_number: '',
    email: '',
    gender: '',
    location: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
    name: {
      first_name: '',
      middle_name: '',
      last_name: '',
    },
  },
  senior_info: {
    alternate_number: '',
    best_day_to_contact: '',
    best_time_to_contact: '',
    caregiver_type: '',
    emergency_contact: '',
    has_power_of_attorney: '',
    is_living_with_senior: '',
    relationship_with_senior: '',
  },
};

export const initialState: IRadioInputState = {
  selectedCareGiverOption: null,
  powerAttorney: false,
  livingSenior: false,
  emergencyContact: false,
  selectedIndex: 0,
};
