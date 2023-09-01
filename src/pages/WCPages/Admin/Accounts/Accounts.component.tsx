/* eslint-disable max-len */
import {Routes, Route} from 'react-router-dom';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import AgentAccount from './AgentAccount/AgentAccount.component';

/**
 * @description component to define Assignment routes
 */
const Accounts = () => {
  return (
    <Routes>
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.vimientUsers.baseRoute}
        element={<AgentAccount />}
      />
      <Route
        path={appRoutesEndpoints.admin.nestedRoutes.corporateUsers.baseRoute}
        element={<AgentAccount />}
      />
    </Routes>
  );
};

export default Accounts;
