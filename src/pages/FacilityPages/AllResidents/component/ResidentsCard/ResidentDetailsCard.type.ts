import {
  ACTIVITY_CONDITION,
  DASHBOARD_VITALS_TYPE,
  HEART_RATE_CONDITION,
  SLEEP_CONDITION,
  WEIGHT_CONDITION,
  WELLNESS_CONDITION,
} from 'globals/enums';

export interface IResidentDetailsCard {
  cardType: DASHBOARD_VITALS_TYPE;
  activityTitle: string;
  condition:
    | HEART_RATE_CONDITION
    | ACTIVITY_CONDITION
    | SLEEP_CONDITION
    | WEIGHT_CONDITION
    | WELLNESS_CONDITION;
  activityValue: string;
  onClick?: () => void;
}
