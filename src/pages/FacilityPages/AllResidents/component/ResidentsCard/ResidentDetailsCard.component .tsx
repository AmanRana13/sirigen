import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import {ResidentDetailsCardStyle} from './ResidentDetailsCard.style';

import HeartRate from 'assets/icons/ResidentsHeart.svg';
import BodyHealth from 'assets/icons/ResidentsHealth.svg';
import Sleep from 'assets/icons/ResidentsSleep.svg';
import Activity from 'assets/icons/ResidentsActivity.svg';

import {IResidentDetailsCard} from './ResidentDetailsCard.type';
import clsx from 'clsx';
import {DASHBOARD_VITALS_TYPE, VITAL_CONDITION_CLASSNAMES} from 'globals/enums';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {residentSubPages} from 'globals/global.constants';

const labelData: any = {
  [DASHBOARD_VITALS_TYPE.WELLNESS]: {
    icon: HeartRate,
    alt: 'Heart',
    cardTitle: 'Wellness Sign',
    initialExpand: 'heart_rate',
  },
  [DASHBOARD_VITALS_TYPE.ACTIVITY]: {
    icon: Activity,
    alt: 'Activity',
    cardTitle: 'Activity',
    initialExpand: 'activity',
  },
  [DASHBOARD_VITALS_TYPE.SLEEP]: {
    icon: Sleep,
    alt: 'Sleep',
    cardTitle: 'Sleep',
    initialExpand: 'sleep',
  },
  [DASHBOARD_VITALS_TYPE.HEALTH]: {
    icon: BodyHealth,
    alt: 'Health',
    cardTitle: 'Health',
    initialExpand: 'body_health',
  },
  [DASHBOARD_VITALS_TYPE.WELLBEING]: {
    icon: BodyHealth,
    alt: 'Wellbeing',
    cardTitle: 'Wellbeing',
  },
};

const ResidentDetailsCard = (props: IResidentDetailsCard) => {
  const {cardType, activityTitle, condition, activityValue, onClick} = props;

  const {classes} = ResidentDetailsCardStyle();
  const navigate = useNavigate();

  const handleClickView = React.useCallback(() => {
    const initialExpand = labelData[cardType]?.initialExpand || '';
    const path = `${residentSubPages.wellnessData.path}?initialExpand=${initialExpand}`;
    navigate(path, {
      relative: 'route',
    });
  }, [cardType, navigate]);

  return (
    <Box
      className={classes.userCardOuterContainer}
      data-testid='user-data-card'>
      <Box className={classes.userCardContainer}>
        <Box display='flex' className={classes.titleContainer}>
          <img
            alt={labelData[cardType]?.cardTitle}
            src={labelData[cardType]?.icon}
            className={classes.icon}
          />
          <Typography variant='boldHeading' className={classes.title}>
            &nbsp;{labelData[cardType]?.cardTitle}
          </Typography>
        </Box>
        <Box
          display='flex'
          className={clsx(
            classes.conditionContainer,
            VITAL_CONDITION_CLASSNAMES[condition],
          )}>
          <Typography className={classes.condition}>
            {condition.split('_').join(' ').toUpperCase()}
          </Typography>
        </Box>
        <Box display='flex'>
          <Typography variant='h3v1' className={classes.valueTitle}>
            {activityTitle}:&nbsp;
          </Typography>
          <Typography variant='h3v1' className={classes.value}>
            {activityValue}
          </Typography>
        </Box>
      </Box>
      <Box
        display='flex'
        className={classes.view}
        onClick={onClick || handleClickView}>
        <Typography variant='body1'>View</Typography>
      </Box>
    </Box>
  );
};

export default ResidentDetailsCard;
