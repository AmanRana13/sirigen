import {IPharmacyDetails} from './components/Pharmacy/Pharmacy.types';

export interface IDoctorComponentProps {
  errors: any;
  control: any;
  register: any;
  doctorDeletion: string[];
  setDoctorDeletion: (doctorDeletion: string[]) => void;
  defaultValues: IDefaultValues[];
  doctorDetails: IDoctorDetails[];
  setDoctorDetails: (doctorDetails: any) => void;
}
export interface IDoctorDetails extends IParamsDetails {
  is_primary: boolean;
}
export interface IDentistComponentProps {
  errors: any;
  control: any;
  register: any;
  dentistDeletion: string[];
  setDentistDeletion: (dentistDeletion: string[]) => void;
  defaultValues: IDefaultValues[];
}
export interface IName {
  first_name: string;
  last_name: string;
  middle_name?: string | null;
}

export interface IDefaultValues {
  provider_name: string;
  name: IName;
  speciality: string;
  contact_phone: string;
  email_address: string;
}
export interface IParamsDetails {
  id?: string;
  contact_phone: string;
  email_address: string;
  name: IName;
  provider_id: string;
  provider_name: string;
  speciality: string;
  senior_id?: string;
  created_date?: string;
  last_modified_by?: string;
}
export interface ISubmitData {
  doctor: IDoctorDetails[];
  dentist: IParamsDetails[];
  pharmacy: IPharmacyDetails[];
}
export interface ISubmitParamsData {
  provider_addition: IParamsDetails[];
  provider_deletion?: string[];
  provider_modification: IParamsDetails[];
}
