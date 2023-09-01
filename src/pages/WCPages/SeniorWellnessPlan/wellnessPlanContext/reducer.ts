import {GoalStatus} from 'globals/enums';

export const GET_GOALS_CONTEXT = 'GET_GOALS_CONTEXT';
export const ADD_GOAL_CONTEXT = 'ADD_GOAL_CONTEXT';
export const UPDATE_GOAL_CONTEXT = 'UPDATE_GOAL_CONTEXT';
export const UPDATE_GOAL_ERROR = 'UPDATE_GOAL_ERROR';
export const DELETE_GOAL_CONTEXT = 'DELETE_GOAL_CONTEXT';

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_GOALS_CONTEXT:
      return {
        ...state,
        deleteRowsData: [],
        goalsRowsData:
          action.payload.length > 0
            ? JSON.parse(JSON.stringify([...action.payload]))
            : [
                {
                  id: '',
                  goal: '',
                  action: '',
                  status: 'not_started',
                  startDate: '',
                  targetDate: '',
                  notes: '',
                  isNewGoal: true,
                  newGoalId: 1,
                },
              ],
      };

    case ADD_GOAL_CONTEXT:
      return {
        ...state,
        goalsRowsData: [
          {
            id: '',
            goal: '',
            action: '',
            status: 'not_started',
            progress: 0,
            startDate: '',
            targetDate: '',
            notes: '',
            isNewGoal: true,
            newGoalId: (state.goalsRowsData[0]?.newGoalId || 1) + 1,
          },
          ...state.goalsRowsData,
        ],
      };

    case UPDATE_GOAL_CONTEXT:
      return {
        ...state,
        goalsRowsData: [...state.goalsRowsData].map((data) => {
          if ((data.id || data.newGoalId) === action.payload.id) {
            data[action.payload.name] = action.payload.value;
            data.isEdited = true;
            if (action.payload.name === 'goal') {
              data.goalErrorText = '';
              data.goalError = false;
              data.action = '';
            }
            if (action.payload.name === 'action') {
              data.actionErrorText = '';
              data.actionError = false;
            }
            return data;
          }
          return data;
        }),
      };

    case UPDATE_GOAL_ERROR: {
      return {
        ...state,
        goalsRowsData: [...action.payload],
      };
    }

    case DELETE_GOAL_CONTEXT: {
      const deleteGoal = state.goalsRowsData.find((data: any) => {
        if (data.id === action.payload.id && !data.isNewGoal) {
          return action.payload.id;
        }
      });

      if (deleteGoal?.id) {
        deleteGoal.status = GoalStatus.Deleted;
      }

      const updatedArray = state.goalsRowsData.filter(
        (data: any) =>
          (data.isNewGoal ? data.newGoalId : data.id) !==
          (action.payload.id || action.payload.newGoalId),
      );

      return {
        ...state,
        goalsRowsData: [...updatedArray],
        deleteRowsData: deleteGoal?.id
          ? [deleteGoal, ...state.deleteRowsData]
          : [...state.deleteRowsData],
      };
    }
    default:
      return state;
  }
};
