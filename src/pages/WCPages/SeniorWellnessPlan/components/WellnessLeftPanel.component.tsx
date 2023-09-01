import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {Box, Typography} from '@mui/material';
import clsx from 'clsx';

import {InputFields} from 'common/InputFields';

import {WellnessLeftPanelStyle} from './WellnessLeftPanel.style';

const WellnessLeftPanel = React.memo(({data, setData}: any) => {
  const {classes} = WellnessLeftPanelStyle();
  const {isLatestVersion} = useAppSelector((state: any) => state.wellnessPlan);

  const handleChange = (key: any, e: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        value: e.target.value,
        error: false,
        errorText: '',
      },
    }));
  };

  return (
    <Box className={classes.leftSideFieldsContainer}>
      <RenderField
        stateKey='situation'
        label='Situation'
        placeholder='Please enter situation here'
        isError={data['situation'].error}
        errorText={data['situation'].errorText}
        handleChange={handleChange}
        value={data['situation'].value}
        disabled={!isLatestVersion}
      />
      <RenderField
        stateKey='background'
        label='Background'
        placeholder='Please enter background here'
        isError={data['background'].error}
        errorText={data['background'].errorText}
        handleChange={handleChange}
        value={data['background'].value}
        disabled={!isLatestVersion}
      />
      <RenderField
        stateKey='assessment'
        label='Assessment'
        placeholder='Please enter assessment here'
        isError={data['assessment'].error}
        errorText={data['assessment'].errorText}
        handleChange={handleChange}
        value={data['assessment'].value}
        disabled={!isLatestVersion}
      />
      <RenderField
        stateKey='recommendation'
        label='Recommendation'
        placeholder='Please enter recommendation here'
        isError={data['recommendation'].error}
        errorText={data['recommendation'].errorText}
        handleChange={handleChange}
        value={data['recommendation'].value}
        disabled={!isLatestVersion}
      />
    </Box>
  );
});

const RenderField = React.memo(
  ({
    stateKey,
    label,
    placeholder,
    isError,
    errorText,
    handleChange,
    value,
    disabled,
  }: any) => {
    const {classes} = WellnessLeftPanelStyle();
    return (
      <Box display='flex' flexDirection='column'>
        <Typography
          className={clsx(classes.fieldsHeading, {
            [classes.errorText]: isError,
          })}
          variant='h6'
          style={{fontWeight: 500}}>
          {label}
          <Box component='span' className={classes.errorText}>
            *
          </Box>
        </Typography>
        <InputFields
          isError={isError}
          errorText={errorText}
          eventProps={{
            onChange: (e: any) => handleChange(stateKey, e),
            value: value || '',
          }}
          inputProps={{
            name: stateKey,
            placeholder: placeholder,
            required: true,
            maxLength: 2000,
            disabled: disabled,
            style: {padding: 0},
          }}
          multiline={true}
          rows={4}
        />
      </Box>
    );
  },
);

export default WellnessLeftPanel;
