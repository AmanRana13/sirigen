export interface ISerachBarProps {
  handleSearchChange: (
    value: string | null,
    lastEvaluatedKey?: string,
    tableData?: any[],
  ) => void;
  lastEvaluatedKey?: string;
  tableData?: any[];
  isNewDesign?: boolean;
  placeholder?: string;
  width?: string;
  value?: string;
  isError?: boolean;
  errorText?: string;
  disabled?: boolean;
  inputRef?: any;
  searchList?: string[];
  searchLoading?: boolean;
  searchListWidth?: string;
  minHeight?: string;
  maxLength?: number;
  onSearchTextChange?: (searchQuery: string) => void;
  showCrossIcon?: boolean;
  errorMessage?: string;
  isSelected?: boolean;
  noRightMargin?: boolean;
}
export interface IBoldStringProps {
  text: string;
  shouldBeBold: string;
}
