export interface IGlobalAPIResponse {
  application_code: number;
  error: boolean;
  message: boolean;
}

export interface IUserId {
  user_id: string;
  account_id: string;
}

export type Nullable<T> = T | null;

export interface IIsValueAvailable {
  value: any;
  showValue?: string;
  postfix?: string;
  emptyValue?: string;
}
