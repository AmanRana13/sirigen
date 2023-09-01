import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  CircularProgress,
} from '@mui/material';

import {InputFields} from 'common/InputFields';

import {assessmentStyle} from '../../AssessmentTable.style';
import {
  IAssessmentTableProps,
  ICareGiverStrainAssessmentOptions,
} from '../CaregiverStrainAssessment.type';
import clsx from 'clsx';
import {assessmentScore} from 'globals/global.constants';
import {CGAssessmentOptions} from 'globals/enums';

const CaregiverStrainTable = React.memo(
  ({
    tableData,
    setTableData,
    formError,
    isHistory,
    setResponses,
    isCaregiverSelected,
    isLoading,
  }: IAssessmentTableProps) => {
    const {classes} = assessmentStyle();

    /**
     * @description function to get value of selected radio option
     * */

    const getValue = (radioData: ICareGiverStrainAssessmentOptions) => {
      if (radioData.no) {
        return CGAssessmentOptions.NO;
      } else if (radioData.sometimes) {
        return CGAssessmentOptions.SOMETIMES;
      } else if (radioData.regular) {
        return CGAssessmentOptions.REGULAR;
      } else {
        return '';
      }
    };

    /**
     * @description to calculate response
     */
    React.useEffect(() => {
      let no = assessmentScore.NotSelected;
      let sometimes = assessmentScore.NotSelected;
      let regular = assessmentScore.NotSelected;

      tableData.forEach((item: ICareGiverStrainAssessmentOptions) => {
        if (item.regular) {
          regular += 1;
        } else if (item.sometimes) {
          sometimes += 1;
        } else if (item.no) {
          no += 1;
        }
      });
      setResponses({no: no, sometimes: sometimes, regular: regular});
    }, [tableData]);

    /**
     * @description to change radio input
     */
    const handleChange = (question: string, value: string) => {
      const previousState: any = tableData;
      const currentState = previousState.map((data: any) => {
        if (data.question === question) {
          return {
            ...data,
            regular: assessmentScore.NotSelected,
            no: assessmentScore.NotSelected,
            sometimes: assessmentScore.NotSelected,
            [value]: assessmentScore.Selected,
          };
        } else return data;
      });
      setTableData(currentState);
    };

    return (
      <TableContainer
        className={classes.tableContainer}
        style={{marginBottom: 0}}
        data-testid='caregiverStrainTableComponent'>
        <Table size='medium' className={classes.table}>
          {isLoading ? (
            <TableRow>
              <TableCell component='th' align='center' scope='row'>
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  height={500}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            <>
              <TableHead>
                <TableRow>
                  <TableCell width='70%'></TableCell>
                  <TableCell align='center' width='30%'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      fontSize={16}
                      position='relative'>
                      <Box pr={3} width='38%'>
                        Yes, On a Regular Basis
                      </Box>
                      <Box pr={4} width='35%'>
                        Yes, Sometimes
                      </Box>
                      <Box pl={4} width='20%'>
                        No
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row: any, index: any) => (
                  <TableRow key={row.question}>
                    <TableCell
                      component='th'
                      scope='row'
                      className={clsx(classes.tableText, {
                        [classes.errorText]: getValue(row) == '' && formError,
                      })}>
                      {index + 1}. {row.question}
                      <span className={classes.errorText}>*</span>
                      {row.example && <Box>Example - {row.example}</Box>}
                    </TableCell>
                    <TableCell align='center'>
                      <Box
                        pl={4}
                        display='flex'
                        justifyContent='space-between'
                        position='relative'>
                        <InputFields
                          isError={getValue(row) == '' && formError}
                          radio={true}
                          className={classes.radioField}
                          inputProps={{
                            dataTestid: 'radio',
                            name: `${index}`,
                            disabled: isHistory || !isCaregiverSelected,
                          }}
                          eventProps={{
                            value: getValue(row),
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleChange(row.question, e.target.value),
                          }}
                          radioItems={[
                            {
                              value: 'regular',
                              label: 'Yes, On a RegularBasis',
                            },
                            {value: 'sometimes', label: 'yes, Sometimes'},
                            {
                              value: 'no',
                              label: 'No',
                            },
                          ]}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    );
  },
);

export default CaregiverStrainTable;
