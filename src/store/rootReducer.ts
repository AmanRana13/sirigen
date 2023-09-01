/* eslint-disable max-len */
import {combineReducers} from 'redux';

import {loginReducer} from 'pages/WCPages/Login/Login.reducer';
import {applicationLoaderReducer} from '../common/ApplicationLoader/ApplicationLoader.reducer';
import {toastReducer} from '../common/Toast/Toast.reducer';
import {callEntryReducer} from 'pages/WCPages/SeniorDashboard/components/CallEntry/CallEntry.reducer';
import {commonReducer} from './commonReducer/common.reducer';
import {wellnessDashboardReducer} from 'pages/WCPages/WellnessDashboard/WellnessDashboard.reducer';
import {seniorCallSchedulerReducer} from 'pages/WCPages/SeniorCallScheduler/SeniorCallScheduler.reducer';
import {seniorDashboardReducer} from 'pages/WCPages/SeniorDashboard/SeniorDashboard.reducer';
import {validateDataReducer} from 'pages/WCPages/AddUser/ProfileInfo/ProfileInfo.reducer';
import seniorCareInsightsReducer from 'pages/WCPages/SeniorCareInsights/SeniorCareInsights.reducer';
import {wellnessPlanReducer} from 'pages/WCPages/SeniorWellnessPlan/wellnessPlanReducer.reducer';
import {devicesReducer} from 'pages/WCPages/AddUser/DeviceInstallation/Devices.reducer';
import eventsReducer from './eventsReducer/Events.reducer';
import alarmReducer from './alarmReducer/Alarm.reducer';
import messageManagerReducer from 'pages/WCPages/SeniorCareInsights/MessageManager/MessageManager.reducer';
import {careAgentAccountReducer} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.reducer';
import {careInsightReviewReducer} from 'pages/WCPages/Admin/CareInsightReview/CareInsightReview.reducer';
import {holisticAssessmentAdminReducer} from 'pages/WCPages/Admin/Assessment/HolisticAsssessmentAdmin/HolisticAssessmentAdmin.reducer';
import {cIRangeMilestonesReducer} from 'pages/WCPages/Admin/CIRangeMilestones/CIRangeMilestones.reducer';
import {CLEAR_REDUX_STATE} from 'pages/WCPages/Login/Login.types';
import goalsReducer from './goals/goals.reducer';
import {assessmentsReducer} from 'pages/WCPages/Assessments/Assessments.reducer';
import uploadFilesReducer from './uploadFilesReducer/uploadFiles.reducer';
import printReducer from './printReducer/print.reducer';
import previewReducer from './previewReducer/preview.reducer';
import configReducer from './configReducer/config.reducer';
import {routerReducer} from './reduxFirstHistory';
import {medicationListReducer} from 'pages/WCPages/Assessments/MedicationList/MedicationList.reducer';
import {corporateAndFacilitiesReducer} from 'pages/WCPages/Admin/CorporateAndFacilities/CorporateAndFacilityManagement.reducer';

const mainReducer = combineReducers({
  auth: loginReducer,
  router: routerReducer,
  applicationLoader: applicationLoaderReducer,
  toast: toastReducer,
  callEntry: callEntryReducer,
  common: commonReducer,
  wellnessDashboard: wellnessDashboardReducer,
  seniorCallScheduler: seniorCallSchedulerReducer,
  seniorDashboard: seniorDashboardReducer,
  profileInfo: validateDataReducer,
  seniorCareInsights: seniorCareInsightsReducer,
  events: eventsReducer,
  messageManager: messageManagerReducer,
  careAgentAccount: careAgentAccountReducer,
  careInsightReview: careInsightReviewReducer,
  wellnessPlan: wellnessPlanReducer,
  assessments: assessmentsReducer,
  cIRangeMilestones: cIRangeMilestonesReducer,
  goals: goalsReducer,
  alarms: alarmReducer,
  devices: devicesReducer,
  holisticAssessmentAdmin: holisticAssessmentAdminReducer,
  uploadFiles: uploadFilesReducer,
  print: printReducer,
  config: configReducer,
  preview: previewReducer,
  medicationList: medicationListReducer,
  corporateAndFacilities: corporateAndFacilitiesReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === CLEAR_REDUX_STATE) {
    state = {
      toast: {
        ...state.toast,
      },
      undefined,
    };
  }
  return mainReducer(state, action);
};

export default rootReducer;
