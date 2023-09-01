import {IInitialStateSelectedAddress} from './../hooks/useAutoComplete.types';
import {GoogleMapAddressComponent} from 'globals/enums';

/**
 * @class AutoCompleteAPI
 * @description class to handle address methods, google map methods and key.
 */
class GoogleMapAddressAPI {
  /**
   * @description method to fetch the place from selected address.
   * @param {google.maps.places.Autocomplete} selectedAddress
   * @returns {IInitialStateSelectedAddress} return formated address
   */
  getAddress = (
    selectedAddress: google.maps.places.Autocomplete,
  ): IInitialStateSelectedAddress => {
    const place: google.maps.places.PlaceResult = selectedAddress.getPlace();
    const fullAddress: string = place.formatted_address || '';

    const addressFields: IInitialStateSelectedAddress = this.formatAddress(
      place,
    );

    return {
      ...addressFields,
      fullAddress,
    };
  };

  /**
   * @function formatAddress
   * @description method to format the address from address_components
   * @param {google.maps.places.PlaceResult} place google map getPlace() result
   * @returns {IInitialStateSelectedAddress}
   */
  formatAddress = (
    place: google.maps.places.PlaceResult,
  ): IInitialStateSelectedAddress => {
    let streetNumber: string = '';
    let route: string = '';
    let state: string = '';
    let city: string = '';
    let zipCode: string = '';
    let fullState: string = '';

    // place.address_components are google.maps.GeocoderAddressComponent objects
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0];

      switch (componentType) {
        case GoogleMapAddressComponent.streetNumber: {
          streetNumber = component.long_name;
          break;
        }

        case GoogleMapAddressComponent.route: {
          route = component.long_name;
          break;
        }
        case GoogleMapAddressComponent.locality: {
          city = component.long_name;
          break;
        }

        case GoogleMapAddressComponent.postalCode: {
          zipCode = component.long_name;
          break;
        }

        case GoogleMapAddressComponent.state: {
          state = component.short_name;
          fullState = component.long_name;
          break;
        }
      }
    }

    return {
      streetNumber,
      route,
      city,
      state,
      zipCode,
      fullState,
      fullAddress: '',
      streetAddress: this.getStreetAddress(streetNumber, route),
      coordinates: {
        latitude: place.geometry?.location?.lat() || 0,
        longitude: place.geometry?.location?.lng() || 0,
      },
    };
  };

  /**
   * @description method to concatinate street numbe and route.
   * @param {string} streetNumber
   * @param {string} route
   * @returns {string} address
   */
  getStreetAddress = (streetNumber: string, route: string): string => {
    let address = '';

    address = `${streetNumber} ${address}`;
    if (route) {
      address += route;
    }

    return address;
  };
}

export default GoogleMapAddressAPI;
