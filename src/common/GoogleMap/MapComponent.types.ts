import {LocationStatus} from 'globals/enums';

export interface IIcon {
  scaledSize: any;
  url: string;
}

export interface IMapComponentProps {
  atHome: LocationStatus;
  isLoading: boolean;
  homeCoordinates: IHomeCoordinates;
  currentCoordinates: ICurrentCoordinates;
  historyData?: IHistoryData[];
  onClick?: () => void;
  iconScale?: IIconScale;
  mapOptions?: google.maps.MapOptions;
  className?: any;
  timezone?: string;
  showTooltipOnMap?: boolean;
}

interface IHomeCoordinates {
  latitude: number;
  longitude: number;
}
interface ICurrentCoordinates {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface IIconScale {
  x: number;
  y: number;
}

interface IHistoryData {
  latitude: number;
  longitude: number;
  index: number;
  timestamp?: number;
}

export interface IAddMarkerOnMapProps {
  map: any;
  boundaries: any;
  lat: number;
  lng: number;
  icon: IIcon;
  label: string | number;
  showTooltipOnMarker: boolean;
  tooltipIcon?: string;
  timestamp?: number;
}
