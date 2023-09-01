import { GoogleMapAddressComponent } from './../globals/enums';
export const mockGoogleData: google.maps.places.Autocomplete = {
  getPlace: (): google.maps.places.PlaceResult => ({
    address_components: [],
  }),
  getBounds: function (): any {
    throw new Error('Function not implemented.');
  },
  getFields: function (): string[] {
    throw new Error('Function not implemented.');
  },
  setBounds: function (): void {
    throw new Error('Function not implemented.');
  },
  setComponentRestrictions: function (): void {
    throw new Error('Function not implemented.');
  },
  setFields: function (): void {
    throw new Error('Function not implemented.');
  },
  setOptions: function (): void {
    throw new Error('Function not implemented.');
  },
  setTypes: function (): void {
    throw new Error('Function not implemented.');
  },
  addListener: function (): any {
    throw new Error('Function not implemented.');
  },
  bindTo: function (): void {
    throw new Error('Function not implemented.');
  },
  get: function () {
    throw new Error('Function not implemented.');
  },
  notify: function (): void {
    throw new Error('Function not implemented.');
  },
  set: function (): void {
    throw new Error('Function not implemented.');
  },
  setValues: function (): void {
    throw new Error('Function not implemented.');
  },
  unbind: function (): void {
    throw new Error('Function not implemented.');
  },
  unbindAll: function (): void {
    throw new Error('Function not implemented.');
  },
};

const addressComponentsMockData = {
  streetNumber: {
    long_name: '',
    short_name: '',
    types: [GoogleMapAddressComponent.streetNumber],
  },
  locality: {
    long_name: '',
    short_name: '',
    types: [GoogleMapAddressComponent.locality],
  },
  postalCode: {
    long_name: '',
    short_name: '',
    types: [GoogleMapAddressComponent.postalCode],
  },
  route: {
    long_name: '',
    short_name: '',
    types: [GoogleMapAddressComponent.route],
  },
  state: {
    long_name: '',
    short_name: '',
    types: [GoogleMapAddressComponent.state],
  },
};


export const mockPlacesData: google.maps.places.PlaceResult = {
  address_components: [
    addressComponentsMockData.streetNumber,
    addressComponentsMockData.locality,
    addressComponentsMockData.postalCode,
    addressComponentsMockData.streetNumber,
    addressComponentsMockData.route,
    addressComponentsMockData.state
  ],
};
