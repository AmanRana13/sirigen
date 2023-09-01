import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {useForm} from 'react-hook-form';
import {cloneDeep, get} from 'lodash';
import {Box, InputAdornment} from '@mui/material';

import {Fields} from 'common/Fields';
import {roundOff} from 'globals/global.functions';
import {DIALOG_TYPES, REGEX} from 'globals/global.constants';
import {openDialog} from 'store/commonReducer/common.action';

import {thresholdsStyle} from './Threshold.style';
import ThresholdActionButtons from './ThresholdActionButtons';
import {
  resetVitalThresholdData,
  submitThresholdConfig,
  updateOnChangeActiveRange,
} from '../Threshold.action';
import ThresholdGraph from './Threshold.graph.component';
import ThresholdHistory from './ThresholdHistory';

const validationSetting = {
  required: 'Required Field',
  validate: {
    value: (value: any) => {
      if (!value.match(REGEX.ONLY_NUMBER_ONE_DEC)) {
        return 'Only 1 digit after decimal allowed';
      }
      if (parseInt(value) === 0) {
        return 'Please enter value greater than 0 ';
      }
    },
  },
};

const initialFieldState = {
  upHigh: {
    name: 'upHigh',
    label: 'Set Up/Hi',
    value: null,
    disabled: false,
    validation: validationSetting,
    order: 1,
  },
  lowLow: {
    name: 'lowLow',
    label: 'Set Low/Low',
    value: null,
    disabled: false,
    validation: validationSetting,
    order: 3,
  },
};

const threshholdDisabledFieldsData = [
  {
    name: 'upperHigh',
    dependent: 'upHigh',
    rules: (upHigh: any, bsHigh: any) => (upHigh / 100) * bsHigh,
    label: 'High Range',
    disabled: true,
    value: 0,
    seq: 1,
    order: 2,
  },
  {
    name: 'lowerLow',
    dependent: 'lowLow',
    rules: (lowLow: any, bsLow: any) => (lowLow / 100) * bsLow,
    label: 'Low Range',
    disabled: true,
    value: 0,
    seq: 5,
    order: 4,
  },
];

const ThresholdFields = ({
  baseline,
  setPercentile,
  percentile,
  highCutOff,
  lowCutOff,
  actual,
}: any) => {
  const {classes} = thresholdsStyle();

  const selectedVital = useAppSelector(
    (state: any) => state.seniorCareInsights.thresholds.selectedVital,
  );
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
    reset,
    setValue,
    watch,
  } = useForm();
  const dispatch: any = useAppDispatch();

  const threshold = selectedVital.threshold;
  const {measurementName} = selectedVital;
  const [currentMeasurement, setCurrentMeasurement] = React.useState('');
  const [threshholdDisabledFields, setThreshholdDisabledFields] =
    React.useState(cloneDeep(threshholdDisabledFieldsData));

  const upHighValue = watch('upHigh');
  const lowLowValue = watch('lowLow');

  const storageData = React.useMemo(() => {
    const arr = [];

    const temp: any = {
      ...initialFieldState,
      upHigh: {
        ...initialFieldState.upHigh,
        value: upHighValue,
      },
      lowLow: {
        ...initialFieldState.lowLow,
        value: lowLowValue,
      },
    };

    for (const [key] of Object.entries(temp)) {
      arr.push(temp[key]);
    }
    return arr;
  }, [lowLowValue, upHighValue]);

  const disabledFieldsData = React.useMemo(() => {
    const thresholdObj: any = {
      upperHigh: 0,
      upperLow: 0,
      lowerHigh: 0,
      lowerLow: 0,
    };

    threshholdDisabledFields.forEach((data) => {
      const rangeValue: any = threshold[data.dependent];

      if (data.dependent == 'upHigh') {
        thresholdObj.upperHigh =
          (rangeValue >= 0 &&
            Number(
              roundOff(data.rules(parseFloat(rangeValue), baseline.high)),
            )) ||
          '';
        data.value = thresholdObj.upperHigh || '-';
      } else if (data.dependent == 'lowLow') {
        thresholdObj.lowerLow =
          (rangeValue >= 0 &&
            Number(
              roundOff(data.rules(parseFloat(rangeValue), baseline.low)),
            )) ||
          '';
        data.value = thresholdObj.lowerLow || '-';
      }
    });
    return [...threshholdDisabledFields].sort((a, b) => a.seq - b.seq);
  }, [threshold, baseline.high, baseline.low, threshholdDisabledFields]);

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    if (value.match(REGEX.ONLY_NUMBER_ONE_DEC)) {
      dispatch(updateOnChangeActiveRange(evt));
    }
  };

  const handleClear = () => {
    const openDialogProp = {
      firstMessage: 'Are you sure you want to',
      boldMessage: 'Clear Input Fields',
      secondMessage: '?',
      successButtonText: 'Confirm',
      isFailButton: true,
      type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
      onSuccessButton: () => {
        reset();
        dispatch(resetVitalThresholdData());
      },
    };

    dispatch(openDialog({...openDialogProp}));
  };

  const onSubmit = (data: any) => {
    dispatch(
      submitThresholdConfig(data, threshholdDisabledFields, actual, baseline),
    );
  };

  React.useEffect(() => {
    if (currentMeasurement && currentMeasurement !== measurementName) {
      setThreshholdDisabledFields(cloneDeep(threshholdDisabledFieldsData));
      clearErrors(); // remove formfields error on vital change.
    }
    setCurrentMeasurement(measurementName);
  }, [measurementName]);

  React.useEffect(() => {
    setValue('upHigh', threshold.upHigh);
    setValue('lowLow', threshold.lowLow);
  }, [setValue, threshold]);
  //className={classes.thresholdFieldsContainer}
  // className={classes.disabledFieldsContainer}
  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.thresholdFieldsContainer}>
        <Box className={classes.disabledFieldsContainer}>
          {disabledFieldsData.map((field) => {
            return (
              <Box width='14%' key={field.name} order={field.order}>
                <Fields
                  defaultValue={0}
                  fontSize='large'
                  rules={{required: 'Required Field'}}
                  label={field.label}
                  disabled={true}
                  value={field.value}
                />
              </Box>
            );
          })}
          {storageData.map((field) => {
            return (
              <Box width='14%' key={field.name} order={field.order}>
                <Fields
                  fontSize='large'
                  autoComplete='off'
                  errorField={errors[field.name]}
                  errorText={get(errors, `${field.name}.message`)}
                  disabled={field.disabled}
                  value={field.value}
                  {...register(field.name, field.validation)}
                  onChange={handleChange}
                  label={field.label}
                  required={true}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>%</InputAdornment>
                    ),
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <ThresholdGraph
        setPercentile={setPercentile}
        percentile={percentile}
        highCutOff={highCutOff}
        lowCutOff={lowCutOff}
        selectedVital={selectedVital}
        baseline={baseline}
        actual={actual}
      />
      <ThresholdHistory
        tableData={selectedVital.array}
        highCutOff={highCutOff}
        lowCutOff={lowCutOff}
        filter={selectedVital.tableFilterValue}
      />
      <ThresholdActionButtons handleClear={handleClear} />
    </Box>
  );
};

export default ThresholdFields;
