import {Pagination} from '@mui/lab';
import React from 'react';
import {makeStyles} from 'tss-react/mui';
import {getPaginationData} from 'store/commonReducer/common.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const useRowStyles = makeStyles()((theme: any) => ({
  ul: {
    paddingBottom: '2%',
    justifyContent: 'center',
    '& .Mui-selected': {
      color: theme.palette.customColor.white,
      background: theme.palette.customColor.primary,
    },
  },
}));

/**
 * @description HOC to provide pagination in tables
 * @param {JSX.Element} WrappedComponent component
 * @param {Object} componentProps props of wrapped component
 * @param {Object} withPaginationProps props of HOC
 * @returns {JSX.Element} JSX
 */
const withPagination = (
  WrappedComponent: any,
  componentProps: any,
  withPaginationProps: any,
) => {
  const WithPagination = () => {
    const {classes} = useRowStyles();
    const dispatch: any = useAppDispatch();
    const {getData, cacheKey, rowsPerPage} = withPaginationProps;
    const tableData = useAppSelector(
      (state: any) => state.common.currentTableData.data,
    );
    const lastEvaluatedKey = useAppSelector(
      (state: any) => state.common.currentTableData.lastEvaluatedKey,
    );
    const isDataLoading = useAppSelector(
      (state: any) => state.common.currentTableData.loadingStatus,
    );
    const [page, setPage] = React.useState(1);
    const [rows, setRows] = React.useState([]);

    /**
     * @description get total number of pages
     */
    const totalPages = React.useCallback(() => {
      return Math.ceil(tableData.length / rowsPerPage);
    }, [tableData, rowsPerPage]);

    React.useEffect(() => {
      dispatch(getPaginationData(getData, rowsPerPage, cacheKey, page));
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    React.useEffect(() => {
      if (page && tableData) {
        const startRange = page * rowsPerPage;
        setRows(tableData.slice(startRange - rowsPerPage, startRange));
      }
      if (page === totalPages() && lastEvaluatedKey) {
        dispatch(getPaginationData(getData, rowsPerPage, cacheKey, page));
      }
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, lastEvaluatedKey, cacheKey, totalPages, dispatch]);

    const handleChange = (event: any, value: any) => {
      setPage(value);
    };

    const modifiedComponentProps = React.useCallback(() => {
      return {
        ...componentProps,
        currentPage: page,
        isDataLoading,
        data: rows,
      };
    }, [page, isDataLoading, rows]);

    return (
      <React.Fragment>
        <WrappedComponent {...modifiedComponentProps()} />
        {rows.length && (
          <Pagination
            classes={classes}
            count={totalPages()}
            page={page}
            onChange={handleChange}
          />
        )}
      </React.Fragment>
    );
  };

  return WithPagination;
};

export default withPagination;
