import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {API} from 'globals/api';
import {
  emptyStringToNull,
  getCurrentSenior,
  getQueryParamTimezone,
  unmaskPhoneNumber,
} from 'globals/global.functions';
import {showToast} from 'common/Toast';
import {seniorPersonaForm} from 'forms';
import get from 'lodash.get';
import {
  setSeniorDetail,
  setSeniorImage,
} from 'store/commonReducer/common.action';
import {isEmpty} from 'lodash';
// eslint-disable-next-line max-len
import {
  validateEmailAddressService,
  validateMobileNumberService,
} from '../../../../services/addUserService/validateEmailAddressAndMobileService';
import {push} from 'redux-first-history';
import {GetSeniorData} from 'globals/enums';

export const UNIQUE_EMAIL_ID = 'UNIQUE_EMAIL_ID';
export const UNIQUE_NUMBER = 'UNIQUE_NUMBER';
export const RESET_VALIDATION = 'RESET_VALIDATION';
export const UNIQUE_EMPLOYEE_ID = 'UNIQUE_EMPLOYEE_ID';

export const createAccount = (data: any, isProfileCreated: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    return API({
      url: 'users/senior/minimal-info',
      method: 'post',
      data: data,
    })
      .then((res) => {
        const newSeniorAccount = res.data[0];
        dispatch(hideApplicationLoader());
        if (isProfileCreated) {
          dispatch(
            showToast(
              // eslint-disable-next-line max-len
              'Account saved successfully!',
              'success',
            ),
          );
          dispatch(setSeniorDetail(GetSeniorData.SENIOR));
        } else {
          dispatch(
            showToast(
              // eslint-disable-next-line max-len
              "Account created successfully! Login credentials and app links are sent to the senior's email address.",
              'success',
            ),
          );
        }
        dispatch(
          push(
            `/senior/${newSeniorAccount.senior_id}/${
              newSeniorAccount.account_id
            }/${getQueryParamTimezone(
              newSeniorAccount.timezone,
            )}/onboarding-info`,
          ),
        );
        dispatch(setSeniorDetail(GetSeniorData.SENIOR));
        dispatch(setSeniorImage());

        return {success: true, data: res.data[0]};
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Something Went Wrong!', 'error'));
      });
  };
};

export const fetchSeniorInfo = (data: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const seniorInfo = getCurrentSenior();
    if (!seniorInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    const minimalInfoAPI = API({
      // eslint-disable-next-line max-len
      url: `users/senior/minimal-info?senior_id=${seniorInfo.seniorID}&account_id=${seniorInfo.accountID}`,
      method: 'get',
      data: data,
    });

    const basicInfoAPI = API({
      // eslint-disable-next-line max-len
      url: `users/senior/basic-info?senior_id=${seniorInfo.seniorID}&account_id=${seniorInfo.accountID}`,
      method: 'get',
      data: data,
    });

    const personAPI = API({
      // eslint-disable-next-line max-len
      url: `users/senior/persona?senior_id=${seniorInfo.seniorID}&account_id=${seniorInfo.accountID}`,
      method: 'get',
      data: data,
    });

    return Promise.all([minimalInfoAPI, basicInfoAPI, personAPI])
      .then((res) => {
        dispatch(hideApplicationLoader());
        return {
          minimalInfo: res[0]?.data,
          basicInfo: !isEmpty(res[1]?.data) && res[1]?.data,
          persona: res[2]?.data,
        };
      })
      .catch(() => {
        dispatch(hideApplicationLoader());
      });
  };
};

const updatePersona = (data: any) => {
  Object.entries(data.persona).forEach((persona) => {
    const index = seniorPersonaForm.findIndex(
      ({field_id}: any) => field_id === persona[0],
    );
    seniorPersonaForm[index].field_value.data = persona[1];
  });
  return seniorPersonaForm;
};

