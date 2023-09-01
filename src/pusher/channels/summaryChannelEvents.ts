import {
  createCareInsightData,
  createCIRangeMilestoneData,
} from 'services/careInsightService/insightSummary.service';
import {channelData} from '../pusherApp';
import {createLocationData} from 'services/locationService/seniorLocationService';

import {TListenEventHandler} from '../pusher.types';
import ChannelUtils from './channelUtils';

interface ISummaryChannelEvents {
  subscribeSummaryChannel(): void;
  // eslint-disable-next-line no-unused-vars
  listenApproveAlertEventSummary(fn: TListenEventHandler): void;
}

class SummaryChannelEvents
  extends ChannelUtils
  implements ISummaryChannelEvents {
  protected summaryChannel: any = null;

  /**
   * @function subscribeEventAlerts
   * @description subscribe to Summary channel.
   */
  subscribeSummaryChannel() {
    if (!this.summaryChannel) {
      this.summaryChannel = this.subscribeChannel(
        channelData.summary.channelName,
      );
    }
  }

  /**
   * @function listenTrigger
   * @description method to listen the pusher summary event for admin approval
   * @param fn param to be called when any new summary comes for approval
   */
  listenApproveAlertEventSummary(fn: TListenEventHandler) {
    /* Channel to bind Summary channel event "approve-summary" */
    this.channelEventListener(
      this.summaryChannel,
      channelData.summary.events.approveSummary,
      (data: any) => createCareInsightData(data.data),
      fn,
    );
  }

  /**
   * @function listenSummaryActionNotification
   * @description method to listen the pusher summary event for CI comes to CA after approval
   * @param fn param to be called when any new summary comes to CA after approval
   */
  listenSummaryActionNotification(fn: TListenEventHandler) {
    /* Channel to bind Summary channel event "summary-action-notification" */
    this.channelEventListener(
      this.summaryChannel,
      channelData.summary.events.summaryActionNotification,
      (data: any) => createCareInsightData(data.data),
      fn,
    );
  }

  /**
   * @function listenCIRangeMilestoneNotification
   * @description method to listen the pusher summary event for CI Range Milestone
   * @param fn param to be called when any senior reached 1000/3000 milestone
   */
  listenCIRangeMilestoneNotification(fn: TListenEventHandler) {
    /* Channel to bind Summary channel event "milestone" */
    this.channelEventListener(
      this.summaryChannel,
      channelData.summary.events.milestoneNotification,
      (data: any) => createCIRangeMilestoneData(data.data, data.event_id),
      fn,
    );
  }

  /**
   * @function listenLocationData
   * @description method to listen the pusher summary event for location data
   * @param fn param to be called when we click on "locate Me" button
   */
  listenLocationData(fn: TListenEventHandler) {
    /* Channel to bind Summary channel event "Location Data" */

    this.channelEventListener(
      this.summaryChannel,
      channelData.summary.events.currentLocationData,
      (data: any) => createLocationData(data.data),
      fn,
    );
  }
}

export default SummaryChannelEvents;
