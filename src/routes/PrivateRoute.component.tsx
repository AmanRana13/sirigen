import React, {useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {
  changeDocumentTitle,
  checkUserSession,
  isAuthenticateUser,
  getCareAgentInfo,
} from 'globals/global.functions';

import SessionTimeout from '../SessionTimeout';
import {ROLES_CONFIG} from '../config/app.config';
import {AppFallbackLoader} from 'common/AppFallbackLoader/ApplicationLoader.component';
import {SESSION_EXPIRED_MESSAGE} from 'globals/global.constants';
import {logoutUser} from 'pages/WCPages/Login/Login.action';
import {useAppDispatch} from 'hooks/reduxHooks';

const PrivateRouteView = React.memo(({component, meta, requiredRoles}: any) => {
  const location = useLocation();
  useEffect(() => {
    changeDocumentTitle(meta.title);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <React.Suspense fallback={<AppFallbackLoader />}>
      <Renderer component={component} requiredRoles={requiredRoles} />
      <SessionTimeout />
    </React.Suspense>
  );
});

/**
 * @function Renderer
 * @description Renderer component to load the auth routes
 * @returns {JSX}
 */
const Renderer = ({component, requiredRoles}: any) => {
  const userRole: any = getCareAgentInfo().userRole;
  const dispatch: any = useAppDispatch();

  const hasRequiredRole = userRole.some((requireRole: string) =>
    requiredRoles.includes(requireRole),
  );

  const isAuthenticated: boolean = isAuthenticateUser();
  if (isAuthenticated && !checkUserSession()) {
    dispatch(logoutUser(SESSION_EXPIRED_MESSAGE));
    return <AppFallbackLoader />;
  } else if (isAuthenticated && hasRequiredRole) return component;
  else if (isAuthenticated && !hasRequiredRole)
    return (
      <Navigate
        to={ROLES_CONFIG[userRole]?.defaultPage || '/'}
        replace={true}
      />
    );
  else {
    return <Navigate to='/login' replace={true} />;
  }
};

export {PrivateRouteView};
