import AssessmentHistoryModel from './assessmentHistoryModel';

describe('test holistic assessment history model', () => {
  test('types of holistic assessment history model', () => {
    const holisticAssessmentHistoryModel = new AssessmentHistoryModel(
      '',
      '',
      '',
      [],
      '',
      '',
    );
    expect(typeof holisticAssessmentHistoryModel.date).toBe('string');
  });
});
