import React, {useState, useEffect} from 'react';
import {
  Box,
  Grid,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Autocomplete from '@mui/material/Autocomplete';
import {useForm} from 'react-hook-form';

import {CardWrapper} from 'common/sections/CardWrapper';
import {Fields} from 'common/Fields';
import {InputCheckBox, InputSelect} from 'common/Input';

import {addUserStyle} from '../AddUser.style';
import {SurveyStyle} from './Survey.style';
import {MedicalConditionForm, ActivityForm} from './FormData';

const RenderSortDiseseOption = React.memo(
  ({SurveyForm, setSurveyForm}: any) => {
    const sortFunction = (a: any, b: any) => {
      if (a.name != 'extra') {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
      }
      return 0;
    };

    const sortForm = (SurveyForm: any) => {
      return SurveyForm.MedicalConditionForm.sort((a: any, b: any) =>
        sortFunction(a, b),
      );
    };
    const handleSortDiseseChange = (event: any) => {
      const newMedicalConditionForm = sortForm(SurveyForm);

      if (event.target.value == 'alphabet') {
        setSurveyForm({
          ...SurveyForm,
          MedicalConditionForm: newMedicalConditionForm,
        });
      }
    };

    return (
      <InputSelect
        style={{width: 150, marginLeft: 10}}
        defaultValue=''
        variant='outlined'
        onChange={handleSortDiseseChange}
        displayEmpty>
        <MenuItem value='' disabled>
          Sort
        </MenuItem>
        <MenuItem value='category'>Category</MenuItem>
        <MenuItem value='alphabet'>Alphabetical</MenuItem>
      </InputSelect>
    );
  },
);

// TODO - NEED TO REFACTOR THIS COMPONENT *IMPORTANT*
const SurveyComponent = ({surveyInfo, saveSurveyInfo, fetchDiseases}: any) => {
  const requestBody: any = {
    disease_modification: [],
    disease_deletion: [],
    survey_modification: [],
  };
  const {classes} = SurveyStyle();
  const {classes: addUserClasses} = addUserStyle();
  const [SurveyForm, setSurveyForm] = React.useState({
    MedicalConditionForm: [...MedicalConditionForm],
    ActivityForm,
    counter: 0,
  });
  const [checkedValues, setCheckedValues] = useState<any>([]);

  const [medicationField, setMedicationField] = useState<any>(undefined);
  const [otherDisease, setOtherDisease] = useState<any>([]);
  const {register, control, handleSubmit, getValues, setValue} = useForm();

  const formData: any = [
    {fields: SurveyForm.MedicalConditionForm},
    {fields: SurveyForm.ActivityForm},
  ];
  const onSubmit = (data: any) => {
    const userInputValues = Object.keys(data)
      .filter((item) => {
        if (data[item]) return item;
      })
      .map((item1) => ({field: item1, value: data[item1]}));

    //prepare deletion request body

    surveyInfo?.diseases?.forEach((diesease: any) => {
      if (!checkedValues.includes(diesease.name)) {
        requestBody.disease_deletion.push(diesease);
      }
    });

    userInputValues.forEach((userInput) => {
      const diseasesField = formData[0].fields.find((field: any) => {
        return field.name == userInput.value;
      });

      const livingAssesmentField = formData[1].fields.find(
        (field: any) => field.name == userInput.field,
      );

      let params = {};

      if (diseasesField) {
        params = {
          name: diseasesField.label,
        };
        requestBody.disease_modification.push(params);
      } else if (livingAssesmentField) {
        params = {
          field_type: 'dropdown',
          field_id: livingAssesmentField.name,
          label_text: livingAssesmentField.label,
          field_value: {
            data: data[livingAssesmentField.name],
            other_values: [livingAssesmentField.menuItems],
          },
        };

        requestBody.survey_modification.push(params);
      }
    });

    saveSurveyInfo(requestBody);
  };

  const handleCheckbox = React.useCallback(
    (e:any) => {
      const checkedName = e.target.name;
      const newNames = checkedValues?.includes(checkedName)
        ? checkedValues?.filter((name: any) => name !== checkedName)
        : [...(checkedValues ?? []), checkedName];
      setCheckedValues(newNames);
      return newNames;
    },
    [checkedValues],
  );

  useEffect(() => {
    return () => {
      setSurveyForm({
        MedicalConditionForm: [...MedicalConditionForm],
        ActivityForm,
        counter: 0,
      });
    };
  }, []);

  useEffect(() => {
    let checkedArray: any = [];

    surveyInfo?.diseases?.map((data: any) => {
      checkedArray.push(data.name);
    });

    const additionalMedContionOptions = [];
    for (const value of checkedArray) {
      const apiResOptions = value;
      const existingOptions = SurveyForm.MedicalConditionForm.find(
        (op) => op.name === apiResOptions,
      );
      if (!existingOptions) {
        additionalMedContionOptions.push({
          name: apiResOptions,
          label: apiResOptions,
          checkbox: true,
          checked: true,
        });
      }
    }

    additionalMedContionOptions?.forEach((item) => {
      checkedArray.push(item.name);
    });
    const newMedicalConditionForm = SurveyForm.MedicalConditionForm;
    newMedicalConditionForm.splice(
      newMedicalConditionForm.length - 1,
      0,
      ...additionalMedContionOptions,
    );

    setSurveyForm((prevState) => ({
      ...prevState,
      counter: additionalMedContionOptions.length
        ? additionalMedContionOptions.length
        : prevState.counter,
      MedicalConditionForm: newMedicalConditionForm,
    }));

    setCheckedValues((prevState: any) => {
      return [...prevState, ...checkedArray];
    });
    const medications = surveyInfo?.medical_survey?.find(
      (data: any) => data.field_id === 'medications',
    );
    if (medications) {
      medications?.field_value?.data == 'No'
        ? setMedicationField(true)
        : setMedicationField(false);
    } else {
      surveyInfo?.medical_survey?.map((data: any) => {
        setValue(data.field_id, data.field_value.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyInfo]);

  useEffect(() => {
    surveyInfo?.medical_survey?.map((data: any) => {
      setValue(data.field_id, data.field_value.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicationField]);

  const onHandleChange = (event: any) => {
    if (event.name === 'medications') {
      setMedicationField(event.target.dataset.value === 'No' ? true : false);
    }
  };

  const fetchAutoSuggestion = (event: any) => {
    const word = event.target.value;
    fetchDiseases(word).then((res: any) => {
      const response: any = [];
      res.forEach((resOption: any) => {
        const existingOptions = SurveyForm.MedicalConditionForm.find(
          (op) => op.name === resOption,
        );

        if (!existingOptions) {
          response.push(resOption);
        }
      });
      setOtherDisease(response);
    });
  };
  const renderInputField = (field: any, index: any) => {
    if (field.menu) {
      return (
        <Fields
          {...field}
          onClose={(e: any) => onHandleChange({...e, name: field.name})}
          name={field.name}
          control={control}
        />
      );
    } else if (field.checkbox) {
      return (
        <FormControlLabel
          key={index}
          control={
            <InputCheckBox
              checked={checkedValues.includes(field.name)}
              onChange={handleCheckbox}
              value={field.name}
            />
          }
          label={<Typography variant='body1'>{field.label}</Typography>}
          name={field.name}
          inputRef={register}
        />
      );
    } else if (field.autocomplete) {
      return (
        <Autocomplete
          id='medical-condition-autocomplete'
          data-testid = 'medicalConditionAutoComplete'
          className={classes.autocomplete}
          freeSolo
          options={otherDisease.map((option: any) => option)}
          renderInput={(params) => (
            <Fields
              {...field}
              style={{marginTop: field.label ? 0 : 15}}
              onChange={fetchAutoSuggestion}
              {...params}
              name={field.name}
              register={register}
            />
          )}
        />
      );
    } else if (field.button) {
      return (
        <IconButton
          className={classes.iconButtonStyle}
          data-testid = 'addOtherMedicalCondition'
          onClick={addOtherMedicalCondition}
          size='large'>
          <AddCircleIcon />
        </IconButton>
      );
    } else if (field.blank) {
      return <div />;
    } else {
      return (
        <Fields
          {...field}
          style={{marginTop: field.label ? 0 : 15}}
          name={field.name}
          register={register}
        />
      );
    }
  };
  const addOtherMedicalCondition = () => {
    const disease = getValues('other_medical_name');
    if (disease) {
      const newMedicalConditionForm = SurveyForm.MedicalConditionForm;
      newMedicalConditionForm.splice(newMedicalConditionForm.length - 1, 0, {
        checked: true,
        name: disease,
        label: disease,
        checkbox: true,
      });
      setSurveyForm({
        ...SurveyForm,
        MedicalConditionForm: newMedicalConditionForm,
        counter: SurveyForm.counter + 1,
      });

      setCheckedValues((prevState: any) => {
        return [...prevState, disease];
      });
    }
  };

  const renderOtherMedicalCondition = (field: any) => {
    return (
      <Grid container style={{margin: '0 0px'}} spacing={3}>
        {field.options.map((option: any, key: any) => {
          return (
            <Grid key={option.name} item xs={4}>
              {renderInputField(option, key)}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderForm = (form: any, index: any) => (
    <Grid
      justifyContent={index === 0 ? undefined : 'space-evenly'}
      className={classes.container}
      alignItems='center'
      container
      spacing={3}>
      {form.map((field: any, i: any) => {
        if (
          (field.name == 'medicationown' &&
            (medicationField || medicationField == undefined)) ||
          (field.name == 'medicationy' &&
            (!medicationField || medicationField == undefined)) ||
          (field.blank && medicationField == undefined)
        ) {
          return null;
        } else {
          if (index === 0 && field.name === 'extra') {
            return SurveyForm.counter < 8 && renderOtherMedicalCondition(field);
          } else {
            return (
              <Grid key={field.name} item xs={index === 0 ? 3 : 5}>
                {renderInputField(field, i)}
              </Grid>
            );
          }
        }
      })}
    </Grid>
  );

  const currentForm = React.useMemo(() => {
    return [
      {
        key: 'medicalConditionForm',
        form: SurveyForm.MedicalConditionForm,
      },
      {
        key: 'activityForm',
        form: SurveyForm.ActivityForm,
      },
    ];
  }, [SurveyForm]);

  return (
    <>
      <Box className={addUserClasses.title}>
        <span>Survey</span>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} data-testid='survey'>
        {currentForm.map((form, index) => (
          <CardWrapper
            key={form.key}
            subTitle={
              index == 0
                ? 'Medical Condition/Disease Assessment'
                : 'Activities for Daily Living Assessment'
            }>
            {index == 0 && (
              <RenderSortDiseseOption
                SurveyForm={SurveyForm}
                setSurveyForm={setSurveyForm}
              />
            )}
            {renderForm(form.form, index)}
          </CardWrapper>
        ))}
        <RenderFooterButton />
      </form>
    </>
  );
};

const RenderFooterButton = React.memo(() => {
  const {classes} = SurveyStyle();
  const {classes: addUserClasses} = addUserStyle();

  return (
    <Box className={classes.buttonContainerStyle}>
      <Button
        size='large'
        color='primary'
        variant='contained'
        data-testid = 'buttonCancel'
        className={addUserClasses.cancelButton}>
        Cancel
      </Button>
      <Button
        type='submit'
        size='large'
        color='primary'
        variant='contained'
        data-testid = 'buttonSave'
        className={addUserClasses.addUserButton}>
        Save
      </Button>
    </Box>
  );
});

export {SurveyComponent};
