const medicationListMockData = {
  medicationName: 'Amitriptyline/Perphenazine (Oral Pill) 25-4 mg Tab',
  doseForm: 'tablet',
  doseFrequency: {
    doseFrequencyTime: '1',
    doseFrequencyUnit: 'day',
  },
  whenDoTheyTakeIt: ['morning'],
  datePrescribed: '2023-03-31T18:30:00+00:00',
  dateDiscontinued: '2023-04-19T18:30:00+00:00',
  pharmacyName: 'Florida pharmacy',
  pharmacyPhone: '5783475892',
  notes:
    'Taking Amitriptyline medicine since 1 April, 2023 from florida pharmacy, once in a day.',
  lastSaved: '2023-04-26T13:02:01.022815+00:00',
  medicationID: 'dbfcb2294bc44aff98d5b5ccce00c933',
  status: 'submit',
};
const listWithFreqTimeMockData = {
  medicationName: 'Amitriptyline/Perphenazine (Oral Pill) 25-4 mg Tab',
  doseForm: 'tablet',
  doseFrequency: {
    doseFrequencyTime: '2',
    doseFrequencyUnit: 'day',
  },
  whenDoTheyTakeIt: ['morning'],
  datePrescribed: '2023-03-31T18:30:00+00:00',
  dateDiscontinued: '2023-04-19T18:30:00+00:00',
  pharmacyName: 'Florida pharmacy',
  pharmacyPhone: '5783475892',
  notes:
    'Taking Amitriptyline medicine since 1 April, 2023 from florida pharmacy, once in a day.',
  lastSaved: '2023-04-26T13:02:01.022815+00:00',
  medicationID: 'dbfcb2294bc44aff98d5b5ccce00c933',
  status: 'submit',
};
const listIncompleteMockData = {
  medicationName: 'Amitriptyline/Perphenazine (Oral Pill) 25-4 mg Tab',
  doseForm: 'tablet',
  doseFrequency: {
    doseFrequencyTime: '2',
    doseFrequencyUnit: 'day',
  },
  whenDoTheyTakeIt: ['morning'],
  datePrescribed: '2023-03-31T18:30:00+00:00',
  dateDiscontinued: '2023-04-19T18:30:00+00:00',
  pharmacyName: 'Florida pharmacy',
  pharmacyPhone: '5783475892',
  notes:
    'Taking Amitriptyline medicine since 1 April, 2023 from florida pharmacy, once in a day.',
  lastSaved: '2023-04-26T13:02:01.022815+00:00',
  medicationID: 'dbfcb2294bc44aff98d5b5ccce00c933',
  status: 'save',
};

export const medicationListData = {
  data: [medicationListMockData],
  loading: false,
  totalRows: 0,
  currentPage: 1,
  searchResult: [],
  searchLoading: false,
  errorMessage: '',
  isCompleted: true,
  medicationDialogData: [],
};

export const medicationListWithEmptyData = {
  data: [],
  loading: false,
  totalRows: 0,
  currentPage: 1,
  searchResult: [],
  searchLoading: false,
  errorMessage: '',
  isCompleted: true,
  medicationDialogData: [],
};

export const medicationNewData = {
  data: [listWithFreqTimeMockData],
  loading: false,
  totalRows: 0,
  currentPage: 1,
  searchResult: [],
  searchLoading: false,
  errorMessage: '',
  isCompleted: true,
  medicationDialogData: [],
};

export const medicationIncompleteData = {
  data: [listIncompleteMockData],
  loading: false,
  totalRows: 0,
  currentPage: 1,
  searchResult: [],
  searchLoading: false,
  errorMessage: '',
  isCompleted: true,
  medicationDialogData: [],
};

const medicationMockData = {
  medicationName: 'Amitriptyline/Perphenazine (Oral Pill) 25-4 mg Tab',
  doseForm: 'tablet',
  doseFrequency: {doseFrequencyTime: '1', doseFrequencyUnit: 'day'},
  whenDoTheyTakeIt: ['Morning'],
  datePrescribed: '2023-03-31T18:30:00+00:00',
  dateDiscontinued: '2023-04-19T18:30:00+00:00',
  pharmacyName: 'Florida pharmacy',
  pharmacyPhone: '5783475892',
  notes:
    'Taking Amitriptyline medicine since 1 April, 2023 from florida pharmacy, once in a day.',
  lastSaved: '2023-04-26T13:02:01.022815+00:00',
  medicationID: 'dbfcb2294bc44aff98d5b5ccce00c933',
  status: 'submit',
};

export const openDialogMockData = {
  isOpen: true,
  type: 'MEDICATION',
  data: medicationMockData,
  dialogTitle: 'Edit Medication',
};
export const openDialogAddMedicationMockData = {
  isOpen: true,
  type: 'MEDICATION',
  data: medicationMockData,
  dialogTitle: 'Add Medication',
};
export const phramacyMockData = [
  {
    provider_id: '33d8fcd8e70744dd8133612184f230aa',
    name: 'Costco Pharmacy',
    senior_id: 'senior-60d59e2fe1ed48c9997f4cef52d891f4',
    contact_phone: '2638732678',
    website: null,
    is_primary: true,
    address: {
      street: null,
      city: null,
      state: null,
      zip: null,
    },
    fax: null,
    comment: null,
    created_date: '2023-04-19T04:50:48.530456+00:00',
    last_modified_by: 'admin-56939a52e94744b5ac9b4d4a0194098f',
  },
];
