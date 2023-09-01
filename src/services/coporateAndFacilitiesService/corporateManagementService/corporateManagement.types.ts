import { ICorporateAddressData } from "./model/corporateListModel";

export interface ICorporateManagementData {
  id: string;
  name: string;
  code: string;
  phone: number;
  totalFacilities: number;
  totalAdmins: number;
  totalAgents: number;
  totalResidents: number;
}

export interface ICorporateManagementAPIData {
  corporate_id: string;
  corporate_name: string;
  corporate_code: string;
  corporate_phone: number;
  total_facility: number;
  total_admins: number;
  total_agents: number;
  total_residents: number;
  corporate_email:string;
  corporate_address:ICorporateAddressData
}
