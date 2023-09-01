import React from 'react';
import {TextField, Box, IconButton} from '@mui/material';
import {useFieldArray, Controller} from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {Fields} from 'common/Fields';
import {Label} from 'common/Input';

import {medicalInfoStyle} from '../MedicalInfo.style';

const PrescriptionFieldArray = ({nestIndex, control, section, watch}: any) => {
  const {fields, remove, append} = useFieldArray({
    control,
    name: `prescription[${nestIndex}].[${section}]`,
  });
  const {classes} = medicalInfoStyle();

  const {frequency} = watch(`prescription[${nestIndex}]`);

  let timeArray = {};
  for (let i = 1; i <= parseInt(frequency); i++) {
    timeArray = {
      ...timeArray,
      [`time${i}`]: '',
    };
  }

  const RenderTimeInputView = ({option, index}: any) => {
    return (
      <>
        {Array.from(Array(parseInt(frequency)).keys()).map(
          (item: any, i: any) => {
            return (
              <Box
                mr={2}
                key={`${i}-prescription[${nestIndex}].[${section}][${index}]`}>
                <Controller
                  name={`prescription[${nestIndex}].[${section}][${index}].[time${
                    i + 1
                  }]`}
                  control={control}
                  render={({field}: any) => {
                    return (
                      <TextField
                        {...field}
                        className={classes.timePicker}
                        type='time'
                      />
                    );
                  }}
                  defaultValue={option[`time${i + 1}`]}
                />
              </Box>
            );
          },
        )}
      </>
    );
  };

  return (
    <Box mt={3} ml={3}>
      <Label>Medical Schedule</Label>
      {fields.map((option: any, index) => (
        <Box key={option.id} className={classes.medicalScheduleContainer}>
          <Box className={classes.medicalSchedule}>
            <Box ml={2} mr={2} mt={1} width={120}>
              <Fields
                menu={true}
                menuItems={[
                  'Everyday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ]}
                defaultValue={option.day}
                name={`prescription[${nestIndex}].[${section}][${index}].[day]`}
                white={true}
                control={control}
              />
            </Box>

            {parseInt(frequency) < 7 && (
              <RenderTimeInputView option={option} index={index} />
            )}
          </Box>
          {index == 0 ? (
            <IconButton
              className={classes.iconButtonStyle}
              onClick={() => {
                append({
                  ...timeArray,
                  day: '',
                });
              }}
              size='large'>
              <AddCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.iconButtonStyle}
              onClick={() => {
                remove(index);
              }}
              size='large'>
              <HighlightOffIcon />
            </IconButton>
          )}
        </Box>
      ))}
    </Box>
  );
};
export default PrescriptionFieldArray;
