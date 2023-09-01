import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import {getLabelStepsValue} from 'globals/global.functions';

import {WellnessPlanContext} from '../wellnessPlanContext/WellnessPlan.context';
import {goalsStyle} from './Goals.style';
import GoalsTableRow from './GoalsTableRow';

const GoalsTable = React.memo(({data}: any) => {
  const {classes} = goalsStyle();
  const goalsActionMap = useAppSelector(
    (state: any) => state.goals.goalsActionMap,
  );
  const isGoalsLoading = useAppSelector((state: any) => state.goals.loading);
  const {state} = React.useContext(WellnessPlanContext);

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={300}>
              Goal
              <Box component='span' className={classes.errorText}>
                *
              </Box>
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={350}>
              Action
              <Box component='span' className={classes.errorText}>
                *
              </Box>
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={180}>
              Status
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={180}>
              Goal Percentage
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={191}>
              Start date
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={191}>
              Target date
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={480}>
              Notes
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              width={84}>
              Resources
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='center'></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isGoalsLoading ? (
            <TableRow>
              <TableCell className={classes.noData} colSpan={14} align='center'>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <React.Fragment>
              {data.length === 0 && (
                <TableRow>
                  <TableCell className={classes.noData} colSpan={8}>
                    No Record Found
                  </TableCell>
                </TableRow>
              )}
              {data.map((tableData: any) => (
                <GoalsTableRow
                  key={tableData.id || tableData.newGoalId}
                  goalsActionMap={goalsActionMap}
                  rowData={tableData}
                  goalProgressSteps={getLabelStepsValue(5, 100)}
                  isDeleteDisable={state.goalsRowsData.length === 1}
                />
              ))}
            </React.Fragment>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default GoalsTable;
