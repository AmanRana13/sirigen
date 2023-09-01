import { IInitialState } from "./print.types";

export const SET_PRINT_DATA = 'SET_PRINT_DATA';
export const RESET_PRINT_DATA = 'RESET_PRINT_DATA';

export const setPrintData = (payload: IInitialState) => {
    return {
        type: SET_PRINT_DATA,
        payload
    }
};

export const resetPrintData = () => {
    return {
        type: RESET_PRINT_DATA
    }
};
