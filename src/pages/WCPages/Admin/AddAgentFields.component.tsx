import React from 'react';
import {Box, Button, Typography, Link} from '@mui/material';

import {useForm, getFormFields} from 'hooks';
import {InputFields} from 'common/InputFields';
import globalUseStyles from 'config/global.styles';
import isValidZipcode from 'common/ZipcodeValidator';
import {closeDialog} from 'store/commonReducer/common.action';
import {REGEX} from 'globals/global.constants';

import {formFields} from './addAgentFormFields';
import {IFormFieldsValue} from './formField.types';
import {addAgentField} from './AddAgentField.style';
import {fieldsStyle} from 'common/InputFields/InputFields.style';
import {
  addEditAgent,
  resendOtp,
} from './Accounts/AgentAccount/CareAgentAccount.actions';
import {validateEmailAddress} from 'pages/WCPages/AddUser/ProfileInfo/ProfileInfo.action';
import clsx from 'clsx';
import {Roles} from 'globals/enums';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import AlertImage from 'assets/icons/Alert.svg';
import {
  IRenderFormRowProps,
  IRenderInputFieldsProps,
} from './AddAgentFields.types';

const RoleAccessError = () => {
  const {classes} = addAgentField();

  return (
    <Box mb={2} className={classes.container}>
      <Box></Box>
      <Box className={classes.roleErrorContainer}>
        <Box
          className={classes.roleErrorIcon}
          component='img'
          src={AlertImage}
          alt='alert'
        />
        <Box lineHeight='20px'>
          Role for this agent cannot be changed as there are seniors assigned.
        </Box>
      </Box>
    </Box>
  );
};

const RenderInputFields = ({
  data,
  agent,
  errors,
  setData,
  handleChange,
  handleOnBlur,
  editValues,
  isAgentRoleField,
  isDisableRoleField,
}: IRenderInputFieldsProps) => {
  const {classes} = addAgentField();

  let menuItems: any = data.menuItems;

  if (isAgentRoleField) {
    menuItems = menuItems.filter(
      (menuItem: any) =>
        menuItem.value === Roles.CareAgent || menuItem.value === Roles.Admin,
    );
  }

  switch (data.inputProps.name) {
    case 'agentShift': {
      return (
        <InputFields
          className={classes.shiftWrapper}
          isError={errors[data.inputProps.name]}
          errorText={errors[data.inputProps.name]}
          eventProps={{
            onChange: handleChange(data.inputProps.name),
            value: agent[data.inputProps.name] || '',
          }}
          {...data}
        />
      );
    }
    case 'zipCode': {
      return (
        <InputFields
          isAutoComplete={true}
          isError={errors[data.inputProps.name]}
          errorText={errors[data.inputProps.name]}
          eventProps={{
            onChange: handleChange(data.inputProps.name),
            value: agent[data.inputProps.name] || '',
          }}
          addressOnChangeHandler={(value: any) => {
            setData({
              ...agent,
              [data.inputProps.name]: value.zipCode,
              ['city']: value.city,
              ['state']: value.fullState,
            });
          }}
          fieldName='zip'
          {...data}
        />
      );
    }
    default: {
      return (
        <>
          <InputFields
            isError={errors[data.inputProps.name]}
            errorText={
              data.inputProps.name === 'phone'
                ? ''
                : errors[data.inputProps.name]
            }
            eventProps={{
              onChange: handleChange(data.inputProps.name),
              value: agent[data.inputProps.name] || '',
              disabled:
                (data.inputProps.name === 'empId' && editValues?.employeeId) ||
                isDisableRoleField,
              onBlur: () => handleOnBlur(data.inputProps.name),
            }}
            {...data}
            menuItems={menuItems}
          />
        </>
      );
    }
  }
};

const RenderFormRow = ({
  data,
  agent,
  errors,
  setData,
  handleChange,
  handleOnBlur,
  editValues,
  handleResendOtp,
  showResendOTP,
  disableResendOTP,
}: IRenderFormRowProps) => {
  const {classes: fieldClasses} = fieldsStyle();
  const {classes} = addAgentField();

  const isExistingAgentRoleField =
    data.inputProps.name === 'access' &&
    editValues?.accessRole === Roles.CareAgent;

  const isAgentAssociatedToSenior =
    isExistingAgentRoleField && editValues.assignedSenior.length > 0;

  const isDisableRoleField = React.useMemo(() => {
    if (data.inputProps.name === 'access') {
      if (
        editValues?.accessRole === Roles.BDM ||
        editValues?.accessRole === Roles.Admin ||
        isAgentAssociatedToSenior
      ) {
        return true;
      }
      return false;
    }
    return false;
  }, [data.inputProps.name, editValues?.accessRole, isAgentAssociatedToSenior]);

  return (
    <>
      <Box
        key={data.label}
        className={classes.container}
        mb={
          data.inputProps.name === 'phone' || isAgentAssociatedToSenior ? 0 : 2
        }>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Typography
            variant='subtitle2'
            className={clsx({
              [classes.errorText]: errors.hasOwnProperty(data.inputProps.name),
            })}>
            {data.label}
            <Box component='span' className={classes.errorText}>
              {data.inputProps.required && '*'}
            </Box>
          </Typography>
        </Box>
        <Box width={301} display='flex'>
          <Box width='100%'>
            <RenderInputFields
              data={data}
              setData={setData}
              agent={agent}
              errors={errors}
              handleChange={handleChange}
              editValues={editValues}
              handleOnBlur={handleOnBlur}
              isAgentRoleField={isExistingAgentRoleField}
              isDisableRoleField={isDisableRoleField}
            />

            {data.inputProps.name === 'email' && showResendOTP && (
              <Box
                display='flex'
                justifyContent='flex-end'
                className={
                  disableResendOTP
                    ? classes.resendOTPDisbale
                    : classes.resendOTP
                }>
                <Link
                  data-testid = 'handleResendOtpLink'
                  onClick={() => handleResendOtp(agent[data.inputProps.name])}>
                  Resend OTP
                </Link>
              </Box>
            )}
            {data.inputProps.name === 'zipCode' &&
              isValidZipcode(agent[data.inputProps.name]) && (
                <Box display='flex' justifyContent='flex-end' height={10}>{`${
                  agent['city'] || ''
                }${agent['city'] && agent['state'] ? ', ' : ''}${
                  agent['state'] || ''
                }`}</Box>
              )}
          </Box>
        </Box>
      </Box>
      {isAgentAssociatedToSenior && <RoleAccessError />}

      {data.inputProps.name === 'phone' && (
        <Box mb={2}>
          <Typography variant='subtitle1' className={fieldClasses.errorText}>
            {errors['phone']}
          </Typography>
        </Box>
      )}
    </>
  );
};

