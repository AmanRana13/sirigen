/* eslint-disable max-len */
import {Box} from '@mui/material';
import {parseAssessmentMetaData} from 'common/Print/Print.utility';
import HolisticAssessmentTemplate from 'common/Print/templates/HolisticAssessmentTemplate/HolisticAssessmentTemplate.component';
import {PrintTemplates} from 'globals/enums';
import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import Header from './components/Header/Header.component';
import HeaderData from './components/HeaderData/HeaderData.component';
import MetaBox from './components/MetaBox/MetaBox.component';
import PrintLayout from './components/PrintLayout/PrintLayout.component';
import LawtonBrodyAssessmentTemplate from './templates/ADL/LawtonBrodyAssessmentTemplate/LawtonBrodyAssessmentTemplate.component';
import KatzADLAssessmentTemplate from './templates/ADL/KatzADLAssessmentTemplate/KatzADLAssessmentTemplate.component';

import './Print.style.css';
import CaregiverStrainAssessementTemplate from './templates/CGStrainAssessmentTemplate/CaregiverStrainTemplate.component';
import MedicalConditionTemplate from './templates/MedicalConditionTemplate/MedicalConditionTemplate.component';

const Print = () => {
  const {type} = useAppSelector((state: any) => state.print);
  const {meta, data} = useAppSelector((state: any) => state.print.data);
  const {
    HeaderContent,
    FrameContent,
  }: {
    HeaderContent: React.ReactNode;
    FrameContent: React.ReactNode;
  } = React.useMemo(() => {
    let HeaderContent: React.ReactNode = null,
      FrameContent: React.ReactNode = null;
    const subheading = `Senior Member:${meta?.name || ' - '}`;
    switch (type) {
      case PrintTemplates.HOLISTIC:
        HeaderContent = (
          <Box className='common-header-wrapper'>
            <Header>
              <HeaderData
                heading='Holistic Assessment'
                subheading={subheading}
              />
            </Header>
            <MetaBox data={parseAssessmentMetaData(meta)} columns={22} />
          </Box>
        );

        FrameContent = <HolisticAssessmentTemplate data={data} />;
        break;
      case PrintTemplates.LAWTON:
        HeaderContent = (
          <Box className='common-header-wrapper'>
            <Header>
              <HeaderData heading='Lawton-Brody ADL' subheading={subheading} />
            </Header>
            <MetaBox data={parseAssessmentMetaData(meta)} columns={22} />
          </Box>
        );
        FrameContent = <LawtonBrodyAssessmentTemplate data={data} />;
        break;
      case PrintTemplates.KATZ:
        HeaderContent = (
          <Box className='common-header-wrapper'>
            <Header>
              <HeaderData
                heading='Katz Index of Independence in ADL'
                subheading={subheading}
              />
            </Header>
            <MetaBox data={parseAssessmentMetaData(meta)} columns={22} />
          </Box>
        );
        FrameContent = <KatzADLAssessmentTemplate data={data} />;
        break;
      case PrintTemplates.CAREGIVER_STRAIN:
        HeaderContent = (
          <Box className='common-header-wrapper'>
            <Header>
              <HeaderData
                heading='Caregiver Strain Assessment'
                subheading={subheading}
              />
            </Header>
            <MetaBox data={parseAssessmentMetaData(meta)} columns={22} />
          </Box>
        );
        FrameContent = (
          <CaregiverStrainAssessementTemplate
            data={data}
            caregiverName={meta?.caregiverName}
          />
        );
        break;
      case PrintTemplates.MEDICAL_CONDITION:
        HeaderContent = (
          <Box className='common-header-wrapper'>
            <Header>
              <HeaderData
                heading='Medical Condition-Disease Assessment'
                subheading={subheading}
              />
            </Header>
            <MetaBox data={parseAssessmentMetaData(meta)} columns={22} />
          </Box>
        );
        FrameContent = <MedicalConditionTemplate data={data} />;
        break;
      default:
        break;
    }
    return {HeaderContent, FrameContent};
  }, [type, meta, data]);
  return <PrintLayout header={HeaderContent}>{FrameContent}</PrintLayout>;
};

export default Print;
