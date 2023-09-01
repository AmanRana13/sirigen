/* eslint-disable max-len */
import React from 'react';
import {Roles} from 'globals/enums';
import {appRoutesEndpoints} from './appRoutesEndpoints';
import ChangePassword from 'pages/WCPages/ChangePassword/ChangePassword';
import {
  AllResidents,
  ResidentDashboard,
  ResidentSubPages,
} from 'pages/FacilityPages';
import {facilitySlugs} from 'globals/global.constants';
import {SubHeader} from 'common/SubHeader';

const Home = React.lazy(() => import('pages/WCPages/Home'));
const SeniorContainer = React.lazy(
  () => import('pages/WCPages/SeniorContainer'),
);
const Admin = React.lazy(() => import('pages/WCPages/Admin'));
const AddUserPage = React.lazy(() => import('pages/WCPages/AddUser'));
const WellnessDashboard = React.lazy(
  () => import('pages/WCPages/WellnessDashboard'),
);
const AllCallSchedule = React.lazy(
  () => import('pages/WCPages/AllCallSchedule'),
);

const LoginPage = React.lazy(() => import('pages/WCPages/Login'));
const ChoosePassword = React.lazy(() => import('pages/WCPages/ChoosePassword'));
const ForgotPassword = React.lazy(() => import('pages/WCPages/ForgotPassword'));
const ForgotPasswordVerification = React.lazy(
  () => import('pages/WCPages/ForgotPassword/ForgotPasswordVerification'),
);

/** WC Private routes */
export const privateRoutesList = [
  {
    meta: {
      title: 'Admin',
      description: '',
    },
    path: `${appRoutesEndpoints.admin.baseRoute}/*`,
    component: <Admin />,
    requiredRoles: [Roles.Admin, Roles.BDM],
  },
  {
    meta: {
      title: 'Home',
      description: '',
    },
    path: appRoutesEndpoints.homePage,
    component: <Home />,
    requiredRoles: [Roles.CareAgent, Roles.WarehouseEmployee],
  },
  {
    meta: {
      title: 'AddUser',
      description: '',
    },
    path: '/add-user',
    component: <AddUserPage />,
    requiredRoles: [Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
  },
  {
    meta: {
      title: 'Wellness Dasboard',
      description: '',
    },
    path: '/senior/:seniorID/:accountID/:timezone/wellness-dashboard',
    component: (
      <>
        <SubHeader />
        <WellnessDashboard />
      </>
    ),
    requiredRoles: [Roles.CareAgent],
  },
  {
    meta: {
      title: 'Call Schedule',
      description: '',
    },
    path: '/call-schedule',
    component: <AllCallSchedule />,
    requiredRoles: [Roles.CareAgent],
  },
  {
    meta: {
      title: 'Senior Dashboard',
      description: '',
    },
    path: '/senior/:seniorID/:accountID/:timezone/:tab/*',
    component: <SeniorContainer />,
    requiredRoles: [Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
  },
  {
    meta: {
      title: 'Change-password',
      description: '',
    },
    path: '/change-password',
    component: <ChangePassword />,
    requiredRoles: [Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
  },
];
/** WC Private routes */

/** Public routes */
export const publicRoutesList = [
  {
    meta: {
      title: 'Login',
      description: '',
    },
    path: '/login',
    component: <LoginPage />,
  },
  {
    meta: {
      title: 'Choose Password',
      description: '',
    },
    path: '/choose-password',
    component: <ChoosePassword />,
  },
  {
    meta: {
      title: 'Forgot Password',
      description: '',
    },
    path: '/forgot-password',
    component: <ForgotPassword />,
  },
  {
    meta: {
      title: 'Forgot Password',
      description: '',
    },
    path: '/forgot-password-verification',
    component: <ForgotPasswordVerification />,
  },
];
/** Public routes */

/** Facility Routes */
const {
  facilityManagement,
  facilityDashboard,
  facilityResident,
  residentDashboard,
  accountID,
  timezone,
  subRoute,
} = facilitySlugs;
export const facilityRoutesList = [
  {
    meta: {
      title: 'Facility',
      description: '',
    },
    path: `/${facilityManagement}`,
    component: <div>Facility Management</div>,
    requiredRoles: [Roles.Admin],
  },
  {
    meta: {
      title: 'Facility Dashboard',
      description: '',
    },
    path: `/${facilityManagement}/:${facilityDashboard}?`,
    component: <div>facilityDashboard</div>,
    requiredRoles: [Roles.Admin],
  },
  {
    meta: {
      title: 'Facility Residents',
      description: '',
    },
    path: `/${facilityManagement}/:${facilityDashboard}/:${facilityResident}?`,
    component: <AllResidents />,
    requiredRoles: [Roles.Admin],
  },
  {
    meta: {
      title: 'Resident Dashboard',
      description: '',
    },
    path: `/${facilityManagement}/:${facilityDashboard}/:${facilityResident}?/:${residentDashboard}/:${accountID}/:${timezone}/`,
    component: <ResidentDashboard />,
    requiredRoles: [Roles.Admin],
  },
  {
    meta: {
      description: '',
    },
    path: `/${facilityManagement}/:${facilityDashboard}/:${facilityResident}?/:${residentDashboard}/:${accountID}/:${timezone}?/:${subRoute}?`,
    component: <ResidentSubPages />,
    requiredRoles: [Roles.Admin],
  },
];
