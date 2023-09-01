export interface IAutoCompleteConfig {
  inputRef: any;
  autocompleteOptions: google.maps.places.AutocompleteOptions;
  initialInputValue: string;
  onChange: (event: any) => void;
}

export interface IUseAutoCompleteProps {
  autocompleteConfig: IAutoCompleteConfig;
}

export interface IAddressCoordinates {
  latitude: number;
  longitude: number;
}

export interface IInitialStateSelectedAddress {
  streetNumber: string;
  route: string;
  city: string;
  fullAddress: string;
  fullState: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  coordinates: IAddressCoordinates;
}

export const initialStateSelectedAddress: IInitialStateSelectedAddress = {
  streetNumber: '',
  route: '',
  city: '',
  fullAddress: '',
  fullState: '',
  state: '',
  zipCode: '',
  streetAddress: '',
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
};