export const saveProfileInfo = (data: any, param: any) => {
  return (dispatch: any) => {
    dispatch(showApplicationLoader());
    const accountInfo = getCurrentSenior();
    const updatedPersona = updatePersona(data);

    data.senior_info.home_phone = unmaskPhoneNumber(
      data.senior_info.home_phone,
    );

    data.senior_info.emergency_phone = unmaskPhoneNumber(
      data.senior_info.emergency_phone,
    );

    data.senior_info.social_media_links = [
      data.senior_info.social_media_links?.replace(/^https?:\/\//i, ''),
      data.senior_info.social_media_links2?.replace(/^https?:\/\//i, ''),
    ];
    delete data.senior_info.social_media_links2;
    const updatedSeniorInfo = emptyStringToNull(data.senior_info);
    data.persona = updatedPersona;
    data = {
      senior_info: updatedSeniorInfo,
      persona: updatedPersona,
      ...accountInfo,
    };
    const seniorInfoAPI = API({
      url: 'users/senior/basic-info',
      method: 'put',
      data: {senior_info: updatedSeniorInfo, ...accountInfo},
    });

    const seniorPersonaAPI = API({
      url: 'users/senior/persona',
      method: 'put',
      data: {persona: updatedPersona, ...accountInfo},
    });

    Promise.all([seniorInfoAPI, seniorPersonaAPI])
      .then(() => {
        dispatch(hideApplicationLoader());
        dispatch(showToast('Saved Successfully', 'success'));
        if (!isEmpty(param)) {
          dispatch(setSeniorDetail(GetSeniorData.SENIOR));
        }
        return {success: true};
      })
      .catch((err) => {
        dispatch(hideApplicationLoader());
        dispatch(showToast(get(err, 'response.data.message'), 'error'));
      });
  };
};

export const uplaodImage = (data: any) => {
  return (dispatch: any) => {
    const accountInfo = getCurrentSenior();
    if (!accountInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    return API({
      url: 'users/senior/image',
      method: 'post',
      data: {
        image: data,
        account_id: accountInfo.account_id,
        senior_id: accountInfo.senior_id,
      },
    })
      .then((res) => {
        return res.data[0];
      })
      .catch(() => {
        /**/
      });
  };
};

export const removeImage = (image_id: any) => {
  return (dispatch: any) => {
    const accountInfo = getCurrentSenior();
    if (!accountInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    const {account_id, senior_id} = accountInfo;
    return API({
      url: 'users/senior/image',
      method: 'delete',
      data: {
        image_id,
        account_id,
        senior_id,
      },
    })
      .then(() => {
        dispatch(setSeniorImage());
        return {success: true};
      })
      .catch(() => {
        /**/
      });
  };
};

export const setProfileImage = (image_id: any, param: any) => {
  return (dispatch: any) => {
    const accountInfo = getCurrentSenior();
    if (!accountInfo) {
      dispatch(hideApplicationLoader());
      return Promise.resolve(null);
    }
    const {account_id, senior_id} = accountInfo;
    return API({
      url: 'users/senior/profile-image',
      method: 'post',
      data: {
        image_id,
        account_id,
        senior_id,
      },
    })
      .then(() => {
        if (!isEmpty(param)) {
          dispatch(setSeniorImage());
        }

        return {success: true};
      })
      .catch(() => {
        /**/
      });
  };
};

export const getImage = (accountInfo: any) => {
  return () => {
    if (!accountInfo) {
      return Promise.resolve(null);
    }
    return API({
      // eslint-disable-next-line max-len
      url: `users/senior/image?senior_id=${accountInfo.senior_id}&account_id=${accountInfo.account_id}`,
      method: 'get',
    })
      .then((res) => {
        let imageValues: any = [];
        res.data.images.map((image: any) => {
          imageValues.push(
            getImageValue(image, accountInfo.senior_id, accountInfo.account_id),
          );
        });
        return Promise.all(imageValues).then((actualImage) => {
          return {profile: res.data.profile, images: actualImage};
        });
      })
      .catch((err) => {
        return err;
      });
  };
};

const getImageValue = (image: any, sen_id: string, acc_id: string) => {
  return API({
    // eslint-disable-next-line max-len
    url: `users/senior/download-image?senior_id=${sen_id}&account_id=${acc_id}&image_id=${image.id}`,
    method: 'get',
  })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      /**/
    });
};

//calling the email address validation api
export const validateEmailAddress = (data: any) => {
  return async (dispatch: any) => {
    dispatch(showApplicationLoader());
    try {
      const params = {
        email: data?.email?.toLowerCase(),
        employee_id: data.empId,
      };
      const response = await validateEmailAddressService(params);
      dispatch(isExistsEmailAddress(false));
      dispatch(isExistsEmployeeId(false));
      if (!response.data.email_exists) {
        await dispatch(isExistsEmailAddress(response.data.email_exists));
      } else {
        await dispatch(
          isExistsEmailAddress(
            response.data.email_exists,
            'Email address already in use',
          ),
        );
      }
      if (!response.data.employee_id) {
        await dispatch(isExistsEmployeeId(response.data.employee_id));
      } else {
        await dispatch(
          isExistsEmployeeId(
            response.data.employee_id,
            'Employee id already in use',
          ),
        );
      }
      dispatch(hideApplicationLoader());
      // eslint-disable-next-line no-empty
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showToast(error.message, 'error'));
    }
  };
};

export const isExistsEmailAddress = (data: any, message = '') => ({
  type: UNIQUE_EMAIL_ID,
  payload: {data, message},
});
export const isExistsEmployeeId = (data: any, message = '') => ({
  type: UNIQUE_EMPLOYEE_ID,
  payload: {data, message},
});

//calling the mobile number validation api
export const validateMobileNumber = (data: any) => {
  return async (dispatch: any) => {
    dispatch(showApplicationLoader());
    try {
      const params = {mobile_number: unmaskPhoneNumber(data)};
      const response = await validateMobileNumberService(params);
      dispatch(isExistsMobileNumber(false, ''));
      if (!response.data.mobile_number_exists) {
        await dispatch(
          isExistsMobileNumber(response.data.mobile_number_exists, ''),
        );
      } else {
        await dispatch(
          isExistsMobileNumber(
            response.data.mobile_number_exists,
            'Mobile number already in use',
          ),
        );
      }
      dispatch(hideApplicationLoader());
      // eslint-disable-next-line no-empty
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showToast(error.message, 'error'));
    }
  };
};

const isExistsMobileNumber = (data: any, message: any) => ({
  type: UNIQUE_NUMBER,
  payload: {data, message},
});

export const resetValidation = () => ({
  type: RESET_VALIDATION,
});
