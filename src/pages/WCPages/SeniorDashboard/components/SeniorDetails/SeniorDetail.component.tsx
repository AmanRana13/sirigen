/* eslint-disable max-len */
import {useAppSelector} from 'hooks/reduxHooks';
import {NavLink, useLocation} from 'react-router-dom';
import {Box, CircularProgress, Typography} from '@mui/material';
import get from 'lodash.get';

import UserName from 'common/UserName';
import {theme} from 'config/theme.config';

import {OnboardingTab} from 'globals/enums';

import SeniorShortDetail from './component/SeniorShortDetail/SeniorShortDetail';
import {seniorDetailsStyle} from './SeniorDetail.style';
import AvatarComponent from 'common/Avatar/Avatar.component';
import ZoneChip from 'common/ZoneChip/ZoneChip';

const SeniorDetail = () => {
  const {seniorDetail, profilePic} = useAppSelector(
    (state: any) => state.common,
  );
  const {basicInfo, minimalInfo, isLoading} = seniorDetail;
  const {pathname} = useLocation();
  const {classes} = seniorDetailsStyle();

  if (isLoading) {
    return (
      <Box
        className={classes.container}
        display='flex'
        justifyContent='center'
        alignItems='center'
        data-testid='loader'>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box className={classes.container} data-testid='seniorDetailComponent'>
      <Box display='flex' flexDirection='column'>
        <Box display='flex' mb={2}>
          <AvatarComponent
            altText='senior-profile-image'
            imageUrl={`data:image/${get(profilePic, 'format')};base64, ${get(
              profilePic,
              'image',
            )}`}
            child={seniorDetail.nameInitials}
            className={classes.seniorImage}
          />
          <Box>
            <Typography variant='f24bold'>
              <NavLink
                to={`${pathname.replace('dashboard', 'onboarding-info')}?tab=${
                  OnboardingTab.PROFILE_INFO
                }`}
                style={{
                  color: theme.palette.common.black,
                  wordBreak: 'break-all',
                }}>
                <UserName
                  name={{
                    firstName: minimalInfo.name.first_name,
                    middleName: minimalInfo.name.middle_name,
                    lastName: minimalInfo.name.last_name,
                  }}
                />
              </NavLink>
            </Typography>
            <Box mt='9px'>
              <ZoneChip zoneType={minimalInfo.zone} />
            </Box>
          </Box>
        </Box>
        <SeniorShortDetail data={{...basicInfo, ...minimalInfo}} />
      </Box>
    </Box>
  );
};
export default SeniorDetail;
