import React from 'react';
import {Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {CardWrapper} from 'common/sections/CardWrapper';

import {Fields} from 'common/Fields';
import HistoryFieldArray from './HistoryFieldArray.component';

import {historyFormData} from './formData';

const MedicalHistory = ({control, register, errors, watch, setValue}: any) => {
  const {fields} = useFieldArray({
    control,
    name: 'history',
  });

  const renderFields = (data: any, index: any, key: any) => {
    // get onchange value of senior have pacemaker
    const isPaceMaker = watch('history[0].[pacemaker_user]');
    let value = key[`${data.name}`] || '';

    let errorField: any = undefined;
    if (errors.history && errors.history[index]) {
      errorField = errors.history[index];
      errorField = errorField ? errorField[`${data.name}`] : undefined;
    }

    if (data.name === 'pacemaker_implementation_date') {
      if (isPaceMaker === 'No') {
        data.disabled = true;
        data.required = false;
        data.validation = {required: ''};
        setValue('history[0].[pacemaker_implementation_date]', '');
      } else {
        data.disabled = false;
        data.required = true;
        data.validation = {
          required: 'Required Field',
        };
      }
    }
    if (data.blank) {
      return <Grid key={data.name} item xs={4}></Grid>;
    } else if (data.section) {
      return (
        <HistoryFieldArray
          nestIndex={index}
          section={data.type}
          item={key[`${data.type}`]}
          formData={data.formData}
          errors={errors}
          {...{control, register}}
        />
      );
    } else if (data.menu || data.date) {
      return (
        <Fields
          {...data}
          defaultValue={value}
          name={`history[${index}].[${data.name}]`}
          control={control}
          errorText={errorField?.message}
          rules={data.validation}
        />
      );
    } else {
      return (
        <Fields
          {...data}
          defaultValue={value}
          name={`history[${index}].[${data.name}]`}
          errorText={errorField?.message}
          {...register(`history[${index}].[${data.name}]`, data.validation)}
        />
      );
    }
  };

  return (
    <CardWrapper subTitle='Medical History'>
      <Grid container spacing={3}>
        {fields.map((key, index) =>
          historyFormData.map((option: any) => {
            if (option.section) {
              return renderFields(option, index, key);
            } else {
              return (
                <Grid key={option.name} item xs={4}>
                  {renderFields(option, index, key)}
                </Grid>
              );
            }
          }),
        )}
      </Grid>
    </CardWrapper>
  );
};

export {MedicalHistory};
