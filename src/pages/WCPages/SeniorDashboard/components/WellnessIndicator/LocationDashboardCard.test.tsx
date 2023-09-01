import {render, screen} from '../../../../utilities/test-utils';
import {LocationDashboardCard} from './LocationDashboardCard.component';
import {commonStateData} from '../../../../_mocks_/commonMocks';

describe('<LocationDashboardCard />', () => {
  test('should render <LocationDashboardCard />', () => {
    render(<LocationDashboardCard />);

    const locationText = screen.getByText('Location:');
    expect(locationText).toBeInTheDocument();
  });

  // test('should render LocationDashboardCard component', () => {
  //   render(<LocationDashboardCard />, {
  //     initialState: commonStateData,
  //   });

  //   const location = screen.getByTestId(/location-component/i);
  //   expect(location).toBeInTheDocument();
  // });
});
