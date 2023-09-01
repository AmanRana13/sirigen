import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {Box, Grid, Typography} from '@mui/material';

import {getAge} from 'globals/global.functions';

import {seniorCareInsightsStyle} from './SeniorCareInsights.style';
import StateCityFormatter from 'common/StateCityFormatter/StateCityFormatter';
import PrintButton from 'common/Print/components/PrintButton/PrintButton.component';
import Preview from 'common/Preview/Preview.component';
import AvatarComponent from 'common/Avatar/Avatar.component';
import RoleBaseRender from 'common/RoleBaseRender/RoleBaseRender';
import {Roles} from 'globals/enums';

export const ContanctInfo = () => {
  const {classes} = seniorCareInsightsStyle();
  const {seniorDetail, profilePic} = useAppSelector(
    (state: any) => state.common,
  );
  const showPreviewButton = useAppSelector(
    (state: any) => state.preview.showButton,
  );

  return (
    <Box className={classes.contanctInfoContainer}>
      <Grid container>
        <Grid item sm={2.5} mr={2}>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Box>
              <AvatarComponent
                altText='senior-profile-image'
                imageUrl={`data:image/${profilePic?.format};base64, ${profilePic?.image}`}
                child={seniorDetail.nameInitials}
                className={classes.seniorImage}
              />
            </Box>
            <Box ml={1}>
              <Typography variant='h3v1'>
                {seniorDetail?.minimalInfo?.name?.first_name}&nbsp;
                {seniorDetail?.minimalInfo?.name?.middle_name}&nbsp;
                {seniorDetail?.minimalInfo?.name?.last_name}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Details
          firstLabel='Preferred'
          firstValue={seniorDetail?.basicInfo?.preferred_name || '-'}
          secondLabel='Gender'
          secondValue={seniorDetail?.minimalInfo?.gender || '-'}
        />
        <Details
          firstLabel='Age'
          firstValue={`${getAge(seniorDetail?.minimalInfo.dob)} yrs`}
          secondLabel='Account'
          secondValue={seniorDetail?.minimalInfo?.account_id || '-'}
        />
        <Details
          firstLabel='Location'
          firstValue={
            <StateCityFormatter
              city={seniorDetail?.minimalInfo?.address?.city}
              state={seniorDetail?.minimalInfo?.address?.state}
            />
          }
          secondLabel='Time Zone'
          secondValue={seniorDetail?.minimalInfo?.address?.timezone || '-'}
        />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          alignSelf='center'
          flexGrow='1'>
          <RoleBaseRender forRole={Roles.Admin}>
            <PrintButton />
          </RoleBaseRender>
          {showPreviewButton && <Preview />}
        </Box>
      </Grid>
    </Box>
  );
};

const Details = React.memo(
  ({firstLabel, secondLabel, firstValue, secondValue}: any) => {
    const {classes} = seniorCareInsightsStyle();
    return (
      <Grid item sm={2.75} className={classes.detailContainer}>
        <Box display='flex'>
          <Box pt={0.1} pl={2}>
            <Typography variant='h5'>{firstLabel}:</Typography>
            <Typography variant='h5' style={{paddingTop: 2}}>
              {secondLabel}:
            </Typography>
          </Box>
          <Box ml={5}>
            <Typography className={classes.detailText} variant='body1'>
              {firstValue}
            </Typography>
            <Typography className={classes.detailText} variant='body1'>
              {secondValue}
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  },
);
