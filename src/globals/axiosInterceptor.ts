import axios from 'axios';
import {
  getCareAgentInfo,
  injectStorageEvent,
  saveUserInfo,
} from './global.functions';
import {
  CACHE_EVENTS_AUTO_LOGOUT,
  SESSION_EXPIRED_MESSAGE,
} from './global.constants';
import {logoutCache} from '../pages/WCPages/Login/Login.action';
import {PUBLIC_APIS} from './apiEndPoints';

const CARE_PORTAL_URL = `${window?.location?.origin}/api/`;
let controller = new AbortController();

let isAlreadyFetchingAccessToken = false;
let subscribers: any = [];

function onAccessTokenFetched(access_token: any) {
  subscribers = subscribers.filter((callback: any) => callback(access_token));
}

function addSubscriber(callback: any) {
  subscribers.push(callback);
}

async function retryRequest(originalRequest: any) {
  return await new Promise((resolve) => {
    addSubscriber((access_token: any) => {
      originalRequest.headers.Authorization = 'Bearer ' + access_token;
      resolve(axios(originalRequest));
    });
  });
}

/**
 * @description fn to get the updated access token
 * @param store redux store to execute logout
 * @returns promise
 */
const updateAuthToken = (store: any) => {
  const user: any = localStorage.getItem('userInfo');
  const userObject = JSON.parse(user);
  let refreshToken = userObject.refreshToken;

  return axios
    .post(`${CARE_PORTAL_URL}cognito/authentication/access-token`, {
      email: userObject.email,
      refresh_token: refreshToken,
    })
    .then((res) => {
      const resp = res.data;
      if (resp.application_code === 200) {
        const careAgentDetails = getCareAgentInfo();
        const loginUserDetails = {
          ...careAgentDetails,
          email: userObject.email,
          accessToken: resp.data[0].jwt,
          refreshToken: resp.data[0].refresh_token,
        };
        isAlreadyFetchingAccessToken = false;

        saveUserInfo(loginUserDetails);
        onAccessTokenFetched(loginUserDetails.accessToken);
        return true;
      }
    })
    .catch((err) => {
      isAlreadyFetchingAccessToken = false;
      injectStorageEvent(CACHE_EVENTS_AUTO_LOGOUT.SESSION_FLUSH, 401);
      store.dispatch(logoutCache(SESSION_EXPIRED_MESSAGE));

      if (err.response.status !== 403) {
        return Promise.reject(err);
      }
    });
};

// Interceptors let's you handle the request before it is handles by then and catch.
// Adding an interceptor for request.
/**
 * @description Axios interceptor to modify the API call.
 * @param store redux store
 */
export const interceptor = (store: any) => {
  axios.interceptors.request.use((config) => {
    const user: any = localStorage.getItem('userInfo');
    const userObject = JSON.parse(user);
    config.signal = controller.signal;
    // Checking if userObject is not empty.
    if (userObject) {
      config.headers.Authorization = `Bearer ${userObject.accessToken}`;
    }

    if (!userObject) {
      const isPublicApi = Object.values(PUBLIC_APIS).some(
        (endPoint: string) =>
          config.url === `${window?.location?.origin}/api/${endPoint}`,
      );

      if (!isPublicApi) {
        controller.abort();
        controller = new AbortController();
      }
    }

    return config;
  });

  //response interceptor to refresh token on receiving token expired error
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const user: any = localStorage.getItem('userInfo');
      const userObject = JSON.parse(user);
      const originalRequest = error.config;
      let refreshToken = userObject?.refreshToken;
      let retryOriginalRequest;

      //user will logout if response 403
      if (error.response?.status === 403) {
        store.dispatch(logoutCache('Forbidden', 'error'));
      }

      if (
        refreshToken &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            retryOriginalRequest = retryRequest(originalRequest);
            await updateAuthToken(store); // fetch authtoken
          } else {
            retryOriginalRequest = retryRequest(originalRequest);
          }
        } catch (authTokenError) {
          return Promise.reject(authTokenError);
        }

        return retryOriginalRequest;
      }
      return Promise.reject(error);
    },
  );
};
