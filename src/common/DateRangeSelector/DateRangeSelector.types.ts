export interface IDateRangeSelectorProps {
  endDate: string;
  startDate: string;
  onChangeStartDate: (date: any) => void;
  onChangeEndDate: (date: any) => void;
  onError: (error: boolean) => void;
  onStartDateSuccess: (date?: any) => void;
  onEndDateSuccess: (date?: any) => void;
  isDateError?: boolean;
}
