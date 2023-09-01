import {Box} from '@mui/material';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import {DATE_FORMAT} from 'globals/global.constants';
import moment from 'moment';
import {medicalConditionSectionStyles} from './MedicalConditionSection.style';
import {IMedicalConditionSectionProps} from './MedicalConditionSection.types';

const MedicalConditionSection = ({data}: IMedicalConditionSectionProps) => {
  const {classes} = medicalConditionSectionStyles();
  const date = data.date_of_onset || '';
  return (
    <section
      className={classes.section}
      data-testid='print-medical-condition-section'>
      <Box className={classes.header}>
        <Box className={classes.heading}>{data.condition}</Box>
        <Box className={classes.severity}>
          <Box className={classes.label}>Level of Severity:</Box>
          <Box>
            <ShowHyphen>{data.severity_level}</ShowHyphen>
          </Box>
        </Box>
        <Box className={classes.date}>
          <Box className={classes.label}>Date of Onset:</Box>
          <Box>
            <ShowHyphen>{date && moment(date).format(DATE_FORMAT)}</ShowHyphen>
          </Box>
        </Box>
      </Box>
      <Box className={classes.notesContainer}>
        <Box className={classes.notesLabel}>Notes:</Box>
        <Box>
          <ShowHyphen>{data.notes}</ShowHyphen>
        </Box>
      </Box>
    </section>
  );
};

export default MedicalConditionSection;
