import {unmaskPhoneNumber} from 'globals/global.functions';
import {FORM_ERROR_MESSAGES, REGEX} from 'globals/global.constants';

export const corporateDialogformFields: any = {
  corporateName: {
    inputProps: {
      name: 'corporateName',
      placeholder: 'Enter Corporate Name',
      required: true,
      maxLength: 50,
    },
    label: 'Corporate Name:',
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
  corporateCode: {
    inputProps: {
      name: 'corporateCode',
      placeholder: 'Enter 3 Character Corporate Code',
      required: true,
    },
    label: 'Corporate Code:',
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
      custom: {
        isValid: (value: any) => {
          return value.length === 3;
        },
        message: 'Corporate Code must be 3 character long',
      },
    },
  },

  corporatePhoneNumber: {
    inputProps: {
      name: 'corporatePhoneNumber',
      placeholder: 'Enter Corporate Phone#:',
      required: true,
    },
    label: 'Corporate Phone Number:',
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
        isValid: (value: any) => {
          const phoneNumber = unmaskPhoneNumber(value);
          return phoneNumber.length > 9;
        },
        message: 'Enter a valid phone number',
      },
    },
  },
  corporateEmail: {
    inputProps: {
      name: 'corporateEmail',
      placeholder: 'Enter Corporate Email',
    },
    label: 'Corporate Email:',
    isLabel: false,
    initialValue: '',
  },
  corporateAddress: {
    inputProps: {
      name: 'corporateAddress',
      placeholder: 'Enter Street Address',
    },
    label: 'Corporate Address:',
    isLabel: false,
    initialValue: '',
  },
  corporateCity: {
    inputProps: {
      name: 'corporateCity',
      placeholder: 'Enter City',
    },
    label: 'Corporate City/State:',
    isLabel: false,
    initialValue: '',
  },
  corporateZipcode: {
    inputProps: {
      name: 'corporateZipcode',
      placeholder: 'Enter Corporate Zipcode',
    },
    label: 'Corporate Zipcode:',
    isLabel: false,
    initialValue: '',
  },
};
