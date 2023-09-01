import WellnessSurveyParser from './wellnessSurveyParser';

describe('wellnessSurvey parser', () => {
  test('test wellnessSurvey parser', () => {
    const data = {
      survey_id: '',
      answer: [],
      survey_date: '',
      careagent_id: '',
      is_Survey_Completed: false,
      form_version: '',
      created_date: '2023-02-20T13:21:51.733627+00:00',
      survey_date_timezone: '',
      modification_date: '2023-02-20T13:21:51.733627+00:00',
    };

    const mockResult = {
      date: '02/20/2023',
      time: '06:51 PM',
      dateTime: '02/20/2023 06:51 PM',
      surveyDate: '',
      surveys: [],
      assessmentId: '',
      careAgentId: '',
      assessmentStatus: 'save',
      versionNumber: '',
    };

    const wellnessSurveyParser = new WellnessSurveyParser();
    const wellnessSurveyData = wellnessSurveyParser.parse(data);
    expect(wellnessSurveyData).toEqual(mockResult);
  });
});
