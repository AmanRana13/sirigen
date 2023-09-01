import { UPLOAD_FILES, UPLOAD_FILES_RESET, UPLOAD_FILES_STATUS_UPDATE } from "./uploadFiles.action";
import { IInitialState, initialState, IUploadFilesAction } from "./uploadFiles.types";

const uploadFilesReducer = (
  state: IInitialState = initialState,
  action: IUploadFilesAction,
) => {
  switch (action.type) {
    case UPLOAD_FILES:
      return {
        ...state,
        filesUploadCount: action.payload.filesUploadCount,
        uploadedFilesCount: 0
      };
    case UPLOAD_FILES_STATUS_UPDATE:
      return {
        ...state,
        uploadedFilesCount: action.payload.uploadedFilesCount
      };
    case UPLOAD_FILES_RESET:
      return initialState;
    default:
      return state;
  }
};

export default uploadFilesReducer;
