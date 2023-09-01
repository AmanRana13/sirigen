import WellnessSurveyModel from './wellnessSurveyModel';
describe('wellness survey model', () => {
  test('types of wellness survey model', () => {
    const date = '';
    const time = '';
    const data = {
      survey_date: '',
      answer: {},
      survey_id: '',
      careagent_id: '',
      form_version: '',
    };
    const wellnessSurveyModel = new WellnessSurveyModel(
      date,
      time,
      `${date} ${time}`,
      data.survey_date,
      data.answer,
      data.survey_id || '',
      data.careagent_id || '',
      'save',
      data.form_version || '',
    );
    expect(typeof date).toBe('string');
  });
});
