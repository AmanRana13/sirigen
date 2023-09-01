import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, Grid, Typography} from '@mui/material';

import {Fields} from 'common/Fields';
import {CardWrapper} from 'common/sections/CardWrapper';
import {addUserStyle} from 'pages/WCPages/AddUser/AddUser.style';
import {openOverlayDialog, openDialog} from 'store/commonReducer/common.action';
import {
  DIALOG_TYPES,
  FORM_ERROR_MESSAGES,
  REGEX,
} from 'globals/global.constants';
import {
  maskMAC,
  convertLbsToKg,
  feetToCm,
  unmaskPhoneNumber,
  trimValues,
  maskPhoneNumber,
} from 'globals/global.functions';

import {
  saveDevicesDetail,
  deleteDevicesDetail,
  RESET_WATCH_DETAILS,
  GET_WATCH_DETAILS,
} from '../Devices.action';
import {deviceInstallationStyle} from '../DeviceInstallation.style';
import {DeviceType} from 'globals/enums';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import clsx from 'clsx';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {getDevicesInformationService} from 'services/deviceService/device.service';
import {useMutation} from 'utilities/react-query';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const formsData = [
  {
    name: 'device_install_date',
    label: 'Device Install Date',
    required: true,
    validation: {
      required: 'Required Field',
    },
    controlledDate: true,
    canDisable: true,
  },
  {
    name: 'vendor',
    label: 'Manufacturer/Vendor',
    required: true,
    disabled: true,
    validation: {
      required: 'Required Field',
    },
    helperText: 'select',
    canDisable: true,
    // menu: true,
    // menuItems: ['John', 'Bryson', 'Greek'],
  },
  {
    name: 'assigned_device_type',
    label: 'Assigned Device Type',
    required: true,
    disabled: true,
    validation: {
      required: 'Required Field',
    },
    helperText: 'select',
    canDisable: true,
    //menu: true,
    //menuItems: ['Navigil 580', 'Navigil 581', 'Navigil 582', 'Navigil 583'],
  },
  {
    name: 'model_number',
    label: 'Model Number#',
    validation: {
      required: 'Required Field',
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    required: true,
    canDisable: true,
  },
  {
    name: 'device_serial',
    label: 'Device Serial#',
    validation: {
      required: 'Required Field',
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    required: true,
    canDisable: true,
  },
  {
    name: 'mfg_date',
    label: 'Mfg. Date',
    required: true,
    validation: {
      required: 'Required Field',
    },
    controlledDate: true,
    canDisable: true,
  },
  {
    name: 'mac_address',
    label: 'MAC Address',
    required: true,
    validation: {
      required: 'Required Field',
      minLength: {
        value: 17,
        message: 'Incomplete MAC Address',
      },
    },
    helperText: 'xx:xx:xx:xx:xx:xx',
    canDisable: true,
  },
];
const watchExtraFields = [
  {
    name: 'model_number',
    label: 'Model Number#',
    validation: {
      required: 'Required Field',
      pattern: {
        value: REGEX.BLANK_FIELD,
        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
      },
    },
    required: true,
    canDisable: true,
  },
  {
    name: 'watch_phone_number',
    label: 'Watch Phone Number',
    required: true,
    disabled: true,
    masked: true,
    validation: {
      required: 'Required Field',
      minLength: {
        value: 14,
        message: '10 digits required',
      },
    },
    helperText: '(xxx) xxx-xxxx',
    canDisable: true,
  },
];

const DeviceDetails = ({deviceDetail, infoMsg}: any) => {
  const {classes} = deviceInstallationStyle();
  const {classes: addUserClasses} = addUserStyle();
  const dispatch: any = useAppDispatch();

  const {height, weight} = useAppSelector(
    (state: any) => state?.common?.seniorDetail?.basicInfo,
  );
  const {address} = useAppSelector(
    (state: any) => state?.common?.seniorDetail?.minimalInfo,
  );
  const {watchPhoneNumber, watchModelNumber} = useAppSelector(
    (state: any) => state?.devices,
  );
  const [watchDetailsError, setWatchDetailsError] = useState(false);

  const {deviceName, type, defaultValue} = deviceDetail;

  const {
    register,
    control,
    formState: {errors},
    handleSubmit,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValue,
  });

  const [disableForm, setDisableForm] = React.useState(false);

  useEffect(() => {
    if (['scale', 'sleep', 'watch'].includes(type)) {
      setDisableForm(deviceDetail.defaultValue.device_serial);
    }
  }, [deviceDetail]);

  const isDelete = React.useMemo(() => {
    return disableForm && ['scale', 'sleep', 'watch'].includes(type);
  }, [disableForm]);

  const clearValuesHandler = () => {
    reset(defaultValue);
    setValue('mac_address', '');
    if (type === DeviceType.WATCH) {
      clearErrors();
      setWatchDetailsError(false);
      dispatch({
        type: RESET_WATCH_DETAILS,
      });
    }
  };

  const onSubmit = (data: any) => {
    data.device_type = type;
    data.vendor = defaultValue.vendor;
    data.assigned_device_type = defaultValue.assigned_device_type;
    data.device_id = defaultValue.device_id || null;
    const heightInMeter = feetToCm(height.feet, height.inch);

    if (type === DeviceType.WATCH) {
      data.model_number = watchModelNumber;
      data.mfg_date = null;
    }

    //check for watch phone number and unmask number
    if (data.watch_phone_number || watchPhoneNumber) {
      data.watch_phone_number = unmaskPhoneNumber(
        data.watch_phone_number || watchPhoneNumber,
      );
    }

    if (!heightInMeter && ['scale', 'sleep'].includes(type)) {
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.ERROR2,
          firstMessage: `Height is required in Profile Info screen`,
          secondMessage: `Please add them before saving the device`,
        }),
      );
    } else {
      const weightInKg = convertLbsToKg(weight);
      const timezone = address.timezone;
      const trimmedData = trimValues(data);

      dispatch(
        saveDevicesDetail(
          trimmedData,
          heightInMeter,
          weightInKg,
          timezone,
          type,
        ),
      );
    }
  };

  const onDelete = (data: any) => {
    const deviceNameInLowercase = deviceName.toLowerCase();

    const payload = {
      device_id: defaultValue.device_id,
    };
    const openDialogProp = {
      boldMessage: `Are you sure you want to delete the device?`,
      secondMessage: `This operation will unlink the ${deviceNameInLowercase} for the senior`,
      successButtonText: 'Submit',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        dispatch(deleteDevicesDetail(payload, deviceName));
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const getDisable = (item: any) => {
    if ('disabled' in item) {
      return item.disabled;
    } else if (item.canDisable) {
      return disableForm;
    }
  };

  const handleChange = (e: any) => {
    const mac = maskMAC(e.target.value.replaceAll(':', ''));
    setValue('mac_address', mac);
  };

  // Mutation Object for to fetch watch data
  const watchDataMutation = useMutation({
    mutationFn: (deviceSerial: any) => {
      const param = {
        serialNumber: deviceSerial,
      };
      dispatch(showApplicationLoader());
      return getDevicesInformationService(param);
    },
    retry: 2,
    onSuccess: (res: any) => {
      res = res.data;
      dispatch(hideApplicationLoader());
      dispatch({
        type: GET_WATCH_DETAILS,
        payload: {
          watchPhoneNumber: res.phoneNumber.substr(1),
          watchModelNumber: res.deviceType,
        },
      });

      if (!res.phoneNumber.substr(1) && !res.deviceType) {
        setWatchDetailsError(true);
      } else {
        setWatchDetailsError(false);
      }
    },
    onError: () => {
      dispatch(hideApplicationLoader());
      dispatch({
        type: RESET_WATCH_DETAILS,
      });
      setWatchDetailsError(true);
    },
  });

  /**
   * @description method to fetch phone number and model number based on device serial
   * @function getWatchPhoneNoAndModelNo
   * @returns void
   */
  const getWatchPhoneNoAndModelNo = (deviceSerial: any) => {
    //stopping API calling when deviceSerial field is empty
    if (deviceSerial) {
      watchDataMutation.mutate(deviceSerial);
      clearErrors(['model_number', 'watch_phone_number']);
    } else {
      setWatchDetailsError(false);
    }
  };

  const watchAutoFetchDetails = React.useCallback(
    (field: any) => {
      if (type === DeviceType.WATCH) {
        switch (field.name) {
          case 'watch_phone_number':
            return maskPhoneNumber(defaultValue.watch_phone_number);
          case 'model_number':
            return defaultValue.model_number;
          default:
            return field.value;
        }
      }
      return field.value;
    },
    [defaultValue.model_number, defaultValue.watch_phone_number, type],
  );

  React.useEffect(() => {
    if (watchModelNumber) {
      setValue('model_number', watchModelNumber);
    }
    if (watchPhoneNumber) {
      setValue('watch_phone_number', maskPhoneNumber(watchPhoneNumber));
    }
  }, [watchModelNumber, watchPhoneNumber, setValue]);

  React.useEffect(() => {
    if (defaultValue.watch_phone_number) {
      setValue(
        'watch_phone_number',
        maskPhoneNumber(defaultValue.watch_phone_number),
      );
    }
  }, [defaultValue.watch_phone_number, setValue]);

  const renderInputField = (inputField: any) => {
    if (inputField.menu || inputField.date || inputField.controlledDate) {
      return (
        <Fields
          {...inputField}
          errorField={errors[inputField.name]}
          errorText={errors[inputField.name]?.message}
          defaultValue={defaultValue[inputField.name]}
          rules={inputField.validation}
          name={inputField.name}
          control={control}
          disabled={getDisable(inputField)}
        />
      );
    } else if (inputField.name === 'mac_address') {
      return (
        <Fields
          {...inputField}
          errorField={errors[inputField.name]}
          defaultValue={defaultValue[inputField.name]}
          errorText={errors[inputField.name]?.message}
          {...register(inputField.name, inputField.validation)}
          onChange={(e: any) => handleChange(e)}
          value={watchAutoFetchDetails(inputField)}
          disabled={getDisable(inputField)}
        />
      );
    } else {
      return (
        <Fields
          {...inputField}
          errorField={errors[inputField.name]}
          defaultValue={defaultValue[inputField.name]}
          errorText={errors[inputField.name]?.message}
          {...register(inputField.name, inputField.validation)}
          onBlur={(e: any) => {
            inputField.name == 'device_serial' &&
              type === DeviceType.WATCH &&
              getWatchPhoneNoAndModelNo(e.target.value);
          }}
          disabled={
            inputField.name === 'watch_phone_number' ||
            (type === DeviceType.WATCH && inputField.name === 'model_number')
              ? true
              : getDisable(inputField)
          }
        />
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(isDelete ? onDelete : onSubmit)}
      data-testid='device-details'>
      <CardWrapper subTitle={deviceName} infoMsg={infoMsg}>
        <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
          {formsData.map((input) => {
            if (
              ['mfg_date', 'mac_address', 'model_number'].includes(
                input.name,
              ) &&
              type === DeviceType.WATCH
            ) {
              return null;
            }

            return (
              <Box key={input.name} width={290} style={{marginBottom: 24}}>
                {renderInputField(input)}
              </Box>
            );
          })}
          {type === DeviceType.WATCH && (
            <>
              <Box
                display='flex'
                flexWrap='wrap'
                justifyContent='space-between'
                flex={1}
                className={clsx(classes.errorBox, {
                  [classes.errorBorder]: watchDetailsError,
                })}
                style={{position: 'relative'}}>
                {watchExtraFields.map((input) => {
                  return (
                    <Box key={input.name} width={290}>
                      {renderInputField(input)}
                    </Box>
                  );
                })}
                {watchDetailsError && (
                  <Box display='flex' className={classes.errorMessage}>
                    <InfoOutlinedIcon className={classes.infoIcon} />
                    <Typography
                      variant='subtitle1'
                      style={{
                        color: '#c00',
                      }}>
                      Model Number and Watch Phone# details could not be
                      fetched. Please Try Again later
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          )}
          <Box className={classes.buttonContainerStyle}>
            <Button
              type='submit'
              size='large'
              color='primary'
              variant='contained'
              data-testid = 'buttonDeleteOrSave'
              onClick={() => !isDelete && setWatchDetailsError(false)}
              className={addUserClasses.addUserButton}>
              {isDelete ? 'Unlink' : 'Link'}
            </Button>
            <Button
              disabled={defaultValue.device_id}
              type='button'
              size='large'
              variant='outlined'
              data-testid = 'buttonClear'
              onClick={clearValuesHandler}
              className={classes.cancelButtonStyle}>
              Clear
            </Button>
          </Box>
        </Box>
      </CardWrapper>
    </form>
  );
};

export default DeviceDetails;
