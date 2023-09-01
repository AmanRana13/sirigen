/* eslint-disable max-len */
import {Box} from '@mui/material';
import CaregiverStrainSection from '../../components/CaregiverStrainSection/CaregiverStrainSection.component';
import CaregiverStrainStats from '../../components/CaregiverStrainSection/CaregiverStrainStats.component';
import {ICaregiverStrainTemplateProps} from './CaregiverStrainTemplate.types';

const CaregiverStrainAssessementTemplate = (
  props: ICaregiverStrainTemplateProps,
) => {
  const {data = [], caregiverName} = props;

  return (
    <Box data-testid='caregiver-strain-template'>
      <CaregiverStrainSection data={data} caregiverName={caregiverName} />
      <CaregiverStrainStats data={data} />
    </Box>
  );
};

export default CaregiverStrainAssessementTemplate;
