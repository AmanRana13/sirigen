import {IFormFieldsValue} from './formField.types';

export interface IRenderFormRowProps {
  data: IFormFieldsValue;
  setData: () => void;
  agent: any;
  errors: any;
  handleChange: () => void;
  editValues: any;
  setCustomError: () => void;
  handleOnBlur: (name: string) => void;
  disabled: boolean;
  handleResendOtp: (email: any) => void;
  showResendOTP: boolean;
  disableResendOTP: boolean;
}

export interface IRenderInputFieldsProps {
  data: any;
  setData: (data: any) => void;
  agent: any;
  errors: any;
  handleChange: (name: string) => void;
  editValues: any;
  handleOnBlur: (name: string) => void;
  isAgentRoleField: boolean;
  isDisableRoleField: boolean
}
