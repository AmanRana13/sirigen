import {render} from 'utilities/test-utils';

import {LocationInfo} from './LocationInfo.component';
const props={
    currentCoordinates: {latitude: null, longitude: null, timestamp: 1656503237000000000},
    historyData: [],
    lastUpdated: 1656503237000,
    seniorTimezone: "America/Los_Angeles",
    timeAwayFromHome: 0}
describe('LocationInfo Location', () => {
  test('render the Away on  LocationInfo component', async() => {
    const {getByText} = render(<LocationInfo atHome= {0}{...props} />);
    const LocationText=await getByText('Away')
    expect(LocationText).toBeInTheDocument();
  });
  test('render the Home on  LocationInfo component', async() => {
    const {getByText} = render(<LocationInfo atHome= {1}{...props} />);
    const LocationText=await getByText('Ḥome')
    expect(LocationText).toBeInTheDocument();
  });
  test('render the NO Data on  LocationInfo component', async() => {
    const {getByText} = render(<LocationInfo atHome= {2}{...props} />);
    const LocationText=await getByText('No data')
    expect(LocationText).toBeInTheDocument();
  });
});