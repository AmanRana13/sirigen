export interface ICorporateManagementData {
  id: string;
  corporateName: string;
  corporateCode: string;
  phone: number;
  facility: number;
  admins: number;
  agents: number;
  residents: number;
}
export interface ICorporateAddressData {
  state: string;
  city: string;
  street: string;
  zipcode: string;
}

/**
 * @class CorporateManagementModel
 * @description class to maintain the corporateManagementModel model
 */
class CorporateListModel {
  id: string;
  name: string;
  code: string;
  phone: number;
  totalFacilities: number;
  totalAdmins: number;
  totalAgents: number;
  totalResidents: number;
  corporate_email: string;
  corporate_address: ICorporateAddressData;

  constructor(
    id: string,
    name: string,
    code: string,
    phone: number,
    totalFacilities: number,
    totalAdmins: number,
    totalAgents: number,
    totalResidents: number,
    corporate_email: string,
    corporate_address: ICorporateAddressData,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.phone = phone;
    this.totalFacilities = totalFacilities;
    this.totalAdmins = totalAdmins;
    this.totalAgents = totalAgents;
    this.totalResidents = totalResidents;
    this.corporate_email = corporate_email;
    this.corporate_address = corporate_address;
  }
}

export default CorporateListModel;
