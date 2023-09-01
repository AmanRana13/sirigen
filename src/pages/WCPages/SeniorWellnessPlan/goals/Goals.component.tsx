import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import {goalsStyle} from './Goals.style';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import GoalsTable from './GoalsTable';
import {
  getGoalActionMap,
  getGoalsData,
  getGoalsFail,
  getGoalsSuccess,
  resetGoals,
  updateGoalsPageNumber,
} from 'store/goals/goals.action';
import withPaginationTable from 'hoc/withPaginationIsolated';
import {PAGINATION_LIMIT} from 'globals/global.constants';
import {WellnessPlanContext} from '../wellnessPlanContext/WellnessPlan.context';
import {
  ADD_GOAL_CONTEXT,
  GET_GOALS_CONTEXT,
} from '../wellnessPlanContext/reducer';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';
import {PaginationFetchTypes, PAGINATION_TYPE} from 'globals/enums';

interface IGoalsProps {
  customerID: string;
}

const Goals = React.memo(({customerID}: IGoalsProps) => {
  const {classes} = goalsStyle();
  const dispatch: any = useAppDispatch();
  const {state, dispatchContext} = React.useContext(WellnessPlanContext);

  const page = useAppSelector((state: any) => state.goals.currentPage);
  const tableData = useAppSelector((state: any) => state.goals.goalsRowsData);
  const isLatestVersion = useAppSelector(
    (state: any) => state.wellnessPlan.isLatestVersion,
  );

  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        getData: () => getGoalsData(customerID),
        onSuccess: getGoalsSuccess,
        onError: getGoalsFail,
        onPageChange: updateGoalsPageNumber,
        // cacheKey: `${TABLE_CACHE_KEY.GOALS}-${seniorId}`,
        rowsPerPage: PAGINATION_LIMIT.goals,
        className: '',
        lastEvaluatedKeyPath: 'goals.lastEvaluatedKey',
        loadingPath: 'goals.loading',
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: 'goals.currentPage',
        tableData: [...state.goalsRowsData],
      },
    };
  }, [state.goalsRowsData, state.newGoals, customerID]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const GoalsWithPagination = withPaginationTable(
    GoalsTable,
    {},
    withPaginationProps,
  );

  const handleAddGoals = () => {
    dispatchContext({type: ADD_GOAL_CONTEXT});

    if (page !== 1) {
      dispatch(updateGoalsPageNumber(1));
    }
  };

  const isDisableAddGoal = React.useMemo(() => {
    if (!isLatestVersion) {
      return !isLatestVersion;
    }
    return state.goalsRowsData.some((data: any) => {
      return !data.goal || !data.action;
    });
  }, [state.goalsRowsData, isLatestVersion]);

  React.useEffect(() => {
    dispatchContext({type: GET_GOALS_CONTEXT, payload: tableData});
  }, [tableData, dispatchContext]);

  React.useEffect(() => {
    if (customerID) {
      dispatch(getGoalActionMap(customerID));
    }
  }, [customerID]);

  React.useEffect(() => {
    return () => {
      dispatch(resetGoals());
    };
  }, [dispatch]);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.goalsHeader}>
          <Typography
            className={classes.goalsTableHeading}
            variant='h6'
            style={{fontWeight: 500}}>
            Goals:
            <Box component='span' className={classes.errorText}>
              *
            </Box>
          </Typography>
          <Button
            // className={globalClasses.smallButtonOutlined}
            variant='contained'
            color='primary'
            size='large'
            disabled={isDisableAddGoal}
            onClick={handleAddGoals}>
            Add Goal
          </Button>
        </Box>
        <Box style={{height: '100%'}}>{GoalsWithPagination()}</Box>
      </Box>
    </>
  );
});

export default Goals;
