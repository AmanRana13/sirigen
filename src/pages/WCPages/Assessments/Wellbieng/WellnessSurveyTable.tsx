import {Box, Typography} from '@mui/material';
import clsx from 'clsx';
import {InputFields} from 'common/InputFields';
import RemainingCharacters from 'common/RemainingCharacters/RemainingCharacters';
import {Float, ThemeVersion} from 'globals/enums';
import {APPLICATION_EVENTS} from 'globals/global.constants';
import React from 'react';
import {wellnessSurveyStyle} from './WellnessSurvey.style';
import {IWellnessSurveyTableProps} from './WellnessSurvey.type';
import {formData} from './WellnessSurveyData';
const WellnessSurveyTable = ({
  index,
  questionTitle,
  surveyData,
  setTableData,
  disabled,
  formError,
}: IWellnessSurveyTableProps) => {
  const [disableMoreOptions, setDisableMoreOptions] = React.useState(true);
  const {classes} = wellnessSurveyStyle();

  /**
   * @function updateSurveyData
   * @description handle change event of input field
   * @param value
   * @param fieldName
   */
  const updateSurveyData = (value: any, fieldName: string) => {
    setTableData((previousState: any) => {
      return {
        ...previousState,
        [questionTitle]: {
          ...previousState[questionTitle],
          ['value']: disableMoreOptions
            ? ''
            : previousState[questionTitle].value,
          [fieldName]: value,
        },
      };
    });
  };

  //handle negativity level options disability functionality
  React.useEffect(() => {
    const selectedOption = formData(questionTitle)?.options.filter(
      (item: any) => item.value === surveyData.measurement_name,
    )[0];
    setDisableMoreOptions(!selectedOption?.isMoreOption);
  }, [questionTitle, surveyData.measurement_name]);

  return (
    <Box mt={3} mb={6} data-testid='wellnessSurvey'>
      <Box display='flex' alignItems='center'>
        <Typography
          className={clsx({
            [classes.disabledText]: disabled,
            [classes.errorText]: !surveyData.measurement_name && formError,
          })}>{`${index}.`}</Typography>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          className={clsx({
            [classes.errorText]: !surveyData.measurement_name && formError,
          })}>
          <Box
            minWidth='32%'
            className={clsx({
              [classes.errorText]: !surveyData.measurement_name && formError,
            })}>
            <InputFields
              showRadioLabel={true}
              isError={!surveyData.measurement_name && formError}
              radio={true}
              className={clsx(classes.radioField, classes.radioLabel)}
              inputProps={{
                name: questionTitle,
                disabled: disabled,
              }}
              eventProps={{
                value: surveyData.measurement_name,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSurveyData(e.target.value, 'measurement_name'),
              }}
              radioItems={formData(questionTitle)?.options || []}
            />
          </Box>
          <Box
            maxWidth='52%'
            display='flex'
            alignItems='center'
            className={clsx({
              [classes.errorText]:
                !disableMoreOptions && !surveyData.value && formError,
            })}>
            <Box width={280} mr={1}>
              <Typography
                className={clsx({
                  [classes.disabledText]: disableMoreOptions || disabled,
                })}>
                {formData(questionTitle)?.moreOption.header}
                <Box
                  component='span'
                  className={clsx({
                    [classes.errorText]: !disableMoreOptions,
                  })}>
                  *
                </Box>
              </Typography>
            </Box>
            <InputFields
              showRadioLabel={true}
              isError={!disableMoreOptions && !surveyData.value && formError}
              radio={true}
              className={classes.radioField}
              inputProps={{
                required: true,
                name: questionTitle,
                disabled: disableMoreOptions || disabled,
              }}
              eventProps={{
                value: !disableMoreOptions ? surveyData.value : '',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  updateSurveyData(e.target.value, 'value'),
              }}
              radioItems={formData(questionTitle)?.moreOption.options || []}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={1} ml={3}>
        <InputFields
          inputProps={{
            placeholder: 'Enter comments here',
            name: questionTitle,
            required: true,
            disabled: disabled,
            maxLength: 500,
          }}
          eventProps={{
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              updateSurveyData(e.target.value, 'comment'),
            value: surveyData?.comment || '',
          }}
          multiline
          rows={3}
          isLabel={false}
          label=''
        />
        <RemainingCharacters
          limit={APPLICATION_EVENTS.wellnessSurvey.wellnessSurveyNotesCharCount}
          value={surveyData?.comment || ''}
          themeVersion={ThemeVersion.v2}
          float={Float.Right}
        />
      </Box>
    </Box>
  );
};
export default WellnessSurveyTable;
