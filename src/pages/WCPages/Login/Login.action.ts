/* eslint-disable max-len */
import {
  CLEAR_REDUX_STATE,
  CLOSE_TIMEOUT_MODEL,
  FETCHING_LOGIN_DETAILS,
  FETCHING_LOGIN_DETAILS_DONE,
  LOGOUT_USER,
  OPEN_TIMEOUT_MODEL,
  USER_LOGGED_IN,
} from './Login.types';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from '../../../common/ApplicationLoader';
import {showToast} from '../../../common/Toast';
import {API} from '../../../globals/api';
import {
  injectStorageEvent,
  saveUserInfo,
  setSessionStorage,
  getCareAgentDetailsParseJWT,
  getCurrentUserRoleConfig,
  getCareAgentInfo,
  parseJwt,
  getLocalStorage,
} from 'globals/global.functions';
import {
  ALERT_MESSAGES,
  CACHE_EVENTS_AUTO_LOGOUT,
  LOCAL_STORAGE_KEY,
  LOGOUT_MESSAGE,
  USER_SESSION_KEY,
} from '../../../globals/global.constants';
import {removeAllEvents} from 'store/eventsReducer/Events.action';
import PusherApp from 'pusher/pusherApp';
import {Roles} from 'globals/enums';
import {
  postUserMappingService,
  loginUserService,
} from 'services/userService/userService';
import {push} from 'redux-first-history';

export const toggleLogin = (values: any) => {
  return {
    type: FETCHING_LOGIN_DETAILS_DONE,
    payload: {...values},
  };
};

export const loginUser = (values: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({type: FETCHING_LOGIN_DETAILS});
      const response = await loginUserService({
        email: values.email.toLowerCase(),
        password: values.password,
      });
      dispatch(hideApplicationLoader());
      const decodedJWT = parseJwt(response.data[0].jwt);

      if (decodedJWT.is_first_login && decodedJWT.is_reset_needed) {
        dispatch(loginWithOtp(values));
      } else {
        dispatch(loginWithPassword(response, values));
      }
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(toggleLogin({isAuthenticated: false}));
      dispatch(showToast('Incorrect Username or Password.', 'error'));
    }
  };
};

const loginWithOtp = (values: any) => async (dispatch: any) => {
  dispatch(
    push(`/choose-password?otp=${values.password}&email=${values.email}`),
  );
};

const loginWithPassword =
  (response: any, values: any) => async (dispatch: any) => {
    let loginUserDetails: any = {
      email: values.email,
      accessToken: response.data[0].jwt,
      refreshToken: response.data[0].refresh_token,
      userName: {
        first_name: '',
        last_name: '',
        middle_name: '',
      },
      userId: '',
      userRole: [],
    };
    saveUserInfo(loginUserDetails);

    const userDetails = getCareAgentDetailsParseJWT();
    const role = [userDetails.roles, ...userDetails.secondary_role];

    loginUserDetails = {
      ...loginUserDetails,
      userId: userDetails.user_id,
      userRole: role,
    };

    saveUserInfo(loginUserDetails);
    dispatch(getUserMappingAction());
    const currentUserConfig = getCurrentUserRoleConfig(
      loginUserDetails.userRole,
    );

    setSessionStorage(USER_SESSION_KEY, 1);
    dispatch(
      toggleLogin({
        isAuthenticated: true,
        roleConfig: currentUserConfig,
        email: loginUserDetails.email,
        userId: loginUserDetails.userId,
        userRole: loginUserDetails.userRole,
      }),
    );

    dispatch(showToast('Login Successfull !', 'success'));

    dispatch(redirectOnLogin());
  };

/**
 * @description action creator to fetch user info mapping
 * @returns void
 */
const getUserMappingAction = () => async (dispatch: any) => {
  try {
    let careAgentDetails = getCareAgentInfo();

    const careagentMoreDetails = await postUserMappingService([
      careAgentDetails.userId,
    ]);

    careAgentDetails = {
      ...careAgentDetails,
      userName: careagentMoreDetails[careAgentDetails.userId]?.name || {
        first_name: '',
        last_name: '',
        middle_name: '',
      },
    };
    saveUserInfo(careAgentDetails);
    dispatch(
      toggleLogin({
        userName: careAgentDetails.userName,
      }),
    );
  } catch (error) {
    console.log({error});
  }
};

