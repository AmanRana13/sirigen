import {deleteFileService} from 'services/deleteFileService/deleteFiles.service';
export interface IDeleteFilesParams {
  senior_id: string;
  version: string;
  files: string[];
}
export interface IDeleteFilesAPIParams {
  data: IDeleteFilesParams;
}
export const deleteFiles = (params: IDeleteFilesParams) => async (
  dispatch: any,
) => {
  try {
    await deleteFileService({data: params});
    return true;
  } catch (error) {
    console.log('error');
  }
};
