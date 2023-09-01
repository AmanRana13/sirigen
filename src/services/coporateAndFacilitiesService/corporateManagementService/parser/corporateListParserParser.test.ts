import {ICorporateManagementAPIData} from '../corporateManagement.types';
import CorporateListParser from './corporateListParser';

describe('corporate list parser', () => {
  test('test corporate lis parser', () => {
    const data: ICorporateManagementAPIData[] = [
      {
        corporate_id: '123',
        corporate_name: 'abc',
        corporate_code: '321',
        corporate_phone: 123123123,
        total_facility: 22,
        total_admins: 22,
        total_agents: 22,
        total_residents: 22,
      },
    ];
    const mockResult = [
      {
        id: '123',
        name: 'abc',
        code: '321',
        phone: 123123123,
        totalFacilities: 22,
        totalAdmins: 22,
        totalAgents: 22,
        totalResidents: 22,
      },
    ];
    const dataParser = new CorporateListParser();
    const corporateList = dataParser.parse(data);
    expect(corporateList).toEqual(mockResult);
  });
});
