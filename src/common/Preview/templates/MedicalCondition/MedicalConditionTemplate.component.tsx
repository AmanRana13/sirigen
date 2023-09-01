/* eslint-disable max-len */
import {Box} from '@mui/material';
import Header from 'common/Preview/components/Header/Header.component';
import HeaderData from 'common/Preview/components/HeaderData/HeaderData.component';
import MedicalConditionSection from 'common/Preview/components/MedicalConditionSection/MedicalConditionSection.component';
import MetaBox from 'common/Preview/components/MetaBox/MetaBox.component';
import PreviewLayout from 'common/Preview/components/PreviewLayout/PreviewLayout.component';
import {parseAssessmentMetaData} from 'common/Preview/Preview.utility';
import usePrint from 'common/Print/usePrint';
import {PrintTemplates} from 'globals/enums';
import {IMedicalConditionData} from 'pages/WCPages/Assessments/MedicalCondition/MedicalCondition.types';
import React from 'react';
import {medicalConditionTemplateStyles} from './MedicalConditionTemplate.style';
import {IMedicalConditionTemplateProps} from './MedicalConditionTemplate.types';

const MedicalConditionTemplate = ({
  data,
  meta,
}: IMedicalConditionTemplateProps) => {
  // calculating Index width depending on which Padding will be added to accomodate index
  // it depends on number of digits in the index number
  const indexWidth = React.useMemo(() => {
    const len = data?.length?.toString().length;
    return len || 1;
  }, [data?.length]);

  const {classes} = medicalConditionTemplateStyles({indexWidth});

  const HeaderComponent = React.useMemo(() => {
    const subheading = `Senior Member:${meta?.name || '-'}`;
    return (
      <Box>
        <Header>
          <HeaderData
            heading='Medical Condition-Disease Assessment'
            subheading={subheading}
          />
        </Header>
        <MetaBox data={parseAssessmentMetaData(meta)} columns={22} />
      </Box>
    );
  }, [meta]);

  // setting Print Data to render print template
  usePrint({
    type: PrintTemplates.MEDICAL_CONDITION,
    data: data,
    meta: meta,
  });

  return (
    <PreviewLayout header={HeaderComponent}>
      <Box
        className={classes.container}
        data-testid='preview-medical-condition'>
        {data?.map((sectionData: IMedicalConditionData, index) => (
          <Box key={sectionData.condition} className={classes.listItem}>
            <Box className={classes.listIndex}>{index + 1}.</Box>
            <MedicalConditionSection data={sectionData} />
          </Box>
        ))}
      </Box>
    </PreviewLayout>
  );
};

export default MedicalConditionTemplate;
