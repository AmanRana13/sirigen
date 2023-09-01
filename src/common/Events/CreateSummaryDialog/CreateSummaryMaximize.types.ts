import {ICareInsightHistory} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';
export interface ICreateSummaryMaximizeProps {}

export interface IColumn {
  id:
    | 'dateGenerated'
    | 'status'
    | 'vitalSign'
    | 'range'
    | 'variable'
    | 'reading';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'center' | 'left';
}

export interface Data {
  date: string;
  sent: string;
  vitalSign: string;
  baselineAvg: string;
  variable: string;
  reading: string;
}

export interface IDateRandeState {
  startDate: string;
  endDate: string;
  isDateError?: boolean;
}

export interface ITableBodyRowDataProps {
  rowData: ICareInsightHistory;
  columnData: IColumn;
}

export interface ICareInsightHistoryTableProps {
  historyData: ICareInsightHistory[];
}

export const tableColumns: IColumn[] = [
  {id: 'dateGenerated', label: 'Date/Time', maxWidth: 60},
  {id: 'status', label: 'Sent', minWidth: 60},
  {
    id: 'vitalSign',
    label: 'Vital Sign',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'range',
    label: 'Range',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'variable',
    label: 'Variable',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'reading',
    label: 'Reading',
    minWidth: 60,
    align: 'center',
  },
];
