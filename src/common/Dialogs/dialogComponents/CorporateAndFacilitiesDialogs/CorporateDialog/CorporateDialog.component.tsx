/* eslint-disable max-len */
import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';

import {useForm, getFormFields} from 'hooks';
import {InputFields} from 'common/InputFields';
import globalUseStyles from 'config/global.styles';
import {
  closeDialog,
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {
  DIALOG_TYPES,
  PAGINATION_LIMIT,
  REGEX,
  US_STATES_WITH_VALUE,
} from 'globals/global.constants';

import {corporateDialogformFields} from './corporateDialogFormFields';
import DialogWrapper from '../../DialogWrapper';
import {corporateDialogStyle} from './CorporateDialog.style';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {
  getCorporateList,
  getCorporateListFail,
  getCorporateListSuccess,
} from 'pages/WCPages/Admin/CorporateAndFacilities/CorporateManagement/CorporateManagement.action';
import {useMutation} from 'utilities/react-query';
import {
  postCorporateService,
  validateDuplicateDataService,
} from 'services/coporateAndFacilitiesService/corporateManagementService/corporateManagement.service';
import clsx from 'clsx';
import {unmaskPhoneNumber} from 'globals/global.functions';
import {
  ICorporatePayload,
  ICorporateSuccess,
  ICorporateValidateField,
  ICorporateValidatePayload,
} from './Corporate.types';
import {IFormFieldsValue} from 'pages/WCPages/Admin/formField.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

/**
 * @description Component in which admin can add a ew corporate
 * @returns {JSX} A form with different fields.
 */
const CorporateDialog = (prop: any) => {
  const {classes} = corporateDialogStyle();
  const {classes: globalClasses} = globalUseStyles();
  const [isDuplicate, setDuplicate] = useState({
    corporate_name: false,
    corporate_code: false,
    phone_number: false,
    email: false,
  });

  const {dialogTitle, data} = useAppSelector(
    (state: any) => state.common.dialog,
  );

  const editValues = data;
  const dispatch: any = useAppDispatch();

  const {validationData, formData, initialValues} = getFormFields(
    corporateDialogformFields,
  );

  // Mutation Object for submit Service
  const submitMutation = useMutation({
    mutationFn: (data: ICorporatePayload): Promise<any> => {
      dispatch(showApplicationLoader());
      return postCorporateService(data);
    },
    onSuccess: (data: ICorporateSuccess) => {
      dispatch(closeDialog());
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `${data.corporate_name} corporate is ${
            dialogTitle === 'Edit Corporate' ? 'updated' : 'created'
          } successfully`,
        }),
      );
      // action called for getting the update list of corporates
      dispatch(
        getPaginationDataIsolated(
          getCorporateList,
          PAGINATION_LIMIT.corporateAndFacilities,
          '',
          1,
          getCorporateListSuccess,
          getCorporateListFail,
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
    mutationFn: (data: ICorporateValidatePayload): Promise<any> => {
      dispatch(showApplicationLoader());
      return validateDuplicateDataService(data);
    },
    onSuccess: (data: ICorporateValidateField) => {
      const keyName: string = Object.keys(data)[0];
      dispatch(hideApplicationLoader());
      setDuplicate({
        ...isDuplicate,
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
    data: corporate,
    errors,
    setCustomError,
  }: any = useForm({
    validations: {
      ...validationData,
    },

    onSubmit: (data: any) => {
      const payload: ICorporatePayload = {
        corporate_name: data.corporateName,
        corporate_code: data.corporateCode,
        corporate_phone: unmaskPhoneNumber(data.corporatePhoneNumber),
        corporate_email: data.corporateEmail,
        corporate_address: {
          city: data.corporateCity,
          state: data.corporateState,
          street: data.corporateAddress,
          zipcode: data.corporateZipcode,
        },
        corporate_id: null,
      };
      if (editValues) {
        payload.corporate_id = editValues.id;
      }
      submitMutation.mutate(payload);
    },
    initialValues: editValues
      ? {
          corporateName: editValues.name,
          corporateCode: editValues.code,
          corporateEmail: editValues.corporate_email,
          corporateAddress: editValues.corporate_address?.street,
          corporateCity: editValues.corporate_address?.city,
          corporateState: editValues.corporate_address?.state,
          corporatePhoneNumber: editValues?.phone,
          corporateZipcode: editValues?.corporate_address?.zipcode,
        }
      : initialValues,
  });

  React.useEffect(() => {
    if (isDuplicate.email) {
      setCustomError('corporateEmail', 'Email already exists');
    }
  }, [isDuplicate.email]);

  React.useEffect(() => {
    if (isDuplicate.corporate_name) {
      setCustomError('corporateName', 'Corporate Name already exists');
    }
  }, [isDuplicate.corporate_name]);

  React.useEffect(() => {
    if (isDuplicate.corporate_code) {
      setCustomError('corporateCode', 'Corporate Code already exists');
    }
  }, [isDuplicate.corporate_code]);

  React.useEffect(() => {
    if (isDuplicate.phone_number) {
      setCustomError(
        'corporatePhoneNumber',
        'Corporate Phone Number already exists',
      );
    }
  }, [isDuplicate.phone_number]);

  /**
   * @function validateEmailDuplicate
   * @description validate email address is duplicate.
   * @param {string} email
   */
  const validateEmailDuplicate = (email: string) => {
    if (
      email &&
      RegExp(REGEX.EMAIL).test(email) &&
      editValues?.email !== email
    ) {
      verifiedDuplicateMutation.mutate({email: email});
    } else if (email && !RegExp(REGEX.EMAIL).test(email)) {
      setCustomError('corporateEmail', 'Enter a valid email address');
    }
  };

  const validateDuplicateValues = (value: string, key: any) => {
    if (key === 'corporateName' && value) {
      verifiedDuplicateMutation.mutate({corporate_name: value});
    } else if (key === 'corporateCode') {
      if (value && value.length === 3) {
        verifiedDuplicateMutation.mutate({corporate_code: value});
      } else {
        setCustomError(
          'corporateCode',
          'Corporate Code must be 3 character long',
        );
      }
    } else if (key === 'corporatePhoneNumber') {
      if (value && unmaskPhoneNumber(value).length > 9) {
        verifiedDuplicateMutation.mutate({
          phone_number: unmaskPhoneNumber(value),
        });
      } else if (value) {
        setCustomError('corporatePhoneNumber', 'Enter a valid phone number');
      }
    }
  };
  /**
   * @function handleOnBlur
   * @description validate corporate details.
   * @param {string} name
   */

  const handleOnBlur = (name: string) => {
    switch (name) {
      case 'corporateName':
        validateDuplicateValues(corporate[name], name);
        break;
      case 'corporateCode':
        validateDuplicateValues(corporate[name], name);
        break;
      case 'corporatePhoneNumber':
        validateDuplicateValues(corporate[name], name);
        break;
      default:
        return validateEmailDuplicate(corporate[name]);
    }
  };

  return (
    <DialogWrapper title={dialogTitle}>
      <form
        onSubmit={handleSubmit}
        noValidate
        data-testid='corporate-dialog'
        className={classes.form}>
        {formData.map((data: IFormFieldsValue) => (
          <>
            <Box key={data.label} className={classes.container} mb={2}>
              <Box display='flex' justifyContent='center' alignItems='center'>
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
              </Box>
              <Box width={301} display='flex'>
                <Box width='100%'>
                  {data.inputProps.name === 'corporateCode' &&
                  dialogTitle === 'Edit Corporate' ? (
                    <Typography style={{fontSize: 16}}>
                      {corporate['corporateCode']}
                    </Typography>
                  ) : (
                    <RenderInputFields
                      data={data}
                      setData={setData}
                      corporate={corporate}
                      errors={errors}
                      handleChange={handleChange}
                      setCustomError={setCustomError}
                      handleOnBlur={handleOnBlur}
                    />
                  )}
                </Box>
                {data.inputProps.name === 'corporateCity' && (
                  <Box ml={1} minWidth={122}>
                    <InputFields
                      menu={true}
                      menuItems={US_STATES_WITH_VALUE}
                      isError={errors['corporateState']}
                      initialValue=''
                      inputProps={{
                        name: 'corporateState',
                        placeholder: 'Enter State',
                      }}
                      eventProps={{
                        onChange: handleChange('corporateState'),
                        value: corporate['corporateState'] || '',
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
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
  corporate,
  errors,
  setData,
  handleChange,
  handleOnBlur,
}: any) => {
  if (data.inputProps.name === 'corporateAddress') {
    return (
      <InputFields
        isAutoComplete={true}
        isError={errors[data.inputProps.name]}
        errorText={errors[data.inputProps.name]}
        eventProps={{
          onChange: handleChange(data.inputProps.name),
          value: corporate[data.inputProps.name] || '',
        }}
        addressOnChangeHandler={(value: any) => {
          setData({
            ...corporate,
            [data.inputProps.name]: value.streetAddress,
            ['corporateCity']: value.city,
            ['corporateState']: value.state,
            ['corporateZipcode']: value.zipCode,
          });
        }}
        fieldName='corporateAddress'
        {...data}
      />
    );
  } else {
    return (
      <InputFields
        isError={errors[data.inputProps.name]}
        errorText={errors[data.inputProps.name]}
        eventProps={{
          onChange: handleChange(data.inputProps.name),
          value: corporate[data.inputProps.name] || '',
          onBlur: () => {
            data.inputProps.name !== 'corporateZipcode' &&
              data.inputProps.name !== 'corporateCity' &&
              handleOnBlur(data.inputProps.name);
          },
        }}
        {...data}
      />
    );
  }
};

export default CorporateDialog;
