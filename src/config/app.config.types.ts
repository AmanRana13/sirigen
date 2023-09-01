import {Roles} from 'globals/enums';

export interface ICareInsightPrivileges {
  isAlerts: boolean;
  isApproveAlert: boolean;
  isApproveSummary: boolean;
  isAlertActionNotification: boolean;
  isSummaryActionNotification: boolean;
  isAlarms: boolean;
  isCIRangeMilestoneNotification: boolean;
  isLocationData: boolean;
}
export interface IConfigInterface {
  defaultPage: string;
  defaultHomeRoute: string;
  accessLabel: string;
  role: Roles;
  isPusher: boolean;
  careInsightPrivileges: ICareInsightPrivileges;
}
export interface IRolesConfigInterface {
  [key: string]: IConfigInterface;
}
