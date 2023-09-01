export interface ISeniorsTableProps {
    data: any[];
    selected: any[];
    onChangeSelected: (selected: any[]) => void;
    isDataLoading?: number;
    isFilterLoading?: boolean; 
}