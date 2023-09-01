import {EventsType} from 'globals/enums';

export interface IEventMaxDialogProps {
  minimizeModal: () => void;
  handleClose: () => void;
  handleSubmit: () => void;
  disableSendButton: boolean;
  fullName: string;
  isOpen: boolean;
  eventType: EventsType;
  children?: JSX.Element;
  handleNoAction?: () => void;
  navigateToDashboard?: () => void;
  position?: any;
  alert?: boolean;
  isSos?: boolean;
  isFall?: boolean;
  showMinimize?: boolean;
  justifyButtonCenter?: boolean;
}
