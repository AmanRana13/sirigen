import KatzAssessmentHistoryModel from './katzAssessmentHistoryModel';

describe('test katz assessment history model', () => {
  test('types of katz assessment history model', () => {
    const katzAssessmentHistoryModel = new KatzAssessmentHistoryModel(
      '',
      '',
      0,
      '',
      [],
      '',
      '',
      '',
      '',
    );
    expect(typeof katzAssessmentHistoryModel.date).toBe('string');
  });
});
