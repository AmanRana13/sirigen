/* eslint-disable max-len */
import React from 'react';
import {isEmpty} from 'lodash';
import {Box, Button} from '@mui/material';
import {useForm} from 'react-hook-form';
import {addUserStyle} from '../AddUser.style';
import {
  emptyStringToNull,
  isEmptyObject,
  maskPhoneNumber,
  trimValues,
  unmaskPhoneNumber,
} from 'globals/global.functions';

import {Doctor} from './components/Doctor.component';
import {Dentist} from './components/Dentist.component';
import {providerInfoStyle} from './ProviderInfo.style';
import {
  IDefaultValues,
  IDoctorDetails,
  IParamsDetails,
  ISubmitData,
  ISubmitParamsData,
} from './ProviderInfo.types';
import {Pharmacy} from './components/Pharmacy/Pharmacy.component';
import {defaultPharmacyValues} from './components/formData';
import {ProviderTypes} from 'globals/enums';
import {IPharmacyDetails} from './components/Pharmacy/Pharmacy.types';
import {openOverlayDialog} from 'store/commonReducer/common.action';
import {DIALOG_TYPES} from 'globals/global.constants';
import { useAppDispatch } from 'hooks/reduxHooks';

const defaultValues: IDefaultValues[] = [
  {
    provider_name: '',
    name: {
      first_name: '',
      last_name: '',
    },
    speciality: '',
    contact_phone: '',
    email_address: '',
  },
];

