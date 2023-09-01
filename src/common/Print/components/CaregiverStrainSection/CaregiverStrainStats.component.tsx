/* eslint-disable max-len */
import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {withStyles} from 'tss-react/mui';
import {
  assessmentScore,
  CGAssessmentResponseValues,
} from 'globals/global.constants';
import {calculatePercentage} from 'globals/global.functions';
import {caregiverStrainSectionStyles} from './CaregiverStrainSection.style';
import {ICaregiverStrainStatsProps} from './CaregiverStrainSection.types';
import {
  ICaregiverStrainAssessmentSurveyData,
  ICountTableRows,
} from 'pages/WCPages/Assessments/CaregiverStrainAssessment/CaregiverStrainAssessment.type';

const TableCell = withStyles(MuiTableCell, {
  root: {
    padding: '5px 0',
  },
});

const CaregiverStrainStats = (props: ICaregiverStrainStatsProps) => {
  const {data = []} = props;
  const [responses, setResponses] = React.useState({
    no: 0,
    sometimes: 0,
    regular: 0,
  });
  /**
   * @description to calculate response
   */
  React.useEffect(() => {
    let no = assessmentScore.NotSelected;
    let sometimes = assessmentScore.NotSelected;
    let regular = assessmentScore.NotSelected;

    data.forEach((item: ICaregiverStrainAssessmentSurveyData) => {
      if (item.regular) {
        regular += 1;
      } else if (item.sometimes) {
        sometimes += 1;
      } else if (item.no) {
        no += 1;
      }
    });
    setResponses({no: no, sometimes: sometimes, regular: regular});
  }, [data]);
  const maxScore = data.length * 2;
  const scoreOfNo = responses.no * CGAssessmentResponseValues.No;
  const scoreOfSometimes =
    responses.sometimes * CGAssessmentResponseValues.Sometimes;
  const scoreOfRegular = responses.regular * CGAssessmentResponseValues.Regular;

  const totalScore: number = React.useMemo(() => {
    return responses.no * 0 + responses.sometimes * 1 + responses.regular * 2;
  }, [responses]);
  const scorePercent = calculatePercentage(totalScore, maxScore);
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
  const {classes} = caregiverStrainSectionStyles();
  return (
    <TableContainer className={classes.statsTableContainer}>
      <Table>
        <TableBody>
          {responseTableRows.map((row: ICountTableRows) => {
            return (
              <TableRow key={row.rowHeader}>
                <TableCell className={classes.statsTable}>
                  <Box className={classes.statsHeader}>{row.rowHeader}</Box>
                  <Box className={classes.statsValueSection}>
                    <Box className={classes.statsText}>{row.column1}</Box>
                    <Box className={classes.statsText}>{row.column2}</Box>
                    <Box className={classes.statsText}>{row.column3}</Box>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell className={classes.statsTable}>
              <Box className={classes.statsHeader}>Score:</Box>
              <Box
                className={classes.statsHeader}
                style={{marginRight: '36px'}}>
                {totalScore}/{maxScore}={scorePercent}%
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CaregiverStrainStats;
