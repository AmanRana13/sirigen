/* eslint-disable max-len */
import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import {NavLink, useLocation} from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  Typography,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';

import AdminRoutes from 'routes/AdminRoutes';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import {theme} from 'config/theme.config';
import {HolisticAssessmentAdminStatus, Roles} from 'globals/enums';

import {adminStyle} from './Admin.style';
// eslint-disable-next-line max-len
import {getHolisticAssessmentAdmin} from './Assessment/HolisticAsssessmentAdmin/HolisticAssessmentAdmin.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import RoleBaseRender from 'common/RoleBaseRender/RoleBaseRender';

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

/**
 * @description display left panel of all admin sections.
 * @return {JSX}
 */

export interface IListObject {
  wellnessServey: boolean;
  holistic: boolean;
  medicalCondition: boolean;
  adlAssessment: boolean;
}

const listObject: IListObject = {
  wellnessServey: false,
  holistic: false,
  medicalCondition: false,
  adlAssessment: false,
};

const corporateFacilityFieldName = 'corporate-and-facilities';
const LeftPanel = () => {
  const dispatch: any = useAppDispatch();
  const location = useLocation();

  const [openMenuIndex, setOpenMenuIndex] = useState(0);
  const [isSubRouteSelected, setIsSubRouteSelected] = useState(false);
  const [isListError, setIsListError] = useState(false);
  const [isSubListError, setIsSubListError] = useState(listObject);

  const {classes} = adminStyle();
  const formStatus = useAppSelector(
    (state: any) => state.holisticAssessmentAdmin.formStatus,
  );
  const role = useAppSelector((state: any) => state.auth.roleConfig.role);

  //getErrorState checking
  React.useEffect(() => {
    const isError = {...isSubListError};
    isError.holistic =
      formStatus ==
      (HolisticAssessmentAdminStatus.Save ||
        HolisticAssessmentAdminStatus.SubmitLater);
    const isListErr = Object.values(isError).every(
      (item: boolean) => item === false,
    );
    setIsListError(!isListErr);
    setIsSubListError(isError);
  }, [formStatus]);

  //error state api calling
  const getErrorState = () => {
    dispatch(getHolisticAssessmentAdmin());
  };

  //Calling FormStatus Api useEffect
  React.useEffect(() => {
    if (role !== Roles.BDM) {
      getErrorState();
    }
  }, []);

  const navigationList = useMemo(() => {
    const list = [
      {
        name: 'announcement',
        label: 'Announcement',
        route: appRoutesEndpoints.admin.nestedRoutes.announcement.baseRoute,
        isDisabled: true,
      },
      {
        name: 'care-insight-review',
        label: 'Care Insight Review',
        route:
          appRoutesEndpoints.admin.nestedRoutes.careInsightReview.baseRoute,
        isDisabled: false,
      },
      {
        name: corporateFacilityFieldName,
        label: 'Corporate & Facilities',
        route:
          appRoutesEndpoints.admin.nestedRoutes.corporateAndFacilities
            .baseRoute,
        isDisabled: false,
      },
      {
        name: 'accounts',
        label: 'Accounts',
        isSelected: false,
        isDisabled: false,
        subOptions: [
          {
            name: 'vimient-users',
            label: 'Vimient',
            route: `${appRoutesEndpoints.admin.nestedRoutes.accounts.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.vimientUsers.baseRoute}`,
            isDisabled: false,
          },
          {
            name: 'corporate-users',
            label: 'Corporate & Facility',
            route: `${appRoutesEndpoints.admin.nestedRoutes.accounts.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.corporateUsers.baseRoute}`,
            isDisabled: true,
          },
        ],
      },
      {
        name: 'agent-schedule',
        label: 'Agent Schedule',
        route: appRoutesEndpoints.admin.nestedRoutes.agentSchedule.baseRoute,
        isDisabled: true,
      },
      {
        name: 'poa-review',
        label: 'POA Review',
        route: appRoutesEndpoints.admin.nestedRoutes.poaReview.baseRoute,
        isDisabled: true,
      },
      {
        name: 'assessment',
        label: 'Assessment',
        isSelected: isSubRouteSelected,
        isDisabled: false,
        isError: isListError,
        subOptions: [
          {
            name: 'wellness-survey',
            label: 'Wellness Survey',
            route: `${appRoutesEndpoints.admin.nestedRoutes.assessment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.wellnesSurvey.baseRoute}`,
            isDisabled: true,
          },
          {
            name: 'holistic-assessment',
            label: 'Holistic Assessment',
            route: `${appRoutesEndpoints.admin.nestedRoutes.assessment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.holisticAssessment.baseRoute}`,
            isDisabled: false,
            isError: isSubListError.holistic,
          },
          {
            name: 'medical-condition',
            label: 'Medical Condition/Disease Assessment',
            route: `${appRoutesEndpoints.admin.nestedRoutes.assessment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.medicalCondition.baseRoute}`,
            isDisabled: true,
          },
          {
            name: 'adl-assessment',
            label: 'ADL Assessment',
            route: `${appRoutesEndpoints.admin.nestedRoutes.assessment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.aDLAssessment.baseRoute}`,
            isDisabled: true,
          },
        ],
      },
      {
        name: 'ci-range-milestones',
        label: 'CI Range Milestones',
        route:
          appRoutesEndpoints.admin.nestedRoutes.cIRangeMilestones.baseRoute,
        isDisabled: false,
      },
      {
        name: 'assignment',
        label: 'Assignment',
        isSelected: false,
        isDisabled: false,
        subOptions: [
          {
            name: 'senior-coach',
            label: 'Senior-Coach',
            route: `${appRoutesEndpoints.admin.nestedRoutes.assignment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.seniorCoach.baseRoute}`,
            isDisabled: false,
          },
          {
            name: 'agent-coach',
            label: 'Agent-Coach',
            route: `${appRoutesEndpoints.admin.nestedRoutes.assignment.baseRoute}/${appRoutesEndpoints.admin.nestedRoutes.agentCoach.baseRoute}`,
            isDisabled: true,
          },
        ],
      },
    ];

    // showing a bar in the left panel when any of its subOptions is selected.
    return list.map((data: any) => {
      if (data.name === corporateFacilityFieldName) {
        data.roles = [Roles.Admin, Roles.BDM];
      } else {
        data.roles = [Roles.Admin];
      }

      if (data.subOptions) {
        const isSelected = data.subOptions.some((x: any) =>
          window.location.pathname.includes(x.route),
        );
        return {
          ...data,
          isSelected: isSelected,
        };
      }
      return {...data};
    });
  }, [location]);

  const toggleMenu = (index: any) => {
    if (openMenuIndex == index) {
      return setOpenMenuIndex(0);
    }
    setOpenMenuIndex(index);
  };
  const selectedClass = (isActive: boolean, data: any) => {
    if (isActive && data.route) {
      return classes.selected;
    } else if (data.isSelected) {
      return classes.subSelected;
    } else {
      return '';
    }
  };

  return (
    <Box className={classes.leftPanel}>
      <List
        component='nav'
        aria-label='main mailbox folders'
        className={classes.navLinkContainer}>
        {navigationList.map((data, index) => {
          return (
            <RoleBaseRender forRole={data.roles} key={data.label}>
              <NavLink
                key={data.name}
                to={data.route || window.location.pathname}
                className={({isActive}) =>
                  [
                    selectedClass(isActive, data),
                    clsx(
                      {[classes.links]: !data.isDisabled},
                      {[classes.disabledLink]: data.isDisabled},
                    ),
                  ]
                    .filter(Boolean)
                    .join(' ')
                }>
                <ListItem
                  style={{display: 'flex', justifyContent: 'space-between'}}
                  onClick={() => {
                    toggleMenu(index);
                  }}>
                  <Typography variant='h2'>{data.label}</Typography>
                  {data.isError && (
                    <Box>
                      <img src={ErrorIcon} width='30' height='30' />
                    </Box>
                  )}
                  {data.subOptions &&
                    (openMenuIndex == index ? (
                      <ArrowDropUpIcon
                        style={{
                          cursor: 'pointer',
                          height: 35,
                          width: 35,
                        }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        style={{
                          cursor: 'pointer',
                          height: 35,
                          width: 35,
                        }}
                      />
                    ))}
                </ListItem>
                {data.subOptions && openMenuIndex == index && (
                  <LeftPanelSubOptions data={data.subOptions} />
                )}
              </NavLink>
            </RoleBaseRender>
          );
        })}
      </List>
    </Box>
  );
};

const LeftPanelSubOptions = ({data}: any) => {
  const {classes} = adminStyle();
  return (
    <List component='nav' className={classes.subOptionsNavLinkContainer}>
      {data?.map((subOptions: any) => {
        return (
          <NavLink
            key={subOptions.name}
            to={subOptions.route}
            className={({isActive}) =>
              isActive
                ? classes.selected
                : clsx(
                    {[classes.links]: !subOptions.isDisabled},
                    {[classes.disabledLink]: subOptions.isDisabled},
                  )
            }>
            <ListItem
              style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h2'>{subOptions.label}</Typography>
              {subOptions.isError && (
                <Box>
                  <img src={ErrorIcon} width='30' height='30' />
                </Box>
              )}
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
};

/**
 * @description display right panel of all admin sections.
 * @return {JSX}
 */
const RightPanel = () => {
  const {classes} = adminStyle();
  return (
    <Box className={classes.rightPanel}>
      <AdminRoutes />
    </Box>
  );
};

/**
 * @description display whole admin container.
 * @return {JSX}
 */
const AdminContainer = () => {
  const {classes} = adminStyle();
  return (
    <Box className={classes.adminContainer}>
      <LeftPanel />
      <RightPanel />
    </Box>
  );
};

/**
 * @description Call admin component.
 * @return {JSX}
 */
const Admin = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AdminContainer />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Admin;
