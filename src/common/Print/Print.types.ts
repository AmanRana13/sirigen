import { PrintTemplates } from "globals/enums";

export interface IHolisticStatsData {
    surveyName: string;
    score: number;
}

export interface IDictionary {
    [index: string]: string;
}

export interface IUsePrintParams {
    type: PrintTemplates;
    data?: any;
    meta?: any;
}

export const PRINT_HIDE_CLASS = 'printHide'