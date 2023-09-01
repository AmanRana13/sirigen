import MedicalConditionHistoyParser from './medicalConditionHistoryParser';
import MedicalConditionParser from './medicalConditionParser';

describe('medical condition parsers', () => {
  test('test medical condition assessment history parser', () => {
    const data = [
      {
        medical_conditions: [],
        status: '',
        condition_id: '',
        last_updated_by: '',
        last_updated_by_name: 'test',
        version: 1,
        created_date: '',
        modification_date: '2023-02-20T13:21:51.733627+00:00',
      },
    ];
    const mockResult = [
      {
        date: '02/20/2023',
        time: '06:51 PM',
        version: 1,
        wellnessCoachName: 'test',
        formData: [],
        assessmentId: '',
        careAgentId: '',
      },
    ];
    const medicalConditionHistoryParser = new MedicalConditionHistoyParser();
    const medicalConditionData = medicalConditionHistoryParser.parse(data);
    expect(medicalConditionData).toEqual(mockResult);
  });
  test('test medical condition assessment parser', () => {
    const data = {
      senior_id: '',
      medical_conditions: [],
      status: '',
      condition_id: '',
      last_updated_by: '',
      last_updated_by_name: 'test',
      version: 1,
      created_date: '2023-02-20T13:21:51.733627+00:00',
      modification_date: '',
    };

    const mockResult = {
      dateTime: '',
      surveys: [],
      assessmentStatus: '',
      versionNumber: 1,
      assessmentId: '',
      careAgentId: '',
    };

    const medicalConditionHistoryParser = new MedicalConditionParser();
    const medicalConditionData = medicalConditionHistoryParser.parse(data);
    expect(medicalConditionData).toEqual(mockResult);
  });
});
