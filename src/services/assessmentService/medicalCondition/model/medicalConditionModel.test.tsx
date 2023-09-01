import MedicalConditionModel from './medicalConditionModel';
import MedicalConditionHistoryModel from './medicalConditionHistoryModel';

describe('test medical condition assessment history model', () => {
  test('types of medical condition assessment model', () => {
    const medicalConditionModel = new MedicalConditionModel(
      '',
      [],
      '',
      0,
      '',
      '',
    );
    expect(typeof medicalConditionModel.dateTime).toBe('string');
  });
  test('types of medical condition assessment model', () => {
    const medicalConditionHistoryModel = new MedicalConditionHistoryModel(
      '',
      '',
      0,
      '',
      [],
      '',
      '',
    );
    expect(typeof medicalConditionHistoryModel.date).toBe('string');
  });
});
