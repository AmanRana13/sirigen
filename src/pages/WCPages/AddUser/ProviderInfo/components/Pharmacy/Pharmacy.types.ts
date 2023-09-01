export interface IDeleteButtonProps {
  remove: any;
  index: number;
  isUpdated: boolean;
  form: IPharmacyDetails;
  pharmacyDeletion: string[];
  setIsUpdated: (isUpdated: boolean) => void;
  setPharmacyDeletion: (pharmacyDeletion: string[]) => void;
}
export interface IPharmacyDetails {
  id: string;
  name: string;
  contact_phone: string;
  address: {
    street: string;
    state: string;
    city: string;
    zip: number | string;
  };

  fax: string;
  website: string;
  comment: string;
  is_primary: boolean;
  provider_id?: string;
}
export interface IUseFormProps {
  errors: any;
  control: any;
  setValue: any;
  register: any;
  getValues?: any;
}
export interface IRenderInputFieldsProps extends IUseFormProps {
  inputField: any;
  index: number;
  form: IPharmacyDetails;
  pharmacyDetails: IPharmacyDetails[];
  setPharmacyDetails: (pharmacyDetails: any) => void;
}
export interface IPharmacyProps extends IUseFormProps {
  pharmacyDeletion: string[];
  defaultValues: IPharmacyDetails[];
  pharmacyDetails: IPharmacyDetails[];
  setPharmacyDetails: (pharmacyDetails: any) => void;
  setPharmacyDeletion: (pharmacyDeletion: string[]) => void;
}
