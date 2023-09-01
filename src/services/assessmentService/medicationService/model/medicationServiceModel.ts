import {IDoseFrequencyData} from '../parser/medicationListParser';

/**
 * @class MedicationListModel
 * @description class to maintain the medication list assessment  model
 */
class MedicationListModel {
  medicationName: string;
  doseForm: string;
  doseFrequency: IDoseFrequencyData;
  whenDoTheyTakeIt: string;
  datePrescribed: string;
  dateDiscontinued: string;
  pharmacyName: string;
  pharmacyPhone: string;
  notes: string;
  lastSaved?: string;
  medicationID?: string;
  status?: string;

  constructor(
    medicationName: string,
    doseForm: string,
    doseFrequency: IDoseFrequencyData,
    whenDoTheyTakeIt: string,
    datePrescribed: string,
    dateDiscontinued: string,
    pharmacyName: string,
    pharmacyPhone: string,
    notes: string,
    lastSaved?: string,
    medicationID?: string,
    status?: string,
  ) {
    this.medicationName = medicationName;
    this.doseForm = doseForm;
    this.doseFrequency = doseFrequency;
    this.whenDoTheyTakeIt = whenDoTheyTakeIt;
    this.datePrescribed = datePrescribed;
    this.dateDiscontinued = dateDiscontinued;
    this.pharmacyName = pharmacyName;
    this.pharmacyPhone = pharmacyPhone;
    this.notes = notes;
    this.lastSaved = lastSaved;
    this.medicationID = medicationID;
    this.status = status;
  }
}

export default MedicationListModel;
