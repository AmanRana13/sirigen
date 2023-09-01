import React from 'react';
import {usePusher} from './PusherContext';
import {
  createAlertActionNotification,
  createAlertDialog,
  createApproveAlert,
} from '../store/eventsReducer/Alerts.action';
import {ICareInsightPrivileges} from 'config/app.config.types';
import {
  createApproveSummary,
  createSummaryActionNotification,
} from 'store/eventsReducer/Summary.action';
import {createCIRangeMilsetoneNotification} from 'store/eventsReducer/milestones.action';
import {createAlarmDialog} from 'store/alarmReducer/Alarm.action';
import {createPusherLocationData} from 'store/eventsReducer/locationData.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const PusherChannelSubscriber = React.memo(() => {
  const {
    pusherConnectionStatus,
    alertChannelEvents,
    summaryChannelEvents,
    alarmChannelEvents,
  } = usePusher();
  const dispatch: any = useAppDispatch();
  const roleConfig: ICareInsightPrivileges = useAppSelector(
    (state: any) => state.auth.roleConfig.careInsightPrivileges,
  );

  /**
   * @function alertChannel
   * @description method to subscribe the alert channel and listen its event
   */
  const alertChannel = React.useCallback(() => {
    // subscribe alert channel "private-alert"
    alertChannelEvents.subscribeAlertsChannel();

    const handlePusherAlerts = (data: any) => {
      dispatch(createAlertDialog(data));
    };

    const handleApproveAlert = (data: any) => {
      dispatch(createApproveAlert(data));
    };

    const handleActionAlertNotification = (data: any) => {
      dispatch(createAlertActionNotification(data));
    };

    if (roleConfig.isAlerts) {
      alertChannelEvents.listenAlerts(handlePusherAlerts);
    }

    if (roleConfig.isApproveAlert) {
      alertChannelEvents.listenApproveAlert(handleApproveAlert);
    }

    if (roleConfig.isAlertActionNotification) {
      alertChannelEvents.listenAlertActionNotification(
        handleActionAlertNotification,
      );
    }
  }, [dispatch, roleConfig, alertChannelEvents]);

  /**
   * @function summaryChannel
   * @description method to subscribe the summary channel and listen its event
   */
  const summaryChannel = React.useCallback(() => {
    // subscribe summary channel "private-summary"
    summaryChannelEvents.subscribeSummaryChannel();

    const handlePusherSummary = (data: any) => {
      dispatch(createApproveSummary(data));
    };

    const handleActionSummaryNotification = (data: any) => {
      dispatch(createSummaryActionNotification(data));
    };

    const handleCIRangeMilestoneNotification = (data: any) => {
      dispatch(createCIRangeMilsetoneNotification(data));
    };

    const handleLocationData = (data: any) => {
      dispatch(createPusherLocationData(data));
    };
    if (roleConfig.isApproveSummary) {
      summaryChannelEvents.listenApproveAlertEventSummary(handlePusherSummary);
    }

    if (roleConfig.isSummaryActionNotification) {
      summaryChannelEvents.listenSummaryActionNotification(
        handleActionSummaryNotification,
      );
    }

    if (roleConfig.isCIRangeMilestoneNotification) {
      summaryChannelEvents.listenCIRangeMilestoneNotification(
        handleCIRangeMilestoneNotification,
      );
    }
    if (roleConfig.isLocationData) {
      summaryChannelEvents.listenLocationData(handleLocationData);
    }
  }, [dispatch, summaryChannelEvents, roleConfig]);

  /**
   * @function alertChannel
   * @description method to subscribe the alert channel and listen its event
   */
  const alarmChannel = React.useCallback(() => {
    // subscribe alert channel "private-alert"
    alarmChannelEvents.subscribeAlarmChannel();

    const handlePusherAlarm = (data: any) => {
      dispatch(createAlarmDialog(data));
    };

    if (roleConfig.isAlarms) {
      alarmChannelEvents.listenSosFallEvent(handlePusherAlarm);
    }
  }, [dispatch, roleConfig, alarmChannelEvents]);

  React.useEffect(() => {
    //check pusher connected or not
    if (pusherConnectionStatus) {
      //Check if user has privileges to subscribe alert channel
      if (
        roleConfig.isAlerts ||
        roleConfig.isApproveAlert ||
        roleConfig.isAlertActionNotification
      ) {
        alertChannel();
      }

      //Check if user has privileges to subscribe summaryChannel channel
      if (
        roleConfig.isApproveSummary ||
        roleConfig.isSummaryActionNotification
      ) {
        summaryChannel();
      }

      //Check if user has privileges to subscribe alarmChannel channel
      if (roleConfig.isAlarms) {
        alarmChannel();
      }
    }
  }, [
    dispatch,
    pusherConnectionStatus,
    roleConfig,
    alertChannel,
    summaryChannel,
    alarmChannel,
  ]);

  return null;
});

export default PusherChannelSubscriber;
