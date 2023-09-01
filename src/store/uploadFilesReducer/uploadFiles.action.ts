import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {INewFilesData} from 'common/Dialogs/dialogComponents/Resources/ResourcesDialog.types';
import {getFormData} from 'globals/global.functions';
import {
  postSignedUrlService,
  postUploadFileService,
} from 'services/fileUploadService/fileUpload.service';
import SignedUrlDataModel from 'services/fileUploadService/model/signedUrlDataModel';
import {showError} from 'store/commonReducer/common.action';
import {IPostUploadFileParams} from './uploadFiles.types';

export interface IUploadFilesParams {
  senior_id: string;
  version: string;
  files: INewFilesData[];
}

export const UPLOAD_FILES = 'UPLOAD_FILES';
export const UPLOAD_FILES_STATUS_UPDATE = 'UPLOAD_FILES_STATUS_UPDATE';
export const UPLOAD_FILES_RESET = 'UPLOAD_FILES_RESET';

export const uploadFiles = (params: IUploadFilesParams) => async (
  dispatch: any,
) => {
  dispatch(showApplicationLoader());
  try {
    dispatch({
      type: UPLOAD_FILES,
      payload: {
        filesUploadCount: params.files.length,
      },
    });
    const fileNames = params.files.map(
      (file: INewFilesData) => file.resourceId,
    );
    const signedUrls = await postSignedUrlService({
      data: {
        senior_id: params.senior_id,
        files: fileNames,
        version: params.version,
      },
    });
    await dispatch(uploadFilesToAWS(signedUrls, params.files));
    dispatch({
      type: UPLOAD_FILES_RESET,
    });
    dispatch(hideApplicationLoader());
    return true;
  } catch (error) {
    dispatch({
      type: UPLOAD_FILES_RESET,
    });
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

export const uploadFilesToAWS = (
  signedUrls: SignedUrlDataModel[],
  files: INewFilesData[],
) => async (dispatch: any) => {
  // file array
  const filesToUpload: IPostUploadFileParams[] = files.map((file) => {
    const signedUrl: SignedUrlDataModel = signedUrls.filter(
      (signedUrl: SignedUrlDataModel) =>
        signedUrl.resourceId === file.resourceId,
    )[0];
    const {url, fields} = signedUrl;
    const uploadApiData = getFormData({
      ...fields,
      file: file.file,
    });
    return {
      url,
      uploadApiData,
    };
  });
  // loop in to file array and hit the AWS URL one by one.
  for (let i = 0; i < filesToUpload.length; i++) {
    const fileToUpload: IPostUploadFileParams = filesToUpload[i];
    try {
      await postUploadFileService(fileToUpload);
      // and update the count state one by one.
      dispatch({
        type: UPLOAD_FILES_STATUS_UPDATE,
        payload: {
          uploadedFilesCount: i + 1,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
