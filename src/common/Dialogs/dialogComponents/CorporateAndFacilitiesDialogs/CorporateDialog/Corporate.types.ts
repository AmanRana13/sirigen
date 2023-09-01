export interface ICorporatePayload{
    corporate_name: string,
    corporate_code: string,
    corporate_phone: string,
    corporate_email: string,
    corporate_address: ICorporateAddress
    corporate_id?: any,
}

export interface ICorporateAddress{
    city: string,
    state: string,
    street: string,
    zipcode: string,
  }

  export interface ICorporateSuccess{
    corporate_name: string,
    corporate_code: string,
    corporate_phone: string,
    corporate_email: string,
    corporate_address: ICorporateAddress
    corporate_id?: any,
    created_by:string,
    created_date:string,
    last_updated_by:string,
    modification_date:string,
    total_admins:string,
    total_agents:string,
    total_facility:string,
    total_residents:string,
  }

  export interface ICorporateValidatePayload{
    corporate_name?: string,
    corporate_code?: string,
    phone_number?: string,
    email?: string,
  }

  export interface ICorporateValidateField{
    [key: string]: boolean | undefined;
    corporate_name?: boolean,
    corporate_code?: boolean,
    phone_number?: boolean,
    email?: boolean,
  }
