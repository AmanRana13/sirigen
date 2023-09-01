export interface IValidatePasswordServiceParams {
    password: string;
}

export interface IChangePasswordServiceData {
    old_password: string;
    new_password: string;
}