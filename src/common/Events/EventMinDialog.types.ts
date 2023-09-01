import {EventsType} from './../../globals/enums';

export interface ICardHeaderProps {
  eventType: EventsType;
  eventId: string;
  fullName: string;
}
export interface IEventMinDialogProps extends ICardHeaderProps {
  message: string;
  dateGenerated?: string;
}
