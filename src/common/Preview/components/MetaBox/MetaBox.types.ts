export interface IMetaBoxItem {
    firstLabel?: string;
    secondLabel?: string;
    firstValue?: string;
    secondValue?: string;
    columns?: number | boolean;
}

export interface IMetaBoxProps {
    data: IMetaBoxItem[];
    columns: number;
}