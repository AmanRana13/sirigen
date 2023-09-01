export interface IUpdateCaregiverInfo {
  addition: ICareGiverData[];
  modification: ICareGiverData[];
  deletion?: string[];
}
export interface ICareGiverComponent {
  careGiverInfo: ICareGiverData[];
}
export interface IFetchCareGiverData {
  caregivers: ICareGiverData[];
}
export interface ICareGiverData {
  basic_info: ICareGiverBasicInfo;
  caregiver_id: string;
  senior_info: ICaregiverSeniorInfo;
}
export interface ICareGiverBasicInfo {
  email: string;
  gender: string;
  location: ICareGiverLocation;
  mobile_number: string;
  name: ICareGiverName;
}
export interface ICareGiverLocation {
  city: string;
  state: string;
  street: string;
  zipcode: string;
}
export interface ICareGiverName {
  first_name: string;
  middle_name: string;
  last_name: string;
}
export interface ICaregiverSeniorInfo {
  alternate_number: string;
  best_day_to_contact: string;
  best_time_to_contact: string;
  caregiver_type: string;
  emergency_contact: boolean;
  has_power_of_attorney: boolean;
  is_living_with_senior: boolean;
  relationship_with_senior: string;
}
export interface IRadioInputState {
  selectedCareGiverOption: string | null;
  powerAttorney: boolean;
  livingSenior: boolean;
  emergencyContact: boolean;
  selectedIndex: number;
}
export interface IDefaultValues {
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  mobile_number: string;
  alternate_contact: string;
  email: string;
  street: string;
  relationship_with_senior: string;
  best_day_to_contact: string;
  best_time_to_contact: string;
  caregiver_type: string;
  has_power_of_attorney: string;
  is_living_with_senior: string;
  emergency_contact: string;
}
export interface IFormData {
  name?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  isResendOTP?: boolean;
  validation?: IValidation;
  menu?: true;
  masked?: boolean;
  menuItems?: string[];
  emptyBox?: boolean;
  checkbox?: boolean;
  radio?: boolean;
  options?: ICheckBoxOption[];
}
export interface ICheckBoxOption {
  value?: string;
  name?: string;
  label: string;
}
export interface IValidation {
  required?: string | boolean;
  maxLength?: ILengthValidation;
  minLength?: ILengthValidation;
  pattern?: IPatternValidation;
}
export interface ILengthValidation {
  value: number;
  message: string;
}
export interface IPatternValidation {
  value: RegExp;
  message: string;
}
export interface IFormsData {
  index: number;
  selectedCareGiverOption: string;
  caregiver_id?: string;
}
export interface ICareCircleInputFieldsProps {
  inputField: any;
  index: number;
  form: any;
  errors: any;
  control: any;
  watch: any;
  register: any;
  setError: any;
  getValues: any;
  setCareCircleRadioArray: (careCircleRadioArray: any) => void;
  careCircleRadioArray: ICareCircleRadioArray[];
  emergencyContactCareGiverId: string;
  setEmergencyContactCareGiverId: (emergencyContactCareGiverId: string) => void;
  careGiverInfo: ICareGiverData[];
  caregiverList: ICareGiverData[];
}
export interface ICareCircleRadioArray {
  caregiverId: string;
  value: string;
  emergencyContact: boolean;
  powerOfAttorney: boolean;
  livingWithSenior: boolean;
}

export interface ICreateCaregiverParams {
  role: string;
  email: string;
  mobile_number: string;
  name: string;
  account_id: string;
  senior_id: string;
}
