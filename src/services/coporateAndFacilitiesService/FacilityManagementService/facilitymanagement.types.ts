export interface IFacilityData {
  id: string;
  facilityName: string;
  facilityCode: string;
  cityAndState: IFacilityLocation;
  phone: number | null;
  agent: string;
  residents: number;
}

export interface IFacilityLocation {
  state: string;
  city: string;
}

export interface IFacilityListAPIData {
  facility_id: string;
  facility_name: string;
  facility_address: IFacilityLocation;
  cityAndState: string;
  facility_phone: number;
  agent_name: string;
  total_residents: number;
  facility_code: string;
}
