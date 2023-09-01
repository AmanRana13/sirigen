import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import {startCase} from 'lodash';

import {assessmentStyle} from '../../AssessmentTable.style';

const CountTable = (props: any) => {
  const {classes} = assessmentStyle();

  const surveyCountData = React.useMemo(() => {
    return Object.entries(props.surveyCount).map((data) => {
      return {
        surveyName: startCase(data[0]),
        surveyCount: data[1],
      };
    });
  }, [props.surveyCount]);

  return (
    <TableContainer
      className={classes.tableContainer}
      data-testid='countTableComponent'>
      <Table size='medium' className={classes.table}>
        <TableHead>
          <TableRow>
            {surveyCountData.map((data: any) => {
              return (
                <TableCell align='center' key={data.surveyName}>
                  {data.surveyName}
                </TableCell>
              );
            })}
            <TableCell align='center'>Total Score</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            {surveyCountData.map((data: any) => {
              return (
                <TableCell align='center' key={data.surveyName}>
                  {data.surveyCount}
                </TableCell>
              );
            })}
            <TableCell align='center'>{props.totalScore}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CountTable;
