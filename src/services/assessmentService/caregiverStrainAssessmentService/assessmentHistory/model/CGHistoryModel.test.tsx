import AssessmentHistoryModel from './assessmentHistoryModel';

describe('test caregiver strain assessment history model', () => {
  test('types of caregiver strain assessment history model', () => {
    const CGAssessmentHistoryModel = new AssessmentHistoryModel(
      '',
      '',
      0,
      0,
      '',
      '',
      [],
      '',
      '',
    );
    expect(typeof CGAssessmentHistoryModel.date).toBe('string');
  });
});
