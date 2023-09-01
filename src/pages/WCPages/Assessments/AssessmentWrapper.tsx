import React from 'react';
import {Typography, Box} from '@mui/material';
import Divider from 'common/Divider';
import {assessmentsStyle} from './Assessmets.style';
import IncompleteSavedDate from './IncompleteSavedDate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {theme} from 'config/theme.config';

interface IAssessmentVersion {
  number?: number;
  isDraft: boolean;
}
interface IAssessmentWrapperProps {
  children: React.ReactElement;
  heading: string;
  dateTime?: string;
  isIncomplete?: boolean;
  infoText?: string;
  version?: IAssessmentVersion;
  showDivider?: boolean;
  buttonInHeader?: React.ReactNode;
  infoAlertMessage?: string;
}

const AssessmentWrapper = ({
  children,
  heading,
  dateTime,
  isIncomplete,
  infoText,
  version,
  showDivider,
  buttonInHeader,
  infoAlertMessage,
}: IAssessmentWrapperProps) => {
  const {classes} = assessmentsStyle();

  return (
    <Box position='relative' className={classes.assessmentRouteContainer}>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Typography
            variant='boldHeading'
            color={theme.palette.customColor.primaryLight}>
            {heading}
          </Typography>
          {version?.number && (
            <Typography marginLeft={3.5} variant='body1'>
              Version {version.number} {version.isDraft ? 'Draft' : ''}
            </Typography>
          )}
        </Box>
        <IncompleteSavedDate
          isSaved={version?.isDraft}
          dateTime={dateTime}
          isIncomplete={isIncomplete}
          buttonInHeader={buttonInHeader}
          infoAlertMessage={infoAlertMessage}
        />
      </Box>
      {infoText && (
        <Box display='flex'>
          <InfoOutlinedIcon
            style={{margin: '1px 5px 0 0', width: '18px', height: '18px'}}
          />
          <Typography paragraph={true} className={classes.note}>
            {infoText}
          </Typography>
        </Box>
      )}
      {showDivider && <Divider variant='fullWidth' />}
      <Box>{children}</Box>
    </Box>
  );
};

export default AssessmentWrapper;
