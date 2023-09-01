import React from 'react';
import clsx from 'clsx';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {Label} from 'common/Input';
import Info from 'assets/icons/Info.svg';
import Correct from 'assets/icons/Correct.svg';
import Wrong from 'assets/icons/Wrong.svg';
import {
  resetPassword,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {DIALOG_TYPES} from 'globals/global.constants';

import {updatePasswordStyle} from './UpdatePassword.style';
import {
  postValidatePasswordService,
  postChangePasswordService,
} from 'services/userService/userService';
import {useMutation} from '@tanstack/react-query';
import {
  IChangePasswordServiceData,
  IValidatePasswordServiceParams,
} from 'services/userService/userService.types';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {removeLocalStorage} from 'globals/global.functions';
import {IUpdatePasswordProps} from './UpdatePassword.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const UpdatePassword = ({
  showCancelBtn = false,
  heading = '',
  showOldPasswordField = false,
  alwaysShowPassCriteria = false,
  placeholderText = 'Enter Password',
}: IUpdatePasswordProps) => {
  const {classes} = updatePasswordStyle();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();

  const defaultPage =
    useAppSelector((state: any) => state.auth.roleConfig?.defaultPage) || '/';

  const [showPassword, setShowPassword] = React.useState({
    new: false,
    reEnter: false,
    old: false,
  });
  const [validator, setValidator] = React.useState({
    charLimit: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    noSeq: false,
  });
  const [error, setError] = React.useState({
    reEnterErrorMessage: '',
    oldPasswordErrorMsg: '',
    newPasswordError: false,
  });

  const [showPasswordCriteria, setShowPasswordCriteria] = React.useState(false);

  // Mutation Object for ValidatePassword Service
  const validatePasswordMutation = useMutation({
    mutationFn: (data: IValidatePasswordServiceParams): Promise<boolean> => {
      dispatch(showApplicationLoader());
      return postValidatePasswordService(data);
    },
    onSuccess: (isValid) => {
      dispatch(hideApplicationLoader());
      setError((error) => ({
        ...error,
        oldPasswordErrorMsg: isValid ? '' : 'Incorrect Old Password',
      }));
    },
    onError: () => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  // Mutation Object for ChangePassword Service
  const changePasswordMutation = useMutation({
    mutationFn: (data: IChangePasswordServiceData): Promise<boolean> => {
      dispatch(showApplicationLoader());
      return postChangePasswordService(data);
    },
    onSuccess: () => {
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage:
            'You have successfully changed your password. Please re-login using the new password',
          isLogout: true,
        }),
      );
    },
    onError: (error) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  /**
   * @function matchOldPassword
   * @description validator that runs onBlur event for lod password field
   */
  const matchOldPassword = React.useCallback(
    (e: any) => {
      if (e.target.value) {
        validatePasswordMutation.mutate({
          password: e.target.value,
        });
      }
    },
    [validatePasswordMutation],
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newPassword = data.get('new-password');
    const reEnterPassword = data.get('reenter-password');
    const oldPassword = data.get('old-password');
    if (newPassword && !error.newPasswordError) {
      if (newPassword === reEnterPassword) {
        if (alwaysShowPassCriteria) {
          const query = new URLSearchParams(location.search);
          const otp = query.get('otp');
          const email = query.get('email')?.replace(/ /g, '+');
          dispatch(resetPassword(otp, email, newPassword));
        } else if (
          showOldPasswordField &&
          oldPassword &&
          !error.oldPasswordErrorMsg
        ) {
          if (oldPassword === newPassword) {
            dispatch(
              showToast(
                'New Password should not be similar to Old Password',
                'error',
              ),
            );
          } else {
            changePasswordMutation.mutate({
              old_password: oldPassword.toString(),
              new_password: newPassword.toString(),
            });
          }
        }
      } else {
        setError({...error, reEnterErrorMessage: 'Passwords do not match'});
      }
    }
  };

  const passwordCriteriaValidator = (value: string) => {
    const validatorObject = {
      charLimit: false,
      uppercase: false,
      lowercase: false,
      specialChar: false,
      noSeq: false,
    };
    if (/(?=.*?[A-Z])/.test(value)) {
      validatorObject.uppercase = true;
    }
    if (/.{14,}/.test(value)) {
      validatorObject.charLimit = true;
    }
    if (/(?=.*?[a-z])/.test(value)) {
      validatorObject.lowercase = true;
    }
    if (/(?=.*?[#?!@$%^&*-])/.test(value)) {
      validatorObject.specialChar = true;
    }
    if (/(?=.*?\d)/.test(value) && checkSeq(value)) {
      validatorObject.noSeq = true;
    }
    return validatorObject;
  };

  const validatePassword = (e: any) => {
    setError((error) => ({
      ...error,
      reEnterErrorMessage: '',
    }));
    const value = e.target.value;
    const passwordCriteria = alwaysShowPassCriteria
      ? alwaysShowPassCriteria
      : value;
    if (value) {
      setShowPasswordCriteria(true);
    } else {
      setShowPasswordCriteria(false);
    }
    if (passwordCriteria) {
      const validatorObject = passwordCriteriaValidator(value);
      setValidator(validatorObject);
      setError((error) => ({
        ...error,
        newPasswordError: Object.values(validatorObject).some(
          (v) => v !== true,
        ),
      }));
    }
  };

  const checkSeq = (num: any) => {
    let arrNum = ('' + num).split('');
    return arrNum.every((data, index) => {
      const intitalNum = parseInt(arrNum[index]);
      const secondNum = parseInt(arrNum[index + 1]);
      const thirdNum = parseInt(arrNum[index + 2]);
      const diff1 = secondNum - intitalNum;
      const diff2 = thirdNum - secondNum;
      if (!isNaN(diff1) && !isNaN(diff2)) {
        if (diff1 === 1 && diff2 === 1) return false;
      }
      return true;
    });
  };

  const onCancelHandler = () => {
    navigate(defaultPage);
  };

  React.useEffect(() => {
    return () => {
      if (changePasswordMutation.isSuccess) {
        removeLocalStorage('userInfo');
      }
    };
  }, [changePasswordMutation.isSuccess]);

  return (
    <>
      <Typography variant='h1' className={classes.headingText}>
        {heading}
      </Typography>
      <Box width={1} py={3} px={8} data-testid='choose-password'>
        <form
          onSubmit={handleSubmit}
          data-testid='choosePasswordForm'
          noValidate>
          {showOldPasswordField && (
            <Box pb={3}>
              <Label
                htmlFor='password'
                className={clsx({
                  [classes.isError]: error.oldPasswordErrorMsg,
                })}>
                Enter Old Password
              </Label>
              <TextField
                id='old-password'
                name='old-password'
                fullWidth
                variant='outlined'
                type={showPassword.old ? 'text' : 'password'}
                placeholder='Enter Password'
                className={clsx({
                  [classes.inputField]: true,
                  [classes.errorField]: error.oldPasswordErrorMsg,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() =>
                          setShowPassword((showPassword) => ({
                            ...showPassword,
                            old: !showPassword.old,
                          }))
                        }
                        data-testid='oldPasswordIconBtn'
                        size='large'>
                        {showPassword.old ? (
                          <Visibility className={classes.visibility} />
                        ) : (
                          <VisibilityOff className={classes.visibility} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={() => {
                  setError((error) => ({
                    ...error,
                    oldPasswordErrorMsg: '',
                  }));
                }}
                onBlur={matchOldPassword}
              />
              <Typography variant='subtitle1' className={classes.errorText}>
                {error.oldPasswordErrorMsg}
              </Typography>
            </Box>
          )}
          <Box pb={2}>
            <Label
              htmlFor='email'
              className={clsx({
                [classes.isError]: error.newPasswordError,
              })}>
              Enter New Password
            </Label>
            <TextField
              id='new-password'
              name='new-password'
              fullWidth
              variant='outlined'
              type={showPassword.new ? 'text' : 'password'}
              placeholder={placeholderText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setShowPassword((showPassword) => ({
                          ...showPassword,
                          new: !showPassword.new,
                        }))
                      }
                      data-testid='newPasswordIconBtn'
                      size='large'>
                      {showPassword.new ? (
                        <Visibility className={classes.visibility} />
                      ) : (
                        <VisibilityOff className={classes.visibility} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={validatePassword}
              className={clsx({
                [classes.inputField]: true,
                [classes.errorField]: error.newPasswordError,
              })}
            />
            {(alwaysShowPassCriteria
              ? alwaysShowPassCriteria
              : showPasswordCriteria) && (
              <Box mt={1}>
                <Box
                  className={classes.errorTextWrapper}
                  display='flex'
                  alignItems='center'>
                  <img src={Info} />
                  <Typography variant='body1' className={classes.infoText}>
                    No reusing old password
                  </Typography>
                </Box>
                <Box className={classes.errorTextWrapper}>
                  <img src={validator.charLimit ? Correct : Wrong} />
                  <Typography
                    variant='body1'
                    className={clsx(classes.errorText, {
                      [classes.successText]: validator.charLimit,
                    })}>
                    At least 14 character long
                  </Typography>
                </Box>
                <Box className={classes.errorTextWrapper}>
                  <img src={validator.uppercase ? Correct : Wrong} />
                  <Typography
                    variant='body1'
                    className={clsx(classes.errorText, {
                      [classes.successText]: validator.uppercase,
                    })}>
                    At least one uppercase letter
                  </Typography>
                </Box>
                <Box className={classes.errorTextWrapper}>
                  <img src={validator.lowercase ? Correct : Wrong} />
                  <Typography
                    variant='body1'
                    className={clsx(classes.errorText, {
                      [classes.successText]: validator.lowercase,
                    })}>
                    At least one lowercase letter
                  </Typography>
                </Box>
                <Box className={classes.errorTextWrapper}>
                  <img src={validator.specialChar ? Correct : Wrong} />
                  <Typography
                    variant='body1'
                    className={clsx(classes.errorText, {
                      [classes.successText]: validator.specialChar,
                    })}>
                    At least one special character
                  </Typography>
                </Box>
                <Box className={classes.errorTextWrapper}>
                  <img src={validator.noSeq ? Correct : Wrong} />
                  <Typography
                    variant='body1'
                    className={clsx(classes.errorText, {
                      [classes.successText]: validator.noSeq,
                    })}>
                    At least one number with no sequence of numbers
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box pb={3}>
            <Label
              htmlFor='password'
              className={clsx({
                [classes.isError]: error.reEnterErrorMessage,
              })}>
              Re-enter New Password
            </Label>
            <TextField
              id='reenter-password'
              name='reenter-password'
              fullWidth
              variant='outlined'
              type={showPassword.reEnter ? 'text' : 'password'}
              placeholder={placeholderText}
              className={clsx({
                [classes.inputField]: true,
                [classes.errorField]: error.reEnterErrorMessage,
              })}
              onChange={() => {
                setError((error) => ({
                  ...error,
                  reEnterErrorMessage: '',
                }));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setShowPassword((showPassword) => ({
                          ...showPassword,
                          reEnter: !showPassword.reEnter,
                        }))
                      }
                      data-testid='reEnterPasswordIconBtn'
                      size='large'>
                      {showPassword.reEnter ? (
                        <Visibility className={classes.visibility} />
                      ) : (
                        <VisibilityOff className={classes.visibility} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant='subtitle1' className={classes.errorText}>
              {error.reEnterErrorMessage}
            </Typography>
          </Box>
          <Box
            display='flex'
            justifyContent={showCancelBtn ? 'center' : ''}
            pb={5}>
            {showCancelBtn && (
              <Button
                type='submit'
                size='large'
                variant='outlined'
                onClick={onCancelHandler}
                className='secondaryButton'
                style={{
                  marginRight: 25,
                  boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
                }}>
                Cancel
              </Button>
            )}
            <Button
              fullWidth
              type='submit'
              color='primary'
              variant='contained'
              size='large'
              data-testid='submitButton'
              style={{
                boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
              }}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default UpdatePassword;
