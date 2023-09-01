import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from '@mui/material';

import {InputFields} from 'common/InputFields';

import {assessmentStyle} from '../../AssessmentTable.style';

const HolisticTable = React.memo(
  ({
    holisticKey,
    label,
    count,
    setCount,
    tableData,
    setTableData,
    formError,
    isHistory,
  }: any) => {
    const {classes} = assessmentStyle();
    const maxScore = tableData.length;
    React.useEffect(() => {
      let totalCount = 0;
      tableData.map((item: any) => {
        if (item.always) {
          totalCount += 3;
        } else if (item.sometimes) {
          totalCount += 2;
        } else if (item.never) {
          totalCount += 1;
        }
      });
      setCount((prevState: any) => {
        return {...prevState, [holisticKey]: totalCount};
      });
    }, [tableData]);

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

    const handleChange = (
      question: string,
      value: string,
      surveyName: string,
    ) => {
      setTableData((prevState: any) => {
        return {
          ...prevState,
          [surveyName]: prevState[surveyName].map((data: any) => {
            if (data.question === question) {
              return {
                ...data,
                always: 0,
                never: 0,
                sometimes: 0,
                [value]: 1,
              };
            } else return data;
          }),
        };
      });
    };

    return (
      <TableContainer
        className={classes.tableContainer}
        data-testid='holisticTableComponent'>
        <Table size='medium' className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.tableHeadingText}>
                  {label}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  fontSize={16}>
                  <Box pr={2}>Never</Box>
                  <Box pr={2}>Sometimes</Box>
                  <Box>Always</Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead className={classes.secondAbsoluteRow}>
            <TableRow>
              <TableCell
                align='center'
                style={{
                  borderBottom: 0,
                }}>
                Total(Max Score is {maxScore * 3})= {count[holisticKey]}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row: any, index: any) => (
                <TableRow key={row.question}>
                  <TableCell
                    component='th'
                    scope='row'
                    style={{
                      color:
                        getValue(row) == '' && formError ? '#cc0000' : '#000',
                    }}>
                    {index + 1}.) {row.question}*
                  </TableCell>
                  <TableCell align='center' width={20}>
                    <Box display='flex' justifyContent='space-between'>
                      <InputFields
                        isError={getValue(row) == '' && formError}
                        radio={true}
                        className={classes.radioField}
                        inputProps={{
                          name: `${holisticKey}${index}`,
                          disabled: isHistory,
                        }}
                        eventProps={{
                          value: getValue(row),
                          onChange: (e: any) =>
                            handleChange(
                              row.question,
                              e.target.value,
                              holisticKey,
                            ),
                        }}
                        radioItems={[
                          {
                            value: 'never',
                            label: 'Never',
                          },
                          {value: 'sometimes', label: 'Sometimes'},
                          {
                            value: 'always',
                            label: 'Always',
                          },
                        ]}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
);

export default HolisticTable;
