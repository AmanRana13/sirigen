import React, {useEffect} from 'react';
import {useAppDispatch} from 'hooks/reduxHooks';
import {useParams} from 'react-router-dom';

import SeniorDashboard from 'pages/WCPages/SeniorDashboard';
import {changeDocumentTitle} from 'globals/global.functions';
import {OnboardingInfo} from 'pages/WCPages/OnboardingInfo';
import SeniorCallScheduler from 'pages/WCPages/SeniorCallScheduler';
import SeniorCallSchedule from 'pages/WCPages/SeniorCallSchedule';
import SeniorCareInsights from 'pages/WCPages/SeniorCareInsights';
import SeniorCallLogs from 'pages/WCPages/SeniorCallLogs';
import SeniorLocation from 'pages/WCPages/SeniorLocation';
import SeniorWellnessPlan from 'pages/WCPages/SeniorWellnessPlan';
import Assessments from 'pages/WCPages/Assessments';
import {
  emptySeniorDetail,
  emptySeniorImage,
  resetLocationDates,
  setSeniorDetail,
  setSeniorImage,
} from 'store/commonReducer/common.action';
import RoleBaseRender from 'common/RoleBaseRender';
import {Roles} from 'globals/enums';
import {
  getAssessmentStatus,
  resetAssessmentStatus,
} from 'pages/WCPages/Assessments/AssessmentStatus/AssessmentStatus.action';
import {SubHeader} from 'common/SubHeader';

const TABS = Object.freeze({
  DASHBOARD: {name: 'dashboard', title: 'Senior Dashboard'},
  ONBOARDING_INFO: {name: 'onboarding-info', title: 'Onboarding Info'},
  WELLNESS_PLAN: {name: 'wellness-plan', title: 'Wellness Plan'},
  ASSESSMENTS: {
    name: 'assessments',
    title: 'Assessments',
  },
  WELLNESS_SURVEY: {name: 'wellness-survey', title: 'Wellness Survey'},
  SCHEDULER: {name: 'scheduler', title: 'Senior Call Scheduler'},
  CALL_SCHEDULE: {name: 'call-schedule', title: 'Senior Call Schedule'},
  CALL_LOGS: {name: 'call-logs', title: 'Senior Call Logs'},
  CARE_INSIGHTS: {name: 'care-insights', title: 'Care Insights'},
  LOCATION: {name: 'senior-location', title: 'Location'},
});

const SeniorContainer = (props: any) => {
  const param: any = useParams();
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(setSeniorDetail());
    dispatch(setSeniorImage());
    dispatch(getAssessmentStatus());
    return () => {
      dispatch(resetAssessmentStatus());
      dispatch(emptySeniorDetail());
      dispatch(emptySeniorImage());
      dispatch(resetLocationDates());
    };
  }, []);

  switch (param.tab) {
    case TABS.DASHBOARD.name:
      changeDocumentTitle(TABS.DASHBOARD.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <SeniorDashboard {...props} />
        </RoleBaseRender>
      );
    case TABS.ONBOARDING_INFO.name:
      changeDocumentTitle(TABS.ONBOARDING_INFO.title);
      return (
        <RoleBaseRender
          forRole={[Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM]}>
          <OnboardingInfo {...props} />
        </RoleBaseRender>
      );
    case TABS.WELLNESS_PLAN.name:
      changeDocumentTitle(TABS.WELLNESS_PLAN.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <SeniorWellnessPlan {...props} />
        </RoleBaseRender>
      );
    case TABS.ASSESSMENTS.name:
      changeDocumentTitle(TABS.ASSESSMENTS.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <Assessments {...props} />
        </RoleBaseRender>
      );
    case TABS.SCHEDULER.name:
      changeDocumentTitle(TABS.SCHEDULER.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <SeniorCallScheduler {...props} />
        </RoleBaseRender>
      );
    case TABS.CALL_SCHEDULE.name:
      changeDocumentTitle(TABS.CALL_SCHEDULE.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <SeniorCallSchedule {...props} />
        </RoleBaseRender>
      );
    case TABS.CALL_LOGS.name:
      changeDocumentTitle(TABS.CALL_LOGS.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <SeniorCallLogs {...props} />
        </RoleBaseRender>
      );
    case TABS.CARE_INSIGHTS.name:
      changeDocumentTitle(TABS.CARE_INSIGHTS.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <SeniorCareInsights {...props} />
        </RoleBaseRender>
      );
    case TABS.LOCATION.name:
      changeDocumentTitle(TABS.LOCATION.title);
      return (
        <RoleBaseRender forRole={[Roles.CareAgent]}>
          <>
            <SubHeader />
            <SeniorLocation />
          </>
        </RoleBaseRender>
      );
    default:
      return null;
  }
};
export default SeniorContainer;
