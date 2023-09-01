import {Box, Typography} from '@mui/material';
import {IActivityCardProps} from './ActivityCard.types';
import {activityCardStyles} from './ActivityCard.style';

const ActivityCard = ({
  goal,
  percentage,
  variant,
  title = variant,
}: IActivityCardProps) => {
  const {classes} = activityCardStyles({variant});
  return (
    <Box className={classes.activityCard} data-testid='activity-card'>
      <Box display='flex' flexDirection='column'>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.goal}>Goal: {goal}</Typography>
      </Box>
      <Typography className={classes.percentageValue}>
        {percentage}
        <span>%</span>
      </Typography>
    </Box>
  );
};

export default ActivityCard;
