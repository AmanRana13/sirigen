import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, CircularProgress} from '@mui/material';

import MapComponent from 'common/GoogleMap';

import {resetSeniorLocation} from 'store/commonReducer/common.action';
import {getCurrentSenior} from 'globals/global.functions';

import LocationDateSelector from './LocationDateSelector';
import {LocationInfo} from './LocationInfo.component';
import {seniorLocationStyle} from './SeniorLocation.style';

const SeniorLocation = () => {
  const dispatch: any = useAppDispatch();
  const {classes} = seniorLocationStyle();
  const {coordinates} = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.address,
  );
  const seniorLocation = useAppSelector(
    (state: any) => state.common.seniorLocation.locationData,
  );
  const isRenderLocation = useAppSelector(
    (state: any) => state.events.isRenderLocation,
  );
  const {timezone: seniorTimezone} = getCurrentSenior();
  React.useEffect(() => {
    return () => {
      dispatch(resetSeniorLocation());
    };
  }, [dispatch]);

  return (
    <Box
      className={classes.seniorLocationContainer}
      data-testid='senior-location'>
      {isRenderLocation ? (
        <>
          <Box mb={2} display='flex' justifyContent='flex-end'>
            <LocationDateSelector coordinates={coordinates} />
          </Box>
          <Box mb={2}>
            <LocationInfo seniorTimezone={seniorTimezone} {...seniorLocation} />
          </Box>
        </>
      ) : (
        <Box className={classes.locationDetailsLoader}>
          <CircularProgress
            size={30}
            thickness={3.6}
            style={{marginLeft: 10}}
          />
        </Box>
      )}
      <Box className={classes.mapContainer}>
        <MapComponent
          atHome={seniorLocation.atHome}
          isLoading={
            coordinates.latitude == '' &&
            !seniorLocation.currentCoordinates.latitude
          }
          currentCoordinates={seniorLocation.currentCoordinates}
          homeCoordinates={{
            latitude: coordinates?.latitude,
            longitude: coordinates?.longitude,
          }}
          historyData={seniorLocation.historyData}
          mapOptions={{clickableIcons: false}}
          className={classes.mapStyle}
          timezone={seniorTimezone}
          showTooltipOnMap={true}
        />
      </Box>
    </Box>
  );
};
export default SeniorLocation;
