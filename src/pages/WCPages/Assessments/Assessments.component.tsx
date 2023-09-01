import React from 'react';

import {Box, ThemeProvider, StyledEngineProvider} from '@mui/material';

import {
  getCurrentSenior,
  getQueryParamTimezone,
} from 'globals/global.functions';
import {SubHeader} from 'common/SubHeader';
import {ContanctInfo} from 'pages/WCPages/SeniorCareInsights/ContantInfo.component';
import {theme} from 'config/theme.config';

import AssessmentsRoutes from './AssessmentsRoutes.component';
import {assessmentsStyle} from './Assessmets.style';
import LeftPanel from './LeftPanel.component';
import {AssessmentStatuses} from 'globals/enums';

const list = [
  {
    name: 'wellness-survey',
    label: 'Wellbeing',
    route: `wellness-survey`,
    isDisabled: false,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'holistic-assessment',
    label: 'Holistic Assessment',
    route: `holistic-assessment`,
    isDisabled: false,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'medical-condition',
    label: 'Medical Condition-Disease Assessment',
    route: `medical-condition`,
    isDisabled: false,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'adl-assessment',
    label: 'ADL Assessment',
    isSelected: false,
    isDisabled: false,
    status: AssessmentStatuses.COMPLETE,
    subOptions: [
      {
        name: 'lawton-brody',
        label: 'Lawton-Brody ADL',
        route: 'adl-assessment/lawton-brody',
        isDisabled: false,
        status: AssessmentStatuses.COMPLETE,
      },
      {
        name: 'katz-independence',
        label: 'Katz Index of Independence in ADL',
        route: 'adl-assessment/katz-independence',
        isDisabled: false,
        status: AssessmentStatuses.COMPLETE,
      },
    ],
  },
  {
    name: 'profile-information',
    label: 'Profile Information',
    route: `profile-information`,
    isDisabled: true,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'provider-information',
    label: 'Provider Information',
    route: `provider-information`,
    isDisabled: true,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'medical-information',
    label: 'Medical Information',
    route: `medical-information`,
    isDisabled: true,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'caregiver-strain-assessment',
    label: 'Caregiver Strain Assessment',
    route: `caregiver-strain-assessment`,
    isDisabled: false,
    status: AssessmentStatuses.COMPLETE,
  },
  {
    name: 'medication-list',
    label: 'Medication List',
    route: `medication-list`,
    isDisabled: false,
    status: AssessmentStatuses.COMPLETE,
  },
];

/**
 * @description display right panel of all assessments section.
 * @return {JSX}
 */
const RightPanel = ({baseRoute}: any) => {
  return <AssessmentsRoutes baseRoute={baseRoute} routeList={list} />;
};

/**
 * @description display whole assessments container.
 * @return {JSX}
 */
const Assessments = () => {
  const {classes} = assessmentsStyle();

  const [baseRoute, updateBaseRoute] = React.useState('');

  React.useEffect(() => {
    const seniorInfo = {...getCurrentSenior()};
    const assessmentBaseRoute = `/senior/${seniorInfo.seniorID}/${
      seniorInfo.accountID
    }/${getQueryParamTimezone(seniorInfo.timezone)}/assessments/`;

    updateBaseRoute(assessmentBaseRoute);
  }, []);

  return (
    <>
      <SubHeader />
      <Box data-testid='assesssment'>
        <ContanctInfo />
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Box className={classes.assessmentContainer}>
              {baseRoute && <LeftPanel baseRoute={baseRoute} list={list} />}
              {baseRoute && <RightPanel baseRoute={baseRoute} />}
            </Box>
          </ThemeProvider>
        </StyledEngineProvider>
      </Box>
    </>
  );
};

export default Assessments;
