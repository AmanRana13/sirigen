import React from 'react';
import {PAGINATION_TYPE} from 'globals/enums';
import clsx from 'clsx';
import {Box, Pagination} from '@mui/material';
import get from 'lodash.get';
import {getPaginationOffsetData} from 'store/commonReducer/common.action';
import {IPaginationOffsetProps} from './PaginationContainer.types';
import {useRowStyles} from './PaginationContainerStyle';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const PaginationOffsetContainer = React.memo(
  ({
    loadingPath,
    paginationType,
    className,
    rowsPerPage,
    pagePath = '',
    offsetPath = '',
    limit = 10,
    tableData = [],
    getData,
    onSuccess,
    onError,
    componentProps,
    WrappedComponent,
    onPageChange,
    isScrollOnTop = false,
    withBorder = false,
    containerClass = '',
  }: IPaginationOffsetProps) => {
    const {classes} = useRowStyles();
    const dispatch: any = useAppDispatch();

    const offset = useAppSelector((state: any) => get(state, offsetPath));
    const page = useAppSelector((state: any) => get(state, pagePath));
    const isDataLoading = useAppSelector((state: any) =>
      get(state, loadingPath),
    );
    const rows = React.useMemo(() => {
      const endRange = page * rowsPerPage;
      return tableData.slice(endRange - rowsPerPage, endRange);
    }, [tableData, page, rowsPerPage]);

    /**
     * @description get total number of pages
     */
    const totalPages = React.useMemo(() => {
      return Math.ceil(tableData.length / rowsPerPage);
    }, [tableData, rowsPerPage]);

    const fetchMoreRecords = React.useCallback(
      (currentPage: any) => {
        //Run only when user is on last page and need to fetch more data from DB
        if (currentPage === totalPages && offset >= 0) {
          dispatch(
            getPaginationOffsetData(
              getData,
              rowsPerPage,
              currentPage,
              offset,
              limit,
              onSuccess,
              onError,
              tableData,
            ),
          );
        }
      },
      [
        offset,
        totalPages,
        tableData,
        dispatch,
        onSuccess,
        onError,
        getData,
        limit,
        rowsPerPage,
      ],
    );

    const handleChange = (event: any, value: any) => {
      dispatch(onPageChange(value));
      fetchMoreRecords(value);
    };

    const modifiedComponentProps = React.useCallback(() => {
      return {
        ...componentProps,
        currentPage: page,
        isDataLoading,
        data: [...rows],
      };
    }, [page, isDataLoading, rows, componentProps]);

    //if there is no data on page then move to previous page
    React.useEffect(() => {
      if (page !== 1 && rows.length === 0) {
        dispatch(onPageChange(page - 1));
      }
    }, [page, rows, dispatch, onPageChange]);

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
            count={totalPages}
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
          count={totalPages}
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

export default PaginationOffsetContainer;
