import {API} from 'globals/api';
import {RESOURCES_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {IDeleteFilesAPIParams} from 'store/deleteFiles/deleteFiles.action';

/**
 * @description API service to delete uploaded files
 * @function deleteFileService
 * @param {IDeleteFilesParams} params of delete Files api
 */
export const deleteFileService = async (
  params: IDeleteFilesAPIParams,
): Promise<any> => {
  try {
    await API({
      url: RESOURCES_END_POINTS.DELETE_FILES_URL,
      method: APIMethod.Delete,
      data: params.data,
    });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
