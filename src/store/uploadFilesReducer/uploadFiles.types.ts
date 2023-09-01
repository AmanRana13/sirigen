export interface IFields {
  [key: string]: string;
}

export interface IPostSignedUrlRequestBody {
  senior_id: string;
  files: string[];
  version: string;
}

export interface IPostSignedUrlParams {
  data: IPostSignedUrlRequestBody;
}

export interface IPostUploadFileParams {
  url: string;
  uploadApiData: FormData;
}

export interface IInitialState {
  filesUploadCount: number; //length of IFile
  uploadedFileCount: number;
}

export interface IUploadFilesAction {
  type: string;
  payload?: any;
}

export const initialState: IInitialState = {
  filesUploadCount: 0,
  uploadedFileCount: 0,
};