/* eslint-disable max-len */
import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';

import {useForm, getFormFields} from 'hooks';
import {InputFields} from 'common/InputFields';
import globalUseStyles from 'config/global.styles';
import isValidZipcode from 'common/ZipcodeValidator';
import {
  closeDialog,
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';

import {fieldsStyle} from 'common/InputFields/InputFields.style';

import {facilityDialogformFields} from './facilityDialogFormFields';
import {IFormFieldsValue} from 'pages/WCPages/Admin/formField.types';
import DialogWrapper from '../../DialogWrapper';
import clsx from 'clsx';
import {facilityDialogStyle} from './FacilityDialog.style';
import {useMutation} from 'utilities/react-query';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {
  postFacilityService,
  validateDuplicateValuesService,
} from 'services/coporateAndFacilitiesService/FacilityManagementService/facilitymanagement.service';
import {
  DIALOG_TYPES,
  PAGINATION_LIMIT,
  US_STATES_WITH_VALUE,
} from 'globals/global.constants';
import {
  getFacilityList,
  getFacilityListFail,
  getFacilityListSuccess,
} from 'pages/WCPages/Admin/CorporateAndFacilities/FacilityManagement/FacilityManagement.action';
import {unmaskPhoneNumber} from 'globals/global.functions';
import {
  IFacilityPayload,
  IFacilityValidateField,
  IFacilityValidatePayload,
} from './FacilityDialog.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

/**
 * @description Component in which admin can add a new facility.
 * @returns {JSX} A form with different fields.
 */
const FacilityDialog = (props: any) => {
  const {classes} = facilityDialogStyle();
  const {classes: fieldClasses} = fieldsStyle();
  const {classes: globalClasses} = globalUseStyles();
  const [isNameExist, SetisNameExist] = useState({
    facility_name: false,
  });
  const {
    dialogTitle,
    data: editValues,
    id: corporateID,
  } = useAppSelector((state: any) => state.common.dialog);

  const dispatch: any = useAppDispatch();
  const {validationData, formData, initialValues} = getFormFields(
    facilityDialogformFields,
  );

  React.useEffect(() => {
    if (isNameExist.facility_name) {
      setCustomError('facilityName', 'Facility Name already exists');
    }
  }, [isNameExist.facility_name]);

  // Mutation Object for submit Service
  const submitMutation = useMutation({
    mutationFn: (data: IFacilityPayload): Promise<any> => {
      dispatch(showApplicationLoader());
      return postFacilityService(data);
    },
    onSuccess: (data: any) => {
      dispatch(closeDialog());
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `${data.facility_name} facility is ${
            dialogTitle === 'Edit Facility' ? 'updated' : 'created'
          } successfully`,
        }),
      );
      dispatch(
        getPaginationDataIsolated(
          () => getFacilityList('', corporateID),
          PAGINATION_LIMIT.corporateAndFacilities,
          '',
          1,
          getFacilityListSuccess,
          getFacilityListFail,
          [],
          '',
          '',
        ),
      );
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  const verifiedDuplicateMutation = useMutation({
    mutationFn: (data: IFacilityValidatePayload): Promise<any> => {
      dispatch(showApplicationLoader());
      return validateDuplicateValuesService(data);
    },
    onSuccess: (data: IFacilityValidateField) => {
      const keyName: string = Object.keys(data)[0];
      dispatch(hideApplicationLoader());
      SetisNameExist({
        ...isNameExist,
        [keyName]: data[keyName],
      });
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  const {
    handleSubmit,
    handleChange,
    setData,
    data: facility,
    errors,
    setCustomError,
  }: any = useForm({
    validations: {
      ...validationData,
    },
    onSubmit: (data: any) => {
      const payload: IFacilityPayload = {
        facility_name: data.facilityName,
        facility_phone: unmaskPhoneNumber(data.facilityPhoneNumber),
        facility_address: {
          city: data.facilityCityState,
          state: data.facilityState,
          street: data.facilityStreetAddress,
          zipcode: data.facilityZipcode,
        },
        state_code: data.facilityState,
        corporate_id: corporateID,
        facility_id: null,
      };
      if (editValues) {
        payload.facility_id = editValues.id;
      }
      submitMutation.mutate(payload);
    },
    initialValues: editValues
      ? {
          facilityName: editValues.facilityName,
          facilityPhoneNumber: editValues.phone,
          facilityCode: editValues.facilityCode,
          facilityStreetAddress: editValues.facilityAddress?.street,
          facilityCityState: editValues.facilityAddress?.city,
          facilityState: editValues.facilityAddress?.state,
          facilityZipcode: editValues.facilityAddress?.zipcode,
          facilityStateCode: editValues.facilityAddress?.stateCode,
        }
      : initialValues,
  });

  /**
   * @function handleOnBlur
   * @description validate facility details.
   * @param {string} name
   */

  const handleOnBlur = (name: string) => {
    verifiedDuplicateMutation.mutate({
      facility_name: facility[name],
      corporate_id: corporateID,
    });
  };

  return (
    <DialogWrapper title={dialogTitle} data-testid='facility-dialog'>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        {formData.map((data: IFormFieldsValue) => (
          <>
            <Box
              key={data.label}
              className={classes.container}
              mb={
                data.inputProps.name === 'facilityCityState' ||
                (data.inputProps.name === 'facilityCode' &&
                  dialogTitle === 'Add Facility')
                  ? 0
                  : 2
              }>
              <Box display='flex' justifyContent='center' alignItems='center'>
                {dialogTitle === 'Add Facility' &&
                  data.inputProps.name !== 'facilityCode' && (
                    <Typography
                      variant='subtitle2'
                      className={clsx({
                        [classes.errorText]: errors.hasOwnProperty(
                          data.inputProps.name,
                        ),
                      })}>
                      {data.label}
                      <Box component='span' className={classes.errorText}>
                        {data.inputProps.required && '*'}
                      </Box>
                    </Typography>
                  )}
                {dialogTitle === 'Edit Facility' && (
                  <Typography
                    variant='subtitle2'
                    className={clsx({
                      [classes.errorText]: errors.hasOwnProperty(
                        data.inputProps.name,
                      ),
                    })}>
                    {data.label}
                    <Box component='span' className={classes.errorText}>
                      {data.inputProps.required && '*'}
                    </Box>
                  </Typography>
                )}
              </Box>
              <Box width={301} display='flex'>
                <Box width='100%'>
                  {data.inputProps.name === 'facilityCode' &&
                  dialogTitle === 'Edit Facility' ? (
                    <Typography style={{fontSize: 16}}>
                      {facility['facilityCode']}
                    </Typography>
                  ) : (
                    <RenderInputFields
                      data={data}
                      setData={setData}
                      facility={facility}
                      errors={errors}
                      handleChange={handleChange}
                      editValues={editValues}
                      setCustomError={setCustomError}
                      handleOnBlur={handleOnBlur}
                    />
                  )}
                  {data.inputProps.name === 'facilityZipcode' &&
                    isValidZipcode(facility[data.inputProps.name]) && (
                      <Box
                        display='flex'
                        justifyContent='flex-end'
                        height={10}>{`${facility['city'] || ''}${
                        facility['city'] && facility['state'] ? ', ' : ''
                      }${facility['state'] || ''}`}</Box>
                    )}
                </Box>
                {data.inputProps.name === 'facilityCityState' && (
                  <Box ml={1} minWidth={122}>
                    <InputFields
                      menu={true}
                      menuItems={US_STATES_WITH_VALUE}
                      initialValue=''
                      isError={errors['facilityState']}
                      inputProps={{
                        name: 'facilityState',
                        placeholder: 'Enter State',
                      }}
                      errorText={
                        data.inputProps.name === 'facilityCityState'
                          ? ''
                          : errors[data.inputProps.name]
                      }
                      eventProps={{
                        onChange: handleChange('facilityState'),
                        value: facility['facilityState'] || '',
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            {data.inputProps.name === 'facilityCityState' && (
              <Box mb={2}>
                <Typography
                  variant='subtitle1'
                  className={fieldClasses.errorText}>
                  {errors['facilityCityState']}
                </Typography>
                <Typography
                  variant='subtitle1'
                  className={fieldClasses.errorText}>
                  {errors['facilityCityState']}
                </Typography>
              </Box>
            )}
          </>
        ))}
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Button
            className={globalClasses.smallButtonOutlined}
            variant='outlined'
            style={{marginRight: 10}}
            onClick={() => dispatch(closeDialog())}>
            Cancel
          </Button>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            className={globalClasses.smallButton}>
            Submit
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
};
const RenderInputFields = ({
  data,
  facility,
  errors,
  setData,
  handleChange,
  handleOnBlur,
}: any) => {
  switch (data.inputProps.name) {
    case 'facilityStreetAddress': {
      return (
        <InputFields
          isAutoComplete={true}
          isError={errors[data.inputProps.name]}
          errorText={errors[data.inputProps.name]}
          eventProps={{
            onChange: handleChange(data.inputProps.name),
            value: facility[data.inputProps.name] || '',
          }}
          addressOnChangeHandler={(value: any) => {
            setData({
              ...facility,
              [data.inputProps.name]: value.streetAddress,
              ['facilityCityState']: value.city,
              ['facilityState']: value.state,
              ['facilityZipcode']: value.zipCode,
              ['facilityStateCode']: value.state,
            });
          }}
          fieldName='facilityZipcode'
          {...data}
        />
      );
    }
    case 'facilityCode': {
      return <></>;
    }
    case 'facilityName': {
      return (
        <InputFields
          isError={errors[data.inputProps.name]}
          errorText={
            data.inputProps.name === 'facilityCityState'
              ? ''
              : errors[data.inputProps.name]
          }
          eventProps={{
            onChange: handleChange(data.inputProps.name),
            value: facility[data.inputProps.name] || '',
            onBlur: () => {
              data.inputProps.name === 'facilityName' &&
                handleOnBlur(data.inputProps.name);
            },
          }}
          {...data}
        />
      );
    }
    default: {
      return (
        <InputFields
          isError={errors[data.inputProps.name]}
          errorText={
            data.inputProps.name === 'facilityCityState'
              ? ''
              : errors[data.inputProps.name]
          }
          eventProps={{
            onChange: handleChange(data.inputProps.name),
            value: facility[data.inputProps.name] || '',
          }}
          {...data}
        />
      );
    }
  }
};

export default FacilityDialog;
