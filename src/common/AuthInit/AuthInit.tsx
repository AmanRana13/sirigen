import React, {useCallback} from 'react';
import {
  CACHE_EVENTS_AUTO_LOGOUT,
  ERROR_STATUS,
  intervalInSeconds,
  LOGOUT_MESSAGE,
  SESSION_EXPIRED_MESSAGE,
  USER_INFO_KEY,
  USER_SESSION_KEY,
} from '../../globals/global.constants';
import {
  checkUserSession,
  getCareAgentInfo,
  getSessionStorage,
  injectStorageEvent,
  removeSessionStorage,
  setSessionStorage,
} from '../../globals/global.functions';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {
  getAllAlarmEvents,
  getAllCareInsightEvents,
} from '../../store/eventsReducer/Events.action';
import {logoutCache} from '../../pages/WCPages/Login/Login.action';
import {IConfigInterface} from 'config/app.config.types';
import {Sounds} from 'common/sounds/NotificationSound';
import {getPortalConfig} from 'store/configReducer/config.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const AuthInit = React.memo(() => {
  const dispatch: any = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const roleConfig: IConfigInterface = useAppSelector(
    (state: any) => state.auth.roleConfig,
  );
  const sos = useAppSelector((state: any) => state.alarms.sos);
  const sall = useAppSelector((state: any) => state.alarms.fall);
  const pendingAlarms: any = Object.entries({
    ...sos,
    ...sall,
  }).sort((a: any, b: any) => a.startTime - b.startTime);
  const origin: any = `${window.location.protocol}//${window.location.hostname}`;

  /**
   * @function isUserAuthenticated
   * @description method to check if user is authenticated or not
   */
  const isUserAuthenticated = useCallback(() => {
    const userInfo = getCareAgentInfo();

    return isAuthenticated && userInfo.accessToken && checkUserSession();
  }, [isAuthenticated]);

  React.useEffect(() => {
    injectStorageEvent(CACHE_EVENTS_AUTO_LOGOUT.REQUESTING_SESSION, Date.now());

    // this logic will create a bridge between browser tabs to maintain the session
    window.addEventListener('storage', (event: any) => {
      if (event.currentTarget.origin !== origin) return;

      const handler = (fn?: () => void) => {
        const credentials = getSessionStorage(USER_SESSION_KEY);
        if (credentials && fn) {
          fn();
        }
      };

      switch (event.key) {
        case CACHE_EVENTS_AUTO_LOGOUT.REQUESTING_SESSION:
          handler(() => {
            injectStorageEvent(CACHE_EVENTS_AUTO_LOGOUT.SESSION_SHARING, 1);
          });
          break;

        case CACHE_EVENTS_AUTO_LOGOUT.SESSION_SHARING:
        case USER_INFO_KEY:
          {
            const credentials = getSessionStorage(USER_SESSION_KEY);
            if (!credentials) {
              setSessionStorage(USER_SESSION_KEY, 1);
              window.location.reload();
            }
          }

          break;

        case CACHE_EVENTS_AUTO_LOGOUT.SESSION_FLUSH:
          handler(() => {
            removeSessionStorage(USER_SESSION_KEY);

            switch (event.newValue) {
              case 'false':
              case 'undefined':
                dispatch(logoutCache(LOGOUT_MESSAGE));

                break;

              case ERROR_STATUS.UNAUTHORIZED:
                dispatch(logoutCache(SESSION_EXPIRED_MESSAGE));
                break;
            }
          });
          break;

        case CACHE_EVENTS_AUTO_LOGOUT.RELOAD_SESSION:
          window.location.reload();
          break;

        default:
          break;
      }
    });

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    const userInfo = getCareAgentInfo();

    if (
      isAuthenticated &&
      userInfo.accessToken &&
      roleConfig.careInsightPrivileges.isAlerts
    ) {
      dispatch(getAllCareInsightEvents());
    }
  }, [isAuthenticated, dispatch, roleConfig.careInsightPrivileges.isAlerts]);

  /**
   * @function handleAlarmToneInterval
   * @description get notification sound in every 120 seconds for pending alarm
   * @returns void
   */
  const handleAlarmToneInterval = () => {
    const startTime = moment(pendingAlarms[0][1]?.startTime);
    const currentTime = moment();
    const seconds = currentTime.diff(startTime, 'seconds');
    if (seconds % intervalInSeconds.SOS_FALL == 0) {
      Sounds.notification.play();
    }
  };
  React.useEffect(() => {
    const userInfo = getCareAgentInfo();

    if (
      isUserAuthenticated() &&
      roleConfig.careInsightPrivileges.isAlarms &&
      !isEmpty(pendingAlarms)
    ) {
      const interval = setInterval(handleAlarmToneInterval, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [
    pendingAlarms,
    isAuthenticated,
    dispatch,
    roleConfig.careInsightPrivileges.isAlarms,
  ]);

  React.useEffect(() => {
    if (isUserAuthenticated() && roleConfig.careInsightPrivileges.isAlarms) {
      dispatch(getAllAlarmEvents());
    }
  }, [
    isAuthenticated,
    dispatch,
    roleConfig.careInsightPrivileges.isAlarms,
    isUserAuthenticated,
  ]);

  React.useEffect(() => {
    if (isUserAuthenticated()) {
      dispatch(getPortalConfig());
    }
  }, [isAuthenticated, dispatch, isUserAuthenticated]);

  return null;
});

export default AuthInit;
