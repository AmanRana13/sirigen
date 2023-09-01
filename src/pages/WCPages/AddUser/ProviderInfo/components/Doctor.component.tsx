import React from 'react';

import {Box, Grid, Button, FormControlLabel} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useFieldArray} from 'react-hook-form';

import {Fields} from 'common/Fields';
import {CardWrapper} from 'common/sections/CardWrapper';

import {providerInfoStyle} from '../ProviderInfo.style';
import {DoctorFormData} from './formData';
import {IDoctorComponentProps, IDoctorDetails} from '../ProviderInfo.types';
import {InputCheckBox} from 'common/Input';

const Doctor = ({
  errors,
  control,
  register,
  doctorDeletion,
  setDoctorDeletion,
  defaultValues,
  doctorDetails,
  setDoctorDetails,
}: IDoctorComponentProps) => {
  const {classes} = providerInfoStyle();
  const [isUpdated, setIsUpdated] = React.useState(false);

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'doctor',
  });

  const handleDisablePrimaryDoctor = React.useCallback(
    (id: string) => {
      const is_primary = doctorDetails?.find(
        (item: IDoctorDetails) => item.is_primary === true,
      );
      return (
        is_primary && is_primary.id !== id && is_primary.provider_id !== id
      );
    },
    [doctorDetails],
  );

  const isPrimaryDoctorChecked: any = React.useCallback(
    (id: string): boolean => {
      let isChecked = false;
      doctorDetails.forEach((data: IDoctorDetails) => {
        if (data.provider_id === id || data.id === id) {
          isChecked = data.is_primary;
        }
      });
      return isChecked;
    },
    [doctorDetails],
  );

  const handleChange = (value: any, name: string, form: IDoctorDetails) => {
    const doctorData = doctorDetails;
    const updatedDoctorData = doctorData.map((data) => {
      if (data.id === form.id) {
        return {
          ...data,
          [name]: value,
        };
      } else {
        return {...data};
      }
    });
    setDoctorDetails(updatedDoctorData);
  };

  const renderInputField = (inputField: any, form: any, index: number) => {
    let errorField: any = undefined;
    if (errors.doctor && errors.doctor[index]) {
      errorField = errors.doctor[index];
      const splitFieldsData = inputField.name.split('.');
      splitFieldsData.forEach((input: any) => {
        errorField = errorField ? errorField[`${input}`] : undefined;
      });
    }
    let defaultValue = form;
    const splitFields = inputField.name.split('.');
    splitFields.forEach((input: any) => {
      defaultValue = defaultValue[`${input}`] ? defaultValue[`${input}`] : '';
    });
    if (inputField.menu) {
      return (
        <Fields
          {...inputField}
          errorField={errorField ? errorField : null}
          name={`doctor[${index}].[${inputField.name}]`}
          control={control}
          defaultValue={defaultValue}
          errorText={errorField?.message}
        />
      );
    }
    if (inputField.checkbox) {
      return (
        <Box>
          {inputField.options.map((option: any) => {
            return (
              <FormControlLabel
                key={option.label}
                control={
                  <InputCheckBox
                    data-testid = {`${option.label.replaceAll(' ','')}`}
                    disabled={handleDisablePrimaryDoctor(
                      form.provider_id || form.id,
                    )}
                    checked={isPrimaryDoctorChecked(
                      form.provider_id || form.id,
                    )}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.checked, inputField.name, form)
                    }
                  />
                }
                label={option.label}
                name={`doctor[${index}].[${option.name}]`}
                {...register(`doctor[${index}].[${option.name}]`)}
              />
            );
          })}
        </Box>
      );
    } else {
      return (
        <Fields
          {...inputField}
          defaultValue={defaultValue}
          errorField={errorField ? errorField : null}
          errorText={errorField?.message}
          {...register(
            `doctor[${index}].[${inputField.name}]`,
            inputField.validation,
          )}
        />
      );
    }
  };

  const disableAddActionButton = React.useMemo(() => {
    return fields.length >= 5;
  }, [fields]);

  React.useMemo(() => {
    setDoctorDetails(fields);
  }, [isUpdated]);

  return (
    <>
      {fields.map((form: any, index: number) => (
        <Box key={form.id}>
          <CardWrapper subTitle={`Doctor ${index + 1}`}>
            <Grid container spacing={3}>
              {DoctorFormData.map((inputField) => (
                <Grid key={inputField.name} item xs={4}>
                  {renderInputField(inputField, form, index)}
                </Grid>
              ))}
            </Grid>
            {fields.length > 1 && (
              <Box className={classes.appendButtonStyle}>
                <Button
                  size='large'
                  color='primary'
                  variant='contained'
                  data-testid = 'deleteDoctor'
                  onClick={() => {
                    remove(index);
                    setIsUpdated(!isUpdated);
                    if (form.provider_id) {
                      setDoctorDeletion([...doctorDeletion, form.provider_id]);
                    }
                  }}
                  startIcon={<DeleteRoundedIcon />}
                  className={classes.buttonStyle}>
                  Delete Doctor
                </Button>
              </Box>
            )}
          </CardWrapper>
          {fields.length - 1 == index && (
            <Box className={classes.buttonContainerStyle}>
              <Button
                size='large'
                color='primary'
                variant='contained'
                data-testid = 'buttonAddDoctor'
                onClick={() => {
                  append(defaultValues);
                  setIsUpdated(!isUpdated);
                }}
                disabled={disableAddActionButton}
                startIcon={<AddCircleIcon />}
                className={classes.buttonStyle}>
                Add Doctor
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};

export {Doctor};
