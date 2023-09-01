import React from 'react';
import {
  getPaginationDataIsolated,
  getPaginationOffsetData,
} from 'store/commonReducer/common.action';

import {PaginationSearchProvider} from './PaginationSearchContext';
import SearchContainer from './SearchContainer';
import PaginationContainer from './PaginationContainer';
import {IWithPaginationProps} from './withPaginationTable.types';
import {
  IPaginationContainerProps,
  IPaginationOffsetProps,
} from './PaginationContainer.types';
import {PaginationFetchTypes} from 'globals/enums';
import PaginationOffsetContainer from './PaginationOffsetContainer';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @description HOC to provide pagination in tables
 * @param {any} WrappedComponent component
 * @param {Object} componentProps props of wrapped component
 * @param {IWithPaginationProps} withPaginationProps props of HOC
 * @returns {JSX.Element} JSX
 */
const withPaginationTable = (
  WrappedComponent: React.ElementType,
  componentProps: any,
  withPaginationProps: IWithPaginationProps,
) => {
  const WithPaginationSearch = () => {
    const dispatch = useAppDispatch();
    const dependency = withPaginationProps?.dependency ?? true;
    React.useEffect(() => {
      if (dependency) {
        if (withPaginationProps.fetchType === PaginationFetchTypes.OFFSET) {
          const {paginationOffsetProps} = withPaginationProps;
          dispatch(
            getPaginationOffsetData(
              paginationOffsetProps?.getData,
              paginationOffsetProps?.rowsPerPage,
              1,
              0,
              paginationOffsetProps?.limit,
              paginationOffsetProps?.onSuccess,
              paginationOffsetProps?.onError,
              [],
            ),
          );
        } else {
          const {paginationProps} = withPaginationProps;
          dispatch(
            getPaginationDataIsolated(
              paginationProps.getData,
              paginationProps.rowsPerPage,
              paginationProps.cacheKey || '',
              1,
              paginationProps.onSuccess,
              paginationProps.onError,
              [],
              '',
            ),
          );
        }
      }
    }, [dispatch, dependency]);

    switch (withPaginationProps.fetchType) {
      case PaginationFetchTypes.LAST_EVALUATED_KEY: {
        const {paginationProps, searchBarProps} = withPaginationProps;
        const paginationPropsModified: IPaginationContainerProps = {
          ...paginationProps,
          componentProps,
          WrappedComponent,
        };
        return (
          <PaginationSearchProvider>
            {searchBarProps && <SearchContainer {...searchBarProps} />}
            <PaginationContainer {...paginationPropsModified} />
          </PaginationSearchProvider>
        );
      }
      case PaginationFetchTypes.OFFSET: {
        const {paginationOffsetProps} = withPaginationProps;
        const paginationOffsetPropsModified: IPaginationOffsetProps = {
          ...paginationOffsetProps,
          componentProps,
          WrappedComponent,
        };
        return <PaginationOffsetContainer {...paginationOffsetPropsModified} />;
      }
      default:
        return <></>;
    }
  };
  return WithPaginationSearch;
};

export default withPaginationTable;
