import React, {useEffect, useState} from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import get from 'lodash.get';

import {CardWrapper} from 'common/sections/CardWrapper';
import {Fields} from 'common/Fields';
import {InputCheckBox, Label} from 'common/Input';

import {ImageUploadCard} from './ImageUploadCard.component';

import {profileInfoStyle} from '../ProfileInfo.style';
import {FORM_ERROR_MESSAGES, LOCATION, REGEX} from 'globals/global.constants';
import {maskPhoneNumber} from 'globals/global.functions';

const SeniorInfo = ({
  register,
  watch,
  seniorInfoData,
  control,
  errors,
  Controller,
  setValue,
  uplaodImage,
  getImage,
  removeImage,
  setProfileImage,
  isProfileCreated,
  isOnboardingInfo,
}: any) => {
  const {classes} = profileInfoStyle();
  const radiusMeasurement = watch('senior_info.radius.radius_measurement');

  useEffect(() => {
    if (seniorInfoData) {
      const senior_info = seniorInfoData;
      if (senior_info.social_media_links[1]) {
        updateSML([
          {
            name: 'senior_info.social_media_links2',
            value: seniorInfoData.social_media_links[1],
          },
        ]);
      }

      if (senior_info.radius) {
        setValue(
          'senior_info.radius.value',
          parseInt(senior_info.radius.value),
        );
        setValue(
          'senior_info.radius.radius_measurement',
          senior_info.radius.radius_measurement,
        );
      }
      setValue(
        'senior_info.emergency_phone',
        maskPhoneNumber(senior_info.emergency_phone),
      );
      setValue('senior_info.preferred_name', senior_info.preferred_name);
      setValue('senior_info.weight', parseInt(senior_info.weight));
      setValue('senior_info.height.feet', parseInt(senior_info.height.feet));
      setValue('senior_info.height.inch', parseInt(senior_info.height.inch));
      setValue(
        'senior_info.home_phone',
        maskPhoneNumber(senior_info.home_phone),
      );

      setValue('senior_info.faith', senior_info.faith);
      setValue('senior_info.home_technology', senior_info.home_technology);
      setValue('senior_info.academic_level', senior_info.academic_level);
      setValue('senior_info.career', senior_info.career);
      setValue(
        'senior_info.primary_spoken_language',
        senior_info.primary_spoken_language,
      );
      setValue(
        'senior_info.other_spoken_language',
        senior_info.other_spoken_language,
      );
      setValue(
        'senior_info.race',
        senior_info.other_race ? 'Other' : senior_info.race,
      );
      setValue('senior_info.other_race', senior_info.other_race);
      setCheckedValues(senior_info.pets || []);
      setValue('senior_info.pets', senior_info.pets);
      setValue('senior_info.other_pets', senior_info.other_pets);
      setValue(
        'senior_info.social_media_links',
        senior_info.social_media_links[0],
      );
      setValue(
        'senior_info.social_media_links2',
        senior_info.social_media_links[1],
      );
      setValue('senior_info.life_event', senior_info.life_event);
      setValue('senior_info.home_entry', senior_info.home_entry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seniorInfoData]);

  const pets = [
    {
      name: 'Dogs',
      label: 'Dogs',
    },
    {
      name: 'Cats',
      label: 'Cats',
    },
    {
      name: 'Birds',
      label: 'Birds',
    },
    {
      name: 'Others',
      label: 'Others',
    },
  ];

  const [checkedValues, setCheckedValues] = useState<any>([]);
  const [moreSocialMediaLinks, updateSML] = useState<any>([]);
  const handleSelect = (checkedName: any) => {
    const newNames = checkedValues?.includes(checkedName)
      ? checkedValues?.filter((name: any) => name !== checkedName)
      : [...(checkedValues ?? []), checkedName];
    setCheckedValues(newNames);
    setValue('senior_info.pets', newNames);
    return newNames;
  };
  const addMoreSocialMedia = () => {
    updateSML([{name: 'senior_info.social_media_links2', value: ''}]);
  };

  const deleteMoreSocialMedia = () => {
    updateSML([]);
  };

  const disableAddMoreSocialMedia = React.useMemo(() => {
    return moreSocialMediaLinks.length >= 1;
  }, [moreSocialMediaLinks]);

  const ethnicityValue = watch('senior_info.race');

  return (
    <CardWrapper subTitle="Senior's Info" isExpanded={isProfileCreated}>
      {isOnboardingInfo && (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Fields
              name='senior_info.preferred_name'
              label='Preferred Name'
              value={null}
              helperText='Johnny'
              {...register('senior_info.preferred_name', {maxLength: 50})}
            />
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.inlineFormField}>
              <Box>
                <Fields
                  name='senior_info.weight'
                  label='Weight'
                  required={true}
                  inline={true}
                  unitValue='Lbs'
                  spacing={true}
                  {...register('senior_info.weight', {
                    required: 'Weight is required',
                    maxLength: {
                      value: 3,
                      message: 'Max 3 digit is allowed in weight',
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'Only Numbers allowed in weight',
                    },
                  })}
                  errorField={get(errors, 'senior_info.weight')}
                />
              </Box>
              <Box display='flex'>
                <Box>
                  <Fields
                    name='senior_info.height.feet'
                    label='Height'
                    required={true}
                    inline={true}
                    unitValue='Ft'
                    spacing={true}
                    {...register('senior_info.height.feet', {
                      required: 'Height(Ft) is required',
                      maxLength: {
                        value: 1,
                        message: 'Max 1 digit is allowed for height(Ft)',
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: 'Only Numbers allowed for height(Ft)',
                      },
                    })}
                    errorField={get(errors, 'senior_info.height.feet')}
                  />
                </Box>

                <Fields
                  id='Height-in'
                  name='senior_info.height.inch'
                  inline={true}
                  unitValue='In'
                  {...register('senior_info.height.inch', {
                    required: 'Height(In) is required',
                    min: {
                      value: 0,
                      message: 'Value must be between 0-11 in height(In)',
                    },
                    max: {
                      value: 11,
                      message: 'Value must be between 0-11 in height(In)',
                    },
                    maxLength: {
                      value: 2,
                      message: 'Max 2 digit is allowed in height(In)',
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'Only Numbers allowed in height(In)',
                    },
                  })}
                  errorField={get(errors, 'senior_info.height.inch')}
                />
              </Box>
            </Box>
            <Typography variant='subtitle1' className={classes.errorText}>
              {get(errors, 'senior_info.weight.message')}
            </Typography>
            <Typography variant='subtitle1' className={classes.errorText}>
              {get(errors, 'senior_info.height.feet.message')}
            </Typography>
            <Typography variant='subtitle1' className={classes.errorText}>
              {get(errors, 'senior_info.height.inch.message')}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.emergency_phone'
              masked={true}
              label='Local 911 Phone'
              helperText='(xxx) xxx-xxxx'
              {...register('senior_info.emergency_phone', {
                minLength: {
                  value: 14,
                  message: '10 digits required',
                },
              })}
              errorField={get(errors, 'senior_info.emergency_phone')}
              errorText={get(errors, 'senior_info.emergency_phone.message')}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.home_phone'
              masked={true}
              label='Home Phone'
              helperText='(xxx) xxx-xxxx'
              {...register('senior_info.home_phone', {
                minLength: {
                  value: 14,
                  message: '10 digits required',
                },
              })}
              errorField={get(errors, 'senior_info.home_phone')}
              errorText={get(errors, 'senior_info.home_phone.message')}
            />
          </Grid>

          <Grid item xs={4}>
            <Box className={classes.radiusBox}>
              <Box width='65%'>
                {radiusMeasurement === 'feet' ? (
                  <Fields
                    name='senior_info.radius.value'
                    label='Set Radius'
                    {...register('senior_info.radius.value', {
                      required: 'Required Field',
                      min: {
                        value: 657,
                        message: 'Radius value should be greater than 656ft',
                      },
                      pattern: {
                        value: REGEX.BLANK_FIELD,
                        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
                      },
                    })}
                    required={true}
                    inline={true}
                    errorField={get(errors, 'senior_info.radius.value')}
                    errorText={get(errors, 'senior_info.radius.value.message')}
                  />
                ) : (
                  <Fields
                    name='senior_info.radius.value'
                    label='Set Radius'
                    {...register('senior_info.radius.value', {
                      required: 'Required Field',
                      min: {
                        value: 1,
                        message: 'Radius value should be greater than 0mi',
                      },
                      pattern: {
                        value: REGEX.BLANK_FIELD,
                        message: FORM_ERROR_MESSAGES.blankFieldErrorMessage,
                      },
                    })}
                    required={true}
                    inline={true}
                    errorField={get(errors, 'senior_info.radius.value')}
                    errorText={get(errors, 'senior_info.radius.value.message')}
                  />
                )}
              </Box>

              <Box className={classes.radiusMeasurement}>
                <Fields
                  name='senior_info.radius.radius_measurement'
                  required={true}
                  menu={true}
                  control={control}
                  rules={{
                    required: 'Required Field',
                  }}
                  menuItems={Object.values(LOCATION.RADIUS_MEASUREMENT)}
                  errorField={get(
                    errors,
                    'senior_info.radius.radius_measurement',
                  )}
                  errorText={get(
                    errors,
                    'senior_info.radiusMeasurement.message',
                  )}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Fields
              name='senior_info.faith'
              label='Faith/Religion'
              menu={true}
              control={control}
              menuItems={[
                'Christian',
                'Protestant',
                'Catholic',
                'Mormon',
                "Jehovah's Witness",
                'Orthodox Christian',
                'Unaffiliated',
                'Jewish',
                'Buddist',
                'Muslim',
                'Hindu',
                'Non-Christian',
                'Other',
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.home_technology'
              label='Home Technology'
              {...register('senior_info.home_technology')}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.academic_level'
              label='Highest Academic Level'
              menu={true}
              control={control}
              menuItems={[
                'None',
                'High School Diploma or GED',
                'Some College No Degree',
                'Associates Degree',
                'Bachelor Degree',
                'Masters Degree',
                'Professional Degree',
                'Doctoral Degree',
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.career'
              label='Career/Profession/Occupation'
              {...register('senior_info.career', {
                maxLength: {
                  value: 50,
                  message: 'Max 50 character is allowed',
                },
              })}
              errorField={get(errors, 'senior_info.career')}
              errorText={get(errors, 'senior_info.career.message')}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.primary_spoken_language'
              label='Primary Spoken Language'
              menu={true}
              control={control}
              menuItems={[
                'English',
                'Spanish',
                'Chinese',
                'Tagalog (Filipino)',
                'Vietnamese',
                'Arabic',
                'French',
                'Korean',
                'Russian',
                'German',
                'Hindi',
                'Italian',
                'Portuguese',
                'Other',
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.other_spoken_language'
              label='Other Spoken Language'
              {...register('senior_info.other_spoken_language', {
                maxLength: {
                  value: 50,
                  message: 'Max 50 character is allowed',
                },
              })}
              errorField={get(errors, 'senior_info.other_spoken_language')}
              errorText={get(
                errors,
                'senior_info.other_spoken_language.message',
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.race'
              label='Race/Ethnicity'
              menu={true}
              control={control}
              menuItems={[
                'American Indian',
                'Asian Indian',
                'Black or African American',
                'Chinese',
                'Dutch',
                'English',
                'Filipino',
                'French',
                'German',
                'Irish',
                'Italian',
                'Mexican',
                'Norwegian',
                'Polish',
                'Portuguese',
                'Puerto Rican',
                'Scotch-Irish',
                'Scottish',
                'Russian',
                'Other',
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.other_race'
              label='Other Ethnicity'
              {...register('senior_info.other_race', {
                maxLength: {
                  value: 50,
                  message: 'Max 50 character is allowed',
                },
              })}
              disabled={ethnicityValue != 'Other'}
              errorField={get(errors, 'senior_info.other_race')}
              errorText={get(errors, 'senior_info.other_race.message')}
            />
          </Grid>
          <Grid item xs={4}>
            <Label>Pets</Label>
            {pets.map((data) => (
              <FormControlLabel
                key={data.name}
                label={data.label}
                labelPlacement='end'
                control={
                  <Controller
                    name='senior_info.pets'
                    render={({field}: any) => {
                      return (
                        <InputCheckBox
                          checked={checkedValues.includes(data.name)}
                          onChange={() => handleSelect(data.name)}
                        />
                      );
                    }}
                    control={control}
                  />
                }
              />
            ))}
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.other_pets'
              label='Other Pets'
              disabled={checkedValues.includes('Others') ? false : true}
              {...register('senior_info.other_pets')}
            />
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Label>Social Media Link</Label>
              <Fields
                name='senior_info.social_media_links'
                center={true}
                {...register('senior_info.social_media_links')}
                extraComponent={
                  <IconButton
                    date-testid = 'buttonAddMoreSocialMedia'
                    onClick={addMoreSocialMedia}
                    disabled={disableAddMoreSocialMedia}
                    size='large'>
                    <AddCircleIcon
                      className={
                        !disableAddMoreSocialMedia
                          ? classes.addIcon
                          : classes.disableButton
                      }
                    />
                  </IconButton>
                }
              />
            </Box>
          </Grid>
          {moreSocialMediaLinks &&
            moreSocialMediaLinks.map((data: any) => (
              <Grid key={data.name} item xs={4}>
                <Fields
                  name={data.name}
                  label='Social Media Link'
                  {...register(data.name)}
                  center={true}
                  defaultValue={data.value}
                  extraComponent={
                    <CancelIcon
                      data-testid = 'buttonDeleteMoreSocialMedia'
                      onClick={deleteMoreSocialMedia}
                      className={classes.addIcon}
                    />
                  }
                />
              </Grid>
            ))}
          <Grid item xs={4}>
            <Label>Senior&apos;s Photos</Label>
            <Box className={classes.inlineFormField}>
              <ImageUploadCard
                uplaodImage={uplaodImage}
                setProfileImage={setProfileImage}
                removeImage={removeImage}
                getImage={getImage}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Fields
              name='senior_info.life_event'
              label='Life Events(Last 3 years)'
              rows={3}
              multiline={true}
              inputProps={{style: {padding: 0}}}
              {...register('senior_info.life_event')}
            />
          </Grid>
          <Grid item xs={4}>
            <Fields
              control={control}
              name='senior_info.home_entry'
              label='Home Entry Instruction'
              rows={3}
              multiline={true}
              inputProps={{style: {padding: 0}}}
              {...register('senior_info.home_entry', {
                maxLength: {
                  value: 500,
                  message: 'Max 500 character is allowed',
                },
              })}
              errorField={get(errors, 'senior_info.home_entry')}
              errorText={get(errors, 'senior_info.home_entry.message')}
            />
          </Grid>
        </Grid>
      )}
    </CardWrapper>
  );
};

export {SeniorInfo};
