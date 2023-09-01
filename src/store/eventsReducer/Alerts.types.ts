import {CareInsightStatus} from 'globals/enums';

export interface IPostAlertDialogPayload {
  care_insight_id: string;
  updated_by: string;
  status: CareInsightStatus;
  message: string;
}
