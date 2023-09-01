import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Grid, Typography} from '@mui/material';

import {InputFields} from 'common/InputFields';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import UserName from 'common/UserName';

import {getSeniorCareGiver, getWellnessPlan} from './SeniorWellnessPlan.action';
import {seniorWellnessInfoStyle} from './SeniorWellnessInfo.style';
import clsx from 'clsx';
import {getPaginationDataIsolated} from 'store/commonReducer/common.action';
import {
  getGoalsData,
  getGoalsFail,
  getGoalsSuccess,
} from 'store/goals/goals.action';
import {PAGINATION_LIMIT} from 'globals/global.constants';

const SeniorWellnessInfo = React.memo(
  ({selectedSeniorCareGiver, setSelectedSeniorCareGiver}: any) => {
    const {classes} = seniorWellnessInfoStyle();
    const dispatch: any = useAppDispatch();

    const {user_id, name} = useAppSelector(
      (state: any) => state.common.seniorDetail.minimalInfo,
    );

    const wellnessPlan = useAppSelector((state: any) => state.wellnessPlan);

    const [seniorCareGiver, setSeniorCareGiver] = React.useState([]);
    const [selectedVersion, setSelectedVersion] = React.useState('');

    React.useEffect(() => {
      if (user_id) {
        getMenuItems();
      }
    }, [user_id]);

    React.useEffect(() => {
      setSelectedVersion(wellnessPlan.currentVersion);
    }, [wellnessPlan]);

    const getMenuItems = async () => {
      const list: any = await dispatch(getSeniorCareGiver());
      const senior = list[0];
      setSeniorCareGiver(list);
      setSelectedSeniorCareGiver(senior);
    };

    const getVersionList = () => {
      let versionList = [];
      let lastVersion = wellnessPlan.lastAvailableVersion;
      while (lastVersion > 0) {
        versionList.push({value: lastVersion, label: `Version ${lastVersion}`});
        lastVersion--;
      }
      return versionList;
    };

    const handleVersionChange = async (e: any) => {
      const value = e.target.value;
      await dispatch(getWellnessPlan(selectedSeniorCareGiver.value, value));
      dispatch(
        getPaginationDataIsolated(
          () => getGoalsData(value),
          PAGINATION_LIMIT.goals,
          '',
          1,
          getGoalsSuccess,
          getGoalsFail,
          '',
          '',
        ),
      );
      setSelectedVersion(value);
    };

    const handleCGChange = React.useCallback(
      (e: any) => {
        const newValue = e.target.value;
        if (newValue) {
          const senior = seniorCareGiver.find(
            (senior: any) => senior?.value === newValue,
          );
          setSelectedSeniorCareGiver(senior);
        }
      },
      [seniorCareGiver, setSelectedSeniorCareGiver],
    );

    return (
      <Box className={classes.seniorWellnessInfoContainer}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Details
            firstLabel='Senior / Caregiver'
            firstValue={
              <Box className={classes.selectWidth}>
                <InputFields
                  menu={true}
                  menuItems={seniorCareGiver}
                  inputProps={{name: 'senior-caregiver'}}
                  initialValue=''
                  eventProps={{
                    disabled: false,
                    onChange: handleCGChange,
                    value: selectedSeniorCareGiver.value,
                  }}
                />
              </Box>
            }
            secondLabelWidth='45%'
            secondLabel='Wellness Plan Date Started'
            secondValue={
              <Box
                style={{color: wellnessPlan.dateStarted ? '#000' : '#a7a7a7'}}>
                {wellnessPlan.dateStarted || 'MM/DD/YYYY'}
              </Box>
            }
          />
          <Details
            firstLabel='Last Updated by'
            firstValue={
              <Box
                style={{
                  color: wellnessPlan.lastUpdatedBy ? '#000' : '#a7a7a7',
                  paddingLeft: 12,
                }}>
                {wellnessPlan.lastUpdatedBy || 'Care Agent Name'}
              </Box>
            }
            secondLabel='Member Name'
            secondValue={
              <Box style={{paddingLeft: 16}}>
                <ShowHyphen>
                  <UserName
                    name={
                      selectedSeniorCareGiver?.data?.name || {
                        firstName: name.first_name,
                        middleName: name.middle_name,
                        lastName: name.last_name,
                      }
                    }
                  />
                </ShowHyphen>
              </Box>
            }
          />
          <Details
            firstLabelWidth='45%'
            firstLabel='Last Updated Date'
            firstValue={
              <Box
                style={{
                  color: wellnessPlan.lastUpdatedDate ? '#000' : '#a7a7a7',
                }}>
                {wellnessPlan.lastUpdatedDate || 'MM/DD/YYYY'}
              </Box>
            }
            secondLabel='Version'
            secondValue={
              <Box className={classes.selectWidth}>
                <InputFields
                  menu={true}
                  menuItems={getVersionList()}
                  inputProps={{name: 'version'}}
                  eventProps={{
                    value: selectedVersion,
                    onChange: handleVersionChange,
                  }}
                />
              </Box>
            }
          />
        </Grid>
      </Box>
    );
  },
);

export const Details = ({
  firstLabel,
  secondLabel,
  firstValue,
  secondValue,
  firstLabelWidth,
  secondLabelWidth,
}: any) => {
  const {classes} = seniorWellnessInfoStyle();
  return (
    <>
      <Box className={classes.detailContainer}>
        <Box
          className={classes.detailLableContainer}
          style={{
            width: firstLabelWidth,
          }}>
          <Typography variant='h5' className={classes.detailValues}>
            {firstLabel}:
          </Typography>
        </Box>

        <Box style={{minWidth: '55%'}} className={classes.detailValues}>
          {firstValue}
        </Box>
      </Box>

      <Box className={classes.detailContainer}>
        <Box
          className={classes.detailLableContainer}
          style={{
            width: secondLabelWidth,
          }}>
          <Typography variant='h5' className={classes.detailValues}>
            {secondLabel}:
          </Typography>
        </Box>
        <Box
          className={clsx({
            [classes.detailValueContainer]: true,
            [classes.detailValues]: true,
          })}>
          {secondValue}
        </Box>
      </Box>
    </>
  );
};
export default SeniorWellnessInfo;
