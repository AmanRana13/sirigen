import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Grid, Box, Button, FormControlLabel} from '@mui/material';

import {CardWrapper} from 'common/sections/CardWrapper';
import {Fields} from 'common/Fields';

import SharedStorage from 'store/SharedStorage';
import get from 'lodash.get';

import {addUserStyle} from '../../AddUser.style';
import {
  getCurrentSenior,
  maskPhoneNumber,
  trimValues,
  unmaskPhoneNumber,
} from 'globals/global.functions';
import {
  validateEmailAddress,
  validateMobileNumber,
  resetValidation,
} from '../ProfileInfo.action';
import {
  DATE_FORMAT,
  FORM_ERROR_MESSAGES,
  REGEX,
} from 'globals/global.constants';
import moment from 'moment';
import SeniorAddressFields from './SeniorAddressFields';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {InputCheckBox, Label} from 'common/Input';

const AccountInfo = ({
  createAccount,
  accountDetail,
  setIsProfileCreated,
  setSelectedLocation,
  location,
  isProfileCreated,
}: any) => {
  const {classes} = addUserStyle();
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: {errors},
    setValue,
    trigger,
    setError,
    getValues,
    clearErrors,
  } = useForm({
    mode: 'onChange',
  });

  const [age, setAge] = useState('');
  const [isResident, setIsResident] = useState(false);
  const email = watch('email');
  const dob = watch('dob');

  const validatedEmail = useAppSelector(
    (state: any) => state.profileInfo.isEmailExists,
  );
  const validatedNumber = useAppSelector(
    (state: any) => state.profileInfo.isPhoneExists,
  );
  const errEmailMessage = useAppSelector(
    (state: any) => state.profileInfo.errorEmailMessage,
  );
  const errNumberMessage = useAppSelector(
    (state: any) => state.profileInfo.errorNumberMessage,
  );

  const dispatch: any = useAppDispatch();

  const formData = React.useMemo(() => {
    const fieldsArray = [
      {
        name: 'name.first_name',
        label: 'First Name',
        required: true,
        helperText: 'John',
        validation: {
          required: 'Required Field',
          maxLength: {
            value: 50,
            message: 'Max 50 character is allowed',
          },
          pattern: {
            value: REGEX.BLANK_FIELD,
            message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
          },
        },
        isVisible: true,
      },
      {
        name: 'name.middle_name',
        label: 'Middle Name',
        helperText: 'Radcliff',
        isVisible: true,
      },
      {
        name: 'name.last_name',
        label: 'Last Name',
        required: true,
        helperText: 'Doe',
        validation: {
          required: 'Required Field',
          maxLength: {
            value: 50,
            message: 'Max 50 character is allowed',
          },
          pattern: {
            value: REGEX.BLANK_FIELD,
            message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
          },
        },
        isVisible: true,
      },
      {
        name: 'mobile_number',
        masked: true,
        label: 'Mobile Phone',
        required: true,
        helperText: '(xxx) xxx-xxxx',
        validation: {
          required: 'Required Field',
          minLength: {
            value: 14,
            message: '10 digits required',
          },
        },
        isVisible: true,
      },
      {
        name: 'gender',
        label: 'Gender',
        required: true,
        menu: true,
        menuItems: ['Male', 'Female', 'Other'],
        validation: {
          required: 'Required Field',
        },
        isVisible: true,
      },
      {name: 'dob', isVisible: true},
      {
        name: 'email',
        label: 'Email',
        required: true,
        helperText: 'Enter Email',
        validation: {
          required: 'Required Field',
          pattern: {
            value: REGEX.EMAIL,
            message: 'Invalid email address',
          },
        },
        isVisible: true,
      },
      {
        isVisible: true,
        name: 'locationFields',
      },
      {
        checkbox: true,
        name: 'is_resident',
        label: 'Is this a Resident Account?',
        checkboxLabel: 'Yes',
        isVisible: true,
      },
      {
        name: 'corporate',
        label: 'Resident’s Corporate',
        menu: true,
        menuItems: [],
        isSelectValueDisable: true,
        disabled: true,
        isVisible: isResident,
      },
      {
        name: 'facility',
        label: 'Resident’s Facility',
        menu: true,
        menuItems: [],
        isSelectValueDisable: true,
        disabled: true,
        isVisible: isResident,
      },
    ];

    return fieldsArray;
  }, [isResident]);

  const getCurrentAge = (value: any) => {
    const ageDifMs = Date.now() - new Date(value).getTime();
    const ageDate = new Date(ageDifMs);
    const currentAge: any = Math.abs(ageDate.getUTCFullYear() - 1970);
    setAge(currentAge);
  };

  const formatDOB = (seniorDob: any) => {
    const date = new Date(seniorDob);
    return date.toISOString();
  };

  //validating whether the email address exists in the database or not
  const validateEmailDuplicate = async (data: any) => {
    const pass = await trigger(data);
    const isSameEmai = accountDetail?.email === email;
    if (pass && !isSameEmai) {
      await dispatch(validateEmailAddress({email: email}));
    }
  };

  //validating whether the mobile number exists in the database or not
  const validateNumberDuplicate = async (data: any) => {
    const pass = await trigger(data);
    const mobileNumber = getValues('mobile_number');
    const isSameNumber =
      accountDetail?.mobile_number === unmaskPhoneNumber(mobileNumber);
    if (pass && !isSameNumber) {
      await dispatch(validateMobileNumber(mobileNumber));
    }
  };

  const onSubmit = (data: any) => {
    let updatedData = data;
    updatedData['dob'] = formatDOB(updatedData['dob']);
    updatedData['mobile_number'] = unmaskPhoneNumber(
      updatedData['mobile_number'],
    );

    updatedData = {
      ...updatedData,
      address: {
        ...updatedData.address,
        street: location.streetAddress,
        coordinates: location.coordinates,
      },
      is_resident: isResident,
    };
    let trimmedUpdatedData = trimValues(updatedData);

    if (isProfileCreated) {
      const accountInfo = getCurrentSenior();

      trimmedUpdatedData = {
        ...trimmedUpdatedData,
        user_id: accountInfo.senior_id,
        account_id: accountInfo.account_id,
        zone: accountDetail?.zone,
      };
    }

    createAccount(trimmedUpdatedData, isProfileCreated).then((res: any) => {
      if (res?.success) {
        SharedStorage.setNavigationEnable(true);
        setIsProfileCreated(true);
      }
    });
  };

  const getError = (name: any) => {
    const allErrors = errors as any;
    if (name.includes('.')) {
      try {
        return allErrors[name.split('.')[0]][name.split('.')[1]];
      } catch {
        return undefined;
      }
    } else {
      return errors[name];
    }
  };

  React.useEffect(() => {
    if (isResident && accountDetail) {
      setValue('corporate', accountDetail.corporate || '');
      setValue('facility', accountDetail.facility || '');
    }
  }, [isResident, accountDetail, setValue]);

  React.useEffect(() => {
    if (accountDetail) {
      const formattedDob = moment(accountDetail.dob).format(DATE_FORMAT);
      setValue('name.first_name', accountDetail.name.first_name);
      setValue('name.middle_name', accountDetail.name.middle_name);
      setValue('name.last_name', accountDetail.name.last_name);
      setValue('mobile_number', maskPhoneNumber(accountDetail.mobile_number));
      setValue('gender', accountDetail.gender);
      setValue('email', accountDetail.email);
      setValue('dob', formattedDob);
      setIsResident(accountDetail.is_resident);
      getCurrentAge(formattedDob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetail]);

  React.useEffect(() => {
    if (dob && dob != 'Invalid Date') {
      getCurrentAge(dob);
    }
  }, [dob]);

  React.useEffect(() => {
    if (validatedNumber) {
      setError('mobile_number', {
        type: 'manual',
        message: errNumberMessage,
      });
    }
    if (validatedEmail) {
      setError('email', {
        type: 'manual',
        message: errEmailMessage,
      });
    }
  }, [validatedNumber, validatedEmail]);

  React.useEffect(() => {
    return () => {
      dispatch(resetValidation());
    };
  }, []);

  const renderData = (data: any) => {
    if (data.menu) {
      return (
        <Fields
          {...data}
          errorField={errors[data.name]}
          errorText={get(errors, `${data.name}.message`)}
          rules={data.validation}
          control={control}
          value={watch(data.name) || ''}
        />
      );
    } else if (data.name === 'email') {
      return (
        <Fields
          {...data}
          errorField={errors[data.name]}
          errorText={get(errors, `${data.name}.message`)}
          {...register(data.name, data.validation)}
          onBlur={() => validateEmailDuplicate(data.name)}
          validated={errors[data.name] ? true : validatedEmail}
        />
      );
    } else if (data.name === 'mobile_number') {
      return (
        <Fields
          {...data}
          errorField={errors[data.name]}
          errorText={get(errors, `${data.name}.message`)}
          {...register(data.name, data.validation)}
          onBlur={() => validateNumberDuplicate(data.name)}
          validated={errors[data.name] ? true : validatedNumber}
        />
      );
    } else if (data.checkbox) {
      return (
        <>
          <Label htmlFor='isResident' data-testid='field-label'>
            {data.label}
          </Label>
          <FormControlLabel
            style={{
              marginLeft: -7,
            }}
            control={
              <InputCheckBox
                name='is_resident'
                data-testid = 'isResidentCheckbox'
                control={control}
                checked={isResident}
                onChange={(e: any) => {
                  setIsResident(e.target.checked);
                }}
              />
            }
            label={data.checkboxLabel}
          />
        </>
      );
    } else {
      return (
        <Fields
          {...data}
          errorField={
            Object.keys(errors).length !== 0 ? getError(data.name) : null
          }
          control={control}
          errorText={get(errors, `${data.name}.message`)}
          {...register(data.name, data.validation)}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardWrapper subTitle='Account Registration'>
        <Grid container spacing={3}>
          {formData.map((data) => {
            if (!data.isVisible) {
              return null;
            }
            if (data.name === 'locationFields') {
              return (
                <SeniorAddressFields
                  key={data.name}
                  register={register}
                  errors={errors}
                  watch={watch}
                  control={control}
                  setSelectedLocation={setSelectedLocation}
                  setError={setError}
                  clearErrors={clearErrors}
                  setValue={setValue}
                  trigger={trigger}
                  address={accountDetail?.address}
                  location={location}
                />
              );
            } else if (data.name === 'dob') {
              return (
                <Grid item xs={4} key={data.name}>
                  <Box display='flex' position='relative'>
                    <Box marginRight={4}>
                      <Fields
                        name='dob'
                        errorField={errors['dob']}
                        errorText={get(errors, `dob.message`)}
                        date={true}
                        defaultValue={null}
                        rules={{required: 'Required Field'}}
                        control={control}
                        label='Date of Birth'
                        required={true}
                      />
                    </Box>
                    <Box>
                      <Fields
                        value={age}
                        readOnly={true}
                        label='Age'
                        required={true}
                      />
                    </Box>
                  </Box>
                </Grid>
              );
            }
            return (
              <Grid key={data.name} item xs={4}>
                {renderData(data)}
              </Grid>
            );
          })}
        </Grid>
      </CardWrapper>
      <Box className={classes.addUserButtonContainer}>
        <Button
          type='submit'
          size='large'
          color='primary'
          variant='contained'
          disabled={validatedNumber || validatedEmail}
          data-testid = 'buttonSaveOrCreateAccount'
          className={classes.addUserButton}>
          {isProfileCreated ? 'Save Account' : 'Create Account'}
        </Button>
      </Box>
    </form>
  );
};

export {AccountInfo};
