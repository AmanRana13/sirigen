import GoalDataModel from './goalDataModel';
import GoalActionMapModel from './goalActionMapModel';

describe('test goal data model', () => {
  test('types of goal data model', () => {
    const goalDataModel = new GoalDataModel(
      [],
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      '',
    );
    expect(typeof goalDataModel.notes).toBe('string');
  });
  test('types of goalActionMap model', () => {
    const goalActionMap = new GoalActionMapModel(
      '',
      false,
      {
        flu_prevention: {
          actionName: 'flu prevention',
          selected: false,
          rowId: [],
        },
      },
      [],
    );
    expect(typeof goalActionMap.goalName).toBe('string');
  });
});
