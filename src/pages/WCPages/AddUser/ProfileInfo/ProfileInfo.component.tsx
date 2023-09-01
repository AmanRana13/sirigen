import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {Box, Button} from '@mui/material';

import SharedStorage from 'store/SharedStorage';
import {AccountInfo} from './components/AccountInfo.component';
import {SeniorInfo} from './components/SeniorInfo.component';
import {SeniorsPersona} from './components/SeniorsPersona.component';

import {addUserStyle} from '../AddUser.style';
import get from 'lodash.get';
import {trimValues} from 'globals/global.functions';

const ProfileInfoComponent = ({
  createAccount,
  fetchSeniorInfo,
  saveProfileInfo,
  uplaodImage,
  getImage,
  setProfileImage,
  removeImage,
  isOnboardingInfo,
}: any) => {
  const {classes} = addUserStyle();
  const param = useParams();
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: {errors},
    setValue,
  } = useForm();
  const [seniorInfo, setSeniorInfo] = useState<any>();
  const [location, setLocation] = React.useState<any>({});
  const [isProfileCreated, setIsProfileCreated] = React.useState<any>(false);

  useEffect(() => {
    if (isOnboardingInfo) {
      fetchSeniorInfo().then((res: any) => {
        setSeniorInfo(res);
        if (res?.minimalInfo?.address?.coordinates) {
          setLocation({
            coordinates: get(res, 'minimalInfo.address.coordinates', null),
            streetAddress: get(res, 'minimalInfo.address.street', null),
          });
        }

        SharedStorage.setNavigationEnable(res ? true : false);
        setIsProfileCreated(SharedStorage.navigationEnable);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = React.useCallback(
    (data: any) => {
      if (data.senior_info?.race === 'Other') {
        data.senior_info.race = null;
      } else {
        data.senior_info.other_race = null;
      }
      const trimmedData = trimValues(data);

      saveProfileInfo(trimmedData, param);
    },
    [param, saveProfileInfo],
  );

  return (
    <>
      <Box className={classes.title} data-testid = 'profileInfoBox'>
        <span>Profile Info</span>
      </Box>
      <AccountInfo
        createAccount={createAccount}
        accountDetail={seniorInfo?.minimalInfo}
        setIsProfileCreated={setIsProfileCreated}
        setSelectedLocation={setLocation}
        location={location}
        isProfileCreated={isProfileCreated}
      />
      <form onSubmit={handleSubmit(onSubmit)} data-testid='profileInfo-form'>
        <SeniorInfo
          register={register}
          watch={watch}
          seniorInfoData={seniorInfo?.basicInfo}
          control={control}
          errors={errors}
          uplaodImage={uplaodImage}
          setProfileImage={setProfileImage}
          removeImage={removeImage}
          getImage={getImage}
          setValue={setValue}
          Controller={Controller}
          isProfileCreated={isProfileCreated}
          isOnboardingInfo={isOnboardingInfo}
        />
        <SeniorsPersona
          setValue={setValue}
          seniorInfoData={seniorInfo?.persona}
          register={register}
          isProfileCreated={isProfileCreated}
        />
        <Box className={classes.bottomButton}>
          <Button
            type='button'
            size='large'
            color='primary'
            variant='outlined'
            data-testid = 'buttonCancel'
            className={classes.cancelButton}
            disabled={!isProfileCreated}>
            Cancel
          </Button>
          <Button
            type='submit'
            size='large'
            color='primary'
            variant='contained'
            data-testid = 'buttonSave'
            className={classes.saveButton}
            disabled={!isProfileCreated}>
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export {ProfileInfoComponent};
