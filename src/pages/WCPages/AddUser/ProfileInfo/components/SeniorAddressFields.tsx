import React from 'react';

import {Grid} from '@mui/material';
import {Fields} from 'common/Fields';
import {FORM_ERROR_MESSAGES, REGEX, US_STATES} from 'globals/global.constants';
import get from 'lodash.get';
import useAutoComplete from 'hooks/useAutoComplete';
import {IUseAutoCompleteProps} from 'hooks/useAutoComplete.types';

const SeniorAddressFields = ({
  register,
  errors,
  watch,
  control,
  setSelectedLocation,
  setValue,
  trigger,
  address,
  location,
}: any) => {
  const addressRef: any = React.useRef<any>(null);
  // setting Registered Street Field Ref to addressRef
  const street = React.useMemo(() =>  {
    let field = register('address.street', {
      required: 'Required Field',
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    })
    const hookRef = field.ref;
    field.ref = (e: any) => {
      hookRef(e); // this sets ref for react-hook-form
      addressRef.current = e; // this sets ref for Google Address API
    }
    return field;
  }, [])
  const addressOnChangeHandler = React.useCallback(
    (event: any) => {
      const value = event.target.value;
      setSelectedLocation({
        ...location,
        streetAddress: value,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSelectedLocation, setSelectedLocation],
  );

  const autocompleteConfig: IUseAutoCompleteProps = React.useMemo(
    () => ({
      autocompleteConfig: {
        inputRef: addressRef,
        autocompleteOptions: {
          componentRestrictions: {country: 'us'},
          fields: ['address_components', 'formatted_address', 'geometry'],
          types: ['address'],
        },
        initialInputValue: address?.street,
        onChange: addressOnChangeHandler,
      },
    }),
    [addressRef, address?.street, addressOnChangeHandler],
  );
  const [selectedLocation] = useAutoComplete(autocompleteConfig);

  // update state values with API data
  React.useEffect(() => {
    if (address) {
      setValue('address.street', address.street);
      setValue('address.state', address.state);
      setValue('address.city', address.city);
      setValue('address.zipcode', address.zipcode);
    }
  }, [address, setValue]);

  React.useEffect(() => {
    if (selectedLocation.fullAddress) {
      setSelectedLocation(selectedLocation);
      setValue('address.street', selectedLocation.streetAddress);
      setValue('address.state', selectedLocation.state);
      setValue('address.city', selectedLocation.city);
      setValue('address.zipcode', selectedLocation.zipCode);
      trigger(['address.state', 'address.city', 'address.zipcode']);
    }
  }, [selectedLocation, setValue, setSelectedLocation, trigger]);

  return (
    <>
      <Grid item xs={4}>
        <Fields
          inputProps={{
            form: {
              autocomplete: 'off',
            },
          }}
          name='address.street'
          label='Street Address'
          required={true}
          {...street}
          helperText='Flat, House no.,Building,Apartment'
          errorField={get(errors, 'address.street')}
          errorText={get(errors, 'address.street.message')}
        />
      </Grid>
      <Grid item xs={4}>
        <Fields
          name='address.state'
          label='State'
          required={true}
          menu={true}
          value={watch('address.state') || ''}
          control={control}
          rules={{
            required: 'Required Field',
          }}
          errorField={get(errors, 'address.state')}
          errorText={get(errors, 'address.state.message')}
          menuItems={US_STATES}
        />
      </Grid>
      <Grid item xs={4}>
        <Fields
          name='address.city'
          label='City'
          required={true}
          {...register('address.city', {
            required: 'Required Field',
            maxLength: {
              value: 25,
              message: 'Max 25 character is allowed',
            },
            pattern: {
              value: REGEX.BLANK_FIELD,
              message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
            },
          })}
          helperText='Enter City'
          errorField={get(errors, 'address.city')}
          errorText={get(errors, 'address.city.message')}
        />
      </Grid>
      <Grid item xs={4}>
        <Fields
          name='address.zipcode'
          label='Zip code'
          required={true}
          {...register('address.zipcode', {
            required: 'Required Field',
            maxLength: {
              value: 5,
              message: 'Max 5 character is allowed',
            },
            pattern: {
              value: REGEX.BLANK_FIELD,
              message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
            },
          })}
          helperText='Enter Zip code'
          errorField={get(errors, 'address.zipcode')}
          errorText={get(errors, 'address.zipcode.message')}
        />
      </Grid>
    </>
  );
};

export default SeniorAddressFields;
