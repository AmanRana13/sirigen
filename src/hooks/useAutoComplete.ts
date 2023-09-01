import AutoCompleteAPI from '../classes/GoogleMapAddressAPI';
import {autoCompleteEvents} from 'globals/enums';
import React from 'react';
import {
  IInitialStateSelectedAddress,
  initialStateSelectedAddress,
  IUseAutoCompleteProps,
} from './useAutoComplete.types';

const autoCompleteAPI = new AutoCompleteAPI();

/**
 * @description Custom hook to use google map autocomplete inside input field.
 * @component useAutoComplete
 * @param {IUseAutoCompleteProps} autocompleteConfig
 * @returns
 */
const useAutoComplete = ({
  autocompleteConfig,
}: IUseAutoCompleteProps): [IInitialStateSelectedAddress] => {
  const [
    selectedLocation,
    setSelectedLocation,
  ] = React.useState<IInitialStateSelectedAddress>(initialStateSelectedAddress);

  // useEffect to add addeventlistener on input
  React.useEffect(() => {
    const {onChange, inputRef} = autocompleteConfig;

    inputRef?.current?.addEventListener('keyup', onChange);

    return () => {
      inputRef?.current?.removeEventListener('keyup', onChange);
    };
  }, [autocompleteConfig]);

  // use effect to call google map API
  React.useEffect(() => {
    const {
      initialInputValue,
      inputRef,
      autocompleteOptions,
    } = autocompleteConfig;

    //set default value to input field
    if (initialInputValue) {
      inputRef.current.value = initialInputValue;
    }

    // Google map places api
    const autoComplete = new google.maps.places.Autocomplete(
      inputRef?.current,
      autocompleteOptions,
    );

    /**
     * @function handlePlaceSelect
     * @description Function to format the selected address into our use case format
     */
    const handlePlaceSelect = () => {
      const addressDetails: IInitialStateSelectedAddress = autoCompleteAPI.getAddress(
        autoComplete,
      );

      inputRef.current.value = addressDetails.streetAddress;
      setSelectedLocation(addressDetails);
    };

    autoComplete.addListener(autoCompleteEvents.placeChanged, () => {
      handlePlaceSelect();
    });
  }, [autocompleteConfig]);

  return [selectedLocation];
};

export default useAutoComplete;
