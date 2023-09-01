import {mockGoogleData, mockPlacesData} from './../_mocks_/autocomplete.mock';
import {
  IInitialStateSelectedAddress,
  initialStateSelectedAddress,
} from './../hooks/useAutoComplete.types';
import GoogleMapAddressAPI from './GoogleMapAddressAPI';

describe('GoogleMapAddressAPI', () => {
  jest.mock('./GoogleMapAddressAPI.ts');
  let googleMapInstance: any;

  beforeEach(() => {
    googleMapInstance = new GoogleMapAddressAPI();
  });

  it('should get the map key', () => {
    googleMapInstance._googleMapAPIKey = '123';

    expect(googleMapInstance._googleMapAPIKey).toBe('123');
  });

  it('should transform the address of google autocomplete', () => {
    const data: IInitialStateSelectedAddress = googleMapInstance.getAddress(
      mockGoogleData,
    );

    data.streetAddress = '';

    expect(data).toEqual(initialStateSelectedAddress);
  });

  it('should format the google address_components data', () => {
    const data: IInitialStateSelectedAddress = googleMapInstance.formatAddress(
      mockPlacesData,
    );

    data.streetAddress = '';

    expect(data).toEqual(initialStateSelectedAddress);
  });
});
