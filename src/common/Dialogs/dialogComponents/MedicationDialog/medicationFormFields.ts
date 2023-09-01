export const medicationFormFields: any = {
  doseForm: {
    inputProps: {
      name: 'doseForm',
      placeholder: 'Please select',
    },
    label: 'Dose Form:',
    isLabel: false,
    initialValue: '',
    menu: true,
    menuItems: [
      {value: 'tablet', label: 'Tablet'},
      {value: 'capsule', label: 'Capsule'},
      {value: 'suppository', label: 'Suppository'},
      {value: 'liquid_oral', label: 'Liquid, Oral'},
      {value: 'injectable', label: 'Injectable'},
      {value: 'drops', label: 'Drops'},
      {value: 'patch', label: 'Patch'},
      {value: 'topical', label: 'Topical'},
      {value: 'aerosol_inhaler', label: 'Aerosol Inhaler'},
      {value: 'other', label: 'Other'},
    ],
  },
  doseFrequencyTime: {
    inputProps: {
      name: 'doseFrequencyTime',
      placeholder: 'Please select',
    },
    label: 'Dose Frequency:',
    isLabel: false,
    initialValue: '',
    menu: true,
    menuItems: [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
      {value: '5', label: '5'},
      {value: '6', label: '6'},
    ],
  },
  doseFrequencyUnit: {
    inputProps: {
      name: 'doseFrequencyUnit',
      placeholder: 'Please select',
    },
    initialValue: '',
    menu: true,
    menuItems: [
      {value: 'day', label: 'Day'},
      {value: 'week', label: 'Week'},
      {value: 'month', label: 'Month'},
    ],
  },

  whenDoTheyTakeIt: {
    inputProps: {
      name: 'whenDoTheyTakeIt',
    },
    label: 'When do they take it?',
    checkbox: true,
    showCheckboxLabel: true,
    checkboxItems: [
      {
        value: 'morning',
        label: 'Morning',
      },
      {
        value: 'noon',
        label: 'Noon',
      },
      {
        value: 'evening',
        label: 'Evening',
      },
      {
        value: 'bedtime',
        label: 'Bedtime',
      },
    ],
    isLabel: false,
    initialValue: [],
  },
  datePrescribed: {
    inputProps: {
      name: 'datePrescribed',
      placeholder: 'MM/DD/YYYY',
    },
    controlledDate: true,
    label: 'Date Prescribed:',
    isLabel: false,
    initialValue: null,
  },
  dateDiscontinued: {
    inputProps: {
      name: 'dateDiscontinued',
      placeholder: 'MM/DD/YYYY',
    },
    controlledDate: true,
    label: 'Date Discontinued:',
    isLabel: false,
    initialValue: null,
  },
  pharmacyName: {
    inputProps: {
      name: 'pharmacyName',
      placeholder: 'Please Select',
    },
    label: 'Pharmacy Name:',
    isLabel: false,
    menu: true,
    menuItems: [],
    initialValue: '',
  },
  pharmacyPhone: {
    inputProps: {
      name: 'pharmacyPhone',
      placeholder: 'xxx-xxx-xxxx',
      maxLength: 14,
    },
    label: 'Pharmacy Phone #:',
    isLabel: false,
    masked: true,
    initialValue: '',
    inline: true,
  },
  notes: {
    inputProps: {
      name: 'notes',
      placeholder: 'Please enter notes here',
      maxLength: 500,
    },
    label: 'Notes:',
    isLabel: false,
    initialValue: '',
    multiline: true,
    rows: 6,
  },
};
