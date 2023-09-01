import {
  AUTO_LOGOUT_MESSAGE,
  CACHE_EVENTS_AUTO_LOGOUT,
  IDLE_USER_TIMEOUT,
  TEN_SECONDS,
} from 'globals/global.constants';
import {injectStorageEvent} from 'globals/global.functions';
import {
  closeAutoLogoutModel,
  logoutUser,
  openAutoLogoutModel,
} from 'pages/WCPages/Login/Login.action';
import React, {useRef, useState} from 'react';
import IdleTimer from 'react-idle-timer';
import SessionTimeoutDialog from './SessionTimeoutDialog';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

let countdownInterval: number;
let timeout: number;

const SessionTimeout = () => {
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const {isAuthenticated, isTimeoutModel} = useAppSelector(
    (state: any) => state.auth,
  );
  const idleTimer: any = useRef(null);
  const dispatch: any = useAppDispatch();

  const clearIdleSession = () => {
    clearTimeout(timeout);
    clearInterval(countdownInterval);
  };

  const handleLogout = () => {
    dispatch(closeAutoLogoutModel());
    clearIdleSession();
    dispatch(logoutUser());
  };

  const handleAutologout = () => {
    dispatch(closeAutoLogoutModel());
    clearIdleSession();
    dispatch(logoutUser(AUTO_LOGOUT_MESSAGE));
  };

  const handleContinue = () => {
    injectStorageEvent(CACHE_EVENTS_AUTO_LOGOUT.RELOAD_SESSION, Date.now());
    window.location.reload();
  };

  const onActive = () => {
    if (!isTimeoutModel) {
      clearIdleSession();
    }
  };

  const handleOnIdle = () => {
    const delay = 1000 * 1;
    if (isAuthenticated && !isTimeoutModel) {
      timeout = window.setTimeout(() => {
        let countDown = 10;
        dispatch(openAutoLogoutModel());
        setTimeoutCountdown(countDown);
        countdownInterval = window.setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
          } else {
            handleAutologout();
          }
        }, 1000);
      }, delay);
    }
  };

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={handleOnIdle}
        debounce={250}
        timeout={IDLE_USER_TIMEOUT - TEN_SECONDS}
        crossTab={{
          type: 'localStorage',
          channelName: 'idle-timer',
          emitOnAllTabs: true,
        }}
      />
      <SessionTimeoutDialog
        countdown={timeoutCountdown}
        onContinue={handleContinue}
        onLogout={handleLogout}
      />
    </>
  );
};

export default SessionTimeout;
