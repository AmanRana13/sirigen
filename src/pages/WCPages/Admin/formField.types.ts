export interface IFormFields {
  [key: string]: IFormFieldsValue;
}

export interface IMenuItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}
export interface ISliderMarks {
  value: number;
  label: string;
}
export interface IFormFieldsValue {
  inputProps: IInputProps;
  initialValue?: string | number;
  initialLabel?: string;
  label?: string;
  marks?: ISliderMarks[];
  step?: number;
  validation?: IFormValidation;
  isLabel?: boolean;
  showRadioLabel?: boolean;
  masked?: boolean;
  menu?: boolean;
  radio?: boolean;
  slider?: boolean;
  radioItems?: IMenuItem[];
  menuItems?: IMenuItem[];
  inline?: boolean;
  isError?: boolean;
  errorText?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  date?: boolean;
  controlledDate?: boolean;
  controlledTime?: boolean;
  isErrorCustomeStyle?: boolean;
  disablePast?: boolean;
  className?: any;
  readOnly?: boolean;
  withBorder?: boolean;
  valueLabelDisplay?: string;
  addressOnChangeHandler?: () => {};
  fieldName?: string;
}

interface IFormValidation {
  required?: IFormValidationValue;
  pattern?: IFormValidationValue;
  custom?: IFormValidationValue;
}

interface IFormValidationValue {
  value?: any;
  message: string;
  isValid?: (value?: any, data?: any) => boolean;
}

interface IInputProps {
  name: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  style?: any;
  classes?: any;
  disabled?: boolean;
  dataTestid?: string;
  disablePast?: boolean;
}
