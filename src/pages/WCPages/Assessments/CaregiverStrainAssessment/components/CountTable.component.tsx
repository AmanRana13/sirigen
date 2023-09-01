import React from 'react';

import {
  Box,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

import clsx from 'clsx';
import {calculatePercentage} from 'globals/global.functions';
import {CGAssessmentResponseValues} from 'globals/global.constants';

import {
  ICountTableProps,
  ICountTableRows,
} from '../CaregiverStrainAssessment.type';
import {countTableStyle} from './countTable.component.style';

const CountTable = ({
  responses,
  totalScore,
  maximumScore,
  isCaregiverSelected,
}: ICountTableProps) => {
  const {classes} = countTableStyle();

  const scoreOfNo = responses.no * CGAssessmentResponseValues.No;
  const scoreOfSometimes =
    responses.sometimes * CGAssessmentResponseValues.Sometimes;
  const scoreOfRegular = responses.regular * CGAssessmentResponseValues.Regular;
  const scorePercent = calculatePercentage(totalScore, maximumScore);
  const responseTableRows: ICountTableRows[] = [
    {
      rowHeader: 'Response Count:',
      column1: responses.regular,
      column2: responses.sometimes,
      column3: responses.no,
    },
    {
      rowHeader: 'Points:',
      column1: scoreOfRegular,
      column2: scoreOfSometimes,
      column3: scoreOfNo,
    },
  ];
  return (
    <Box display='flex' justifyContent='right'>
      <TableContainer
        className={classes.responseTableContainer}
        data-testid='countTableComponent'>
        <Table size='medium' className={classes.responseTable}>
          <TableBody>
            {responseTableRows.map((row: ICountTableRows) => {
              return (
                <TableRow key={row.rowHeader}>
                  <TableCell>{row.rowHeader}</TableCell>
                  <TableCell align='center' width='55%'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      fontSize={16}
                      className={clsx(classes.tableText, {
                        [classes.disabledText]: !isCaregiverSelected,
                      })}>
                      <Box width={40}>{row.column1}</Box>
                      <Box width={30}> {row.column2}</Box>
                      <Box width={30}>{row.column3}</Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>Score:</TableCell>
              <TableCell
                align='left'
                width='55%'
                className={clsx(classes.tableText, {
                  [classes.disabledText]: !isCaregiverSelected,
                })}>
                {totalScore}/{maximumScore}={scorePercent}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default CountTable;
