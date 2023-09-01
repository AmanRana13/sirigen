export interface IMedicalDialogProps {
  position?: string;
}

export interface IMedictionDialogButtonProps extends IMedicalDialogProps {
  disable: boolean;
}
export interface IMedicationDataResponse {
  medication_name: string;
  dose_form: string | null;
  dose_frequency: number | null;
  when_do_they_take_it: string | null;
  date_prescribed: string | null;
  date_discontinued: string | null;
  pharmacy_name: string | null;
  pharmacy_phone: string | null;
  notes: string | null;
}

export interface IWhenDoTheyTakeIt {
  label: string;
  value: string;
}
