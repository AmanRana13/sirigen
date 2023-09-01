import MedicationListModel from './medicationServiceModel';

describe('test medicationList assessment model', () => {
  test('types of medication list assessment model', () => {
    const medicationListModel = new MedicationListModel(
      '',
      '',
      {doseFrequencyTime: 1, doseFrequencyUnit: ''},
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    );
    expect(typeof medicationListModel.medicationName).toBe('string');
  });
});
