import {Roles} from 'globals/enums';

export interface IAddAgentPayload {
  user_id?: string;
  employee_id: string;
  name: {first_name: string; last_name: string};
  email: string;
  access: Roles;
  phone_number: {
    number: string;
    ext: string;
  };
  location: {
    zipcode: string;
    city: string;
    state: string;
  };
  shift: string;
  is_active: boolean;
}

export interface IDisableAgentPayload {
  employee_id: string;
  email: string;
  is_active: boolean;
  user_id: string;
}

export interface IResendOtpPayload {
  email: string;
  account?: string;
}

export interface IGetCareAgentsParams {
  last_evaluated_key?: string;
  careagent_ids?: string;
  search_query?: string;
}
