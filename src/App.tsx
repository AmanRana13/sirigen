import React, {Suspense} from 'react';
import {Routes} from 'react-router';
import {Route} from 'react-router-dom';
import {
  publicRoutesList,
  privateRoutesList,
  PublicRouteView,
  PrivateRouteView,
  facilityRoutesList,
} from 'routes';

import {Toast} from './common/Toast';
import {AppFallbackLoader} from 'common/AppFallbackLoader/ApplicationLoader.component';
import './App.css';

import {WCThemeProvider} from 'themes';
import {FacilityLayout, PublicLayout, WCLayout} from 'layouts';

const App = () => {
  const AuthInit = React.lazy(() => import('common/AuthInit/AuthInit'));
  const Dialogs = React.lazy(() => import('./common/Dialogs'));
  const OverlayDialogs = React.lazy(
    () => import('./common/Dialogs/OverlayDialogs.component'),
  );
  const PusherChannelSubscriber = React.lazy(
    () => import('pusher/PusherChannelSubscriber'),
  );
  const Events = React.lazy(() => import('common/Events/Events'));

  return (
    <Suspense fallback={<AppFallbackLoader />}>
      <AuthInit />
      <PusherChannelSubscriber />

      <WCThemeProvider>
        <Toast />
        <Dialogs />
        <OverlayDialogs />
        <Events />
      </WCThemeProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutesList.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  <PublicRouteView
                    component={route.component}
                    meta={route.meta}
                  />
                }
                key={route.meta.title}
              />
            );
          })}
        </Route>

        <Route element={<WCLayout />}>
          {privateRoutesList.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  <PrivateRouteView
                    component={route.component}
                    meta={route.meta}
                    requiredRoles={route.requiredRoles}
                  />
                }
                key={route.meta.title}
              />
            );
          })}
        </Route>

        {/* TODO: uncomment when facility routes needed */}
        {/* <Route element={<FacilityLayout />}>
          {facilityRoutesList.map((route) => {
            return (
              <Route
                path={route.path}
                element={
                  <PrivateRouteView
                    component={route.component}
                    meta={route.meta}
                    requiredRoles={route.requiredRoles}
                  />
                }
                key={route.meta.title}
              />
            );
          })}
        </Route> */}
      </Routes>
    </Suspense>
  );
};

const AppPage = App;

export default AppPage;
