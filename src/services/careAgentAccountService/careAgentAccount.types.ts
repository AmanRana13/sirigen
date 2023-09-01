import { IUserId, Nullable } from "globals/global.types";

interface IUserName {
  firstName: string;
  lastName: string;
  middleName: string;
}
interface ILocation {
  city: string;
  state: string;
  zipcode: string;
  street: string;
  timezone: string;
}
export interface ICareAgentData {
  userId: string;
  employeeId: string;
  name: IUserName;
  email: string;
  phone: number;
  extension: number;
  accessRole: string;
  isFirstLogin: boolean;
  location: ILocation;
  shift: string;
  timezone: string;
  assignedSenior: IUserId[];
  fullName: string;
}

interface IAPIUserName {
  first_name: string;
  last_name: string;
  middle_name: string;
}

export interface ICareAgentAPIData {
  user_id: string;
  account_id: string;
  name: IAPIUserName;
  email: string;
  mobile_number: number;
  extension: number;
  role: string;
  is_first_login: boolean;
  location: ILocation;
  shift: Nullable<string>;
  timezone: Nullable<string>;
  assigned_senior: IUserId[];
}
