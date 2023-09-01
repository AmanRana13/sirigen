/* eslint-disable no-unused-vars */
import {createCareInsightData} from 'services/careInsightService/insightSummary.service';
import {channelData} from '../pusherApp';
import {TListenEventHandler} from '../pusher.types';
import ChannelUtils from './channelUtils';

interface IAlertChannelEvents {
  subscribeAlertsChannel(): void;
  listenAlerts(fn: TListenEventHandler): void;
  listenApproveAlert(fn: TListenEventHandler): void;
}

class AlertChannelEvents extends ChannelUtils implements IAlertChannelEvents {
  protected alertChannel: any = null;

  /**
   * @function subscribeEventAlerts
   * @description subscribe to Alert channel.
   */
  subscribeAlertsChannel() {
    if (!this.alertChannel) {
      this.alertChannel = this.subscribeChannel(channelData.alert.channelName);
    }
  }

  /**
   * @function listenAlerts
   * @description method to listen the pusher alert event for alerts
   * @param fn param to be called when any new alert happen
   */
  listenAlerts(fn: TListenEventHandler) {
    /* Channel to bind Alert channel event "trigger" */
    this.channelEventListener(
      this.alertChannel,
      channelData.alert.events.trigger,
      (data: any) => createCareInsightData(data.data),
      fn,
    );
  }

  /**
   * @function listenApproveAlert
   * @description method to listen the pusher event for alert sent to admin approval
   * @param fn param to be called when any new alert come for approval
   */
  listenApproveAlert(fn: TListenEventHandler) {
    /* Channel to bind Alert channel event "approveAlert" */
    this.channelEventListener(
      this.alertChannel,
      channelData.alert.events.approveAlert,
      (data: any) => createCareInsightData(data.data),
      fn,
    );
  }

  /**
   * @function listenAlertActionNotification
   * @description method to listen the pusher event for alerts comes to CG after Approval
   * @param fn param to be called when any new alert comes to CG after Admin approval
   */
  listenAlertActionNotification(fn: TListenEventHandler) {
    /* Channel to bind Alert channel event "alert-action-notification" */
    this.channelEventListener(
      this.alertChannel,
      channelData.alert.events.alertActionNotification,
      (data: any) => createCareInsightData(data.data),
      fn,
    );
  }
}

export default AlertChannelEvents;
