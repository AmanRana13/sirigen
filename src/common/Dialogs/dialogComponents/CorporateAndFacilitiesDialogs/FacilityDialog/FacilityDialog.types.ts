export interface IFacilityPayload{
    facility_name:string,
    facility_phone:string,
  facility_address:IFacilityAddress ,
  state_code:string,
  corporate_id : string,
  facility_id?:any
}


export interface IFacilityAddress{
    city: string,
    state: string,
    street: string,
    zipcode: string,
  }


  export interface IFacilityValidatePayload{
    facility_name?: string,
    corporate_id?:string,
    phone_number?:string
  }

  export interface IFacilityValidateField{
    [key: string]: boolean | undefined;
    facility_name?: boolean,
    corporate_code?: boolean,
    phone_number?: boolean,
  }
