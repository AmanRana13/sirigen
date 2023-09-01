import {DIALOG_TYPES} from '../../globals/global.constants';

export interface IOpenDialogProps {
  type: DIALOG_TYPES;
  dialogTitle?: string;
  isFailButton?: boolean;
  data?: any;
  firstMessage?: string;
  boldMessage?: string;
  secondMessage?: string;
  successButtonText?: string;
  cancelButtonText?: string;
  onSuccessButton?: () => void;
  isAutoSave?: boolean;
  isLogout?: boolean;
  showAlertIcon?: boolean;
  id?: string | any;
}

export interface IGetSeniorDetailPayload {
  senior_id: string;
  account_id: string;
}

export interface IGetSeniorLocationParams {
  isHistory?: boolean;
  date?: any;
  startTime?: any;
  endTime?: any;
  isResident?: boolean;
}
