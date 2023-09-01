import {GoalStatus} from 'globals/enums';
export const MockedGoalRowData = {
  goalsRowsData: {
    action: '',
    goal: '',
    id: '',
    progress: 0,
    isNewGoal: true,
    newGoalId: 1,
    notes: '',
    startDate: '',
    status: GoalStatus.Not_Started,
    targetDate: '',
    createdDate: '23/11/2022',
    isEdited: false,
    actionError: false,
    actionErrorText: '',
    goalError: false,
    goalErrorText: '',
    resource: []
  },

  goalsActionMap: {},
  lastEvaluatedKey: '',
  loading: false,
  totalRows: 0,
  currentPage: 1,
};

export const savedGoal = {
  action: 'goal action 1',
  goal: 'goal 1',
  id: '1',
  progress: 0,
  isNewGoal: false,
  newGoalId: 1,
  notes: '',
  startDate: '23/11/2022',
  status: GoalStatus.Started,
  targetDate: '',
  createdDate: '23/11/2022',
  isEdited: true,
  actionError: false,
  actionErrorText: '',
  goalError: false,
  goalErrorText: '',
  resource: []
};

export const MockedGoalRowStartedData = {
  ...MockedGoalRowData.goalsRowsData,
  status: GoalStatus.Started
}