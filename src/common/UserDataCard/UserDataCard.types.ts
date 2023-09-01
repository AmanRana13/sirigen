import {IName} from 'common/UserName/UserName.types';

interface IUserData {
  name: IName;
  dob?: string;
  location: Record<string, any>;
  timezone: string;
  profileImage: string;
  isResident: string;
  facility: string;
}

export interface IUserDataCardProps {
  userData: IUserData;
  onAssign: () => void;
}

export interface ISeniorDetail {
  label: string;
  value: string | number;
}
