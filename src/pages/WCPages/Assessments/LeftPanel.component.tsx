import React from 'react';
import clsx from 'clsx';
import {NavLink} from 'react-router-dom';
import {Box, Typography, List, ListItem} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import ErrorIcon from 'assets/icons/ErrorIcon.svg';
import DueIcon from 'assets/icons/DueIcon.svg';

import {IPanelList, IPanelListSubOptions} from './Assessments.type';
import {assessmentsStyle} from './Assessmets.style';
import {AssessmentName, AssessmentStatuses} from 'globals/enums';
import {useAppSelector} from 'hooks/reduxHooks';
import {IAssessmentStatus} from './AssessmentStatus/AssessmentStatus.types';

const LeftPanelSubOptions = ({data}: any) => {
  const {classes} = assessmentsStyle();
  const assessmentStatuses = useAppSelector(
    (state: any) => state.assessments.assessmentStatuses,
  );
  const latestData = React.useMemo(() => {
    return data.map((subOptions: any) => {
      return {
        ...subOptions,
        status:
          assessmentStatuses[subOptions?.name]?.status ||
          AssessmentStatuses.COMPLETE,
      };
    });
  }, [data, assessmentStatuses]);
  return (
    <List component='nav' className={classes.subOptionsNavLinkContainer}>
      {latestData?.map((subOptions: any) => {
        return (
          <NavLink
            key={subOptions.name}
            to={subOptions.route}
            className={({isActive}) =>
              clsx(
                {[classes.selected]: isActive},
                {[classes.links]: !subOptions.isDisabled},
                {[classes.disabledLink]: subOptions.isDisabled},
              )
            }>
            <ListItem
              style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='h2'>{subOptions.label}</Typography>
              {subOptions.status === AssessmentStatuses.INCOMPLETE && (
                <Box>
                  <img src={ErrorIcon} width='30' height='30' />
                </Box>
              )}
              {subOptions.status === AssessmentStatuses.DUE && (
                <Box>
                  <img src={DueIcon} width='30' height='30' />
                </Box>
              )}
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
};

const LeftPanelSubRoutes = ({data, baseRoute, index}: any) => {
  const [openMenuIndex, setOpenMenuIndex] = React.useState(0);

  const toggleMenu = (index: any) => {
    if (openMenuIndex == index) {
      return setOpenMenuIndex(0);
    }
    setOpenMenuIndex(index);
  };

  return (
    <>
      <ListItem
        style={{display: 'flex', justifyContent: 'space-between'}}
        onClick={() => {
          toggleMenu(index);
        }}>
        <Typography variant='h2'>{data.label}</Typography>
        <Box>
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
          {(!data.subOptions || openMenuIndex != index) && (
            <>
              {data.status === AssessmentStatuses.INCOMPLETE && (
                <img src={ErrorIcon} width='30' height='30' />
              )}
              {data.name !== AssessmentName.WELLNESS_SURVEY &&
                data.status === AssessmentStatuses.DUE && (
                  <img src={DueIcon} width='30' height='30' />
                )}
            </>
          )}
        </Box>
      </ListItem>
      {data.subOptions && openMenuIndex == index && (
        <LeftPanelSubOptions
          baseRoute={baseRoute}
          parentRoute={data.name}
          data={data.subOptions}
        />
      )}
    </>
  );
};

const LeftPanel = ({baseRoute, list}: any) => {
  const {classes} = assessmentsStyle();
  const assessmentStatuses = useAppSelector(
    (state: any) => state.assessments.assessmentStatuses,
  );
  const getDerivedStatus = React.useCallback(
    (name: string): AssessmentStatuses => {
      let subTags: IAssessmentStatus[] = [];
      switch (name) {
        case 'adl-assessment':
          subTags = [
            assessmentStatuses[AssessmentName.KATZ_INDEPENDENCE],
            assessmentStatuses[AssessmentName.LAWTON_BRODY],
          ];
          break;
      }
      const isComplete = subTags.every(
        (subTag) => subTag.status === AssessmentStatuses.COMPLETE,
      );
      const isIncomplete = subTags.some(
        (subTag) => subTag.status === AssessmentStatuses.INCOMPLETE,
      );
      if (isComplete) {
        return AssessmentStatuses.COMPLETE;
      } else if (isIncomplete) {
        return AssessmentStatuses.INCOMPLETE;
      } else {
        return AssessmentStatuses.DUE;
      }
    },
    [assessmentStatuses],
  );

  const leftNavigationList = React.useMemo(() => {
    return list.map((data: IPanelList) => {
      return {
        ...data,
        status: data.subOptions
          ? getDerivedStatus(data.name)
          : assessmentStatuses[data.name]?.status,
        isSelected:
          data.subOptions &&
          data.subOptions.some(
            (x: IPanelListSubOptions) =>
              `${baseRoute}${data.name}/${x.route}` ===
              window.location.pathname,
          ),
      };
    });
  }, [assessmentStatuses, getDerivedStatus, baseRoute, list]);

  const activeClass = (data: any) => {
    if (data.route) {
      return classes.selected;
    } else if (data.isSelected) {
      return classes.subSelected;
    } else {
      return '';
    }
  };
  return (
    <Box className={classes.leftPanel}>
      <List component='nav' className={classes.navLinkContainer}>
        {leftNavigationList.map((data: any, index: number) => {
          if (data.route) {
            return (
              <NavLink
                key={data.name}
                to={data.route || location.pathname}
                className={({isActive}) => {
                  return clsx(
                    {[activeClass(data)]: isActive},
                    {[classes.links]: !data.isDisabled},
                    {[classes.disabledLink]: data.isDisabled},
                  );
                }}>
                <LeftPanelSubRoutes
                  data={data}
                  baseRoute={baseRoute}
                  index={index}
                />
              </NavLink>
            );
          } else {
            return (
              <Box
                key={data.name}
                className={clsx(
                  {
                    [data.isSelected ? classes.subSelected : '']: true,
                  },
                  {[classes.links]: !data.isDisabled},
                  {[classes.disabledLink]: data.isDisabled},
                )}>
                <LeftPanelSubRoutes
                  data={data}
                  baseRoute={baseRoute}
                  index={index}
                />
              </Box>
            );
          }
        })}
      </List>
    </Box>
  );
};

export default LeftPanel;
