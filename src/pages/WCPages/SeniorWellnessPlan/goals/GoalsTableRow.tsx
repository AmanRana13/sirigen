/* eslint-disable max-len */
import React, {useCallback} from 'react';
import clsx from 'clsx';
import {
  TableCell,
  TableRow,
  Box,
  Typography,
  ClickAwayListener,
  Popper,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {
  DATE_ERROR_MESSAGE,
  DATE_FORMAT,
  DIALOG_TYPES,
  INVALID_DATE,
} from 'globals/global.constants';
import moment from 'moment';
import {GoalStatus} from 'globals/enums';
import {InputFields} from 'common/InputFields';
import {openDialog} from 'store/commonReducer/common.action';

import {goalsStyle} from './Goals.style';
import {
  GOALS_STATUS_MENU_ITEM,
  IGoalsTableRow,
  NEW_GOALS_STATUS_MENU_ITEM,
} from './GoalsTableRow.types';
import {
  UPDATE_GOAL_CONTEXT,
  DELETE_GOAL_CONTEXT,
} from '../wellnessPlanContext/reducer';
import {AttachIconWithCount} from 'common/AttachFiles/AttachIconWithCount';
import {openResourcesDialog} from '../SeniorWellnessPlan.action';
import {WellnessPlanContext} from '../wellnessPlanContext/WellnessPlan.context';
import {statusChangeGoalActionMap, updateGoals} from 'store/goals/goals.action';
import {IGoalsTableRowData} from '../wellnessPlanContext/WellnessPlan.context.types';

const GoalsTableRow = React.memo(
  ({
    rowData,
    goalsActionMap,
    isDeleteDisable,
    goalProgressSteps,
  }: IGoalsTableRow) => {
    const {classes} = goalsStyle();
    const dispatch: any = useAppDispatch();

    const [errorTextStart, setErrorTextStart] = React.useState('');
    const [errorTextTarget, setErrorTextTarget] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {dispatchContext} = React.useContext(WellnessPlanContext);
    const {isLatestVersion} = useAppSelector(
      (state: any) => state.wellnessPlan,
    );
    const tableData = useAppSelector((state: any) => state.goals.goalsRowsData);

    const currentRow = tableData?.find(
      (data: IGoalsTableRowData) => data.id === rowData.id,
    );

    /**
     * @function handleChangeProgress
     * @description to handle goal progress percentage
     * @param event
     * @param newValue
     * @param activeThumb
     */
    const handleChangeProgress = (
      event: Event,
      newValue: number,
      activeThumb: number,
    ) => {
      /** set progress value only if the new value is greater than the previous value */
      if (currentRow?.id && newValue >= currentRow?.progress) {
        updateGoalContext(newValue, 'progress');
      }

      /** Not allow user to set progress value 100 if the goal is not saved yet */
      if (!currentRow?.id && newValue < 100) {
        updateGoalContext(newValue, 'progress');
      }
    };

    /**
     * @function handleChange
     * @description to handle change event on input fields
     * @param e
     */
    const handleChange = (e: any) => {
      const name = e.target.name;
      const value = e.target.value;

      dispatch(updateGoals(value, name, rowData, dispatchContext));
    };

    const handleDateChange = (date: any, name: string) => {
      dispatchContext({
        type: UPDATE_GOAL_CONTEXT,
        payload: {
          id: rowData.newGoalId || rowData.id,
          value: date || '',
          name,
        },
      });
    };

    const deleteGoalhandler = () => {
      const openDialogProp = {
        boldMessage: `Are you sure you want to Remove this Goal from the table?`,
        successButtonText: 'Confirm',
        type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
        isFailButton: true,
        onSuccessButton: () => {
          dispatchContext({
            type: DELETE_GOAL_CONTEXT,
            payload: {...rowData},
          });

          if (rowData.goal && rowData.action) {
            dispatch(
              statusChangeGoalActionMap(
                rowData.goal,
                rowData.action,
                rowData.newGoalId || rowData.id,
              ),
            );
          }
        },
      };
      dispatch(openDialog({...openDialogProp}));
    };
    const resourceshandler = (unsavedData: any) => {
      dispatch(openResourcesDialog(unsavedData, dispatchContext));
    };

    const goalsList = React.useMemo(() => {
      const goals = Object.values(goalsActionMap)
        .filter((item: any) => {
          if (
            !item.occupied ||
            (item.occupied &&
              item.rowIds.some(
                (item: any) => item === (rowData.newGoalId || rowData.id),
              ))
          ) {
            return item;
          }
        })
        .map((item: any) => {
          return {
            value: item.goalName,
            label: item.goalName,
          };
        });
      return goals;
    }, [goalsActionMap, rowData.id, rowData.newGoalId]);

    const actionList = React.useMemo(() => {
      if (!rowData.goal || !goalsActionMap[rowData.goal]?.actions) {
        return [];
      }
      const action = Object.values(goalsActionMap[rowData.goal].actions)
        .filter((item: any) => {
          if (
            !item.selected ||
            (item.selected &&
              item.rowId.some(
                (id: string) => id === (rowData.newGoalId || rowData.id),
              ))
          ) {
            return item;
          }
        })
        .map((item: any) => {
          return {
            value: item.actionName,
            label: item.actionName,
          };
        });
      return action;
    }, [goalsActionMap, rowData.goal, rowData.id, rowData.newGoalId]);

    const disableRow = React.useMemo(() => {
      return (
        !isLatestVersion ||
        (rowData.isEdited &&
          (currentRow?.status === GoalStatus.Completed ||
            currentRow?.status === GoalStatus.Cancelled))
      );
    }, [isLatestVersion, rowData.isEdited, currentRow?.status]);

    const disableAttach = React.useMemo(() => {
      return !(rowData.goal && rowData.action);
    }, [rowData.goal, rowData.action]);

    /**
     * @function disableGoalProgress
     * @description to disable goal percent button
     * @param status
     * @returns
     */
    const disableGoalProgress = (status: GoalStatus) => {
      const disabledValues = [
        GoalStatus.Completed,
        GoalStatus.Cancelled,
        GoalStatus.Not_Started,
      ];
      if (!isLatestVersion || disabledValues.includes(status)) {
        return true;
      }
      return false;
    };

    /**
     * @function disableGoalStatus
     * @description to disable status inputField untill goal and action was not added
     */
    const disableGoalStatus = React.useMemo(() => {
      if (rowData.goal && rowData.action) {
        return false;
      }
      return true;
    }, [rowData.goal, rowData.action]);

    /**
     * @function handleClickProgress
     * @description handle progress popup on click progress button
     * @param event
     */
    const handleClickProgress = (event: React.MouseEvent<HTMLElement>) => {
      if (!disableGoalProgress(rowData.status)) {
        setAnchorEl(event.currentTarget);
      }
    };

    /**
     * @function handleClickAway
     * @description to close the progress bar overlay
     */
    const handleClickAway = () => {
      setAnchorEl(null);
    };

    /**
     * @function updateGoalContext
     * @description to update the value of any particular field
     * @param value
     * @param name
     */
    const updateGoalContext = useCallback(
      (value: string | number | number[], name: string) => {
        dispatch(updateGoals(value, name, rowData, dispatchContext));
      },
      [dispatchContext, dispatch, rowData],
    );

    /**
     * @description to set progress on the basis of status
     */
    React.useEffect(() => {
      if (rowData.status === GoalStatus.Completed) {
        updateGoalContext(100, 'progress');
      } else {
        updateGoalContext(currentRow?.progress || 0, 'progress');
      }
      if (rowData.status === GoalStatus.Not_Started) {
        handleClickAway();
      }
    }, [rowData.status]);

    /**
     * @description to set status on the basis of progress
     */
    React.useEffect(() => {
      if (isLatestVersion) {
        if (rowData.progress === 100 && rowData.id) {
          if (
            !(
              currentRow?.status === GoalStatus.Completed ||
              currentRow?.status === GoalStatus.Cancelled
            )
          ) {
            updateGoalContext(moment().format(DATE_FORMAT), 'targetDate');
          }
          updateGoalContext(GoalStatus.Completed, 'status');
        } else {
          if (rowData.status !== GoalStatus.Completed) {
            updateGoalContext(rowData.status, 'status');
          } else {
            updateGoalContext(currentRow?.status, 'status');
          }
          updateGoalContext(currentRow?.targetDate || '', 'targetDate');
        }
      }
    }, [rowData.progress, rowData.id]);

    return (
      <React.Fragment>
        <TableRow data-testid='goalTabelRow'>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 250, minWidth: 250, verticalAlign: 'top'}}>
            <InputFields
              menu={true}
              menuItems={goalsList}
              inputProps={{name: 'goal', dataTestid: 'goalInput'}}
              // initialValue='physicalSafetyAtHome'
              initialLabel={!rowData.isNewGoal ? rowData.goal : 'Select a Goal'}
              isError={rowData.goalError}
              errorText={rowData.goalErrorText}
              eventProps={{
                value: rowData.isNewGoal ? rowData.goal : '',
                disabled: (!rowData.isNewGoal && rowData.goal) || disableRow,
                onChange: handleChange,
                title: rowData.goal,
              }}
              isErrorCustomeStyle
            />
          </TableCell>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 250, minWidth: 250, verticalAlign: 'top'}}>
            <Box display='flex' alignItems='center'>
              <InputFields
                menu={true}
                menuItems={actionList}
                inputProps={{name: 'action', dataTestid: 'actionInput'}}
                // initialValue='Activity: 2-3 personal short term goals to get active this week'
                initialLabel={
                  !rowData.isNewGoal ? rowData.action : 'Select an Action'
                }
                isError={rowData.actionError}
                errorText={rowData.actionErrorText}
                eventProps={{
                  value: rowData.isNewGoal ? rowData.action : '',
                  disabled:
                    (!rowData.isNewGoal && rowData.action) ||
                    !rowData.goal ||
                    disableRow,
                  onChange: handleChange,
                  title: rowData.action,
                }}
                isErrorCustomeStyle
              />
            </Box>
          </TableCell>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 180, minWidth: 180, verticalAlign: 'top'}}>
            <InputFields
              menu={true}
              menuItems={
                rowData.isNewGoal
                  ? NEW_GOALS_STATUS_MENU_ITEM
                  : GOALS_STATUS_MENU_ITEM
              }
              inputProps={{name: 'status'}}
              initialValue='Not Started'
              initialLabel='Select'
              eventProps={{
                value: rowData.status || '',
                onChange: handleChange,
                disabled: disableGoalStatus || disableRow,
              }}
              isErrorCustomeStyle
            />
          </TableCell>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 130, minWidth: 130, verticalAlign: 'top'}}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box style={{position: 'relative'}}>
                <Box
                  aria-describedby='progress'
                  data-testid='goalProgress'
                  onClick={handleClickProgress}
                  className={classes.progress}
                  style={{
                    backgroundColor: disableGoalProgress(rowData.status)
                      ? '#a7a7a7'
                      : '#00a9cf',
                  }}>
                  <Typography>{`${rowData.progress || 0} %`}</Typography>
                </Box>
                {/* passed some extra props to remove typescript error */}
                <Popper
                  id='progress'
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}>
                  <Box className={classes.progressBarContainer}>
                    <InputFields
                      initialValue={rowData.progress}
                      marks={goalProgressSteps}
                      slider={true}
                      step={5}
                      valueLabelDisplay='auto'
                      inputProps={{
                        name: 'progressBar',
                        classes: classes.slider,
                        dataTestid: 'progressSlider',
                      }}
                      eventProps={{
                        value: rowData.progress,
                        onChange: handleChangeProgress,
                      }}
                    />
                  </Box>
                </Popper>
              </Box>
            </ClickAwayListener>
          </TableCell>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 180, minWidth: 180, verticalAlign: 'top'}}>
            <InputFields
              controlledDate
              inputProps={{
                name: 'startDate',
              }}
              isError={errorTextStart ? true : false}
              errorText={errorTextStart}
              eventProps={{
                value: rowData.startDate || null,
                onChange: (date: string, value: any) => {
                  if (value) {
                    handleDateChange(
                      moment(value, DATE_FORMAT, true),
                      'startDate',
                    );
                  } else {
                    handleDateChange(
                      moment(date).format(DATE_FORMAT),
                      'startDate',
                    );
                  }
                },
                onError: (error: any) => {
                  switch (error) {
                    case 'invalidDate':
                      setErrorTextStart(INVALID_DATE);
                      break;
                    case 'maxDate':
                      setErrorTextStart(DATE_ERROR_MESSAGE.goals.startDate);
                      break;
                    default:
                      setErrorTextStart('');
                  }
                },
                disabled: disableRow,
                maxDate: rowData.targetDate ? rowData.targetDate : undefined,
              }}
              isErrorCustomeStyle
            />
          </TableCell>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 180, minWidth: 180, verticalAlign: 'top'}}>
            <InputFields
              controlledDate
              inputProps={{name: 'targetDate'}}
              isError={errorTextTarget ? true : false}
              errorText={errorTextTarget}
              eventProps={{
                value: rowData.targetDate || null,
                onChange: (date: string, value: any) => {
                  if (value) {
                    handleDateChange(
                      moment(value, DATE_FORMAT, true),
                      'targetDate',
                    );
                  } else {
                    handleDateChange(
                      moment(date).format(DATE_FORMAT),
                      'targetDate',
                    );
                  }
                },
                onError: (error: any) => {
                  switch (error) {
                    case 'invalidDate':
                      setErrorTextTarget(INVALID_DATE);
                      break;
                    case 'minDate':
                      setErrorTextTarget(DATE_ERROR_MESSAGE.goals.targetDate);
                      break;
                    default:
                      setErrorTextTarget('');
                  }
                },
                disabled: disableRow,
                minDate: rowData.startDate ? rowData.startDate : undefined,
              }}
              isErrorCustomeStyle
            />
          </TableCell>
          <TableCell
            className={classes.tableBodyCell}
            align='left'
            style={{maxWidth: 380, minWidth: 380, verticalAlign: 'top'}}>
            <Box>
              <InputFields
                inputProps={{
                  placeholder: 'Please enter notes here',
                  name: 'notes',
                  required: true,
                  disabled: disableRow,
                  maxLength: 2000,
                  style: {padding: 0},
                }}
                eventProps={{
                  onChange: handleChange,
                  value: rowData.notes || '',
                }}
                multiline
                rows={5}
                isLabel={false}
                label=''
                // {...data}
              />
            </Box>
          </TableCell>
          <TableCell className={classes.tableBtn} align='center'>
            <AttachIconWithCount
              onClick={() => resourceshandler(rowData)}
              disableAttach={disableAttach}
              filesCount={rowData?.resource?.length || 0}
            />
          </TableCell>
          <TableCell className={classes.tableBtn} align='left'>
            <HighlightOffIcon
              data-testid='deleteIcon'
              onClick={deleteGoalhandler}
              className={clsx({
                [classes.removeIcon]: true,
                [classes.removeIconDisable]: disableRow || isDeleteDisable,
              })}
            />
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  },
);

export default GoalsTableRow;