/**
 * @description Component in which admin can add a new care agent.
 * @returns {JSX} A form with different fields.
 */
export const AddAgentFields = (props: any) => {
  const {classes} = addAgentField();
  const {classes: globalClasses} = globalUseStyles();
  const validatedEmail = useAppSelector(
    (state: any) => state.profileInfo.isEmailExists,
  );
  const validatedEmpId = useAppSelector(
    (state: any) => state.profileInfo.isEmpIdExists,
  );
  const editValues = props.data;
  const [showResendOTP, setVisibilityResendOTP] = React.useState(
    editValues?.isFirstLogin || false,
  );
  const [disableResendOTP, setDisableResendOTP] = React.useState(false);
  const dispatch: any = useAppDispatch();

  const {validationData, formData, initialValues} = getFormFields(formFields);
  const {
    handleSubmit,
    handleChange,
    setData,
    data: agent,
    errors,
    setCustomError,
  }: any = useForm({
    validations: {
      ...validationData,
    },
    onSubmit: (data: any) => {
      dispatch(addEditAgent(data, editValues?.email, editValues?.isFirstLogin));
    },
    initialValues: editValues
      ? {
          userId: editValues.userId,
          empId: editValues.employeeId,
          firstName: editValues.name.firstName,
          lastName: editValues.name.lastName,
          email: editValues.email,
          phone: editValues.phone,
          extension: editValues.extension,
          access: editValues.accessRole,
          zipCode: editValues?.location?.zipcode,
          city: editValues?.location?.city,
          state: editValues?.location?.state,
          agentShift: editValues.shift,
        }
      : initialValues,
  });

  const isBDM = React.useMemo(() => agent.access === Roles.BDM, [agent]);

  React.useEffect(() => {
    if (validatedEmail) {
      setCustomError('email', 'Email already exists');
    }
  }, [validatedEmail]);

  React.useEffect(() => {
    if (validatedEmpId) {
      setCustomError('empId', 'Employee Id already exists');
    }
  }, [validatedEmpId]);

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
      dispatch(validateEmailAddress({email: email}));
    }
  };

  /**
   * @function validateEmployeeIdDuplicate
   * @description validate Employee ID and email address is duplicate.
   * @param {string} empId
   */
  const validateEmployeeIdDuplicate = (empId: string) => {
    if (empId) {
      dispatch(validateEmailAddress({empId: empId}));
    }
  };

  /**
   * @function handleOnBlur
   * @description validate care agent details.
   * @param {string} name
   */
  const handleOnBlur = (name: string) => {
    switch (name) {
      case 'email':
        validateEmailDuplicate(agent[name]);
        setVisibilityResendOTP(
          agent[name] === editValues?.email ? editValues.isFirstLogin : false,
        );
        break;
      case 'empId':
        validateEmployeeIdDuplicate(agent[name]);
        break;
      default:
        return () => {};
    }
  };

  const handleResendOtp = (email: string) => {
    setDisableResendOTP(true);
    dispatch(resendOtp(email));
    setTimeout(() => {
      setDisableResendOTP(false);
    }, 30000);
  };

  return (
    <Box data-testid='addAgentForm' className={classes.form}>
      {formData.map(
        (data: IFormFieldsValue) =>
          (isBDM && data.inputProps.name === 'agentShift') || (
            <RenderFormRow
              key={data.label}
              data={data}
              setData={setData}
              agent={agent}
              errors={errors}
              handleChange={handleChange}
              editValues={editValues}
              setCustomError={setCustomError}
              handleOnBlur={handleOnBlur}
              disabled={true}
              handleResendOtp={handleResendOtp}
              showResendOTP={showResendOTP}
              disableResendOTP={disableResendOTP}
            />
          ),
      )}
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Button
          className={globalClasses.smallButtonOutlined}
          variant='outlined'
          style={{marginRight: 10}}
          data-testid = 'cancelBtn'
          onClick={() => dispatch(closeDialog())}>
          Cancel
        </Button>
        <Button
          color='primary'
          variant='contained'
          data-testid = 'submitBtn'
          onClick={handleSubmit}
          className={globalClasses.smallButton}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
