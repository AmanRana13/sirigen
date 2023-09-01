import {LocationStatus} from 'globals/enums';
import {render} from '../../utilities/test-utils';
import MapComponent from './MapComponent';
import {IMapComponentProps} from './MapComponent.types';

const props = {
  atHome: LocationStatus.HOME,
  homeCoordinates: {
    latitude: 2222,
    longitude: 1111,
  },
  currentCoordinates: {
    latitude: 2222,
    longitude: 1111,
    timestamp:1643252265000
  },
  iconScale: {x: 28, y: 38},
  mapOptions: {
    fullscreenControl: false,
    keyboardShortcuts: false,
    gestureHandling: 'none',
    panControl: false,
    clickableIcons: false,
    mapTypeControl: false,
    zoomControl: false,
  },
};
describe('<MapComponent />', () => {
  test('should render <MapComponent />', () => {
    const component = render(<MapComponent {...props}onClick={undefined} isLoading={false} atHome={LocationStatus.HOME} />);
    expect(component.getByTestId('map-component')).toBeInTheDocument();
  });
  test('should render MapComponent for no location', () => {
    
    const component = render(<MapComponent {...props} onClick={()=>jest.fn()} isLoading={false} atHome={LocationStatus.NO_LOCATION} />);
    expect(component.getByTestId('map-component')).toBeInTheDocument();
  });

  test('should render CircularProgress', () => {
    
    const component = render(<MapComponent {...props} isLoading= {true} atHome={LocationStatus.HOME} />);
    expect(component.getByTestId('loader')).toBeInTheDocument();
  });
});
