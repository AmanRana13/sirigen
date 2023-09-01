export interface ISearchMedicationParam {
  medicine: string;
}
export interface IMedicationData {
  medication_name: string;
  dose_form: string;
  dose_frequency: number;
  when_do_they_take_it: string;
  date_prescribed: string;
  date_discontinued: string;
  pharmacy_name: string;
  pharmacy_phone: string;
  notes: string;
  last_saved: string;
}
