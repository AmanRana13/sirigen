import {unmaskPhoneNumber} from 'globals/global.functions';
import {FORM_ERROR_MESSAGES, REGEX} from 'globals/global.constants';

import {IFormFields} from './formField.types';
import {ROLES_CONFIG} from 'config/app.config';
import {Roles} from 'globals/enums';

export const formFields: IFormFields = {
  empId: {
    inputProps: {
      placeholder: 'Enter',
      name: 'empId',
      required: true,
    },
    label: 'Employee ID:',
    isLabel: false,
    initialValue: '',
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  firstName: {
    inputProps: {
      name: 'firstName',
      placeholder: 'Enter',
      required: true,
    },
    label: 'First Name:',
    isLabel: false,
    initialValue: '',
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  lastName: {
    inputProps: {
      name: 'lastName',
      placeholder: 'Enter',
      required: true,
    },
    label: 'Last Name:',
    isLabel: false,
    initialValue: '',
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  email: {
    inputProps: {
      name: 'email',
      placeholder: 'Enter',
      required: true,
    },
    label: 'Email:',
    isLabel: false,
    initialValue: '',
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
      pattern: {
        value: REGEX.EMAIL,
        message: 'Enter a valid email address',
      },
    },
  },
  phone: {
    inputProps: {
      name: 'phone',
      placeholder: 'xxx-xxx-xxxx',
      required: true,
    },
    label: 'Phone Number:',
    isLabel: false,
    masked: true,
    initialValue: '',
    inline: true,
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
      custom: {
        isValid: (value) => {
          const phoneNumber = unmaskPhoneNumber(value);
          return phoneNumber.length > 9;
        },
        message: 'Enter a valid phone number',
      },
    },
  },
  access: {
    inputProps: {
      name: 'access',
      required: true,
    },
    label: 'Role:',
    isLabel: false,
    menu: true,
    menuItems: [
      {
        label: ROLES_CONFIG[Roles.CareAgent].accessLabel,
        value: Roles.CareAgent,
      },
      {
        label: ROLES_CONFIG[Roles.Admin].accessLabel,
        value: Roles.Admin,
      },
      {
        label: ROLES_CONFIG[Roles.BDM].accessLabel,
        value: Roles.BDM,
      },
    ],
    initialValue: '',
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
    },
  },
  zipCode: {
    inputProps: {
      name: 'zipCode',
      placeholder: 'Zip Code',
      required: true,
    },
    label: 'Zip Code:',
    isLabel: false,
    initialValue: '',
    validation: {
      required: {
        value: true,
        message: 'Required Field',
      },
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
  agentShift: {
    inputProps: {
      name: 'agentShift',
      required: true,
    },
    radio: true,
    showRadioLabel: true,
    radioItems: [
      {
        value: 'day',
        label: 'Day',
      },
      {
        value: 'evening',
        label: 'Evening',
      },
      {
        value: 'overnight',
        label: 'Overnight',
      },
    ],
    label: 'Shift:',
    isLabel: false,
    initialValue: '',
    validation: {
      custom: {
        isValid: (value, data) => {
          return (
            data.access === Roles.BDM || RegExp(REGEX.BLANK_FIELD).test(value)
          );
        },
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
  },
};
