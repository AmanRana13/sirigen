import {API} from 'globals/api';
import {IPusherApp} from './pusher.types';
import PusherAPI from './pusherAPI';
import {PUSHER_END_POINTS} from 'globals/apiEndPoints';

const privateChannel: string = 'private';

export const channelData = Object.freeze({
  alert: {
    channelName: `${privateChannel}-alert`,
    events: {
      trigger: 'trigger',
      approveAlert: 'approve-alert',
      alertActionNotification: 'alert-action-notification',
    },
  },
  summary: {
    channelName: `${privateChannel}-summary`,
    events: {
      approveSummary: 'approve-summary',
      summaryActionNotification: 'summary-action-notification',
      milestoneNotification: 'milestone',
      currentLocationData: 'trace_completed',
    },
  },
  alarm: {
    channelName: `${privateChannel}-sos-fall-channel`,
    events: {
      sosFallEvent: 'sos-fall-event',
    },
  },
});

/**
 * @class PusherApp
 * @extends PusherAPI
 * @description class to access pusher API's and events subscribe and unsubscribe methods.
 */
class PusherApp extends PusherAPI implements IPusherApp {
  protected static instance: PusherApp;
  protected alertChannel: any;
  protected summaryChannel: any;

  constructor() {
    super();
    if (PusherApp.instance instanceof PusherApp) {
      return PusherApp.instance;
    }

    PusherApp.instance = this;
  }

  /**
   * @function establishConnection
   * @description method to connect the application with pusher.
   */
  public establishConnection(pusherKey: string, pusherCluster: string) {
    /*Pusher key and cluster from env variables*/
    const vimientPusherAppKey: string = pusherKey || '';
    const APP_CLUSTER: string = pusherCluster || '';

    /**
     * @function authorizer
     * @description authorizer method to authenticate the pusher private channel connection.
     * @param channel channel data get from pusher.
     * @returns authentication callback to pusher.
     */
    const authorizer = (channel: any) => {
      return {
        authorize: (socketId: string, callback: any) => {
          API({
            url: PUSHER_END_POINTS.AUTH,
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'}),
            params: {
              socket_id: socketId,
              channel_name: channel.name,
            },
          })
            .then((data) => {
              callback(null, data.data);
            })
            .catch((err) => {
              callback(new Error(`Error calling auth endpoint: ${err}`), {
                auth: '',
              });
            });
        },
      };
    };

    /* Pusher API pusherConnect to connect with pusher */
    this.pusherConnect(vimientPusherAppKey, {
      cluster: APP_CLUSTER,
      authorizer: authorizer,
    });
  }

  /**
   * @function unsubscribeEventAlerts
   * @description method to unsubscribe Alert channel.
   */
  public unsubscribeAppChannel() {
    /* Pusher API method to unsubscribe channel */
    this.unsubscribeChannel(channelData.alert.channelName);
  }

  /**
   * @function unsubscribeAllEvent
   * @description method to unsubscribe all the channels at once.
   */
  public unsubscribeAllEvent() {
    this.unsubscribeAppChannel();
  }
}

export default PusherApp;
