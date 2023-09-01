/* eslint-disable max-len */
import React from 'react';
import {Box, FormControlLabel} from '@mui/material';

import {Fields} from 'common/Fields';
import {InputCheckBox} from 'common/Input';
import {IPharmacyDetails, IRenderInputFieldsProps} from './Pharmacy.types';

export const RenderInputField = ({
  inputField,
  form,
  index,
  errors,
  pharmacyDetails,
  register,
  control,
  setValue,
  setPharmacyDetails,
}: IRenderInputFieldsProps) => {
  let errorField: any = undefined;
  if (errors.pharmacy && errors.pharmacy[index]) {
    errorField = errors.pharmacy[index];
    const splitFieldsData = inputField?.name?.split('.');
    splitFieldsData.forEach((input: any) => {
      errorField = errorField ? errorField[`${input}`] : undefined;
    });
  }
  let defaultValue: any = form;
  const splitFields = inputField.name.split('.');
  if (splitFields[0]?.includes('address')) {
    defaultValue = defaultValue['address'][`${splitFields[1]}`] || '';
  } else {
    defaultValue = defaultValue[`${splitFields[0]}`] || '';
  }

  /**
   * @function isPrimaryPharmacyChecked
   * @description to check checkbox is checked or not
   * @param id
   * @returns
   */
  const isPrimaryPharmacyChecked: any = React.useCallback(
    (id: string): boolean => {
      let isChecked = false;

      pharmacyDetails.forEach((data: IPharmacyDetails) => {
        if (data.provider_id === id || data.id === id) {
          isChecked = data.is_primary;
        }
      });
      return isChecked;
    },
    [pharmacyDetails],
  );

  /**
   * @function addressOnChangeHandler
   * @description autoUpdate the address based on zipcode and street
   * @param selectedLocation
   */
  const addressOnChangeHandler = (selectedLocation: any) => {
    if (selectedLocation.streetAddress !== ' ') {
      setValue(
        `pharmacy[${index}].[address.street]`,
        selectedLocation.streetAddress,
      );
    }
    setValue(`pharmacy[${index}].[address.state]`, selectedLocation.state);
    setValue(`pharmacy[${index}].[address.city]`, selectedLocation.city);
    setValue(`pharmacy[${index}].[address.zip]`, selectedLocation.zipCode);
  };

  /**
   * @function handleChange
   * @description to update pharmacyDetails state with the latest form values
   * @param value
   * @param name
   * @param form
   */
  const handleChange = (value: any, name: string, form: IPharmacyDetails) => {
    const pharmacyData: IPharmacyDetails[] = pharmacyDetails;
    const updatedPharmacyData = pharmacyData.map((data: IPharmacyDetails) => {
      if (data.id === form.id || data.provider_id === form.provider_id) {
        return {
          ...data,
          [name]: value,
        };
      } else {
        return {...data};
      }
    });

    setPharmacyDetails(updatedPharmacyData);
  };

  /**
   * @function handleDisablePrimaryPharmacy
   * @description set primaryPharmacy disable for all if any one pharmacy selected as primaryPharmacy
   * @param {string} id
   * @returns
   */
  const handleDisablePrimaryPharmacy = (id: string) => {
    const is_primary = pharmacyDetails?.find(
      (item: IPharmacyDetails) => item.is_primary === true,
    );
    return is_primary && is_primary.id !== id && is_primary.provider_id !== id;
  };

  if (inputField.menu) {
    return (
      <Fields
        {...inputField}
        control={control}
        rules={inputField.validation}
        defaultValue={defaultValue}
        errorText={errorField?.message}
        errorField={errorField ? errorField : null}
        name={`pharmacy[${index}].[${inputField.name}]`}
      />
    );
  } else if (inputField.checkbox) {
    return (
      <Box>
        {inputField.options.map((option: any) => {
          return (
            <FormControlLabel
              key={option.label}
              control={
                <InputCheckBox
                  data-testid = 'pharmacyCheckbox'
                  disabled={handleDisablePrimaryPharmacy(
                    form.provider_id || form.id,
                  )}
                  checked={isPrimaryPharmacyChecked(
                    form.provider_id || form.id,
                  )}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.target.checked, inputField.name, form)
                  }
                />
              }
              label={option.label}
              name={`pharmacy[${index}].[${option.name}]`}
              {...register(`pharmacy[${index}].[${option.name}]`)}
            />
          );
        })}
      </Box>
    );
  } else if (inputField.isAutoComplete) {
    return (
      <Fields
        {...inputField}
        register={{
          ...register(
            `pharmacy[${index}].[${inputField.name}]`,
            inputField.validation,
          ),
        }}
        isAutoComplete={true}
        fieldName={inputField.name}
        defaultValue={defaultValue}
        errorText={errorField?.message}
        errorField={errorField ? errorField : null}
        addressOnChangeHandler={addressOnChangeHandler}
        {...register(
          `pharmacy[${index}].[${inputField.name}]`,
          inputField.validation,
        )}
      />
    );
  } else {
    return (
      <Fields
        {...inputField}
        defaultValue={defaultValue}
        errorText={errorField?.message}
        name={`pharmacy[${index}].[${inputField.name}]`}
        errorField={errorField ? errorField : null}
        {...register(
          `pharmacy[${index}].[${inputField.name}]`,
          inputField.validation,
        )}
      />
    );
  }
};
