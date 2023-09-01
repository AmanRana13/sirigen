import React, {useState, useEffect} from 'react';
import {Box, Grid} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useForm, useFieldArray} from 'react-hook-form';

import {isEmpty} from 'lodash';
import {CaregiverType} from 'globals/enums';
import {CardWrapper} from 'common/sections/CardWrapper';
import {DIALOG_TYPES} from 'globals/global.constants';
import {openOverlayDialog} from 'store/commonReducer/common.action';

import {addUserStyle} from '../AddUser.style';
import {careCircleStyle} from './CareCircle.style';
import {CareCircleButton} from './component/CareCircle.buttons';
import {RenderInputField} from './component/CareCircle.input';
import {createUser, saveCareGiverInfo} from './CareCircle.action';
import {fetchCaregivers, sequenceCaregiverInfo} from './CareCircle.utils';
import {defaultValues, formData} from './CareCircleFormData';
import {
  ICareGiverComponent,
  ICareGiverData,
  IFetchCareGiverData,
  IFormData,
  IUpdateCaregiverInfo,
} from './CareCircle.type';
import {trimValues} from 'globals/global.functions';
import {useAppDispatch} from 'hooks/reduxHooks';

const CareGiverComponent = ({careGiverInfo}: ICareGiverComponent) => {
  const dispatch: any = useAppDispatch();
  const {classes} = careCircleStyle();
  const {classes: addUserClasses} = addUserStyle();

  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [deletion, setDeletion] = useState<string[]>([]);
  const [careCircleRadioArray, setCareCircleRadioArray] = useState<any>([]);
  const [emergencyContactCareGiverId, setEmergencyContactCareGiverId] =
    useState('');

  /**
   * @function saveCareGiverInformation
   * @description to save the updated caregiver info
   * @param data
   */
  const saveCareGiverInformation = async (data: IUpdateCaregiverInfo) => {
    const params: IUpdateCaregiverInfo = {
      ...data,
      deletion: deletion,
    };
    try {
      //need to refactor await
      const response: any = await dispatch(saveCareGiverInfo(params));
      if (response) {
        const caregiverData = sequenceCaregiverInfo(response?.data);
        setEmergencyContact(caregiverData);
        setValue('caregivers', caregiverData);
        setIsUpdated(!isUpdated);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sequenceCaregiversData = sequenceCaregiverInfo(careGiverInfo);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    getValues,
    watch,
    setError,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      caregivers: sequenceCaregiversData
        ? sequenceCaregiversData
        : [defaultValues],
    },
  });
  const {fields, append, remove} = useFieldArray({
    name: 'caregivers',
    control,
  });

  /**
   * @function setEmergencyContact
   * @description to set Emergency contact
   */
  const setEmergencyContact = (data: ICareGiverData[]) => {
    const emergencyContactCaregiverInfo = checkAnyEmergencyContactTrue(data);

    if (emergencyContactCaregiverInfo) {
      setEmergencyContactCareGiverId(
        emergencyContactCaregiverInfo.caregiver_id,
      );
    }
  };

  /**
   * @description set emegency contact when we get data from API.
   */
  useEffect(() => {
    setEmergencyContact(careGiverInfo);
  }, [careGiverInfo]);

  const caregiverList = getValues().caregivers;

  /**
   * @function onSubmit
   * @description handle submittion of form
   * @param data
   */
  const onSubmit = async (data: IFetchCareGiverData) => {
    let paramsData: any = fetchCaregivers(
      data,
      careCircleRadioArray,
      emergencyContactCareGiverId,
    );
    if (!emergencyContactCareGiverId) {
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.ERROR2,
          firstMessage: `Please set any one contact as an Emergency`,
          secondMessage: `Contact to Save the Care Circle details`,
        }),
      );
    }
    if (emergencyContactCareGiverId) {
      const trimmedData = trimValues(paramsData);
      if (trimmedData.addition && trimmedData.addition.length > 0) {
        const response: any = await dispatch(createUser(trimmedData, deletion));
        if (response) {
          const caregiverData = sequenceCaregiverInfo(response?.data);
          setEmergencyContact(caregiverData);
          setValue('caregivers', caregiverData);
          setIsUpdated(!isUpdated);
        }
      } else {
        saveCareGiverInformation(trimmedData);
      }
    }
  };

  /**
   * @description to handle addition of new caregiver
   */
  const handleAddCaregiver = () => {
    append(defaultValues);
    setIsUpdated(!isUpdated);
  };

  /**
   * @description to handle deletion of caregiver
   * @param index
   * @param caregiver_id
   */
  const handleDeleteCaregiver = (index: number, caregiver_id: any) => {
    if (caregiver_id) {
      setDeletion([...deletion, caregiver_id]);
    }

    if (caregiver_id && emergencyContactCareGiverId === caregiver_id) {
      setEmergencyContactCareGiverId('');
    }
    remove(index);
    setIsUpdated(!isUpdated);
  };

  /**
   * @description method to check emergency contact
   * @function checkAnyEmergencyContactTrue
   * @param {*} caregiverData
   */
  const checkAnyEmergencyContactTrue = (arr: ICareGiverData[]) => {
    return arr?.find((item: ICareGiverData) => {
      return item.senior_info.emergency_contact === true;
    });
  };
  const disableSaveButton = React.useMemo(() => {
    const existingData = caregiverList || [];
    const setArr = new Set();
    existingData.forEach((element: ICareGiverData) => {
      setArr.add(element?.basic_info?.email);
    });

    return setArr.size < existingData.length || !isEmpty(errors);
  }, [caregiverList]);

  /**
   * @description to set the latest caregiver radio data into careCircleRadioArray state
   */
  React.useEffect(() => {
    let radioArray: any = [];
    fields.forEach((data: any) => {
      radioArray.push({
        caregiverId: data?.caregiver_id || data?.id,
        value: data?.senior_info?.caregiver_type || CaregiverType.SECONDARY,
        emergencyContact: data?.senior_info?.emergency_contact || false,
        livingWithSenior: data?.senior_info?.is_living_with_senior || false,
        powerOfAttorney: data?.senior_info?.has_power_of_attorney || false,
      });
    });
    if (isEmpty(careGiverInfo)) {
      radioArray[0].value = CaregiverType.PRIMARY;
    }
    setCareCircleRadioArray(radioArray);
  }, [isUpdated]);

  return (
    <>
      <Box className={addUserClasses.title} data-testid = 'careCircleContainer'>
        <span>Care Circle</span>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} data-testid='careCircleForm'>
        {fields.map((form: any, index) => {
          return (
            <Box key={form.id} data-testid = {`${form.id}`}>
              <CardWrapper subTitle={`Contact ${index + 1}`} isExpanded={true}>
                <Grid container spacing={3}>
                  {formData.map((inputField: IFormData) => (
                    <Grid key={inputField.label} item xs={4}>
                      <RenderInputField
                        inputField={inputField}
                        index={index}
                        form={form}
                        errors={errors}
                        setError={setError}
                        control={control}
                        setCareCircleRadioArray={setCareCircleRadioArray}
                        careCircleRadioArray={careCircleRadioArray}
                        register={register}
                        emergencyContactCareGiverId={
                          emergencyContactCareGiverId
                        }
                        setEmergencyContactCareGiverId={
                          setEmergencyContactCareGiverId
                        }
                        careGiverInfo={careGiverInfo}
                        caregiverList={caregiverList}
                        getValues={getValues}
                        watch={watch}
                      />
                    </Grid>
                  ))}
                </Grid>
                {fields.length > 1 && (
                  <CareCircleButton
                    onClick={() =>
                      handleDeleteCaregiver(index, form.caregiver_id || form.id)
                    }
                    icon={<DeleteRoundedIcon />}
                    variant='contained'
                    className={classes.deleteButtonStyle}
                    label='Delete Contact'
                    buttonStyle={classes.buttonStyle}
                  />
                )}
              </CardWrapper>
              {fields.length - 1 == index && (
                <>
                  <CareCircleButton
                    onClick={handleAddCaregiver}
                    icon={<AddCircleIcon />}
                    variant='contained'
                    className={classes.careGiverButtonContainer}
                    label='Add Contact'
                    buttonStyle={classes.buttonStyle}
                  />

                  <Box className={classes.buttonContainerStyle}>
                    <CareCircleButton
                      label='Cancel'
                      color='primary'
                      variant='outlined'
                      buttonStyle={addUserClasses.cancelButton}
                      disabled={disableSaveButton}
                    />
                    <CareCircleButton
                      type='submit'
                      label='Save'
                      variant='contained'
                      buttonStyle={classes.buttonStyle}
                      disabled={disableSaveButton}
                    />
                  </Box>
                </>
              )}
            </Box>
          );
        })}
      </form>
    </>
  );
};
export {CareGiverComponent};
