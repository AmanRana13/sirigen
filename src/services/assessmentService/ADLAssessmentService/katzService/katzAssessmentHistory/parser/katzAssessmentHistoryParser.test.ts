import KatzAssessmentHistoryParser from './katzAssessmentHistoryParser';

describe('katz assessment history parser', () => {
  test('test katz assessment history parser', () => {
    const data = [
      {
        form: [],
        created_date: '',
        modification_date: '2023-02-20T13:21:51.733627+00:00',
        total_score: 0,
        care_agent_name: '',
        assessment_id: '',
        care_agent_id: '',
        assessment_status: '',
      },
    ];
    const mockResult = [
      {
        date: '02/20/2023',
        time: '06:51 PM',
        totalScore: 0,
        careAgentName: '',
        formData: [],
        assessmentId: '',
        createdDate: '2023-02-20T13:21:51.733627+00:00',
        careAgentId: '',
        assessmentStatus: '',
      },
    ];
    const katzAssessmentHistoryParser = new KatzAssessmentHistoryParser();
    const katzAssessmentData = katzAssessmentHistoryParser.parse(data);
    expect(katzAssessmentData).toEqual(mockResult);
  });
});
