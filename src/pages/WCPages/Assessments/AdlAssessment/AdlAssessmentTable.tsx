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

import {assessmentStyle} from '../AssessmentTable.style';

const AdlAssessmenttable = React.memo(
  ({
    labelPrefix = '',
    label,
    surveyState,
    tableData,
    setTableData,
    formError,
    isHistory,
  }: any) => {
    const {classes} = assessmentStyle();
    const getValue = (radioData: any) => {
      const selectedOption = radioData?.find((data: any) => data.score === 1);
      return selectedOption?.label || '';
    };

    /**
     * @description handle method when we click on any radio button answers
     * @param {React.ChangeEvent<HTMLInputElement>} e
     * @param {string} title
     */
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      title: string,
    ) => {
      const previousState: any = surveyState;
      const currentState = previousState.map((data: any) => {
        const newValue = data.options.map((option: any) => {
          if (option.label == e.target.value) {
            return {
              ...option,
              score: 1,
            };
          } else return {...option, score: 0};
        });
        if (data.title === title) {
          return {...data, options: newValue};
        } else {
          return {
            ...data,
          };
        }
      });

      setTableData(currentState);
    };

    return (
      <TableContainer
        className={classes.tableContainer}
        data-testid='AdlAssessmentTableComponent'>
        {tableData && (
          <Table size='medium' className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    className={classes.tableHeadingText}
                    style={{
                      color:
                        getValue(tableData) == '' && formError && '#cc0000',
                    }}>
                    {labelPrefix ? `${labelPrefix}. ${label}` : label}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='left'>
                  <Box display='flex' flexDirection='column'>
                    <InputFields
                      isError={getValue(tableData) == '' && formError}
                      showRadioLabel={true}
                      radio={true}
                      className={classes.optionsRadioField}
                      inputProps={{
                        style: {
                          display: 'flex',
                          flexDirection: 'column',
                        },
                        name: `radio`,
                        disabled: isHistory,
                      }}
                      eventProps={{
                        value: getValue(tableData),
                        onChange: (e: any) => handleChange(e, label),
                      }}
                      radioItems={tableData.map((option: any) => {
                        return {
                          value: option.label,
                          label: `${option.value}-${option.label}`,
                        };
                      })}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
    );
  },
);

export default AdlAssessmenttable;
