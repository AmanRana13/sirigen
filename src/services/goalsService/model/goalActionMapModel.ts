export interface IActionMapItem {
  actionName: string;
  selected: boolean;
  rowId: string[]
}

export interface IActionMap {
  [actionName: string]: IActionMapItem;
}


class GoalActionMapModel {
  goalName: string;
  occupied: boolean;
  actions: IActionMap;
  rowIds: string[];

  constructor(goalName: string, occupied: boolean, actions: IActionMap, rowIds: string[]) {
    this.goalName = goalName;
    this.occupied = occupied;
    this.actions = actions;
    this.rowIds = rowIds;
  }
}


export default GoalActionMapModel;
