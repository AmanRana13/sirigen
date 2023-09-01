import {ACTIVITY_CARD_VARIANT} from 'globals/enums';

export interface IActivityCardProps {
  goal: string;
  percentage: number;
  variant: ACTIVITY_CARD_VARIANT;
  title?: string;
}
