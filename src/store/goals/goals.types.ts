import { IResource } from "common/Dialogs/dialogComponents/Resources/ResourcesDialog.types";
import { GoalStatus } from "globals/enums";
import { Nullable } from "globals/global.types";

export interface IGoalsAction {
  type: string;
  payload?: any;
}

export interface IGoalItem {
  goal: string;
  action: string;
  status: string;
  start_date: string;
  target_date: string;
  notes: string;
  goal_action_id?: string;
}

export interface IGetGoalsData {
  data: IGoal[];
  lastEvaluatedKey: string;
}

export interface IGetGoalParams {
  customer_id: string;
  version?: string;
  last_evaluated_key?: string;
}
export interface IGoalDataParams {
  customer_id: string;
  role: string;
  last_updated_date: string;
  last_updated_by: string;
  careagent_id: string;
  current_version: string;
  goal_actions: IGoalItem[];
  delete_goal_action_ids?: string[];
}

export interface IGoal {
  id: string;
  goal: string;
  action: string;
  progress: number;
  status: GoalStatus;
  startDate: string;
  targetDate: string;
  notes: string;
  createdDate: string;
  resource: Nullable<IResource[]>;
}

export interface IActionMapItem {
  actionName: string;
  selected: boolean;
  rowId: string[];
}

export interface IActionMap {
  [actionName: string]: IActionMapItem;
}

export interface IGoalMapItem {
  goalName: string;
  occupied: boolean;
  actions: IActionMap;
  rowIds: string[];
}

export interface IGoalsActionMap {
  [goalName: string]: IGoalMapItem;
}

export interface IInitialStateGoals {
  goalsRowsData: IGoal[];
  goalsActionMap: IGoalsActionMap;
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}

export const intialStateGoals: IInitialStateGoals = {
  goalsRowsData: [],
  goalsActionMap: {},
  lastEvaluatedKey: '',
  loading: false,
  totalRows: 0,
  currentPage: 1,
};
