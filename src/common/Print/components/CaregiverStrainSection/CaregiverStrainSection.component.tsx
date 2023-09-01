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
import {withStyles} from 'tss-react/mui';
import {caregiverStrainSectionStyles} from './CaregiverStrainSection.style';
import {CGAssessmentOptions} from 'globals/enums';
import {
  ICareGiverStrainAssessmentOptions,
  ICaregiverStrainAssessmentSurveyData,
} from 'pages/WCPages/Assessments/CaregiverStrainAssessment/CaregiverStrainAssessment.type';
import {ICaregiverStrainSectionProps} from './CaregiverStrainSection.types';

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

const TableCell = withStyles(MuiTableCell, {
  root: {
    borderBottom: 'none',
    padding: '5px 0',
  },
});

const CaregiverStrainSection = (props: ICaregiverStrainSectionProps) => {
  const {data = [], caregiverName} = props;
  const {classes} = caregiverStrainSectionStyles();
  return (
    <TableContainer
      className={classes.tableContainer}
      data-testid='print-caregiverStrain-section'>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Box className={classes.CGNameSection}>
                <Box
                  className={classes.tableHeading}
                  style={{textAlign: 'left'}}>
                  Caregiver Name:
                </Box>
                <Box>{caregiverName}</Box>
              </Box>
            </TableCell>
            <TableCell align='right'>
              <Box className={classes.radioGroupHeader}>
                <Box
                  className={classes.tableHeading}
                  style={{maxWidth: 265, marginRight: 13}}>
                  Yes, On a Regular Basis{' '}
                </Box>
                <Box
                  className={classes.tableHeading}
                  style={{maxWidth: 215, marginRight: 107}}>
                  Yes, Sometimes
                </Box>
                <Box className={classes.tableHeading} style={{maxWidth: 50}}>
                  No
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (row: ICaregiverStrainAssessmentSurveyData, index: number) => (
              <TableRow key={row.question}>
                <TableCell component='th' scope='row'>
                  <Box className={classes.tableContent}>
                    <Box>
                      {index + 1}. {row.question}
                      <span style={{color: '#cc0000'}}>*</span>
                      {row.example && <Box>Example - {row?.example}</Box>}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  <Box
                    display='flex'
                    justifyContent='space-between'
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
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CaregiverStrainSection;
