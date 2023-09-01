import MedicationListModel from '../model/medicationServiceModel';

export interface IDoseFrequencyData {
  doseFrequencyTime: number;
  doseFrequencyUnit: string;
}
interface IMedicationListDataParse {
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
}

export interface IDoseFrequency {
  every: number;
  period: string;
}
interface IMedicationListDataResponse {
  medicine: string;
  dose_form: string;
  dose_frequency: IDoseFrequency;
  when: string;
  date_prescribed: string;
  date_discontinued: string;
  pharmacy_name: string;
  pharmacy_phone_number: string;
  notes: string;
  modification_date?: string;
  medication_id?: string;
  status?: string;
}

class MedicationListParser {
  protected medicationListData: MedicationListModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {IMedicationListDataResponse} data api response array data
   * @returns {IMedicationListDataParse[]} parsed data
   */

  parse(data: IMedicationListDataResponse[]): IMedicationListDataParse[] {
    this.medicationListData = data?.map(
      (data: IMedicationListDataResponse): MedicationListModel => {
        return new MedicationListModel(
          data.medicine,
          data.dose_form,
          {
            doseFrequencyTime: data.dose_frequency.every,
            doseFrequencyUnit: data.dose_frequency.period,
          },
          data.when,
          data.date_prescribed,
          data.date_discontinued,
          data.pharmacy_name,
          data.pharmacy_phone_number,
          data.notes,
          data.modification_date,
          data.medication_id,
          data.status,
        );
      },
    );

    return this.medicationListData;
  }
}

export default MedicationListParser;
