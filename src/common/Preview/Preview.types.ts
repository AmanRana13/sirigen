import { PreviewTemplates } from "globals/enums";

export interface IDictionary {
    [index: string]: string;
}

export interface IUsePreviewParams {
    type: PreviewTemplates;
    data?: any;
    meta?: any;
}