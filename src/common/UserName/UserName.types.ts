export interface IName {
  firstName: string;
  middleName: string;
  lastName: string;
}
export interface IUserNameProps {
  firstName?: boolean;
  middleName?: boolean;
  lastName?: boolean;
  name?: IName
}
