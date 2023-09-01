/* eslint-disable max-len */
import React from 'react';

import {Box, Grid, Button} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useFieldArray} from 'react-hook-form';

import {CardWrapper} from 'common/sections/CardWrapper';

import {providerInfoStyle} from '../../ProviderInfo.style';
import {PharmacyFormData} from '../formData';

import {toTitleCase} from 'globals/global.functions';
import {RenderInputField} from './PharmacyInputFields';
import {IDeleteButtonProps, IPharmacyProps} from './Pharmacy.types';

const RenderRemoveButton = ({
  index,
  form,
  remove,
  setPharmacyDeletion,
  pharmacyDeletion,
  setIsUpdated,
  isUpdated,
}: IDeleteButtonProps) => {
  const {classes} = providerInfoStyle();

  return (
    <Box className={classes.appendButtonStyle}>
      <Button
        size='large'
        color='primary'
        variant='contained'
        data-testid = 'buttonDeletePharmacy'
        onClick={() => {
          remove(index);
          setIsUpdated(!isUpdated);
          if (form.provider_id) {
            setPharmacyDeletion([...pharmacyDeletion, form.provider_id]);
          }
        }}
        startIcon={<DeleteRoundedIcon />}
        className={classes.buttonStyle}>
        Delete Pharmacy
      </Button>
    </Box>
  );
};
const Pharmacy = ({
  errors,
  control,
  setValue,
  register,
  getValues,
  defaultValues,
  pharmacyDetails,
  pharmacyDeletion,
  setPharmacyDetails,
  setPharmacyDeletion,
}: IPharmacyProps) => {
  const {classes} = providerInfoStyle();
  const [isUpdated, setIsUpdated] = React.useState(false);
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'pharmacy',
  });

  //To get current values of form
  const currentValues = getValues().pharmacy;

  /**
   * @function disableAddActionButton
   * @description disable add phamacy button on adding 5 pharmacy
   */
  const disableAddActionButton = React.useMemo(() => {
    return fields.length >= 5;
  }, [fields]);

  React.useMemo(() => {
    setPharmacyDetails(fields);
  }, [isUpdated]);

  return (
    <>
      {fields?.map((form: any, index: number) => (
        <Box key={form.id}>
          <CardWrapper
            subTitle={`Pharmacy ${index + 1}`}
            fullDetails={{
              title: toTitleCase(
                currentValues && currentValues[index]?.name
                  ? currentValues[index]?.name
                  : '',
              ),
              contact:
                currentValues && currentValues[index]?.contact_phone
                  ? currentValues[index]?.contact_phone
                  : '',
              address: {
                street:
                  currentValues && currentValues[index]?.address?.street
                    ? currentValues[index]?.address?.street
                    : ' ',
                city:
                  currentValues && currentValues[index]?.address?.city
                    ? currentValues[index]?.address?.city
                    : '',
                state:
                  currentValues && currentValues[index]?.address?.state
                    ? currentValues[index]?.address?.state
                    : '',
              },
            }}>
            <Grid container spacing={3}>
              {PharmacyFormData.map((inputField) => (
                <Grid key={inputField.name} item xs={4}>
                  <RenderInputField
                    form={form}
                    index={index}
                    errors={errors}
                    control={control}
                    inputField={inputField}
                    setValue={setValue}
                    register={register}
                    getValues={getValues}
                    pharmacyDetails={pharmacyDetails}
                    setPharmacyDetails={setPharmacyDetails}
                  />
                </Grid>
              ))}
            </Grid>
            {fields.length > 1 && (
              <RenderRemoveButton
                form={form}
                index={index}
                remove={remove}
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
                pharmacyDeletion={pharmacyDeletion}
                setPharmacyDeletion={setPharmacyDeletion}
              />
            )}
          </CardWrapper>
          {fields.length - 1 === index && (
            <Box className={classes.buttonContainerStyle}>
              <Button
                size='large'
                color='primary'
                variant='contained'
                data-testid = 'buttonAddPharmacy'
                onClick={() => {
                  append(defaultValues);
                  setIsUpdated(!isUpdated);
                }}
                disabled={disableAddActionButton}
                startIcon={<AddCircleIcon />}
                className={classes.buttonStyle}>
                Add Pharmacy
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};

export {Pharmacy};
