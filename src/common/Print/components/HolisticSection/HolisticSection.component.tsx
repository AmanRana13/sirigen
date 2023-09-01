/* eslint-disable max-len */
import {
  Box,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {InputFields} from '../InputFields';
import React from 'react';
import {holisticSectionStyles} from './HolisticSection.style';
import {withStyles} from 'tss-react/mui';
import {getScore} from 'common/Print/Print.utility';
import {IHolisicSectionProps} from './HolisticSection.types';
import {IHolisticAssessmentSurveyData} from 'pages/WCPages/Assessments/HolisticAssessment/HolisticAssessment.types';

const getValue = (radioData: any) => {
  if (radioData.never == 1) {
    return 'never';
  } else if (radioData.sometimes == 1) {
    return 'sometimes';
  } else if (radioData.always == 1) {
    return 'always';
  } else {
    return '';
  }
};

const TableCell = withStyles(MuiTableCell, {
  root: {
    borderBottom: 'none',
    padding: '5px 0',
  },
});

const HolisticSection = (props: IHolisicSectionProps) => {
  const {heading = '', data = []} = props;
  const maxScore = React.useMemo(() => data.length * 3, [data]);
  const totalScore = React.useMemo(
    () =>
      data.reduce(
        (acc: number, b: IHolisticAssessmentSurveyData) => acc + getScore(b),
        0,
      ),
    [data],
  );
  const {classes} = holisticSectionStyles();
  return (
    <Box
      component='section'
      className={classes.section}
      data-testid='print-holistic-section'>
      <Box className={classes.header}>
        <div className={classes.heading}>{heading}</div>
        <div className={classes.tableHeading} style={{paddingRight: '30px'}}>
          {`Total(Max Score is ${maxScore})= ${totalScore}`}
        </div>
      </Box>
      <Box className={classes.container}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <div style={{width: '1580px'}}></div>
                </TableCell>
                <TableCell align='right'>
                  <Box className={classes.radioGroupHeader}>
                    <Box className={classes.tableHeading}>Never</Box>
                    <Box className={classes.tableHeading}>Sometimes</Box>
                    <Box className={classes.tableHeading}>Always</Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: IHolisticAssessmentSurveyData, index: number) => (
                <TableRow key={row.question}>
                  <TableCell component='th' scope='row'>
                    <Box className={classes.tableContent}>
                      <Box>{index + 1}.)</Box>
                      <Box>
                        {row.question}
                        <span style={{color: '#cc0000'}}>*</span>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      width='520px'
                      padding='0 36px'>
                      <InputFields
                        className={classes.radioGroup}
                        radio={true}
                        inputProps={{
                          name: 'row.question',
                        }}
                        eventProps={{
                          value: getValue(row),
                        }}
                        radioItems={[
                          {value: 'never', label: 'Never'},
                          {value: 'sometimes', label: 'Sometimes'},
                          {value: 'always', label: 'Always'},
                        ]}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HolisticSection;
