/* eslint-disable max-len */
import {PusherConnectionStatus, SecretsKeys} from 'globals/enums';
import React from 'react';
import AlertChannelEvents from './channels/alertChannelEvents';
import PusherApp from './pusherApp';
import SummaryChannelEvents from './channels/summaryChannelEvents';
import AlarmChannelEvents from './channels/alarmChannelEvents';
import {useQuery} from 'utilities/react-query';
import {getSecretsDataService} from 'services/configService/config.service';
import {ISecretsResponse} from 'services/configService/config.service.types';
import {showError} from 'store/commonReducer/common.action';
import {hideApplicationLoader} from 'common/ApplicationLoader';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const PusherContext = React.createContext<any>({});

export interface IPusherProvider {
  children: JSX.Element;
}

function PusherProvider({children}: IPusherProvider) {
  const isAuthenticated = useAppSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const isPusher = useAppSelector(
    (state: any) => state.auth.roleConfig.isPusher,
  );
  let pusherApp: any = new PusherApp();
  const alertChannelEvents = new AlertChannelEvents();
  const summaryChannelEvents = new SummaryChannelEvents();
  const alarmChannelEvents = new AlarmChannelEvents();
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const dispatch: any = useAppDispatch();

  //query to get secrets data
  const {data, isSuccess} = useQuery({
    queryKey: ['secretsData'],
    queryFn: (): Promise<ISecretsResponse> =>
      getSecretsDataService({
        keys: JSON.stringify([
          SecretsKeys.PUSHER_CHANNEL_CLUSTER,
          SecretsKeys.PUSHER_CHANNEL_KEY,
        ]),
      }),
    enabled: isAuthenticated,
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  React.useEffect(() => {
    if (isAuthenticated && isSuccess && data && isPusher) {
      pusherApp.establishConnection(data.pusherKey, data.pusherCluster);
      pusherApp.onPusherStateChange((state: any) => {
        setConnectionStatus(state);
      });

      pusherApp.onError((error: any) => {
        // eslint-disable-next-line no-console
        console.log('pusher error', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isSuccess, isPusher]);

  const contextValue = React.useMemo(
    () => ({
      pusherApp,
      connectionStatus,
      alertChannelEvents,
      summaryChannelEvents,
      alarmChannelEvents,
    }),
    [
      pusherApp,
      connectionStatus,
      alertChannelEvents,
      summaryChannelEvents,
      alarmChannelEvents,
    ],
  );

  return (
    <PusherContext.Provider value={contextValue}>
      {children}
    </PusherContext.Provider>
  );
}

interface IUsePusher {
  pusherConnectionStatus: boolean;
  pusherApp: PusherApp;
  alertChannelEvents: AlertChannelEvents;
  alarmChannelEvents: AlarmChannelEvents;
  summaryChannelEvents: SummaryChannelEvents;
}

/**
 * @function userPuser
 * @description custom hook to provide EventModule methods and pusher connection status
 * @returns pusher connectionStatus and EventModule class instance
 */
function usePusher(): IUsePusher {
  const context = React.useContext(PusherContext);
  if (!context) {
    // Fail fast if not within a PusherProvider
    throw new Error('usePusher must be used within a PusherProvider');
  }

  const {
    pusherApp,
    connectionStatus,
    alertChannelEvents,
    summaryChannelEvents,
    alarmChannelEvents,
  } = context;
  return {
    pusherConnectionStatus:
      connectionStatus === PusherConnectionStatus.Connected,
    pusherApp,
    alertChannelEvents,
    summaryChannelEvents,
    alarmChannelEvents,
  };
}

export {PusherProvider, usePusher};
