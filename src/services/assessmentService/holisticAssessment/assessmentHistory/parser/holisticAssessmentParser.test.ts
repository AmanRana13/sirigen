import AssessmentHistoyParser from './assessmentHistoryParser';

describe('holistic parser', () => {
  test('test holistic assessment history parser', () => {
    const data = [
      {
        assessment_id: '',
        form: [],
        modification_date: '2023-02-20T13:21:51.733627+00:00',
        total_score: '',
        care_agent_id: '',
      },
    ];
    const mockResult = [
      {
        date: '02/20/2023',
        time: '06:51 PM',

        totalScore: '',
        formData: [],
        assessmentId: '',
        careAgentId: '',
      },
    ];
    const holisticAssessmentHistoryParser = new AssessmentHistoyParser();
    const holisticAssessmentData = holisticAssessmentHistoryParser.parse(data);
    expect(holisticAssessmentData).toEqual(mockResult);
  });
});
