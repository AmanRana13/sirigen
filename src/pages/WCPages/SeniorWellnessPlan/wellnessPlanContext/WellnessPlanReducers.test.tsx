import {create} from '_mocks_/redux-mock';
import {ADD_GOAL_CONTEXT} from './reducer';

describe('test reducers', () => {
  test('test handleAddGoals function', async () => {
    const {store, invoke} = create();
    invoke((dispatch: any) => {
      dispatch(ADD_GOAL_CONTEXT);
    });

    expect(store.dispatch).toHaveBeenCalledWith(ADD_GOAL_CONTEXT);
  });
});
