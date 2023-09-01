import React, {useRef} from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

import LocateMe from 'assets/icons/LocateMe.svg';
import {
  getAddressByLatLng,
  getHourMin,
  setLocalStorage,
  getCurrentSenior,
  removeLocalStorage,
  getLocalStorage,
} from 'globals/global.functions';
import {
  DATE_FORMAT,
  LocationLocateMeError,
  TIME_FORMAT,
} from 'globals/global.constants';
import {
  postLocationAPICall,
  setSeniorLocateMeError,
} from 'store/commonReducer/common.action';
import {LocateMePostAPIResponseType, LocationStatus} from 'globals/enums';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';

import {locationInfoStyle} from './LocationInfo.style';

export const LocationInfo = ({...props}) => {
  const {atHome, timeAwayFromHome, lastUpdated} = props;
  const seniorInfo = {...getCurrentSenior()};
  let timer: any = useRef(null);

  const {classes} = locationInfoStyle();
  const [address, setAddress] = React.useState('');
  const [locateMeDisable, setLocateMeDisable] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);

  const {locateMeResponse} = useAppSelector(
    (state: any) => state.common.seniorLocation,
  );

  const locationResponseTime = useAppSelector(
    (state: any) => state.config.locationResponseTime,
  );

  const dispatch: any = useAppDispatch();
  const LocationText = React.useMemo(() => {
    switch (atHome) {
      case LocationStatus.HOME:
        return 'Ḥome';
      case LocationStatus.AWAY:
        return 'Away';
      default:
        return 'No data';
    }
  }, [atHome]);

  const updateAddress = async () => {
    setAddress('');
    if (props.currentCoordinates.latitude) {
      const formattedAddress = await getAddressByLatLng(
        props.currentCoordinates.latitude,
        props.currentCoordinates.longitude,
      );
      setAddress(
        formattedAddress == '' ? 'No Address founds' : formattedAddress,
      );
    }
  };

  /**
   * @description function to set the timer for locate me button
   * @function setTimer
   * @param {number} remainingSeconds
   */
  const setTimer = (remainingSeconds: number) => {
    const timer = setTimeout(() => {
      dispatch(
        setSeniorLocateMeError(LocationLocateMeError.locationNotFetched),
      );
      setShowLoader(false);
      removeLocalStorage(`location-${seniorInfo.seniorID}`);
    }, remainingSeconds * 1000);
    return timer;
  };

  //handleLocateMe function call when we click on locate me button
  const handleLocateMe = () => {
    dispatch(postLocationAPICall());
  };

  const getRemainingSeconds = () => {
    const currentTime = moment().format();
    const localStorageStartTime = getLocalStorage(
      `location-${seniorInfo.seniorID}`,
    );

    const completedSeconds = moment(currentTime).diff(
      localStorageStartTime,
      'seconds',
    );

    const remainingSeconds = locationResponseTime - completedSeconds;
    return remainingSeconds;
  };

  React.useEffect(() => {
    updateAddress();
  }, [props.currentCoordinates.latitude, props.currentCoordinates.longitude]);

  // Method to handle disable of locate me button
  const disableLocationHandler = React.useCallback(
    (value: boolean) => {
      //if on past dates then we disable locate me button
      if (
        moment().tz(props.seniorTimezone).format(DATE_FORMAT) !==
          moment(props.lastUpdated)
            .tz(props.seniorTimezone)
            .format(DATE_FORMAT) &&
        props.lastUpdated !== 0
      ) {
        setLocateMeDisable(true);
      } else {
        setLocateMeDisable(value);
      }
    },
    [props.lastUpdated, props.seniorTimezone],
  );

  // when we get response from POST locate-me API
  React.useEffect(() => {
    if (locateMeResponse) {
      if (locateMeResponse === LocateMePostAPIResponseType.Success) {
        setShowLoader(true);
        disableLocationHandler(true);

        //get current time
        const locateMeClickTime = moment().format();

        //update the current time in LS
        setLocalStorage(`location-${seniorInfo.seniorID}`, locateMeClickTime);

        //start timer and assign to timer.current
        timer.current = setTimer(locationResponseTime);
      } else {
        setShowLoader(false);
        disableLocationHandler(false);
      }
    }
  }, [locateMeResponse, disableLocationHandler]);

  //when we refresh the page or comes on location screen.
  React.useEffect(() => {
    //check if we have config time
    if (locationResponseTime) {
      const localStorageStartTime = getLocalStorage(
        `location-${seniorInfo.seniorID}`,
      );
      const remainingSeconds = getRemainingSeconds();

      //check if we have LS time for current senior
      if (localStorageStartTime) {
        setShowLoader(true);
        disableLocationHandler(true);
        timer.current = setTimer(remainingSeconds);
      }
    }
  }, [locationResponseTime]);

  React.useEffect(() => {
    const remainingSeconds = getRemainingSeconds();
    if (props.lastUpdated && isNaN(remainingSeconds)) {
      if (
        moment().tz(props.seniorTimezone).format(DATE_FORMAT) !==
        moment(props.lastUpdated).tz(props.seniorTimezone).format(DATE_FORMAT)
      ) {
        disableLocationHandler(true);
      } else {
        disableLocationHandler(false);
        timer.current =
          !isNaN(remainingSeconds) && setTimer(locationResponseTime);
      }
    }
  }, [props.lastUpdated]);

  React.useEffect(() => {
    return () => {
      dispatch(setSeniorLocateMeError(''));
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <Box>
      <Grid container className={classes.locationInfoContainer}>
        <Grid item sm={3} className={classes.detailContainer}>
          <Details
            firstLabel='Location'
            firstValue={LocationText}
            secondLabel='Address'
            secondValue={<ShowHyphen>{address}</ShowHyphen>}
          />
        </Grid>

        <Grid item sm={3} className={classes.detailContainer}>
          <Details
            firstLabel='Latitude'
            firstValue={
              <ShowHyphen>{props.currentCoordinates.latitude}</ShowHyphen>
            }
            secondLabel='Longitude'
            secondValue={
              <ShowHyphen>{props.currentCoordinates.longitude}</ShowHyphen>
            }
          />
        </Grid>

        <Grid item sm={4} className={classes.detailContainer}>
          <Details
            firstLabel='Time away from home'
            firstValue={
              <ShowHyphen>
                {timeAwayFromHome && getHourMin(timeAwayFromHome, 's', 'short')}
              </ShowHyphen>
            }
            secondLabel='Last updated date & time'
            secondValue={
              <ShowHyphen>
                {lastUpdated &&
                  moment(props.lastUpdated)
                    .tz(props.seniorTimezone)
                    .format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
              </ShowHyphen>
            }
          />
        </Grid>
        <Grid sm={2} className={classes.locateMeContainer}>
          <Box className={classes.locateMe}>
            <Box className={classes.locateMeBox}>
              <Button
                variant='contained'
                color='primary'
                className={classes.locateMeButton}
                onClick={() => handleLocateMe()}
                disabled={locateMeDisable}>
                <Box display='flex' alignItems='center'>
                  <img src={LocateMe} height={25} width={22} />
                  <Typography variant='h5'>Locate Me</Typography>
                </Box>
              </Button>
            </Box>
            {locateMeResponse &&
              locateMeResponse !== LocateMePostAPIResponseType.Success && (
                <Box display='flex' style={{color: '#cc0000'}}>
                  <Typography variant='subtitle1'>Failed. Try again</Typography>
                  <Tooltip
                    title={
                      <Typography variant='subtitle1'>
                        {locateMeResponse}
                      </Typography>
                    }
                    arrow
                    classes={{
                      arrow: classes.tooltipArrow,
                      tooltip: classes.tooltip,
                    }}>
                    <InfoOutlinedIcon style={{paddingLeft: 4}} />
                  </Tooltip>
                </Box>
              )}
          </Box>
          <Box className={classes.locateMeLoader}>
            {locateMeDisable && showLoader && (
              <CircularProgress
                size={30}
                thickness={3.6}
                style={{marginLeft: 10}}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Details = ({firstLabel, secondLabel, firstValue, secondValue}: any) => {
  const {classes} = locationInfoStyle();
  return (
    <Box display='flex' alignItems='baseline'>
      <Box pt={0.1} pl={2} className={classes.justifySpace}>
        <Typography
          variant='h5'
          className={clsx(classes.label, classes.marginB20)}>
          {firstLabel}:
        </Typography>
        <Typography
          variant='h5'
          style={{paddingTop: 2}}
          className={classes.label}>
          {secondLabel}:
        </Typography>
      </Box>
      <Box ml={5} className={classes.justifySpace}>
        <Typography
          className={clsx(classes.detailText, classes.marginB20)}
          variant='body1'>
          {firstValue}
        </Typography>
        <Typography className={classes.detailText} variant='body1'>
          {secondValue}
        </Typography>
      </Box>
    </Box>
  );
};
