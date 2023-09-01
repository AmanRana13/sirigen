import { PreviewTemplates } from "globals/enums";

export interface IPreviewData {
    meta?: any;
    data?: any;
}

export interface IPreviewAction {
    type: string;
    payload?: {
        type: PreviewTemplates;
        data: IPreviewData;
    };
}
  
export interface IInitialState {
    type?: PreviewTemplates;
    data: IPreviewData;
    showButton?: boolean;
}

export const initialState: IInitialState = {
    type: undefined,
    data: {},
    showButton: false
};