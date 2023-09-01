import {useRef, useEffect} from 'react';
import clsx from 'clsx';
import {CircularProgress} from '@mui/material';
import ReactDOMServer from 'react-dom/server';

import Home from 'assets/icons/Home.png';
import HomeAway from 'assets/icons/HomeAway.png';
import Away from 'assets/icons/Away.png';
import CircleMarker from 'assets/icons/CircleMarker.png';
import AwayTooltip from 'assets/icons/AwayTooltip.png';
import {LocationStatus} from 'globals/enums';
import {getAddressByLatLng, getTimestamp} from 'globals/global.functions';

import {IAddMarkerOnMapProps, IMapComponentProps} from './MapComponent.types';

import {mapComponentStyle} from './MapComponent.style';
import MarkerTooltipComponent from './MarkerTooltipComponent';

const MapComponent = ({
  atHome,
  isLoading,
  homeCoordinates,
  currentCoordinates,
  historyData,
  iconScale = {x: 35, y: 50},
  mapOptions,
  className,
  onClick,
  timezone,
  showTooltipOnMap,
}: IMapComponentProps) => {
  const {classes} = mapComponentStyle();
  const ref = useRef<HTMLDivElement>(null);
  const HomeIcon = {
    url: Home,
    scaledSize: new google.maps.Size(iconScale.x, iconScale.y),
  };
  const HomeAwayIcon = {
    url: HomeAway,
    scaledSize: new google.maps.Size(iconScale.x, iconScale.y),
  };
  const AwayIcon = {
    url: Away,
    scaledSize: new google.maps.Size(iconScale.x, iconScale.y),
  };
  const CircleMarkerIcon = {
    url: CircleMarker,
    scaledSize: new google.maps.Size(30, 30),
  };

  useEffect(() => {
    //todo test empty map condition. For now functionality is working fine without this condition.
    //Create empty map
    // if (ref.current && atHome == LocationStatus.NO_LOCATION) {
    //   console.log("ININ")
    //   new google.maps.Map(ref.current, mapOptions);
    // }

    if (ref.current && atHome !== LocationStatus.NO_LOCATION) {
      //Create Boundaries of map with respect to Senior's Home & Away
      const bounds = new google.maps.LatLngBounds();
      //Create Actual Map
      const maps = new google.maps.Map(ref.current, mapOptions);
      //Add Event Listener on Map
      if (onClick) {
        maps.addListener('click', () => {
          onClick();
        });
      }

      //Add Home Marker
      const homeMarkerProps = {
        map: maps,
        boundaries: bounds,
        lat: homeCoordinates.latitude,
        lng: homeCoordinates.longitude,
        icon:
          atHome === (LocationStatus.AWAY as LocationStatus)
            ? HomeAwayIcon
            : HomeIcon,
        label: 'none',
        showTooltipOnMarker: false,
      };
      addMarkerOnMap(homeMarkerProps);

      //Create History Markers
      historyData?.forEach((item, index) => {
        if (index < historyData.length - 1) {
          const historyMarkerProps = {
            map: maps,
            boundaries: bounds,
            lat: item.latitude,
            lng: item.longitude,
            icon: CircleMarkerIcon,
            label: index + 1,
            showTooltipOnMarker: true,
            tooltipIcon: CircleMarker,
            timestamp: historyData[index].timestamp,
          };
          addMarkerOnMap(historyMarkerProps);
        }
      });

      //Add Away Marker
      if (atHome === (LocationStatus.AWAY as LocationStatus)) {
        const awayMarkerProps = {
          map: maps,
          boundaries: bounds,
          lat: currentCoordinates.latitude,
          lng: currentCoordinates.longitude,
          icon: AwayIcon,
          label: 'none',
          showTooltipOnMarker: true,
          tooltipIcon: AwayTooltip,
          timestamp: getTimestamp(currentCoordinates.timestamp),
        };
        addMarkerOnMap(awayMarkerProps);
      }

      //Restrict Boundaries
      if (atHome === LocationStatus.HOME && !historyData) {
        maps.setZoom(15);
        maps.setCenter(
          new google.maps.LatLng(
            homeCoordinates.latitude,
            homeCoordinates.longitude,
          ),
        );
      } else {
        // reason:- there is a existing glitch with multiple bound in gmaps.
        setTimeout(() => {
          maps.fitBounds(bounds);
        }, 500);
      }
    }
  }, [ref, atHome]);

  /**
   * @description function to add markers on google map
   * @function addMarkerOnMap
   * @param {any} map
   * @param {any} boundaries
   * @param {number} lat
   * @param {number} lng
   * @param {IIcon} icon
   * @param {string | number} label
   * @param {boolean} showTooltipOnMarker
   * @param {string} tooltipIcon
   * @param {number} timestamp
   * @return {JSX}
   */
  const addMarkerOnMap = ({
    map,
    boundaries,
    lat,
    lng,
    icon,
    label,
    showTooltipOnMarker,
    tooltipIcon,
    timestamp,
  }: IAddMarkerOnMapProps) => {
    if (!lat || !lng) {
      return null;
    }
    const isAway =
      currentCoordinates.latitude === lat &&
      currentCoordinates.longitude === lng;

    const markerLatLng = new google.maps.LatLng(lat, lng);

    const actualMarker = new google.maps.Marker({
      position: markerLatLng,
      icon: icon,
      label: {text: `${label == 'none' ? ' ' : label}`, color: 'white'},
    });

    if (showTooltipOnMap) {
      if (showTooltipOnMarker) {
        getTooltipOnMarker(
          map,
          lat,
          lng,
          label,
          actualMarker,
          tooltipIcon,
          timestamp,
        );
      }
      if (isAway) {
        actualMarker.setAnimation(google.maps.Animation.BOUNCE);

        setTimeout(function () {
          actualMarker.setAnimation(null);
        }, 10000);
      }
    }

    actualMarker.setMap(map);

    //Add Event Listener on Marker
    if (onClick) {
      actualMarker.addListener('click', () => {
        onClick();
      });
    }
    boundaries.extend(markerLatLng);
  };
  let tooltipZIndex = 10;

  /**
   * @description function to get tooltip on markers
   * @function getTooltipOnMarker
   * @param {any} map
   * @param {number} lat
   * @param {number} lng
   * @param {string | number} label
   * @param {any} actualMarker
   * @param {string} tooltipIcon
   * @param {number} timestamp
   * @return {JSX}
   */
  const getTooltipOnMarker = async (
    map: any,
    lat: number,
    lng: number,
    label: number | string,
    actualMarker: any,
    tooltipIcon?: string,
    timestamp?: number,
  ) => {
    const contentString = ReactDOMServer.renderToString(
      <MarkerTooltipComponent
        latitude={lat}
        longitude={lng}
        addressPlaceholder='Click to get address'
        address=''
        timestamp={timestamp}
        tooltipIcon={tooltipIcon}
        label={label}
        timezone={timezone}
      />,
    );

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      disableAutoPan: true,
    });

    const openInfoWindow = () => {
      infoWindow.open({
        anchor: actualMarker,
        map,
        shouldFocus: false,
      });
    };

    const handleMarkerHover = () => {
      infoWindow.setOptions({disableAutoPan: true});
      infoWindow.setZIndex(tooltipZIndex + 1);
      openInfoWindow();
    };

    const closeInfoWindow = () => {
      infoWindow.close();
    };

    const handleMarkerClick = async () => {
      infoWindow.setOptions({disableAutoPan: false});
      const addr = await getAddressByLatLng(lat, lng);
      const contentStrin = ReactDOMServer.renderToString(
        <MarkerTooltipComponent
          latitude={lat}
          longitude={lng}
          addressPlaceholder='No address found'
          address={addr}
          timestamp={timestamp}
          tooltipIcon={tooltipIcon}
          label={label}
          timezone={timezone}
        />,
      );
      infoWindow.setContent(contentStrin);
      openInfoWindow();
      infoWindow.setZIndex(tooltipZIndex++);
      google.maps.event.removeListener(mouseoutEvent);
      google.maps.event.removeListener(mouseOverEvent);
      google.maps.event.removeListener(clickEvent);
    };

    let mouseoutEvent = actualMarker.addListener(
      'mouseover',
      handleMarkerHover,
    );
    let mouseOverEvent = actualMarker.addListener('mouseout', closeInfoWindow);
    let clickEvent = actualMarker.addListener('click', handleMarkerClick);

    google.maps.event.addListener(infoWindow, 'closeclick', function () {
      mouseoutEvent = actualMarker.addListener('mouseout', closeInfoWindow);
      mouseOverEvent = actualMarker.addListener('mouseover', handleMarkerHover);
      clickEvent = actualMarker.addListener('click', handleMarkerClick);
    });
  };
  if (isLoading) {
    return <CircularProgress data-testid='loader' />;
  }
  return (
    <div
      data-testid='map-component'
      ref={ref}
      id='map'
      className={clsx({
        [className]: true,
        [classes.mapContainer]: true,
        [classes.mapBackgroundColor]: LocationStatus.NO_LOCATION,
      })}></div>
  );
};

export default MapComponent;
