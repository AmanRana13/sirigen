/* eslint-disable max-len */
import {Routes, Route, useParams} from 'react-router-dom';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import AgentCoach from './AgentCoach/AgentCoach.component';
import SeniorCoachAssignment from './SeniorCoach/components/SeniorCoachAssignment/SeniorCoachAssignment.component';
import SeniorWCMapping from './SeniorCoach/components/SeniorWCMapping/SeniorWCMapping.component';

/**
 * @description render component based on params
 */
const Renderer = () => {
  const param = useParams();
  switch (param?.seniorCoach) {
    case 'wellness-coaches':
      return <SeniorWCMapping />;
    case 'unassigned-seniors':
      return <SeniorCoachAssignment />;
    default:
      return <SeniorCoachAssignment />;
  }
};

/**
 * @description component to define Assignment routes
 */
const Assignment = () => {
  return (
    <Routes>
      <Route
        path={
          appRoutesEndpoints.admin.nestedRoutes.seniorCoach.baseRoute +
          '/:seniorCoach'
        }
        element={<Renderer />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.seniorCoach.baseRoute + '/*'}
        element={<SeniorCoachAssignment />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.agentCoach.baseRoute}
        element={<AgentCoach />}
      />
    </Routes>
  );
};

export default Assignment;
