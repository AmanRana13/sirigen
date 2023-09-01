export interface IConfigAction {
  type: string;
  payload?: any;
}

export interface IConfigMessages {
  uploadUrlInfo: string;
  resourcesInfo: string;
  uploadFileInfo: string;
}

export interface IConfigInitialState {
  messages: IConfigMessages;
  locationResponseTime: null | number;
  autoSaveTimeOut: null | number;
}

export const configInitialState: IConfigInitialState = {
  messages: {
    resourcesInfo: '',
    uploadFileInfo: '',
    uploadUrlInfo: '',
  },
  autoSaveTimeOut: null,
  locationResponseTime: null,
};
