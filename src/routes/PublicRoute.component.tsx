import {Navigate, useLocation} from 'react-router-dom';
import React, {useEffect} from 'react';

import {
  changeDocumentTitle,
  isAuthenticateUser,
} from 'globals/global.functions';

const PublicRouteView = React.memo(({component, meta}: any) => {
  const defaultPath = '/';
  const isAuthenticated = isAuthenticateUser();
  const location = useLocation();
  useEffect(() => {
    changeDocumentTitle(meta.title);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return !isAuthenticated ? component : <Navigate to={defaultPath} />;
});

export {PublicRouteView};
