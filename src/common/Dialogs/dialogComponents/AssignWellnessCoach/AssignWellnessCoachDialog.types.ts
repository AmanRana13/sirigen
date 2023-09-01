import { ICareAgentData } from "services/careAgentAccountService/careAgentAccount.types";

export interface IWellnessCoachTableProps {
    data: ICareAgentData[];
    selected: ICareAgentData[];
    onChangeSelected: (selected: ICareAgentData[]) => void;
    isDataLoading?: number;
    isFilterLoading?: boolean;
}

export interface IPopupProps {
    position?: any;
}

export interface IDisplayDataColumn {
    label: string;
    value: string;
}