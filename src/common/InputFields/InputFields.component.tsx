import {Box} from '@mui/material';

import {Label} from 'common/Input';

import SelectDate from './component/SelectDate';
import SelectControlledDate from './component/SelectControlledDate';
import SelectControlledTime from './component/SelectControlledTime';
import InputTextWrapper from './component/InputTextWrapper';
import {fieldsStyle} from './InputFields.style';
import {IFormFieldsValue} from 'pages/WCPages/Admin/formField.types';
import InputSelectWrapper from './component/InputSelectWrapper';
import InputRadioWrapper from './component/InputRadioWrapper';
import {ProgressBar} from './component/ProgressBar';
import AutoCompleteField from 'common/Fields/Components/AutoCompleteField';

interface IInputFields extends IFormFieldsValue {
  eventProps?: any;
}

/**
 * @description component to access all the form fields
 * @return {JSX.Element} JSX
 */
const InputFields = (props: IInputFields): JSX.Element => {
  const {classes} = fieldsStyle();
  return (
    <Box width='100%'>
      {props.isLabel && (
        <Label
          htmlFor={props.label}
          className={classes.errorTextStyle}
          data-testid='field-label'>
          {props.label}
          {props.inputProps.required && `*`}
        </Label>
      )}

      <Box>
        <RenderComponent {...props} />
      </Box>
    </Box>
  );
};

const RenderComponent = (props: any) => {
  if (props.menu) {
    return <InputSelectWrapper {...props} />;
  } else if (props.radio) {
    return <InputRadioWrapper {...props} />;
  } else if (props.date) {
    return (
      <SelectDate
        label={props.label}
        errorField={props.isError}
        disableFutureDate={props.disableFutureDate}
        props={props}
        defaultValue={props.defaultValue}
        errorText={props.errorText}
      />
    );
  } else if (props.controlledDate) {
    return <SelectControlledDate {...props} />;
  } else if (props.controlledTime) {
    return <SelectControlledTime {...props} />;
  } else if (props.slider) {
    return <ProgressBar {...props} />;
  } else if (props.isAutoComplete) {
    return (
      <AutoCompleteField
        isNewDesign={true}
        defaultValue={props.eventProps.value}
        addressOnChangeHandler={props.addressOnChangeHandler}
        fieldName={props.fieldName}
        {...props}
      />
    );
  }
  return <InputTextWrapper {...props} />;
};

export {InputFields};
