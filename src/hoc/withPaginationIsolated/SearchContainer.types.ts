import {ISerachBarProps} from 'common/SearchBar';

export interface ISearchContainerProps extends ISerachBarProps {
  lastEvaluatedKeyPath: string;
  searchMethod: (tableData: any[], inputValue: string) => any[];
  tableDataPath?: string;
  position: string;
  renderRightSideComponent?: () => JSX.Element;
  renderLeftSideComponent?: () => JSX.Element;
  tableData?: any[];
  getData?: () => void;
  onSuccess?: (tableData: any) => void;
  onError?: (error: any) => void;
  onSearchSuccess?: (data: any) => void;
  disableFrontendSearch?: boolean;
  onSearchChange?: (value: string | null) => void;
  noRightMargin?: boolean;
  className:string
}
