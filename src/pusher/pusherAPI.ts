import {PusherSateChangeHandler} from './pusher.types';
import {PusherConnectionStatus} from './../globals/enums';

import Pusher, * as PusherTypes from 'pusher-js';
/**
 * @class PusherAPI
 * @description class craeted on top of pusher library to handle pusher methods
 */
class PusherAPI {
  pusher: PusherTypes.default | any = {};
  connectionStatus: PusherConnectionStatus =
    PusherConnectionStatus.Disconnected;

  /**
   * @function pusherConnect
   * @description function to stablish the connection with pusher
   * @param {string} appKey
   * @param {PusherTypes.Options } channelOptions
   */
  pusherConnect(appKey: string, channelOptions: PusherTypes.Options) {
    this.pusher = new Pusher(appKey, channelOptions);
  }

  /**
   * @function pusherDebug
   * @description Only use in development mode debug mode for pusher
   */
  pusherDebug() {
    Pusher.logToConsole = true;
  }

  /**
   * @function onPusherStateChange
   * @description get pusher current state
   * @param {callback} pusherSateChangeHandler to get the latest pusher state
   */
  onPusherStateChange(pusherSateChangeHandler?: PusherSateChangeHandler) {
    this.pusher.connection.bind('state_change', (states: any) => {
      // state object :- states = {previous: 'oldState', current: 'newState'}
      // eslint-disable-next-line no-console
      console.log('Current pusher state is', states);
      if (pusherSateChangeHandler) {
        pusherSateChangeHandler(states.current);
      }

      this.connectionStatus = states.current;
    });
  }

  /**
   * @description get current connect status of pusher
   * @returns {PusherConnectionStatus} connectionStatus
   */
  get currentConnectionStatus(): PusherConnectionStatus {
    return this.connectionStatus;
  }

  /**
   * @function onError
   * @description get pusher error
   * @param {callback} pusherErrorHandler get pusher error
   */
  onError(pusherErrorHandler: any) {
    this.pusher.connection.bind('error', (err: string) => {
      pusherErrorHandler(err);
    });
  }

  /**
   * @function pusherDisconnect
   * @description function to disconnect the pusher connection
   */
  pusherDisconnect() {
    if (this.connectionStatus === PusherConnectionStatus.Connected) {
      this.pusher.disconnect();
    }
  }

  subscribeChannel(channelName: string) {
    return this.pusher.subscribe(channelName);
  }

  unsubscribeChannel(channelName: string) {
    return this.pusher.unsubscribe(channelName);
  }
}

export default PusherAPI;
