/* eslint-disable max-len */
import React from 'react';
import {Box} from '@mui/material';
import {Routes, Route} from 'react-router-dom';

import {AssessmentName} from 'globals/enums';

import HolisticAssessment from './HolisticAssessment';
// eslint-disable-next-line max-len
import CaregiverStrainAssessment from './CaregiverStrainAssessment/CaregiverStrainAssessment.component';
import MedicalCondition from './MedicalCondition';
import LawtonBrodyAssessment from './AdlAssessment/LawtonBrodyAssessment/LawtonBrodyAssessment.component';
import KatzAssessment from './AdlAssessment/KatzAssessment/KatzAssessment.component';
import Wellbieng from './Wellbieng';
import MedicationList from './MedicationList/MedicationList.component';

export interface IAssessmentMainComponentProps {
  componentName: string;
  heading: string;
}

const AssessmentMainComponent = ({
  componentName,
  heading,
}: IAssessmentMainComponentProps) => {
  switch (componentName) {
    case AssessmentName.WELLNESS_SURVEY:
      return <Wellbieng heading={heading} />;
    case AssessmentName.HOLISTIC:
      return <HolisticAssessment heading={heading} />;
    case AssessmentName.CAREGIVER_STRAIN:
      return <CaregiverStrainAssessment heading={heading} />;
    case AssessmentName.LAWTON_BRODY: {
      return <LawtonBrodyAssessment />;
    }
    case AssessmentName.KATZ_INDEPENDENCE: {
      return <KatzAssessment />;
    }
    case AssessmentName.MEDICAL_CONDITION:
      return <MedicalCondition heading={heading} />;
    case AssessmentName.MEDICATION_LIST:
      return <MedicationList heading={heading} />;
    default:
      return <Box>Wellness Survey</Box>;
  }
};

const AssessmentsRoutes = ({routeList}: any) => {
  return (
    <Routes>
      {routeList.map((data: any) => {
        if (data.subOptions) {
          return data.subOptions.map((data: any) => {
            return (
              <Route
                path={data.route}
                key={data.route}
                element={
                  <AssessmentMainComponent
                    componentName={data.name}
                    heading={data.label}
                  />
                }
              />
            );
          });
        }
        return (
          <Route
            path={data.route}
            key={data.route}
            element={
              <AssessmentMainComponent
                componentName={data.name}
                heading={data.label}
              />
            }
          />
        );
      })}
    </Routes>
  );
};

export default React.memo(AssessmentsRoutes);
