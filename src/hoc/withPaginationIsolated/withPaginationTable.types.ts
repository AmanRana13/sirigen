import {PaginationFetchTypes} from 'globals/enums';
import {
  IPaginationContainerProps,
  IPaginationOffsetProps,
} from './PaginationContainer.types';
import {ISearchContainerProps} from './SearchContainer.types';

export interface ILastEvaluatedKeyProps {
  fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY;
  paginationProps: IPaginationContainerProps;
  searchBarProps?: ISearchContainerProps;
  dependency?: any;
}

export interface IOffsetProps {
  fetchType: PaginationFetchTypes.OFFSET;
  paginationOffsetProps: IPaginationOffsetProps;
  searchBarProps?: ISearchContainerProps;
  dependency?: any;
}

export type IWithPaginationProps = IOffsetProps | ILastEvaluatedKeyProps;
