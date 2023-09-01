import {IGoal} from 'store/goals/goals.types';

export interface IGoalsTableRowData extends IGoal {
  newGoalId: number;
  isEdited: boolean;
  isNewGoal: boolean;
  actionError: boolean;
  actionErrorText: string;
  goalError: boolean;
  goalErrorText: string;
}

export interface IInitialStateContext {
  goalsRowsData: IGoalsTableRowData[];
  deleteRowsData: IGoalsTableRowData[];
}

export const initialState: IInitialStateContext = {
  goalsRowsData: [],
  deleteRowsData: [],
};
