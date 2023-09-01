import {fireEvent, render} from 'utilities/test-utils';
import UserDataCard from './UserDataCard.component';

const userData = {
  "name": {
      "firstName": "Abhay",
      "middleName": "",
      "lastName": "Katiyar"
  },
  "location": {
      "zipcode": "77030",
      "city": "Houston",
      "street": "1220 Holcombe Boulevard",
      "timezone": "America/Chicago",
      "coordinates": {
          "latitude": "29.7055365",
          "longitude": "-95.3999922"
      },
      "state": "TX",
      "radius": {
          "value": "2.0",
          "radius_measurement": "mile"
      }
  },
  "dob": "1989-01-02T18:30:00+00:00",
  "timezone": "America/Chicago",
  "profileImage": ""
}

describe('Testing UserDataCard Component', () => {
  test('should render UserDataCard component', () => {
    const handleAssign = jest.fn();
    const {queryByTestId} = render(<UserDataCard userData={userData} onAssign={handleAssign}/>);
    const element = queryByTestId(/user-data-card/i);
    expect(element).toBeInTheDocument();
  });

  test('should run onAssign action on clicking the card', () => {
    const handleAssign = jest.fn();
    const {getByTestId} = render(<UserDataCard userData={userData} onAssign={handleAssign}/>);
    const element = getByTestId(/user-data-card/i);
    fireEvent.click(element);
    expect(handleAssign).toBeCalled();
  });
});
