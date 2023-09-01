import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import Draggable from 'react-draggable';
import {Card} from '@mui/material';
import {makeStyles} from 'tss-react/mui';

import {EventsType, EventViewState} from 'globals/enums';
import {AdminNotificationsLabels} from 'globals/global.constants';
import CallEntryDailog from 'common/Dialogs/dialogComponents/CallEntryDialog';
import EventMinDialog from './EventMinDialog';
import SosFallDialog from './SosFall/SosFallDialog';
import AlertDialogMaximize from './AlertDialog/AlertDialogMaximize';
import ApproveDialog from './ApproveDialog/ApproveDialog';
import CreateSummaryMaximize from './CreateSummaryDialog/CreateSummaryMaximize';

export const createSummaryDialogStyle = makeStyles()(() => ({
  cardContent: {
    '& .MuiCardContent-root': {
      padding: '0 !important',
    },
    position: 'fixed',
    right: 50,
    bottom: 32,
    width: '18%',
    zIndex: 1000,
  },
}));

const MaximizeView = ({event, position}: any): JSX.Element => {
  switch (event.eventType) {
    case EventsType.Summary: {
      return <CreateSummaryMaximize {...event} />;
    }
    case EventsType.Alert: {
      return <AlertDialogMaximize {...event} position={position} />;
    }
    case EventsType.CALL_ENTRY: {
      return <CallEntryDailog {...event} position={position} />;
    }
    case EventsType.FALL: {
      return <SosFallDialog {...event} position={position} isFall={true} />;
    }
    case EventsType.SOS: {
      return <SosFallDialog {...event} position={position} isSos={true} />;
    }
    default:
      return <></>;
  }
};

const MinimizeView = ({event, key}: any): JSX.Element => {
  switch (event.eventType) {
    case EventsType.Summary: {
      return <EventMinDialog position={{right: key}} {...event} />;
    }
    case EventsType.Alert: {
      return <EventMinDialog position={{right: key}} {...event} />;
    }
    default:
      return <></>;
  }
};

/**
 * @description React component to display events popup
 * @returns JSX of events
 */
const Events = React.memo((): JSX.Element => {
  const {classes} = createSummaryDialogStyle();

  const summary = useAppSelector((state: any) => state.events.summary);
  const alert = useAppSelector((state: any) => state.events.alert);
  const milestone = useAppSelector((state: any) => state.events.milestone);
  const sos = useAppSelector((state: any) => state.alarms.sos);
  const fallDetection = useAppSelector((state: any) => state.alarms.fall);
  const callEntry = useAppSelector((state: any) => state.callEntry.events);

  const allEvents = React.useMemo(() => {
    const summaryArray = Object.values(summary);
    const alertArray = Object.values(alert);
    const milestoneArray = Object.values(milestone);
    const callEntryArray = Object.values(callEntry).sort(
      (a: any, b: any) => b.startTime - a.startTime,
    );
    const sosArray = Object.values(sos).sort(
      (a: any, b: any) => b.startTime - a.startTime,
    );
    const fallDetectionArray = Object.values(fallDetection).sort(
      (a: any, b: any) => b.startTime - a.startTime,
    );

    const allEvents = [
      ...summaryArray,
      ...alertArray,
      ...milestoneArray,
      ...callEntryArray,
      ...fallDetectionArray,
      ...sosArray,
    ];

    const maximizedEvents = allEvents.filter((value: any) => {
      return value.viewState === EventViewState.Maximize;
    });

    const minimizedEvents = allEvents.filter((value: any) => {
      return value.viewState === EventViewState.Minimize;
    });

    const approveEvents = allEvents.filter((value: any) => {
      return value.viewState === EventViewState.Approve;
    });
    return {maximizedEvents, minimizedEvents, approveEvents};
  }, [summary, alert, sos, fallDetection, callEntry, milestone]);

  return (
    <React.Fragment>
      {allEvents.maximizedEvents.map((event: any, key) => {
        return (
          <MaximizeView
            key={event.eventType}
            event={event}
            position={{
              left: key * 10,
              top: key * 10,
            }}
          />
        );
      })}

      {allEvents.minimizedEvents.map((event: any, key) => {
        return (
          <Draggable
            key={'Draggable' + event.eventType}
            handle='#event-min-dialog'
            cancel={'[id*="card-content-minimize"]'}>
            <Card
              className={classes.cardContent}
              style={{margin: `${key * 40}px ${key * 35}px`}}>
              <MinimizeView key={event.eventType} event={event} />
            </Card>
          </Draggable>
        );
      })}

      {allEvents.approveEvents.map((event: any, index: number) => {
        const label = AdminNotificationsLabels[event.eventType];
        return (
          <ApproveDialog
            key={event.eventId}
            index={index}
            type={event.eventType}
            eventId={event.eventId}
            seniorId={event.seniorId}
            label={label}
          />
        );
      })}
    </React.Fragment>
  );
});

export default Events;
