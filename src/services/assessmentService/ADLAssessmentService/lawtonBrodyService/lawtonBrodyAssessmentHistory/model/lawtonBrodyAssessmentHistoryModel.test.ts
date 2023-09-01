import LawtonBrodyAssessmentHistoryModel from './lawtonBrodyAssessmentHistoryModel';

describe('test lawton brody assessment history model', () => {
  test('types of lawton brody assessment history model', () => {
    const lawtonBrodyAssessmentHistoryModel = new LawtonBrodyAssessmentHistoryModel(
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
    expect(typeof lawtonBrodyAssessmentHistoryModel.date).toBe('string');
  });
});
