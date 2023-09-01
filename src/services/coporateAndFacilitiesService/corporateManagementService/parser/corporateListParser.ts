// eslint-disable-next-line max-len
import { ICorporateManagementAPIData, ICorporateManagementData } from '../corporateManagement.types';
import CorporateListModel from '../model/corporateListModel';

class CorporateListParser {
  protected corporateList: CorporateListModel[] = [];

  /**
   * @description function to parse the response data
   * @function parse
   * @param {ICorporateManagementAPIData} data api response array data
   * @returns {ICorporateManagementData[]} parsed data
   */
  parse(data: ICorporateManagementAPIData[]): ICorporateManagementData[] {
    this.corporateList = data.map(
      (corporate: ICorporateManagementAPIData): CorporateListModel => {
        return new CorporateListModel(
          corporate.corporate_id,
          corporate.corporate_name,
          corporate.corporate_code,
          corporate.corporate_phone,
          corporate.total_facility,
          corporate.total_admins,
          corporate.total_agents,
          corporate.total_residents,
          corporate.corporate_email,
          corporate.corporate_address
        );
      },
    );

    return this.corporateList;
  }
}

export default CorporateListParser;
