import {render} from '../../utilities/test-utils';
import MarkerTooltipComponent from './MarkerTooltipComponent';
const props={
    latitude:34435435,
    longitude:43523232,
    address:'test',
    timestamp:1656503237000,
    tooltipIcon:'',
    label:"address",
    addressPlaceholder:'address',
    timezone:'America/Los_Angeles',
}
describe('<MapComponent />', () => {
    test('should render <MapComponent />', () => {
        const component = render(<MarkerTooltipComponent {...props} />);
        expect(component.getByTestId('markerTooTipComponent')).toBeInTheDocument();
      
    })
})