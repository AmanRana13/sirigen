import {TableCellProps, TableRowProps} from '@mui/material';
import {PRIMARY_COLOR, TableSelectionType} from 'globals/enums';

export interface ITableColumn extends TableCellProps {
  columnId: string;
  label: string;
  render?: () => React.ReactElement;
}

export interface ITableColumnData<TRecord> extends TableCellProps {
  dataId: string;
  dataKey?: string;
  format?: (value: any) => string;
  render?: (value: any, record: TRecord) => React.ReactElement;
}

export interface ITableRowData<TRecord> extends TableRowProps {
  values: ITableColumnData<TRecord>[];
  onRowClick?: (e: any, rowData: any) => void;
}

export interface ITableProps<TRecord> {
  rowId: string;
  headerData: ITableColumn[];
  data: TRecord[];
  rowData: ITableRowData<TRecord>;
  selectionType?: TableSelectionType;
  selected?: TRecord[];
  onChangeSelected?: (selected: TRecord[]) => void;
  isSelectable?: (record: TRecord) => boolean;
  noDataMessage?: string;
  isDataLoading?: number;
  isFilterLoading?: boolean;
  primaryColor?: PRIMARY_COLOR;
}
