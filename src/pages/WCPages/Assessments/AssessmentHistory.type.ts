export interface IHistoryData {
  assessmentId: string;
  date: string;
  time: string;
  totalScore: number;
  formData: any;
  scorePercent?: number;
  caregiverName?: string;
  careAgentId?: string;
}
export interface IAssessmentHistoryTableProps {
  data: IHistoryData[];
  columnProps: IHistoryColumnProps[];
  onClickViewHistory: (history: any, index?: number) => void;
  tableLabel: string;
  maximumScore?: number;
}
export interface IAssessmentHistoryTableData {
  data: IHistoryData[];
  lastEvaluatedKey: string;
  loading: boolean;
  totalRows: number;
  currentPage: number;
}

export interface IAssementHistoryActionCreators {
  error: (error: any) => (dispatch: any) => void;
  getAssessment: {};
  getData: () => {};
  pageChange: (value: string | number) => (dispatch: any) => void;
  success: (tableData: any) => (dispatch: any, getState?: any) => void;
}
export interface IHistoryColumnProps {
  label: string;
  value: string;
  method?: (history: IHistoryData) => {};
}
export interface IAssessmentHistoryProps {
  tableLabel: string;
  tableData: IHistoryData[];
  columnProps: IHistoryColumnProps[];
  onClickViewHistory: (history: IHistoryData, index?: number) => void;
  actionCreators: IAssementHistoryActionCreators;
  paginationProps: IHistoryTablePaginationProps;
  maximumScore?: number;
}
export interface IHistoryTablePaginationProps {
  lastEvaluatedKeyPath: string;
  loadingPath: string;
  pagePath: string;
}
