import {Grid, Box, Button} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useFieldArray} from 'react-hook-form';

import {CardWrapper} from 'common/sections/CardWrapper';
import {Fields} from 'common/Fields';
import {medicalInfoStyle} from '../MedicalInfo.style';
import PrescriptionFieldArray from './PrescriptionFieldArray.component';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {prescriptionForm, defaultPrescriptionValue} from './formData';
import React from 'react';

const MedicalPrescription = ({
  control,
  register,
  errors,
  watch,
  setValue,
  getValues,
  deletePrescription,
}: any) => {
  const {classes} = medicalInfoStyle();
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'prescription',
  });

  const renderAddButton = () => {
    return (
      <Box className={classes.medicalInfoButtonContainer}>
        <Button
          size='large'
          color='primary'
          variant='contained'
          onClick={() => {
            append(defaultPrescriptionValue);
          }}
          startIcon={<AddCircleIcon />}
          className={classes.buttonStyle2}>
          Add Prescription
        </Button>
      </Box>
    );
  };

  const renderRemoveButton = (index: any, form: any) => {
    return (
      <Box className={classes.appendButtonStyle}>
        <Button
          size='large'
          key={form.id}
          color='primary'
          variant='contained'
          onClick={() => {
            !!form.medication_id && deletePrescription(form.medication_id);
            remove(index);
          }}
          startIcon={<DeleteRoundedIcon />}
          className={classes.buttonStyle2}>
          Delete Prescription
        </Button>
      </Box>
    );
  };
  const handleChangeFrequency = (e: any, index: any) => {
    let timeArray = {};
    for (let i = 1; i <= e.target.value; i++) {
      timeArray = {
        ...timeArray,
        [`time${i}`]: '',
      };
    }
    const medicationschedule = getValues()?.prescription[
      index
    ]?.medication_schedule?.map((item: any, i: any) => {
      return {
        ...timeArray,
        day: item.day || '',
      };
    });
    if (medicationschedule) {
      setValue(`prescription[${index}].[medication_schedule]`, [
        ...medicationschedule,
      ]);
    }
  };
  return (
    <>
      {fields.map((form: any, index) => (
        <CardWrapper key={form.id} subTitle='Medical Prescription Info'>
          <Grid container spacing={3}>
            {prescriptionForm.map((data: any, i) => {
              if (data.section) {
                return (
                  <PrescriptionFieldArray
                    key={`FieldArray${data.name}`}
                    nestIndex={index}
                    section='medication_schedule'
                    item={form.medication_schedule}
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                  />
                );
              } else {
                let errorField: any = undefined;
                if (errors.prescription && errors.prescription[index]) {
                  errorField = errors.prescription[index];
                  const splitFields = data.name.split('.');
                  splitFields.forEach((input: any) => {
                    errorField = errorField
                      ? errorField[`${input}`]
                      : undefined;
                  });
                }
                const inputRegister: any = register(
                  `prescription[${index}].[${data.name}]`,
                  data.validation,
                );
                return (
                  <Grid key={data.name} item xs={4}>
                    {data.menu || data.date ? (
                      <Fields
                        {...data}
                        defaultValue={form[`${data.name}`]}
                        name={`prescription[${index}].[${data.name}]`}
                        control={control}
                        errorText={errorField?.message}
                        rules={data.validation}
                      />
                    ) : (
                      <Fields
                        {...data}
                        defaultValue={form[`${data.name}`]}
                        errorText={errorField?.message}
                        {...inputRegister}
                        onChange={(e: any) => {
                          if (data.name === 'frequency') {
                            inputRegister.onChange(e);
                            handleChangeFrequency(e, index);
                          } else {
                            inputRegister.onChange(e);
                          }
                        }}
                      />
                    )}
                  </Grid>
                );
              }
            })}
          </Grid>
          {fields.length > 1 && renderRemoveButton(index, form)}
        </CardWrapper>
      ))}
      {renderAddButton()}
    </>
  );
};

export {MedicalPrescription};
