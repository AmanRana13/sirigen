import MedicationListParser from './medicationListParser';

describe('medication List parsers', () => {
  test('test medicationList assessment parser', () => {
    const data: any = [
      {
        date_discontinued: null,
        date_prescribed: null,
        dose_form: '',
        dose_frequency: {every: '', period: ''},
        medication_id: 'da54651ef1ba49ccb656bedb5fbbec09',
        medicine: 'Testosterone (Injectable) 100 mg/ml Auto-Injector 0.5 ml',
        modification_date: '2023-04-26T14:49:35.826943+00:00',
        notes: '',
        pharmacy_name: 'Costco Pharmacy',
        pharmacy_phone_number: '2638732678',
        senior_id: 'senior-60d59e2fe1ed48c9997f4cef52d891f4',
        status: 'submit',
        when: [],
      },
    ];

    const mockResult = {
      dateDiscontinued: null,
      datePrescribed: null,
      doseForm: '',
      doseFrequency: {doseFrequencyTime: '', doseFrequencyUnit: ''},
      lastSaved: '2023-04-26T14:49:35.826943+00:00',
      medicationID: 'da54651ef1ba49ccb656bedb5fbbec09',
      medicationName:
        'Testosterone (Injectable) 100 mg/ml Auto-Injector 0.5 ml',
      notes: '',
      pharmacyName: 'Costco Pharmacy',
      pharmacyPhone: '2638732678',
      status: 'submit',
      whenDoTheyTakeIt: [],
    };

    const dataParser = new MedicationListParser();
    const medicationListData = dataParser.parse(data);
    expect(medicationListData).toEqual(mockResult);
  });
});
