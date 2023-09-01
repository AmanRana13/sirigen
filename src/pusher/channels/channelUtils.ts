import PusherApp from 'pusher/pusherApp';
import * as PusherTypes from 'pusher-js';

interface IChannelUtils {
  subscribeChannel: (channelName: string) => PusherTypes.Channel;
  channelEventListener: (
    channel: any,
    event: any,
    dataParser: () => any,
    listenerMethod: any,
  ) => void;
}

class ChannelUtils implements IChannelUtils {

  /**
   * @function subscribeChannel
   * @description metod to subscribe the channel
   * @param {string} channelName channel name
   * @returns {PusherTypes.Channel}
   */
  subscribeChannel(channelName: string): PusherTypes.Channel {
    const eventModuleObj = new PusherApp();
    return eventModuleObj.subscribeChannel(channelName);
  }

  /**
   * @function channelEventListener
   * @param channel channel to bind the event listener
   * @param event event name
   * @param dataParser method to parse the data which recieved from pusher
   * @param listenerMethod method to execute once get data from pusher
   */
  channelEventListener(
    channel: any,
    event: string,
    dataParser: any,
    listenerMethod: any,
  ) {
    channel.bind(event, (data: any) => {
      try {
        data = dataParser(data);
        listenerMethod(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Data is missing in the API', error);
      }
    });
  }
}

export default ChannelUtils;
