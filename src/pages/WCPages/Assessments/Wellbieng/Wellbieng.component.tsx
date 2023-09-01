import React from 'react';
import AssessmentWrapper from '../AssessmentWrapper';
import {AssessmentStatus} from 'globals/enums';
import WellnessSurvey from './WellnessSurvey.component';
import {Box, Button, Typography} from '@mui/material';
import {theme} from 'config/theme.config';
import useSetWellbiengSurvey from './useSetWellbiengSurvey';
import EmotionalSurvey from 'pages/WCPages/Assessments/Wellbieng/WellnessSurvey';

const Wellbieng = ({heading}: any) => {
  const [isWellbeingDashboard, setIsWellbeingDashboard] = React.useState(true);
  const {
    isCompleted,
    isHistory,
    dateTime,
    assessmentStatus,
    survey,
    surveyState,
    setSurveyState,
    checkIfFormFilled,
    surveyStateData,
    surveyCount,
  } = useSetWellbiengSurvey();

  return (
    <AssessmentWrapper
      heading={heading}
      isIncomplete={!isCompleted && !isHistory}
      dateTime={
        assessmentStatus === AssessmentStatus.Save || isHistory ? dateTime : ''
      }
      version={{
        isDraft: assessmentStatus === AssessmentStatus.Save,
      }}
      showDivider={true}>
      <>
        <Box display='flex' justifyContent='space-between' mb={2}>
          <Typography
            color={theme.palette.customColor.primaryLight}
            variant='boldHeading'>
            {isWellbeingDashboard ? 'Wellbeing Dashboard' : 'Wellbeing Survey'}
          </Typography>
          <Button
            color='primary'
            onClick={() => setIsWellbeingDashboard(!isWellbeingDashboard)}
            variant='contained'
            style={{borderRadius: 0, fontSize: '16px'}}>
            {isWellbeingDashboard ? 'Wellbeing Survey' : 'Wellbeing Dashboard'}
          </Button>
        </Box>
        {isWellbeingDashboard ? (
          <EmotionalSurvey />
        ) : (
          <WellnessSurvey
            survey={survey}
            surveyState={surveyState}
            setSurveyState={setSurveyState}
            checkIfFormFilled={checkIfFormFilled}
            surveyStateData={surveyStateData}
            surveyCount={surveyCount}
          />
        )}
      </>
    </AssessmentWrapper>
  );
};

export default Wellbieng;
