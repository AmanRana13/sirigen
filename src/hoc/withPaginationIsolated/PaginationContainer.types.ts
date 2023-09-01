import {PAGINATION_TYPE} from 'globals/enums';

export interface IPaginationContainerProps {
  loadingPath: string;
  paginationType: PAGINATION_TYPE;
  className: string;
  lastEvaluatedKeyPath: string;
  rowsPerPage: number;
  pagePath: string;
  getData: () => void;
  onSuccess: (tableData: any) => void;
  onError: (error: any) => void;
  onPageChange: (value: number) => void;
  onSearchSuccess?: (data: any) => void;
  tableDataPath?: string;
  isScrollOnTop?: boolean;
  WrappedComponent?: React.ElementType | any;
  componentProps?: any;
  cacheKey?: string;
  withBorder?: boolean;
  searchLastEvaluatedKeyPath?: string;
  tableData?: any[];
  containerClass?: string;
  limit?: number;
}

export interface IPaginationOffsetProps {
  loadingPath: string;
  paginationType: PAGINATION_TYPE;
  className: string;
  rowsPerPage: number;
  pagePath: string;
  offsetPath: string;
  tableData: any[];
  limit: number;
  getData: (offset: number, limit: number) => void;
  onSuccess: (tableData: any, offset: number, response: any) => void;
  onError: (error: any) => void;
  onPageChange: (value: number) => void;
  isScrollOnTop?: boolean;
  WrappedComponent?: React.ElementType | any;
  componentProps?: any;
  withBorder?: boolean;
  containerClass?: string;
}
