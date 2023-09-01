import AssessmentHistoyParser from './assessmentHistoryParser';
describe('caregiver strain parser', () => {
  test('test caregiver strain assessment history parser', () => {
    const data = [
      {
        form: [],
        created_date: '',
        modification_date: '2023-02-20T13:21:51.733627+00:00',
        total_score: 0,
        scorePercent: 0,
        caregiver_name: '',
        caregiver_id: '',
        assessment_id: '',
        care_agent_id: '',
      },
    ];
    const mockResult = [
      {
        date: '02/20/2023',
        time: '06:51 PM',
        totalScore: 0,
        scorePercent: 0,
        caregiverName: '',
        caregiverId: '',
        formData: [],
        assessmentId: '',
        careAgentId: '',
      },
    ];
    const CGAssessmentHistoryParser = new AssessmentHistoyParser();
    const CGAssessmentData = CGAssessmentHistoryParser.parse(data);
    expect(CGAssessmentData).toEqual(mockResult);
  });
});
