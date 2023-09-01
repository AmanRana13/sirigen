import {render} from 'utilities/test-utils';
import ZoneChip from './ZoneChip';
import {ZoneType} from 'globals/enums';

describe('ZoneChip', () => {
  test('should render ZoneChip component', () => {
    const {getByTestId} = render(<ZoneChip zoneType={ZoneType.WHITE} />);
    const element = getByTestId('zone-chip');
    expect(element).toBeInTheDocument();
  });
  test('should render ZoneChip with blue zone', () => {
    const {getByTestId} = render(<ZoneChip zoneType={ZoneType.BLUE} />);
    const element = getByTestId('zone-chip');
    expect(element).toHaveStyle({backgroundColor: '#8fd9e9'});
  });
  test('should render ZoneChip with green zone', () => {
    const {getByTestId} = render(<ZoneChip zoneType={ZoneType.GREEN} />);
    const element = getByTestId('zone-chip');
    expect(element).toHaveStyle({backgroundColor: '#ade867'});
  });
  test('should render ZoneChip with vimient zone', () => {
    const {getByTestId} = render(<ZoneChip zoneType={ZoneType.VIMIENT} />);
    const element = getByTestId('zone-chip');
    expect(element).toHaveStyle({backgroundColor: '#ffdd00'});
  });
});