export const onClickLogout = (message: string) => (dispatch: any) => {
  //check if autosave time is running or not
  const timer: ReturnType<typeof setTimeout> | null = getLocalStorage(
    LOCAL_STORAGE_KEY.AUTO_SAVE_TIMER,
  );
  if (timer) {
    window.alert(ALERT_MESSAGES.autoSaveLogout);
  } else {
    dispatch(logoutUser(message));
  }
};

export const logoutUser = (
  message = LOGOUT_MESSAGE,
  inActiveLogout = false,
) => {
  return (dispatch: any) => {
    const logoutUserOperations = () => {
      const user: any = localStorage.getItem('userInfo');
      const userObject = JSON.parse(user);
      let logoutApiData = {};

      if (userObject) {
        logoutApiData = {
          refresh_token: userObject.refreshToken,
          email: userObject.email,
        };
      }

      dispatch(showApplicationLoader());
      API({
        url: 'cognito/authentication/logout',
        method: 'post',
        data: JSON.stringify(logoutApiData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(() => {
          injectStorageEvent(
            CACHE_EVENTS_AUTO_LOGOUT.SESSION_FLUSH,
            inActiveLogout,
          );

          dispatch(logoutCache(message));
        })
        .catch(() => {
          localStorage.clear();
          dispatch(logoutCache(message));
        });
    };

    logoutUserOperations();
  };
};

/**
 * @description :-
 *    Logout user from the system and clear all session, storage and redirect user to login page.
 * @param message logout message
 * @returns call back to dispatch actions
 */
export const logoutCache = (message: any, type = 'success') => {
  return (dispatch: any) => {
    localStorage.clear();
    const eventPusher = new PusherApp();
    eventPusher.pusherDisconnect();
    dispatch(removeAllEvents());
    dispatch({type: LOGOUT_USER});
    dispatch(push('/login'));
    dispatch(clearReduxState());
    dispatch(hideApplicationLoader());
    dispatch(showToast(message, type));
  };
};

/**
 * @description action creator to clear redux states
 * @function clearReduxState
 */
export const clearReduxState = () => (dispatch: any) => {
  dispatch({type: CLEAR_REDUX_STATE});
};

/**
 * @description action creator to open the model for all the tabs except parent
 * @param value boolean to show hide action buttons
 */
export const openAutoLogoutModel = () => (dispatch: any) => {
  dispatch({type: OPEN_TIMEOUT_MODEL});
};

/**
 * @description action creator to close the model for all the tabs except parent
 * @param value boolean to show hide action buttons
 */
export const closeAutoLogoutModel = () => (dispatch: any) => {
  dispatch({type: CLOSE_TIMEOUT_MODEL});
};

/**
 * @description action creator to store the user value in redux when user refresh the page
 */
export const userLoggedIn = () => (dispatch: any) => {
  const careAgentInfo = getCareAgentInfo();
  const roleConfig = getCurrentUserRoleConfig(careAgentInfo.userRole);
  const {email, userId, userName, userRole} = careAgentInfo;

  dispatch({
    type: USER_LOGGED_IN,
    payload: {
      roleConfig,
      email,
      userId,
      userName,
      userRole,
    },
  });
};

/**
 * @function redirectOnLogin
 * @description action creator to redirect the user after login
 * @param {string} userRole user current role
 * @returns {void}
 */
export const redirectOnLogin = () => (dispatch: any, getState: any) => {
  const {roleConfig, userRole} = getState().auth;
  const hasRole = userRole.every((role: any) =>
    Object.values(Roles).includes(role),
  );

  if (hasRole) {
    let pageToRedirect = roleConfig.defaultPage || '/';
    dispatch(push(pageToRedirect));
  } else {
    dispatch(
      showToast('You do not have permission to access portal.', 'error'),
    );
  }
};
