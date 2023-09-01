import React from 'react';
import {
  PaginationSearchContext,
  PaginationSearchDispatchContext,
  UPDATE_SEARCH_QUERY,
} from './PaginationSearchContext';
import clsx from 'clsx';
import {Box, Pagination} from '@mui/material';
import get from 'lodash.get';
import {getPaginationDataIsolated} from 'store/commonReducer/common.action';
import {IPaginationContainerProps} from './PaginationContainer.types';
import {useRowStyles} from './PaginationContainerStyle';
import {PAGINATION_TYPE} from 'globals/enums';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const PaginationContainer = React.memo(
  ({
    loadingPath,
    paginationType,
    withBorder = false,
    className,
    containerClass,
    isScrollOnTop = false,
    lastEvaluatedKeyPath,
    rowsPerPage,
    tableData,
    getData,
    cacheKey = '',
    onSuccess,
    onError,
    componentProps,
    WrappedComponent,
    onPageChange,
    pagePath = '',
    tableDataPath = '',
    searchLastEvaluatedKeyPath = '',
    onSearchSuccess,
  }: IPaginationContainerProps) => {
    const {classes} = useRowStyles();
    const dispatch: any = useAppDispatch();

    const lastEvaluatedKey = useAppSelector((state: any) =>
      get(state, lastEvaluatedKeyPath),
    );
    const searchLastEvaluatedKey = useAppSelector((state: any) =>
      get(state, searchLastEvaluatedKeyPath),
    );

    const tablePathData = useAppSelector((state: any) =>
      get(state, tableDataPath, []),
    );

    tableData = tableDataPath ? tablePathData : tableData;

    const page = useAppSelector((state: any) => get(state, pagePath));

    const isDataLoading = useAppSelector((state) => get(state, loadingPath));
    const {filteredData, isFilterLoading, searchQuery}: any =
      React.useContext<any>(PaginationSearchContext);

    const startRange = page * rowsPerPage;

    const rows = filteredData
      ? filteredData.slice(startRange - rowsPerPage, startRange)
      : tableData?.slice(startRange - rowsPerPage, startRange);
    /**
     * @description get total number of pages
     */
    const totalPages = React.useCallback(() => {
      return Math.ceil(
        (filteredData ? filteredData.length : tableData?.length) / rowsPerPage,
      );
    }, [tableData, rowsPerPage, filteredData]);

    const contextDispatch: any = React.useContext(
      PaginationSearchDispatchContext,
    );

    const fetchMoreRecords = React.useCallback(
      (currentPage: any) => {
        //Run only when user is on last page and need to fetch more data from DB
        if (
          currentPage === totalPages() &&
          lastEvaluatedKey &&
          searchQuery !== null
        ) {
          dispatch(
            getPaginationDataIsolated(
              getData,
              rowsPerPage,
              cacheKey,
              currentPage,
              onSuccess,
              onError,
              tableData,
              searchQuery ? searchLastEvaluatedKey : lastEvaluatedKey,
              searchQuery,
              onSearchSuccess,
            ),
          );
        }
      },
      [
        page,
        lastEvaluatedKey,
        cacheKey,
        totalPages,
        dispatch,
        searchQuery,
        searchLastEvaluatedKey,
      ],
    );

    const handleChange = (event: any, value: any) => {
      if (searchQuery === null) {
        contextDispatch({type: UPDATE_SEARCH_QUERY, searchQuery: ''});
      }
      dispatch(onPageChange(value));
      fetchMoreRecords(value);
    };

    const modifiedComponentProps = React.useCallback(() => {
      return {
        ...componentProps,
        currentPage: page,
        isDataLoading,
        data: [...rows],
        isFilterLoading,
        isSearch: Boolean(searchQuery || filteredData),
      };
    }, [page, isDataLoading, rows, isFilterLoading, componentProps]);

    //if there is no data on page then move to previous page
    React.useEffect(() => {
      if (page !== 1 && rows.length === 0) {
        dispatch(onPageChange(page - 1));
      }
    }, [page, rows, dispatch, contextDispatch, onPageChange]);

    React.useEffect(() => {
      if (isScrollOnTop) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }, [page, isScrollOnTop]);

    const renderPagination: () => React.ReactNode = () => {
      if (paginationType === PAGINATION_TYPE.SECONDARY) {
        return (
          <Pagination
            className={clsx({
              [classes.root]: true,
              [classes.secondary]: !withBorder,
              [classes.secondaryWithBorder]: withBorder,
            })}
            count={totalPages()}
            page={page}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        );
      }
      return (
        <Pagination
          className={className}
          count={totalPages()}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      );
    };

    return (
      <Box
        data-testid='PaginationContainer'
        display='flex'
        height='100%'
        flexDirection='column'
        justifyContent='space-between'
        className={clsx(containerClass, {[classes.border]: withBorder})}>
        <WrappedComponent {...modifiedComponentProps()} />
        {rows.length !== 0 && renderPagination()}
      </Box>
    );
  },
);

export default PaginationContainer;
