import {API, UPLOAD_API} from 'globals/api';
import {RESOURCES_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {
  IPostSignedUrlParams,
  IPostUploadFileParams,
} from 'store/uploadFilesReducer/uploadFiles.types';
import FileUploadDataParser from './parser/fileUploadDataParser';

/**
 * @description API service to get the signed urls to upload files
 * @function postSignedUrlService
 * @param {IPostSignedUrlParams} params of get signed url api
 * @returns {SignedUrlDataModel[]}
 */

export async function postSignedUrlService(
  params: IPostSignedUrlParams,
): Promise<any> {
  try {
    const signedUrl = await API({
      url: RESOURCES_END_POINTS.GET_SIGNED_URL,
      method: APIMethod.Post,
      data: params.data,
    });
    const dataParser = new FileUploadDataParser();
    const signedUrlData = dataParser.parseSignedUrlData(signedUrl?.data);
    return signedUrlData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @description API service to upload files
 * @function postUploadFileService
 * @param {IPostUploadFileParams} params of upload files api
 */

export const postUploadFileService = async (
  params: IPostUploadFileParams,
): Promise<any> => {
  try {
    await UPLOAD_API(params);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
