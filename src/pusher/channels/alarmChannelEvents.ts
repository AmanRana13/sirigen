/* eslint-disable no-unused-vars */
import {createAlarmData} from 'services/alarmService/alarm.service';
import {channelData} from '../pusherApp';
import {TListenEventHandler} from '../pusher.types';
import ChannelUtils from './channelUtils';

interface IAlarmChannelEvents {
  subscribeAlarmChannel(): void;
  listenSosFallEvent(fn: TListenEventHandler): void;
}

class AlarmChannelEvents extends ChannelUtils implements IAlarmChannelEvents {
  protected alarmChannel: any = null;

  /**
   * @function subscribeEventAlarm
   * @description subscribe to Alarm channel.
   */
  subscribeAlarmChannel() {
    if (!this.alarmChannel) {
      this.alarmChannel = this.subscribeChannel(channelData.alarm.channelName);
    }
  }

  /**
   * @function listenSosFallEvent
   * @description method to listen the pusher alarm event
   * @param fn param to be called when any new alarm occured
   */
  listenSosFallEvent(fn: TListenEventHandler) {
    /* Channel to bind Alarm channel event "listenSosFallEvent" */
    this.channelEventListener(
      this.alarmChannel,
      channelData.alarm.events.sosFallEvent,
      (data: any) => createAlarmData(data.data),
      fn,
    );
  }
}

export default AlarmChannelEvents;
