import {API} from 'globals/api';
import {PUBLIC_APIS, USER_SERVICE_ENDPOINTS} from 'globals/apiEndPoints';

export async function addAgentService(param: any): Promise<any> {
  return API({
    url: USER_SERVICE_ENDPOINTS.ADD_CARE_AGENT,
    method: 'post',
    data: param,
  });
}

export async function disableAgentService(param: any): Promise<any> {
  return API({
    url: USER_SERVICE_ENDPOINTS.DISABLE_CARE_AGENT,
    method: 'post',
    data: param,
  });
}

export async function resendOtpService(param: any): Promise<any> {
  return API({
    url: USER_SERVICE_ENDPOINTS.RESEND_OTP,
    method: 'get',
    params: param,
  });
}

export async function forgotPasswordService(param: any): Promise<any> {
  return API({
    url: PUBLIC_APIS.FORGOT_PASSWORD,
    method: 'get',
    params: param,
  });
}
