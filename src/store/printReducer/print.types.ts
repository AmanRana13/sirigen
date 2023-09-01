import { PrintTemplates } from "globals/enums"

export interface IPrintData {
    meta?: any;
    data?: any;
}

export interface IPrintAction {
    type: string;
    payload?: {
        type: PrintTemplates;
        data: IPrintData;
    };
}
  
export interface IInitialState {
    type?: PrintTemplates;
    data: IPrintData;
    showButton?: boolean;
}

export const initialState: IInitialState = {
    type: undefined,
    data: {},
    showButton: false
};