import {GoalStatus} from 'globals/enums';
import {IGoalsTableRowData} from '../wellnessPlanContext/WellnessPlan.context.types';

export const GOALS_STATUS_MENU_ITEM = [
  {
    value: GoalStatus.Started,
    label: 'Started',
  },
  {
    value: GoalStatus.Not_Started,
    label: 'Not Started',
  },
  {value: GoalStatus.In_Progress, label: 'In Progress'},
  {
    value: GoalStatus.Cancelled,
    label: 'Cancelled',
  },
  {
    value: GoalStatus.Completed,
    label: 'Completed',
  },
];

export const NEW_GOALS_STATUS_MENU_ITEM = [
  {
    value: GoalStatus.Started,
    label: 'Started',
  },
  {
    value: GoalStatus.Not_Started,
    label: 'Not Started',
  },
  {value: GoalStatus.In_Progress, label: 'In Progress'},
];

export interface IGoalProgressSteps {
  value: number;
  label: string;
}

export interface IGoalsTableRow {
  rowData: IGoalsTableRowData;
  goalsActionMap: any;
  isDeleteDisable: boolean;
  goalProgressSteps: IGoalProgressSteps[];
}
export interface IGoalProgress {
  currentRow: IGoalsTableRowData;
  setGoalProgress: (goalProgress: number | number[]) => void;
  goalProgress: number | number[];
  rowData: IGoalsTableRowData;
}
