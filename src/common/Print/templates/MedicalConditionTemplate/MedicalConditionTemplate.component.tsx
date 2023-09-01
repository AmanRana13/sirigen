/* eslint-disable max-len */
import {Box} from '@mui/material';
import MedicalConditionSection from 'common/Print/components/MedicalConditionSection/MedicalConditionSection.component';
import {IMedicalConditionData} from 'pages/WCPages/Assessments/MedicalCondition/MedicalCondition.types';
import React from 'react';
import {medicalConditionTemplateStyles} from './MedicalConditionTemplate.style';

const MedicalConditionTemplate = ({data}: {data: IMedicalConditionData[]}) => {
  const indexWidth = React.useMemo(() => {
    const len = data?.length?.toString().length;
    return len || 1;
  }, [data?.length]);

  const {classes} = medicalConditionTemplateStyles({indexWidth});
  return (
    <Box className={classes.container} data-testid='print-medical-condition'>
      {data?.map((sectionData: IMedicalConditionData, index) => (
        <Box key={sectionData.condition} className={classes.listItem}>
          <Box className={classes.listIndex}>{index + 1}.</Box>
          <MedicalConditionSection data={sectionData} />
        </Box>
      ))}
    </Box>
  );
};

export default MedicalConditionTemplate;
