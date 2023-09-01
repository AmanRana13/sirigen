import {AssessmentStatus} from 'globals/enums';

export interface IDoseFrequencyData {
  doseFrequencyTime: number;
  doseFrequencyUnit: string;
}
export interface IMedicationData {
  medicationName: string;
  doseForm: string;
  doseFrequency: IDoseFrequencyData;
  whenDoTheyTakeIt: string[];
  datePrescribed: string;
  dateDiscontinued: string;
  pharmacyName: string;
  pharmacyPhone: string;
  notes: string;
  lastSaved: string;
  status: string;
  medicationID: string;
}

export interface IMedicalListProps {
  heading: string;
}
export interface IMedicationDataProps {
  medicationInfo: IMedicationData[];
}

export interface ISubmitMedication {
  type: AssessmentStatus;
  formError: boolean;
  data: IMedicationData[];
  seniorID: string;
}

export interface IPostMedicationData {
  medicationName: string;
  doseForm: string;
  doseFrequencyTime: string;
  doseFrequencyUnit: string;
  whenDoTheyTakeIt: string;
  datePrescribed: string;
  dateDiscontinued: string;
  pharmacyName: string;
  pharmacyPhone: string;
  notes: string;
  lastSaved: string;
  status: string;
  medicationID: string;
}
export interface IPostMedicationActionParams {
  data: IPostMedicationData;
  status: AssessmentStatus;
  medicationID?: string;
  seniorID: string;
}

export interface IPostMedicationServiceParams {
  data: IMedicationData[];
  senior_id: string;
  status: AssessmentStatus;
  medication_id?: string;
}

export interface IMedicationListDetailProps {
  data: IMedicationData;
}

export interface IPostDoseFrequencyParams {
  every: string | number;
  period: string;
}
export interface IPostMedicationParams {
  senior_id: string;
  status: string;
  medicine: string;
  dose_form: string;
  dose_frequency: IPostDoseFrequencyParams;
  when: string;
  date_prescribed: string;
  date_discontinued: string;
  pharmacy_name: string;
  pharmacy_phone_number: string;
  notes: string;
  medication_id?: string;
}
