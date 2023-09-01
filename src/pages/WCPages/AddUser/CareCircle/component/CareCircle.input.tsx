/* eslint-disable max-len */
import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {Controller} from 'react-hook-form';
import {Box, FormControlLabel, RadioGroup} from '@mui/material';

import ResendOTP from '../ResendOTP';
import {Fields} from 'common/Fields';
import {CaregiverType} from 'globals/enums';
import isValidZipcode from 'common/ZipcodeValidator';
import {InputCheckBox, InputRadio} from 'common/Input';
import {DATE_ERROR_MESSAGE} from 'globals/global.constants';

import {
  ICareCircleInputFieldsProps,
  ICareGiverData,
  ICheckBoxOption,
} from '../CareCircle.type';

export const RenderInputField = ({
  inputField,
  index,
  form,
  errors,
  control,
  watch,
  register,
  setError,
  getValues,
  emergencyContactCareGiverId,
  setEmergencyContactCareGiverId,
  setCareCircleRadioArray,
  careCircleRadioArray,
  careGiverInfo,
  caregiverList,
}: ICareCircleInputFieldsProps) => {
  const currentSeniorEmail = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.email,
  );

  let errorField: any = undefined;
  if (
    !inputField.checkbox &&
    errors.caregivers &&
    errors.caregivers[index] &&
    !inputField.emptyBox
  ) {
    errorField = errors.caregivers[index];
    const splitFields = inputField.name.split('.');
    splitFields.forEach((splitField: string) => {
      errorField = errorField ? errorField[`${splitField}`] : undefined;
    });
  }

  let defaultValue = form;
  if (!inputField.checkbox && !inputField.emptyBox) {
    const splitFields = inputField.name.split('.');
    splitFields.forEach((input: string) => {
      defaultValue = defaultValue[`${input}`] ? defaultValue[`${input}`] : '';
    });
  }

  /**
   * @function applyValidationRadio
   * @description to validate radio input
   * @param value
   * @param id
   * @returns
   */
  const applyValidationRadio = (value: any, id: string) => {
    let isDisable = false;
    if (value == CaregiverType.PRIMARY) {
      careCircleRadioArray.forEach((data: any) => {
        if (data.caregiverId === id && data.value === CaregiverType.PRIMARY) {
          isDisable = false;
        } else if (data.value === CaregiverType.PRIMARY) {
          isDisable = true;
        }
      });
    }
    return isDisable;
  };

  /**
   * @function handleCaregiverRadioOptionChanged
   * @description handle chhange event on radio input
   * @param event
   * @param index
   * @param id
   */
  const handleCaregiverRadioOptionChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const careGiverInfoArray = careCircleRadioArray.map((data: any) => {
      if (data.caregiverId === id) {
        return {
          ...data,
          value: event.target.value,
        };
      }
      return {...data};
    });
    setCareCircleRadioArray(careGiverInfoArray);
  };

  /**
   * @function isRadioOptionChecked
   * @description to check radio option is checked or not
   * @param id
   * @param value
   * @returns
   */
  const isRadioOptionChecked = (id: string, value: any) => {
    let isChecked = false;
    careCircleRadioArray.forEach((data: any) => {
      if (data.caregiverId === id && data.value === value) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  /**
   * @function handleDisableEmergencyContact
   * @description set emergency contact disable for all if any one caregiver selected as emergency contact
   * @param name
   * @param careGiverId
   * @returns
   */
  const handleDisableEmergencyContact = (name: string, careGiverId: string) => {
    if (name === 'emergency_contact') {
      return (
        emergencyContactCareGiverId &&
        emergencyContactCareGiverId !== careGiverId
      );
    }
    return false;
  };

  /**
   * @function handleEmergencyContactCheckbox
   * @description handle onchange event for emergency contact input
   * @param name
   * @param e
   * @param careGiverId
   * @returns
   */

  const handleEmergencyContactCheckbox = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>,
    careGiverId: string,
  ) => {
    if (name === 'emergency_contact') {
      setEmergencyContactCareGiverId(e.target.checked ? careGiverId : '');
      const newRadioArray = careCircleRadioArray.map((data: any) => {
        if (data.caregiverId === careGiverId) {
          return {
            ...data,
            emergencyContact: e.target.checked,
          };
        }
        return {...data};
      });
      setCareCircleRadioArray(newRadioArray);
    }
    if (name === 'is_living_with_senior') {
      const newRadioArray = careCircleRadioArray.map((data: any) => {
        if (data.caregiverId === careGiverId) {
          return {
            ...data,
            livingWithSenior: e.target.checked,
          };
        }
        return {...data};
      });
      setCareCircleRadioArray(newRadioArray);
    }
    if (name === 'has_power_of_attorney') {
      const newRadioArray = careCircleRadioArray.map((data: any) => {
        if (data.caregiverId === careGiverId) {
          return {
            ...data,
            powerOfAttorney: e.target.checked,
          };
        }
        return {...data};
      });
      setCareCircleRadioArray(newRadioArray);
    }
  };

  /**
   * @function handleCaregiverEmail
   * @discription to validate email Id
   * @param e
   * @param index
   * @param fieldName
   * @param caregiverData
   */
  const handleCaregiverEmail = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: string,
    caregiverData: ICareGiverData,
  ) => {
    const value = e.target.value;

    //check if current email match with current caregiverid email. Then do not display error.
    const isExistingCurrentEmail = careGiverInfo.some((item: any) => {
      return (
        caregiverData.caregiver_id === item.caregiver_id &&
        value === item.basic_info.email
      );
    });

    //check if email id already exist.
    const isExists = caregiverList.some((item: ICareGiverData, key: number) => {
      if (key !== index) {
        return item.basic_info.email.toLowerCase() === value.toLowerCase();
      }
    });

    const isMatchSeniorEmail =
      value.toLowerCase() === currentSeniorEmail.toLowerCase();

    if ((isExists && !isExistingCurrentEmail) || isMatchSeniorEmail) {
      setError(`caregivers[${index}].[${fieldName}]`, {
        type: 'manual',
        message: DATE_ERROR_MESSAGE.emailIdAlreadyExist,
      });
    }
  };

  /**
   * @function checkZip
   * @description validate zipcode
   * @param value
   * @param index
   * @param fieldName
   */
  const checkZip = (value: string, index: number, fieldName: string) => {
    if (!isValidZipcode(value.trim())) {
      setError(`caregivers[${index}].[${fieldName}]`, {
        type: 'manual',
        message: 'Invalid Zip code',
      });
    }
  };

  if (inputField.menu) {
    return (
      <Fields
        {...inputField}
        errorField={errorField ? errorField : null}
        name={`caregivers[${index}].[${inputField.name}]`}
        data-testid = {`caregivers[${index}].[${inputField.name}]`}
        control={control}
        defaultValue={defaultValue}
        errorText={errorField?.message}
        rules={inputField.validation}
      />
    );
  } else if (inputField.radio) {
    return (
      <Controller
        render={({props}: any) => (
          <RadioGroup {...props}>
            {inputField.options.map((option: ICheckBoxOption) => {
              return (
                <FormControlLabel
                  key={option.value}
                  control={
                    <InputRadio
                      disabled={applyValidationRadio(
                        option.value,
                        form.caregiver_id || form.id,
                      )}
                      checked={isRadioOptionChecked(
                        form.caregiver_id || form.id,
                        option.value,
                      )}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleCaregiverRadioOptionChanged(
                          event,
                          form.caregiver_id || form.id,
                        )
                      }
                      data-testid='careCircleRadioButton'
                    />
                  }
                  value={option.value}
                  label={option.label}
                />
              );
            })}
          </RadioGroup>
        )}
        defaultValue={careCircleRadioArray[index]?.value}
        control={control}
        name={`caregivers[${index}].[${inputField.name}]`}
      />
    );
  } else if (inputField.checkbox) {
    return (
      <Box>
        {inputField.options.map((option: any, i: number) => {
          const splitFields = option.name.split('.');
          let defaultChecked = defaultValue;
          splitFields.forEach((input: any) => {
            defaultChecked = defaultChecked[`${input}`]
              ? defaultChecked[`${input}`]
              : false;
          });
          return (
            <FormControlLabel
              key={option.label}
              control={
                <InputCheckBox
                  data-testid='careCirclecheckBox'
                  defaultChecked={defaultChecked}
                  disabled={handleDisableEmergencyContact(
                    splitFields[1],
                    form.caregiver_id || form.id,
                  )}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEmergencyContactCheckbox(
                      splitFields[1],
                      e,
                      form.caregiver_id || form.id,
                    )
                  }
                />
              }
              label={option.label}
              defaultValue={defaultChecked}
              name={`caregivers[${index}].[${option.name}]`}
              inputRef={register(`caregivers[${index}].[${option.name}]`)}
            />
          );
        })}
      </Box>
    );
  } else if (inputField.emptyBox) {
    return <></>;
  } else if (inputField.name === 'basic_info.email') {
    return (
      <React.Fragment>
        <Fields
          {...inputField}
          defaultValue={defaultValue}
          errorField={errorField ? errorField : null}
          errorText={errorField?.message}
          {...register(
            `caregivers[${index}].[${inputField.name}]`,
            inputField.validation,
          )}
          onBlur={(e: any) =>
            handleCaregiverEmail(e, index, inputField.name, form)
          }
        />
        <ResendOTP
          data={form}
          getValues={getValues}
          watch={watch}
          index={index}
          inputFieldInfo={inputField}
        />
      </React.Fragment>
    );
  } else if (inputField.name === 'basic_info.location.zipcode') {
    return (
      <React.Fragment>
        <Fields
          {...inputField}
          defaultValue={defaultValue}
          errorField={errorField ? errorField : null}
          errorText={errorField?.message}
          {...register(
            `caregivers[${index}].[${inputField.name}]`,
            inputField.validation,
          )}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            checkZip(e.target.value, index, inputField.name);
          }}
        />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Fields
          {...inputField}
          defaultValue={defaultValue}
          errorField={errorField ? errorField : null}
          name={`caregivers[${index}].[${inputField.name}]`}
          {...register(
            `caregivers[${index}].[${inputField.name}]`,
            inputField.validation,
          )}
          errorText={errorField?.message}
        />
      </React.Fragment>
    );
  }
};
