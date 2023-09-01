/* eslint-disable max-len */
import axios from 'axios';
import {IPostUploadFileParams} from 'store/uploadFilesReducer/uploadFiles.types';
import {APIMethod} from './enums';

// URL for Online Deployments: Port Number not Required
const CARE_PORTAL_DEFAULT_URL = `${window?.location?.origin}/api/`;
// URL for Local Deployment includes Port Number
const CARE_PORTAL_LOCAL_URL = `${window?.location?.origin}/api/`;

const CARE_PORTAL_URL =
  window.location.hostname === 'localhost'
    ? CARE_PORTAL_LOCAL_URL
    : CARE_PORTAL_DEFAULT_URL;
const CARE_PORTAL_URL_OLD = process.env.REACT_APP_CARE_PORTAL_URL_OLD;

// This contains all the request cancel object.
const cancelRequestList: any = {};

export const cancelRequests = (...keys: any) => {
  keys.forEach((key: any) => {
    if (cancelRequestList[key]) {
      cancelRequestList[key]();
      delete cancelRequestList[key];
    }
  });
};

export const cancelAllRequests = () => {
  Object.keys(cancelRequestList).forEach((key) => {
    if (cancelRequestList[key]) {
      cancelRequestList[key](key);
      delete cancelRequestList[key];
    }
  });
};

function API<T>(params: any): Promise<any> {
  const url = params.mode
    ? `${CARE_PORTAL_URL_OLD}${params.mode}/${params.url}`
    : `${CARE_PORTAL_URL}${params.url}`;
  
  //need to stringify params in latest axios
  const stringifyParams: any = {};
  if (params.params) {
    Object.keys(params?.params).forEach((item) => {
      if (params?.params[item] !== null && params?.params[item] !== undefined) {
        stringifyParams[item] =
          typeof params?.params[item] === 'string'
            ? params.params[item]
            : JSON.stringify(params.params[item]);
      }
    });
  }

  return axios({
    url: url,
    params: stringifyParams,
    method: params.method,
    cancelToken: new axios.CancelToken((c) => {
      cancelRequestList[params.cancelKey] = c;
    }),
    responseType: params.responseType,
    headers: {
      ...params.headers,
    },
    data: params.data,
  })
    .then((res) => {
      const resData = res.data;

      // check api res for file
      if (resData instanceof ArrayBuffer) {
        return {
          file: resData,
        };
      }

      return {
        applicationCode: resData.application_code,
        message: resData.message,
        data: resData.data,
        error: resData.error,
      };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function UPLOAD_API(params: IPostUploadFileParams): Promise<any> {
  const uninterceptedAxiosInstance = axios.create();
  return uninterceptedAxiosInstance({
    url: params.url,
    method: APIMethod.Post,
    data: params.uploadApiData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((res) => {
      const resData = res.data;

      // check api res for file
      if (resData instanceof ArrayBuffer) {
        return {
          file: resData,
        };
      }

      return {
        applicationCode: resData.application_code,
        message: resData.message,
        data: resData.data,
        error: resData.error,
      };
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export {API, UPLOAD_API};
