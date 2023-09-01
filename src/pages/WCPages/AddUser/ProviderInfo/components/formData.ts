import {US_STATES, REGEX} from 'globals/global.constants';

export const DoctorSepcialityoptions = [
  'Acupuncturist',
  'Allergist',
  'Anesthesiologist',
  'Audiologist',
  'Cardiologist',
  'Chiropractor',
  'Dentist',
  'Dermatologist',
  'Endocrinologist',
  'ENT Specialist',
  'Epidemiologist',
  'Gastroenterologist',
  'Geneticist',
  'Geriatric',
  'Gynecologist',
  'Hematologists',
  'Homeopathic',
  'Immunologist',
  'Infectious Disease',
  'Internal Medicine',
  'Naturopathic',
  'Neonatologist',
  'Nephrologist',
  'Neurologist',
  'Neurosurgeon',
  'Obstetrician OBGYN',
  'Oncologist',
  'Ophthalmologist',
  'Orthopedist',
  'Otolaryngologist',
  'Pathologist',
  'Physiatrists',
  'Physical Therapist',
  'Physiologist',
  'Plastic Surgeon',
  'Podiatrist',
  'Psychiatrist',
  'Pulmonologist',
  'Radiologist',
  'Rheumatologist',
  'Urologist',
];
const dentistSpecialityOptions = [
  'Cosmetic Dentistry',
  'Endodontist',
  'General Dentistry',
  'Geriatric Dentistry/Geriodontics',
  'Oral & Maxillofacial (OMF) Surgeon',
  'Orthodontist',
  'Pedodontics',
  'Periodontist',
  'Prosthodontist',
];
export const DoctorFormData = [
  {
    name: 'provider_name',
    label: 'Practice Name/Group',
    required: false,
    helperText: 'John',
  },
  {
    name: 'name.first_name',
    label: 'First Name',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 20,
        message: 'Max 20 character allowed',
      },
      pattern: {value: REGEX.ONLY_ALPHABETS, message: 'Only Alphabets allowed'},
    },
    helperText: 'John',
  },
  {
    name: 'name.last_name',
    label: 'Last Name',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 20,
        message: 'Max 20 character allowed',
      },
      pattern: {value: REGEX.ONLY_ALPHABETS, message: 'Only Alphabets allowed'},
    },
    helperText: 'Doe',
  },
  {
    name: 'speciality',
    label: 'Specialty',
    menu: true,
    menuItems: DoctorSepcialityoptions,
    required: true,
    validation: {
      required: 'Required Field',
    },
  },
  {
    name: 'contact_phone',
    label: 'Contact Phone',
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
    name: 'email_address',
    label: 'Email Address',
    required: false,
    validation: {
      pattern: {
        value: REGEX.EMAIL,
        message: 'Invalid email address',
      },
    },
    helperText: 'error@mail.com',
  },
  {
    checkbox: true,
    name: 'is_primary',
    options: [
      {
        name: 'is_primary',
        label: 'Primary Doctor',
      },
    ],
  },
];
export const DentistFormData = [
  {
    name: 'provider_name',
    label: 'Practice Name/Group',
    required: false,
    helperText: 'John',
  },
  {
    name: 'name.first_name',
    label: 'First Name',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 20,
        message: 'Max 20 character allowed',
      },
      pattern: {
        value: REGEX.ONLY_ALPHABETS,
        message: 'Only characters allowed',
      },
    },
    helperText: 'John',
  },
  {
    name: 'name.last_name',
    label: 'Last Name',
    required: true,
    validation: {
      required: 'Required Field',
      maxLength: {
        value: 20,
        message: 'Max 20 character allowed',
      },
      pattern: {
        value: REGEX.ONLY_ALPHABETS,
        message: 'Only characters allowed',
      },
    },
    helperText: 'Doe',
  },
  {
    name: 'speciality',
    label: 'Specialty',
    required: true,
    menu: true,
    menuItems: dentistSpecialityOptions,
    validation: {
      required: 'Required Field',
    },
  },
  {
    name: 'contact_phone',
    label: 'Contact Phone',
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
    name: 'email_address',
    label: 'Email Address',
    required: false,
    validation: {
      pattern: {
        value: REGEX.EMAIL,
        message: 'Invalid email address',
      },
    },
    helperText: 'error@mail.com',
  },
];

export const PharmacyFormData = [
  {
    name: 'name',
    label: 'Pharmacy Name',
    required: false,
    helperText: 'Pharmacy Name',
    validation: {
      maxLength: {
        value: 50,
        message: 'Max 50 character is allowed',
      },
    },
  },
  {
    name: 'contact_phone',
    label: 'Contact Phone #',
    masked: true,
    required: false,
    validation: {
      minLength: {
        value: 14,
        message: '10 digits required',
      },
    },
    helperText: '(xxx) xxx-xxxx',
  },
  {
    name: 'address.street',
    label: 'Street Address',
    required: false,
    isAutoComplete: true,
    helperText: 'Address',
  },
  {
    name: 'address.city',
    label: 'City',
    required: false,
    helperText: 'City',
    validation: {
      maxLength: {
        value: 25,
        message: 'Max 25 character is allowed',
      },
    },
  },
  {
    name: 'address.state',
    label: 'State',
    required: false,
    helperText: 'State',
    menu: true,
    menuItems: US_STATES,
  },
  {
    name: 'address.zip',
    label: 'Zip Code',
    required: false,
    isAutoComplete: true,
    helperText: 'Zip Code',
  },
  {
    name: 'fax',
    label: 'Fax #',
    masked: true,
    required: false,
    validation: {
      minLength: {
        value: 14,
        message: '10 digits required',
      },
    },
    helperText: '(xxx) xxx-xxxx',
  },
  {
    name: 'website',
    label: 'Website/URL',
    multiline: true,
    rows: 2,
    required: false,
    helperText: 'Website/URL',
    validation: {
      maxLength: {
        value: 200,
        message: '200 characters allowed',
      },
    },
    inputProps: {style: {padding: 0}},
  },
  {
    name: 'comment',
    label: 'Comments/Notes',
    multiline: true,
    rows: 2,
    required: false,
    validation: {
      maxLength: {
        value: 500,
        message: '500 characters allowed',
      },
    },
    helperText: 'Comments/Notes',
    inputProps: {style: {padding: 0}},
  },
  {
    checkbox: true,
    name: 'is_primary',
    options: [
      {
        name: 'is_primary',
        label: 'Primary Pharmacy',
      },
    ],
  },
];

export const defaultPharmacyValues: any = [
  {
    name: '',
    contact_phone: '',
    address: {
      street: '',
      state: '',
      city: '',
      zip: '',
    },

    fax: '',
    website: '',
    comment: '',
    is_primary: false,
  },
];
