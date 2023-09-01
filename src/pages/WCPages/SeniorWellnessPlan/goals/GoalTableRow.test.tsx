{
  /* eslint-disable max-len */
}
import {render, fireEvent, screen, within} from '../../../utilities/test-utils';

import GoalsTableRow from './GoalsTableRow';
import GoalsTable from './GoalsTable';
import Goals from './Goals.component';
import {
  ADD_GOAL_CONTEXT,
  DELETE_GOAL_CONTEXT,
  GET_GOALS_CONTEXT,
} from '../wellnessPlanContext/reducer';
import {store} from 'store';
import {updateGoalsPageNumber} from 'store/goals/goals.action';
import {
  MockedGoalRowData,
  MockedGoalRowStartedData,
  savedGoal,
} from '_mocks_/goalMockedData';

const goals = {
  currentPage: 1,
  goalsActionMap: {},
  goalsRowsData: [],
  lastEvaluatedKey: '',
  loading: false,
  totalRows: 0,
};

const dispatch: any = jest.fn();
const dispatchContext = jest.fn();
const renderGoalTableRow = () => {
  render(
    <GoalsTableRow
      rowData={MockedGoalRowData.goalsRowsData}
      goalsActionMap={jest.fn()}
      isDeleteDisable={true}
      goalProgressSteps={[]}
    />,
  );
};
const renderStartedGoal = () => {
  render(
    <GoalsTableRow
      rowData={MockedGoalRowStartedData}
      goalsActionMap={jest.fn()}
      isDeleteDisable={true}
      goalProgressSteps={[]}
    />,
  );
};

describe('GoalTable', () => {
  test('should render GoalTableRow in GoalTable', async () => {
    render(<GoalsTable data={[MockedGoalRowData.goalsRowsData]} />);

    const element = screen.queryByTestId(/goalTabelRow/i);

    expect(element).toBeTruthy();
  });
});

describe('Goal component', () => {
  test('should render Add Goal button ', async () => {
    render(<Goals />);

    const element = screen.getByRole('button', {name: /add goal/i});
    expect(element).toBeEnabled();
    fireEvent.click(element);

    expect(element).toBeInTheDocument();
  });

  test('should render Goal on click Add Goal button ', async () => {
    render(<Goals />);

    const button = screen.getByRole('button', {name: /add goal/i});
    fireEvent.click(button);
    await dispatchContext({type: ADD_GOAL_CONTEXT});

    expect(store.getState().goals).toEqual(goals);
  });

  test('should dispatch updateGoalsPageNumber on click Add Goal button if page !=1', async () => {
    render(<Goals />);

    const button = screen.getByRole('button', {name: /add goal/i});
    fireEvent.click(button);
    await dispatchContext({type: ADD_GOAL_CONTEXT, payLoad: {currentPage: 2}});
    dispatch(updateGoalsPageNumber(1));

    expect(store.getState().goals.currentPage).toEqual(1);
  });
});

describe('GoalTableRow', () => {
  test('should render GoalTabelRow', async () => {
    renderGoalTableRow();
    const element = screen.queryByTestId(/goalTabelRow/i);
    expect(element).toBeTruthy();
  });

  test('should render StartDate and targetDate Input Field', async () => {
    renderGoalTableRow();
    const element = screen.getAllByPlaceholderText('MM/DD/YYYY');

    expect(element.length).toBe(2);
  });

  test('should change StartDate on Changing Date', async () => {
    renderGoalTableRow();
    const element = screen.getAllByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(element[0], {target: {value: '04/23/2022'}});

    expect(element[0]).toHaveValue('04/23/2022');
  });

  test('should change targetDate on Changing Date', async () => {
    renderGoalTableRow();
    const element = screen.getAllByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(element[1], {target: {value: '04/23/2022'}});

    expect(element[1]).toHaveValue('04/23/2022');
  });

  test('should render note input', async () => {
    renderGoalTableRow();
    const element = screen.getAllByPlaceholderText(/Please enter notes here/i);

    expect(element).toBeTruthy();
  });

  test('should render  Goal input  ', async () => {
    renderGoalTableRow();
    const goalInput = screen.getByTestId('goalInput');

    expect(goalInput).toBeInTheDocument();
  });

  test('should render  action input  ', async () => {
    renderGoalTableRow();
    const actionInput = screen.getByTestId('actionInput');

    expect(actionInput).toBeInTheDocument();
  });

  test('should render status input field', async () => {
    renderGoalTableRow();
    const Input = screen.getByRole('button', {name: 'Not Started'});

    expect(Input).toBeInTheDocument();
  });

  test('should render Goal progress percent button', async () => {
    renderGoalTableRow();
    const goalProgressButton = screen.getByTestId('goalProgress');

    expect(goalProgressButton).toBeInTheDocument();
  });

  test('should render progress slider on click goalprogress button', async () => {
    renderStartedGoal();
    const goalProgressButton = screen.getByTestId('goalProgress');
    fireEvent.click(goalProgressButton);
    const progressSlider = screen.getByTestId('progressSlider');

    expect(progressSlider).toBeInTheDocument();
  });

  test('should change the progress value on sliding progress bar', async () => {
    renderStartedGoal();
    const goalProgressButton = screen.getByTestId('goalProgress');
    fireEvent.click(goalProgressButton);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 25}});

    expect(slider).toHaveValue('25');
  });

  test('should not allow to set the progress value to 100 on sliding progress bar if goal is not saved yet', async () => {
    renderStartedGoal();
    const goalProgressButton = screen.getByTestId('goalProgress');
    fireEvent.click(goalProgressButton);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 100}});

    expect(slider).toHaveValue('0');
  });

  test('should allow to set the progress value to 100 on sliding progress bar if goal is once saved ', async () => {
    render(
      <GoalsTableRow
        rowData={savedGoal}
        goalsActionMap={jest.fn()}
        isDeleteDisable={true}
        goalProgressSteps={[]}
      />,
      {initialState: {goals: {goalsRowsData: [savedGoal]}}},
    );
    const goalProgressButton = screen.getByTestId('goalProgress');
    fireEvent.click(goalProgressButton);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, {target: {value: 100}});

    expect(slider).toHaveValue('100');
  });

  test('should render  delete Icon  ', async () => {
    renderGoalTableRow();
    const deleteButton = screen.getByTestId('deleteIcon');

    expect(deleteButton).toBeInTheDocument();
  });

  test(' on click delete Icon  ', async () => {
    renderGoalTableRow();
    const deleteButton = screen.getByTestId('deleteIcon');
    fireEvent.click(deleteButton);
    dispatchContext({
      type: DELETE_GOAL_CONTEXT,
      payload: {...MockedGoalRowData.goalsRowsData},
    });

    expect(store.getState().goals).toEqual(goals);
  });

  test('should get goal data on dispatch GET_GOALS_CONTEXT ', async () => {
    dispatchContext({
      type: GET_GOALS_CONTEXT,
    });

    expect(store.getState().goals).toEqual(goals);
  });
});
