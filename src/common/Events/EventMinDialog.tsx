import {Box, Typography, Card, CardContent, Tooltip} from '@mui/material';
import {withStyles} from 'tss-react/mui';
import clsx from 'clsx';

import {maximizeEvent} from 'store/eventsReducer/Events.action';

import {
  APPLICATION_EVENTS,
  DATE_FORMAT,
  TIME_FORMAT,
} from '../../globals/global.constants';
import maximize from '../../assets/icons/maximize.svg';
import {eventMinDialogStyle} from './EventMinDialog.style';
import {ICardHeaderProps, IEventMinDialogProps} from './EventMinDialog.types';
import moment from 'moment';
import {PRINT_HIDE_CLASS} from 'common/Print/Print.types';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @description React component to show tooltip
 * @returns void
 */
const LightTooltip = withStyles(Tooltip, (theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

/**
 * @description React component to show the header of card
 * @returns {JSX}
 */
const CardHeader = ({eventId, eventType, fullName}: ICardHeaderProps) => {
  const {classes} = eventMinDialogStyle();
  const dispatch: any = useAppDispatch();

  const maximizeEventHandler = () => {
    dispatch(maximizeEvent(eventId, eventType));
  };

  return (
    <Box
      id='event-min-dialog'
      className={clsx(classes.cardContentHeader, 'grabbable', {
        [classes.alertHeader]: eventType == 'alert',
      })}>
      <Typography variant='h5'>Care Insight</Typography>
      <Box className={classes.eventNameWrapper} id='card-content-minimize'>
        <Typography variant='h5' className={classes.eventName}>
          {APPLICATION_EVENTS[eventType].label}
        </Typography>
        <LightTooltip arrow title={fullName}>
          <img
            alt='expand'
            src={maximize}
            className={classes.maximizeIcon}
            onClick={maximizeEventHandler}
          />
        </LightTooltip>
      </Box>
    </Box>
  );
};
/**
 * @description React component to minimize the event dialog
 * @returns {JSX}
 */
const EventMinDialog = ({
  fullName,
  message,
  eventType,
  eventId,
  dateGenerated,
}: IEventMinDialogProps) => {
  const {classes} = eventMinDialogStyle();

  return (
    <Card className={PRINT_HIDE_CLASS}>
      <CardContent>
        <CardHeader
          eventId={eventId}
          eventType={eventType}
          fullName={fullName}
        />
        <Box id='card-content-minimize' data-testid='minimized'>
          <Box className={classes.headingTextWrapper}>
            <Typography variant='body1'>Senior:</Typography>
            <Typography variant='body1' noWrap>
              {fullName}
            </Typography>
          </Box>
          {dateGenerated && (
            <Box className={classes.headingTextWrapper}>
              <Typography variant='body1'>Date Generated:</Typography>
              <Typography variant='body1' noWrap>
                {moment(dateGenerated)
                  .tz(moment.tz.guess())
                  .format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
              </Typography>
            </Box>
          )}
          <Box className={classes.eventTextBox}>
            <Typography variant='body1' className={classes.eventText}>
              {message}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventMinDialog;
