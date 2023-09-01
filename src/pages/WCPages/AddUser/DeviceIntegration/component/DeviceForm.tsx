import {Box, Button} from '@mui/material';
import clsx from 'clsx';
import {Fields} from 'common/Fields';
import {addUserStyle} from 'pages/WCPages/AddUser/AddUser.style';
import React from 'react';
import {useForm} from 'react-hook-form';
import {deviceIntegrationStyle} from '../DeviceIntegration.style';
import {deviceFormStyle} from './DeviceForm.style';

const DeviceForm = (props: any) => {
  const {
    name,
    label,
    placeHolder,
    required,
    validation,
    unitValue,
    onSumbit,
    defaultValue,
    disabled,
  } = props;
  const {classes: deviceFormClasses} = deviceFormStyle();
  const {classes} = deviceIntegrationStyle();
  const {classes: addUserClasses} = addUserStyle();

  const {
    register,
    formState: {errors},
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  React.useEffect(() => {
    setValue(name, props.defaultValue);
  }, [props.defaultValue, setValue, name]);

  const value = watch(name);

  const submitForm = () => {
    onSumbit(getValues(name));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Box className={deviceFormClasses.container} data-testid='device-form'>
        <Box className={deviceFormClasses.fieldContainer}>
          <Fields
            label={label}
            helperText={placeHolder}
            required={required}
            errorField={errors[name]}
            errorText={errors[name]?.message}
            unitValue={unitValue}
            defaultValue={defaultValue}
            disabled={disabled}
            {...register(name, validation)}
          />
        </Box>
        <Box className={deviceFormClasses.buttonWrapper}>
          <Button
            type='submit'
            size='small'
            color='primary'
            variant='contained'
            disabled={!value}
            className={clsx({
              [addUserClasses.addUserButton]: true,
              [classes.connectButton]: true,
            })}
            data-testid = 'buttonConnect'>
            Connect Device
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default DeviceForm;
