import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {useNavigate} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

import {
  getCurrentSenior,
  getQueryParamTimezone,
  getHourMin,
} from 'globals/global.functions';
import MapComponent from 'common/GoogleMap';
import {
  getSeniorLocation,
  resetSeniorLocation,
} from 'store/commonReducer/common.action';

import {wellnessIndicatorStyle} from './WellnessIndicator.style';
import {LocationStatus} from 'globals/enums';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import {residentSubPages} from 'globals/global.constants';

const LocationDashboardCard = ({
  isResident = false,
}: {
  isResident?: boolean;
}) => {
  const {classes} = wellnessIndicatorStyle();
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const homeCoordinates = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.address.coordinates,
  );
  const seniorLocation = useAppSelector(
    (state: any) => state.common.seniorLocation.locationData,
  );
  React.useEffect(() => {
    if (homeCoordinates.latitude) {
      dispatch(
        getSeniorLocation({
          isResident,
        }),
      );
    }
  }, [dispatch, homeCoordinates, isResident]);

  React.useEffect(() => {
    return () => {
      dispatch(resetSeniorLocation());
    };
  }, [dispatch]);

  const redirectToLocationPage = React.useCallback(() => {
    if (isResident) {
      navigate(residentSubPages.location.path, {
        relative: 'route',
      });
    } else {
      const seniorInfo = {...getCurrentSenior()};
      navigate(
        `/senior/${seniorInfo.seniorID}/${
          seniorInfo.accountID
        }/${getQueryParamTimezone(seniorInfo.timezone)}/senior-location`,
        {replace: true},
      );
    }
  }, [isResident, navigate]);

  const LocationText = React.useMemo(() => {
    switch (seniorLocation.atHome) {
      case LocationStatus.HOME:
        return 'Ḥome';
      case LocationStatus.AWAY:
        return 'Away';
      default:
        return 'No data';
    }
  }, [seniorLocation.atHome]);

  return (
    <Box className={classes.locationContainer} data-testid='location-component'>
      <Box display='flex' justifyContent='space-between'>
        <Typography className={classes.locationTitle}>Location:</Typography>
        <Typography className={classes.locationValue}>
          {LocationText}
        </Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography className={classes.locationTitle}>
          Time away from home:
        </Typography>
        <Typography>
          <ShowHyphen>
            {seniorLocation.timeAwayFromHome &&
              getHourMin(seniorLocation.timeAwayFromHome, 's', 'short')}
          </ShowHyphen>
        </Typography>
      </Box>
      <Box
        display='flex'
        height='100%'
        justifyContent='center'
        alignItems='center'>
        <MapComponent
          atHome={seniorLocation.atHome}
          homeCoordinates={{
            latitude: homeCoordinates?.latitude,
            longitude: homeCoordinates?.longitude,
          }}
          isLoading={
            homeCoordinates.latitude == '' &&
            !seniorLocation.currentCoordinates.latitude
          }
          currentCoordinates={seniorLocation.currentCoordinates}
          iconScale={{x: 28, y: 38}}
          onClick={redirectToLocationPage}
          mapOptions={{
            fullscreenControl: false,
            keyboardShortcuts: false,
            gestureHandling: 'none',
            panControl: false,
            clickableIcons: false,
            mapTypeControl: false,
            zoomControl: false,
          }}
          className={classes.mapStyle}
          showTooltipOnMap={false}
        />
      </Box>
    </Box>
  );
};
export {LocationDashboardCard};
