import React from 'react';

import {Box, Grid, Button} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useFieldArray} from 'react-hook-form';

import {Fields} from 'common/Fields';
import {CardWrapper} from 'common/sections/CardWrapper';

import {providerInfoStyle} from '../ProviderInfo.style';
import {DentistFormData} from './formData';
import {IDentistComponentProps, IParamsDetails} from '../ProviderInfo.types';

const Dentist = ({
  errors,
  control,
  register,
  setDentistDeletion,
  dentistDeletion,
  defaultValues,
}: IDentistComponentProps) => {
  const {classes} = providerInfoStyle();
  const [isUpdated, setIsupdated] = React.useState(false);

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'dentist',
  });

  const renderInputField = (inputField: any, form: any, index: number) => {
    let errorField: any = undefined;
    if (errors.dentist && errors.dentist[index]) {
      errorField = errors.dentist[index];
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
          rules={inputField.validation}
          errorField={errorField ? errorField : null}
          name={`dentist[${index}].[${inputField.name}]`}
          defaultValue={defaultValue}
          errorText={errorField?.message}
          control={control}
        />
      );
    } else {
      return (
        <Fields
          {...inputField}
          errorField={errorField ? errorField : null}
          errorText={errorField?.message}
          defaultValue={defaultValue}
          {...register(
            `dentist[${index}].[${inputField.name}]`,
            inputField.validation,
          )}
        />
      );
    }
  };

  const renderRemoveButton = (index: number, form: IParamsDetails) => {
    return (
      <Box className={classes.appendButtonStyle}>
        <Button
          size='large'
          color='primary'
          variant='contained'
          data-testid = 'buttonDeleteDentist'
          onClick={() => {
            remove(index);
            setIsupdated(!isUpdated);
            if (form.provider_id) {
              setDentistDeletion([...dentistDeletion, form.provider_id]);
            }
          }}
          startIcon={<DeleteRoundedIcon />}
          className={classes.buttonStyle}>
          Delete Dentist
        </Button>
      </Box>
    );
  };

  const disableAddActionButton = React.useMemo(() => {
    return fields.length >= 2;
  }, [fields]);

  return (
    <>
      {fields.map((form: any, index: number) => (
        <Box key={form.id}>
          <CardWrapper subTitle={`Dentist ${index + 1}`}>
            <Grid container spacing={3}>
              {DentistFormData.map((inputField) => (
                <Grid key={inputField.name} item xs={4}>
                  {renderInputField(inputField, form, index)}
                </Grid>
              ))}
            </Grid>
            {fields.length > 1 && renderRemoveButton(index, form)}
          </CardWrapper>
          {fields.length - 1 == index && (
            <Box className={classes.buttonContainerStyle}>
              <Button
                size='large'
                color='primary'
                variant='contained'
                data-testid = 'buttonAddDentist'
                onClick={() => {
                  append(defaultValues);
                  setIsupdated(!isUpdated);
                }}
                disabled={disableAddActionButton}
                startIcon={<AddCircleIcon />}
                className={classes.buttonStyle}>
                Add Dentist
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};

export {Dentist};
