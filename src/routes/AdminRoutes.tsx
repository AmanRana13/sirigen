/* eslint-disable max-len */
import Assessment from 'pages/WCPages/Admin/Assessment/Assessment.component';
import Assignment from 'pages/WCPages/Admin/Assignment/Assignment.component';
import CareInsightReview from 'pages/WCPages/Admin/CareInsightReview/CareInsightReview.component';
import CIRangeMilestones from 'pages/WCPages/Admin/CIRangeMilestones/CIRangeMilestones.component';
import {Routes, Route} from 'react-router-dom';
import {appRoutesEndpoints} from './appRoutesEndpoints';
import CorporateManagement from 'pages/WCPages/Admin/CorporateAndFacilities/CorporateManagement/CorporateManagement.component';
import FacilityManagement from 'pages/WCPages/Admin/CorporateAndFacilities/FacilityManagement/FacilityManagement.component';
import Accounts from 'pages/WCPages/Admin/Accounts/Accounts.component';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.announcement.baseRoute}
        element={<div>announcement</div>}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.careInsightReview.baseRoute}
        element={<CareInsightReview />}
      />
      <Route
        path={
          appRoutesEndpoints.admin.nestedRoutes.corporateAndFacilities.baseRoute
        }
        element={<CorporateManagement />}
      />
      <Route
        path={
          appRoutesEndpoints.admin.nestedRoutes.corporateAndFacilities
            .baseRoute + '/:corpId'
        }
        element={<FacilityManagement />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.accounts.baseRoute + '/*'}
        element={<Accounts />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.agentSchedule.baseRoute}
        element={<div>agent-schedule</div>}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.poaReview.baseRoute}
        element={<div>poa-review</div>}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.assessment.baseRoute + '/*'}
        element={<Assessment />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.cIRangeMilestones.baseRoute}
        element={<CIRangeMilestones />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.assignment.baseRoute + '/*'}
        element={<Assignment />}
      />
    </Routes>
  );
};

export default AdminRoutes;
