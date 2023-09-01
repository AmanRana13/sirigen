/* eslint-disable max-len */
import {appRoutesEndpoints} from './../routes/appRoutesEndpoints';
import {Roles} from './../globals/enums';
import {IRolesConfigInterface} from './app.config.types';

export const ROLES_CONFIG: IRolesConfigInterface = {
  [Roles.Admin]: {
    // eslint-disable-next-line max-len
    defaultPage: `${appRoutesEndpoints.admin.baseRoute}${appRoutesEndpoints.admin.nestedRoutes.careInsightReview.baseRoute}`,
    defaultHomeRoute: 'dashboard',
    role: Roles.Admin,
    accessLabel: 'Admin',
    isPusher: true,
    careInsightPrivileges: {
      isAlerts: false,
      isApproveAlert: true,
      isApproveSummary: true,
      isAlertActionNotification: false,
      isSummaryActionNotification: false,
      isAlarms: true,
      isCIRangeMilestoneNotification: true,
      isLocationData: true,
    },
  },
  [Roles.CareAgent]: {
    defaultPage: appRoutesEndpoints.homePage,
    role: Roles.CareAgent,
    defaultHomeRoute: 'dashboard',
    accessLabel: 'Agent',
    isPusher: true,
    careInsightPrivileges: {
      isAlerts: true,
      isApproveAlert: false,
      isApproveSummary: false,
      isAlertActionNotification: true,
      isSummaryActionNotification: true,
      isAlarms: true,
      isCIRangeMilestoneNotification: false,
      isLocationData: true,
    },
  },
  [Roles.WarehouseEmployee]: {
    defaultPage: appRoutesEndpoints.homePage,
    defaultHomeRoute: 'onboarding-info',
    accessLabel: 'Warehouse Employee',
    role: Roles.WarehouseEmployee,
    isPusher: false,
    careInsightPrivileges: {
      isAlerts: false,
      isApproveAlert: false,
      isApproveSummary: false,
      isAlertActionNotification: false,
      isSummaryActionNotification: false,
      isAlarms: false,
      isCIRangeMilestoneNotification: false,
      isLocationData: false,
    },
  },
  [Roles.BDM]: {
    defaultPage: `${appRoutesEndpoints.admin.baseRoute}${appRoutesEndpoints.admin.nestedRoutes.corporateAndFacilities.baseRoute}`,
    defaultHomeRoute: 'onboarding-info',
    accessLabel: 'BDM',
    role: Roles.BDM,
    isPusher: false,
    careInsightPrivileges: {
      isAlerts: false,
      isApproveAlert: false,
      isApproveSummary: false,
      isAlertActionNotification: false,
      isSummaryActionNotification: false,
      isAlarms: false,
      isCIRangeMilestoneNotification: false,
      isLocationData: false,
    },
  },
};
