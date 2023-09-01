import {unmaskPhoneNumber} from 'globals/global.functions';
import {FORM_ERROR_MESSAGES, REGEX} from 'globals/global.constants';

export const  facilityDialogformFields: any = {
  facilityName: {
    inputProps: {
      name: 'facilityName',
      placeholder: 'Enter Facility Name',
      required: true,
      maxLength:50
    },
    label: 'Facility Name:',
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
  facilityCode: {
    inputProps: {
      name: 'facilityCode',
    },
    label: 'Facility Code:',
    isLabel: false,
    initialValue: '',
  },

  facilityPhoneNumber: {
    inputProps: {
      name: 'facilityPhoneNumber',
      placeholder: 'Enter Facility Phone #',
      required: true,
    },
    label: 'Facility Phone #:',
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
          return phoneNumber.length == 10;
        },
        message: 'Enter a valid phone number',
      },
    },
  },
  facilityStreetAddress: {
    inputProps: {
      name: 'facilityStreetAddress',
      placeholder: 'Enter Street Address',
      required: true,
    },
    label: 'Facility Street Address:',
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
  facilityCityState: {
    inputProps: {
      name: 'facilityCityState',
      placeholder: 'Enter City',
      required: true,
    },
    label: 'Facility City/State:',
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

  facilityZipcode: {
    inputProps: {
      name: 'facilityZipcode',
      placeholder: 'Enter Zipcode',
      required: true,
    },
    label: 'Facility Zipcode:',
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
};