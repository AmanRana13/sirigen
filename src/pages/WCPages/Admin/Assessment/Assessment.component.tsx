// eslint-disable-next-line max-len
import HolisticAsssessmentAdmin from './HolisticAsssessmentAdmin/HolisticAsssessmentAdmin.component';
import {Routes, Route} from 'react-router-dom';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';

const Assessment = () => {
  return (
    <Routes>
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.wellnesSurvey.baseRoute}
        element={<div>Wellness Survey</div>}
      />
      <Route
        path={
          appRoutesEndpoints.admin.nestedRoutes.holisticAssessment.baseRoute
        }
        element={<HolisticAsssessmentAdmin />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.medicalCondition.baseRoute}
        element={<div>Medical Condition</div>}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.aDLAssessment.baseRoute}
        element={<div>ADL assessment</div>}
      />
    </Routes>
  );
};

export default Assessment;
