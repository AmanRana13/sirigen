import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {useNavigate, useLocation} from 'react-router-dom';
import {Box, Button} from '@mui/material';
import {useAppSelector} from 'hooks/reduxHooks';

import {
  getCurrentSenior,
  getQueryParamTimezone,
} from 'globals/global.functions';
import {AssessmentStatuses, EventViewState, Roles} from 'globals/enums';
import RoleBaseRender from 'common/RoleBaseRender';
import {IConfigInterface} from 'config/app.config.types';

import {subHeaderStyle} from './SubHeader.style';
import {ILists, ISubHeaderLists} from './SubHeader.type';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';

const SubHeader = React.memo((props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {classes} = subHeaderStyle();
  const [currentRoute, setCurrentRoute] = useState('dashboard');

  const alert = useAppSelector((state: any) => state.events.alert);

  const summary = useAppSelector((state: any) => state.events.summary);

  const userRole: Array<string> = useAppSelector(
    (state: any) => state.auth.userRole,
  );
  const roleConfig: IConfigInterface = useAppSelector(
    (state: any) => state.auth.roleConfig,
  );

  const careInsight = {...alert, ...summary};

  const seniorId: string = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.user_id,
  );

  const assessmentStatuses = useAppSelector(
    (state: any) => state.assessments.assessmentStatuses,
  );

  const isAssessmentIncomplete = React.useMemo<boolean>(() => {
    const res = Object.keys(assessmentStatuses).some(
      (assessmentKey: string) => {
        const status = assessmentStatuses[assessmentKey]?.status;
        // for wellness-survey only consider Incomplete Status
        if (assessmentKey === 'wellness-survey') {
          return status === AssessmentStatuses.INCOMPLETE;
        }
        // for all others consider Incomplete Status & Due Status
        return (
          status === AssessmentStatuses.DUE ||
          status === AssessmentStatuses.INCOMPLETE
        );
      },
    );
    return res;
  }, [assessmentStatuses]);

  const isActionNotification: boolean = Object.values(careInsight).some(
    (data: any) =>
      data.viewState === EventViewState.ActionNotification &&
      data.seniorId === seniorId,
  );

  const lists: ILists[] = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      roles: [Roles.Admin, Roles.CareAgent],
    },
    {
      name: 'onboarding-info',
      label: 'Onboarding Info',
      roles: [Roles.Admin, Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
    },
    {
      name: 'wellness-plan',
      label: 'Wellness Plan',
      roles: [Roles.Admin, Roles.CareAgent],
    },
    {
      name: 'assessments',
      defaultPath: '/wellness-survey',
      label: 'Assessments',
      roles: [Roles.Admin, Roles.CareAgent],
      showIncomplete: isAssessmentIncomplete,
    },
    {
      name: 'scheduler',
      label: 'Scheduler',
      roles: [Roles.Admin, Roles.CareAgent],
    },
    {
      name: 'call-schedule',
      label: 'Call Schedule',
      roles: [Roles.Admin, Roles.CareAgent],
    },
    {
      name: 'call-logs',
      label: 'Call Log',
      roles: [Roles.Admin, Roles.CareAgent],
    },
    {
      name: 'care-insights',
      label: 'Care Insights',
      defaultPath: '/threshold-setting',
      showNotification: isActionNotification,
      roles: [Roles.Admin, Roles.CareAgent],
    },
    {
      name: 'senior-location',
      label: 'Location',
      roles: [Roles.Admin, Roles.CareAgent],
    },
  ];

  /**
   * @function changeRoute
   * @description method to change the route
   * @param {*} path
   * @param {*} defaultPath
   * @returns void
   */
  const changeRoute = (path: string, defaultPath: string = '') => {
    const seniorInfo = {...getCurrentSenior()};
    navigate(
      `/senior/${seniorInfo.seniorID}/${
        seniorInfo.accountID
      }/${getQueryParamTimezone(seniorInfo.timezone)}/${path}${defaultPath}`,
      {replace: true},
    );
  };

  useEffect(() => {
    lists.every(({name}: ILists) => {
      if (location.pathname.includes(name)) {
        setCurrentRoute(name);
        return false;
      } else {
        return true;
      }
    });

    if (userRole.includes(Roles.WarehouseEmployee) || userRole.includes(Roles.BDM)) {
      changeRoute(roleConfig.defaultHomeRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (props.noHeader) {
    return null;
  }
  return (
    <Box mb='29px' className={classes.container}>
      {lists.map((listData: ILists, index: number) => {
        return (
          <RoleBaseRender forRole={listData.roles} key={listData.name}>
            <Lists
              key={listData.name}
              name={listData.name}
              defaultPath={listData.defaultPath}
              label={listData.label}
              listItem={lists.length}
              currentRoute={currentRoute}
              changeRoute={changeRoute}
              disabled={listData.disabled ? listData.disabled : false}
              marginRight={index !== lists.length - 1}
              showNotification={listData.showNotification}
              showIncomplete={listData.showIncomplete}
            />
          </RoleBaseRender>
        );
      })}
    </Box>
  );
});

const Lists = ({
  name,
  defaultPath,
  label,
  listItem,
  currentRoute,
  changeRoute,
  disabled,
  marginRight,
  showNotification,
  showIncomplete,
}: ISubHeaderLists) => {
  const {classes} = subHeaderStyle();

  return (
    <Box
      mr={marginRight ? 1 : 0}
      width={`${100 / listItem}%`}
      style={{position: 'relative'}}>
      <Button
        className={clsx([classes.button], {
          [classes.filled]: currentRoute == name,
        })}
        disabled={disabled}
        onClick={() => changeRoute(name, defaultPath)}>
        {label}
        {showIncomplete && (
          <Box className={classes.incomplete}>
            <img src={ErrorIcon} width='21' height='21' />
          </Box>
        )}
      </Button>
      {showNotification && <Box className={classes.notification}></Box>}
    </Box>
  );
};
export {SubHeader};
