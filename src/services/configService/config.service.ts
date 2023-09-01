import {convertSecondsToMilliSeconds} from 'globals/global.functions';
import {API} from 'globals/api';
import {CONFIG_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {IGetSecretsDataParams, ISecretsResponse} from './config.service.types';

export async function getPortalConfigService(params: any): Promise<any> {
  try {
    const response = await API({
      url: CONFIG_END_POINTS.GET_CONFIG_DATA,
      method: APIMethod.Get,
      params: params,
    });

    return {
      locationResponseTime: parseInt(response.data?.locate_me_loader?.message),
      uploadUrlInfo: response.data?.portal_info_upload_url?.message,
      uploadFileInfo: response.data?.portal_info_upload_file?.message,
      resourcesInfo: response.data?.portal_info_resources?.message,
      autoSaveTimeOut: convertSecondsToMilliSeconds(
        Number(response.data?.portal_auto_save_timeout?.message),
      ),
    };
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function getSecretData
 * @description service to fetch the secrets data from aws
 * @param {IGetSecretDataParams} params keys to fetch the data
 */
export const getSecretsDataService = async (
  params: IGetSecretsDataParams,
): Promise<ISecretsResponse> => {
  // type needs change from any to ISecretsResponse once API is ready
  try {
    const response = await API({
      url: CONFIG_END_POINTS.GET_SECRET_DATA,
      method: APIMethod.Get,
      params,
    });

    return {
      pusherCluster: response.data?.PUSHER_CHANNEL_CLUSTER,
      pusherKey: response.data?.PUSHER_CHANNEL_KEY,
    };
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
};
