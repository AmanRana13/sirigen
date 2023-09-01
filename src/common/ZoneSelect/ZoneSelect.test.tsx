import {ZoneType} from 'globals/enums';
import {render} from '../../utilities/test-utils';
import ZoneSelect from './ZoneSelect.component';

describe('ZoneSelect Component', () => {
  test('should render ZoneSelect component', () => {
    const {queryByTestId} = render(<ZoneSelect />);
    const element = queryByTestId(/zone-select/i);
    expect(element).toBeInTheDocument();
  });

  test('should render White Option', () => {
    const {queryByText} = render(<ZoneSelect zoneType={ZoneType.WHITE} />);
    const element = queryByText(/White Zone/i);
    expect(element).toBeInTheDocument();
  });
  test('should render Blue Option', () => {
    const {queryByText} = render(<ZoneSelect zoneType={ZoneType.BLUE} />);
    const element = queryByText(/Blue Zone/i);
    expect(element).toBeInTheDocument();
  });
  test('should render Green Option', () => {
    const {queryByText} = render(<ZoneSelect zoneType={ZoneType.GREEN} />);
    const element = queryByText(/Green Zone/i);
    expect(element).toBeInTheDocument();
  });
  test('should render Vimient Option', () => {
    const {queryByText} = render(<ZoneSelect zoneType={ZoneType.VIMIENT} />);
    const element = queryByText(/Vimient Zone/i);
    expect(element).toBeInTheDocument();
  });
  test('should render Select zone if no option passed', () => {
    const {queryByText} = render(<ZoneSelect />);
    const element = queryByText(/Select zone/i);
    expect(element).toBeInTheDocument();
  });
  test('should render All Zones if no option passed & hasAllOption is true', () => {
    const {queryByText} = render(<ZoneSelect hasAllOption />);
    const element = queryByText(/All Zones/i);
    expect(element).toBeInTheDocument();
  });
});
