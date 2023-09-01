import GoalsDataParser from './goalsDataParser';

describe('goalData parser', () => {
  test('test goalData parser', () => {
    const data = [
      {
        goal: '',
        action: '',
        status: '',
        percentage: '',
        start_date: '',
        target_date: '',
        notes: '',
        goal_action_id: '',
        created_date: [],
        resource: [],
      },
    ];

    const mockResult = [
      {
        resource: [],
        id: '',
        goal: '',
        action: '',
        status: '',
        progress: 0,
        startDate: '',
        targetDate: '',
        notes: '',
        createdDate: '',
      },
    ];

    const goalsDataParser = new GoalsDataParser();
    const goalData = goalsDataParser.parseGoalData(data);
    expect(goalData).toEqual(mockResult);
  });
  test('test goalActionMap parser', () => {
    const data = [
      {
        actions: ['flu prevention'],
        goal_name: 'flu prevention',
      },
    ];
    const mockResult = {
      'flu prevention': {
        actions: {
          'flu prevention': {
            actionName: 'flu prevention',
            selected: false,
            rowId: [],
          },
        },
        goalName: 'flu prevention',
        occupied: false,
        rowIds: [],
      },
    };
    const goalsDataParser = new GoalsDataParser();
    const goalData = goalsDataParser.parseGoalActionMapData(data);
    expect(goalData).toEqual(mockResult);
  });
});