const ProviderInfoComponent = ({providerInfo, saveProviderInfo}: any) => {
  const [doctorDeletion, setDoctorDeletion] = React.useState<string[]>([]);
  const [dentistDeletion, setDentistDeletion] = React.useState<string[]>([]);
  const [pharmacyDeletion, setPharmacyDeletion] = React.useState<string[]>([]);
  const [pharmacyDetails, setPharmacyDetails] = React.useState<any>([]);
  const [doctorDetails, setDoctorDetails] = React.useState<any>([]);
  const {classes} = providerInfoStyle();
  const {classes: addUserClasses} = addUserStyle();
  const dispatch: any = useAppDispatch();
  const getMaskedData = React.useCallback(
    (data: any[] = [], isPharmacy = false) => {
      const response =
        data?.map((obj: any) => {
          if (isPharmacy) {
            return {
              ...obj,
              address: {...obj.address, state: obj.address.state || ''},
              contact_phone: maskPhoneNumber(obj.contact_phone),
              fax: maskPhoneNumber(obj.fax),
            };
          }
          return {
            ...obj,
            contact_phone: maskPhoneNumber(obj.contact_phone),
          };
        }) || [];
      return response;
    },
    [],
  );

  const doctorData = React.useMemo(() => getMaskedData(providerInfo.doctor), [
    providerInfo.doctor,
  ]);
  const dentistData = React.useMemo(() => getMaskedData(providerInfo.dentist), [
    providerInfo.dentist,
  ]);
  const pharmacyData = React.useMemo(
    () => getMaskedData(providerInfo.pharmacy, true),
    [providerInfo.pharmacy],
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      doctor: doctorData && doctorData.length > 0 ? doctorData : defaultValues,
      dentist:
        dentistData && dentistData.length > 0 ? dentistData : defaultValues,
      pharmacy:
        pharmacyData && pharmacyData.length > 0
          ? pharmacyData
          : defaultPharmacyValues,
    },
  });

  const fetchDetails = (
    data: IParamsDetails[] | IPharmacyDetails[],
    type: string,
  ) => {
    let provider_addition: IParamsDetails[] = [];
    let provider_modification: IParamsDetails[] = [];
    data.forEach((info: any, index: number) => {
      switch (type) {
        case ProviderTypes.DOCTOR: {
          info.contact_phone = unmaskPhoneNumber(info.contact_phone);
          break;
        }
        case ProviderTypes.DENTIST: {
          info.contact_phone = unmaskPhoneNumber(info.contact_phone);
          break;
        }
        case ProviderTypes.PHARMACY: {
          info.contact_phone = unmaskPhoneNumber(info?.contact_phone);
          info.fax = unmaskPhoneNumber(info?.fax);
          info.address.city =
            info.address.city || pharmacyDetails[index].address.city;
          info.is_primary = pharmacyDetails[index].is_primary;
          info.website = info.website || pharmacyDetails[index].website;
          break;
        }
        default: {
          break;
        }
      }
      if (info.provider_id) {
        provider_modification.push(emptyStringToNull(info));
      } else {
        const isformEdited = isEmptyObject(info);
        if (isformEdited) {
          provider_addition.push(emptyStringToNull(info));
        }
      }
    });
    return {provider_modification, provider_addition};
  };
  const onSubmit = (data: ISubmitData) => {
    if (!data.doctor.some((data: IDoctorDetails) => data.is_primary)) {
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.ERROR2,
          firstMessage:
            'Please set any one Doctor as Primary Doctor to save the details.',
        }),
      );
      return false;
    } else {
    const doctorParams: ISubmitParamsData = fetchDetails(data.doctor, 'doctor');
    const dentistParams: ISubmitParamsData = fetchDetails(
      data.dentist,
      'dentist',
    );
    const pharmacyParams: any = fetchDetails(data.pharmacy, 'pharmacy');

    const providerInfo = {
      dentistParams,
      doctorParams,
      dentistDeletion,
      doctorDeletion,
      pharmacyParams,
      pharmacyDeletion,
    };

    const trimmedProviderData = trimValues(providerInfo);

      saveProviderInfo({
        dentist: {
          ...trimmedProviderData.dentistParams,
          provider_deletion: trimmedProviderData.dentistDeletion,
        },
        doctor: {
          ...trimmedProviderData.doctorParams,
          provider_deletion: trimmedProviderData.doctorDeletion,
        },
        pharmacy: {
          ...trimmedProviderData.pharmacyParams,
          provider_deletion: trimmedProviderData.pharmacyDeletion,
        },
      }).then((res: ISubmitData) => {
        setValue('doctor', getMaskedData(res?.doctor));
        setValue('dentist', getMaskedData(res?.dentist));
        if (res?.pharmacy && !isEmpty(res?.pharmacy)) {
          const pharmacyData = getMaskedData(res?.pharmacy, true);
          setValue('pharmacy', pharmacyData);
          setPharmacyDetails(pharmacyData);
        }
      });
    }
  };

  const renderCancelButton = () => {
    return (
      <Button
        size='large'
        color='primary'
        variant='outlined'
        className={addUserClasses.cancelButton}
        data-testid='cancel-button'>
        Cancel
      </Button>
    );
  };

  const renderSaveButton = () => {
    return (
      <Button
        size='large'
        color='primary'
        variant='contained'
        data-testid = 'buttonSave'
        className={classes.buttonStyle}
        type='submit'>
        Save
      </Button>
    );
  };

  return (
    <>
      <Box className={addUserClasses.title}>
        <span>Provider Info</span>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} data-testid = 'providerInfoForm'>
        <Doctor
          errors={errors}
          control={control}
          register={register}
          defaultValues={defaultValues}
          doctorDeletion={doctorDeletion}
          setDoctorDeletion={setDoctorDeletion}
          doctorDetails={doctorDetails}
          setDoctorDetails={setDoctorDetails}
        />
        <Dentist
          errors={errors}
          control={control}
          register={register}
          defaultValues={defaultValues}
          dentistDeletion={dentistDeletion}
          setDentistDeletion={setDentistDeletion}
        />
        <Pharmacy
          errors={errors}
          control={control}
          setValue={setValue}
          register={register}
          getValues={getValues}
          pharmacyDetails={pharmacyDetails}
          pharmacyDeletion={pharmacyDeletion}
          defaultValues={defaultPharmacyValues}
          setPharmacyDetails={setPharmacyDetails}
          setPharmacyDeletion={setPharmacyDeletion}
        />
        <Box className={classes.buttonContainerStyle}>
          {renderCancelButton()}
          {renderSaveButton()}
        </Box>
      </form>
    </>
  );
};

export {ProviderInfoComponent};
