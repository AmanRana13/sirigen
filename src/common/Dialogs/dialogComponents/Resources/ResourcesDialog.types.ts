import {RefObject} from 'react';
import {ResourceFormats} from 'globals/enums';
import {IResourcesDialogData} from 'pages/WCPages/SeniorWellnessPlan/SeniorWellnessPlan.types';

export interface IResource {
  resourceId: string;
  name: string;
  description: string;
  date: string;
  format: ResourceFormats;
  resourceVersion: string;
  createdBy: string;
  lastUpdatedBy: string;
  lastViewed: string | null;
}

export interface INewFilesData {
  resourceId: string;
  file: File;
}

export interface IInitialState {
  resourcesRowsData: IResource[];
  existingResourcesData: IResource[];
  deleteRowsData: string[];
  newFilesData: INewFilesData[];
}

export const initialState: IInitialState = {
  existingResourcesData: [],
  resourcesRowsData: [],
  deleteRowsData: [],
  newFilesData: [],
};

export interface IResourcesPopupProps {
  data: IResourcesDialogData;
  maxTotalCount?: number;
  maxUrlCount?: number;
  fileSize?: number;
  position?: any;
}

export interface IHandlerProps {
  handleChange: (resourceId: string, description: string) => void;
  handleRemove: (resourceId: string) => void;
}

export interface IResourcesTableRowProps extends IHandlerProps {
  row: IResource;
  index: number;
  isError: boolean;
  isDisabled: boolean;
}

export interface IResourcesTableProps extends IHandlerProps {
  data: IInitialState;
  isError: boolean;
  isDisabled: boolean;
}

export interface IResourcesTableRowsProps extends IResourcesTableProps {
  listInnerRef: RefObject<HTMLTableElement>;
}

export interface IUploadFilesForm {
  selectedFiles: File[];
  errors: string[];
  url: string;
  isDisabled: boolean;
  isUrlDisabled: boolean;
  isUploadDisabled: boolean;
  isUploadError: boolean;
}

export interface ISaveResourcesParams {
  resourcesDialogState: IInitialState;
  data: IResourcesDialogData;
  onCloseHandler: () => void;
}
