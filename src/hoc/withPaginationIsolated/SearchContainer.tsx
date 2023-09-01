import {Grid} from '@mui/material';
import SearchBar from 'common/SearchBar/SearchBar';
import get from 'lodash.get';
import React from 'react';
import {getPaginationDataIsolated} from 'store/commonReducer/common.action';
import {
  PaginationSearchDispatchContext,
  UPDATE_FILTER_DATA,
  UPDATE_FILTER_LOADER,
  UPDATE_SEARCH_QUERY,
} from './PaginationSearchContext';
import {ISearchContainerProps} from './SearchContainer.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const SearchContainer = React.memo(
  ({
    renderRightSideComponent,
    searchMethod,
    lastEvaluatedKeyPath,
    getData,
    onError,
    onSuccess,
    onSearchSuccess,
    isNewDesign,
    placeholder,
    position,
    tableDataPath = '',
    disableFrontendSearch = false,
    renderLeftSideComponent,
    onSearchChange,
    noRightMargin = false,
    className
  }: ISearchContainerProps) => {
    const contextDispatch = React.useContext(PaginationSearchDispatchContext);

    const lastEvaluatedKey =
      useAppSelector((state: any) => get(state, lastEvaluatedKeyPath, '')) ||
      '';
    const tableData =
      useAppSelector((state: any) => get(state, tableDataPath, [])) || [];

    const dispatch: any = useAppDispatch();
    const handleSearchChange = (
      value: string | null,
      lastEvaluatedKey?: string,
      tableData?: any[],
    ) => {
      if (onSearchChange) {
        onSearchChange(value);
      }
      if (lastEvaluatedKey || value === null || disableFrontendSearch) {
        contextDispatch({type: UPDATE_SEARCH_QUERY, searchQuery: value});
        dispatch(
          getPaginationDataIsolated(
            getData,
            1,
            '',
            1,
            onSuccess,
            onError,
            [],
            '',
            value,
            onSearchSuccess,
          ),
        );
      } else {
        // frontend logic
        contextDispatch({
          type: UPDATE_FILTER_LOADER,
          isFilterLoading: true,
        });

        if (value) {
          const filteredData = searchMethod(tableData || [], value);
          contextDispatch({
            type: UPDATE_FILTER_DATA,
            filteredData,
          });
        } else {
          contextDispatch({
            type: UPDATE_FILTER_DATA,
            filteredData: null,
          });
          contextDispatch({type: UPDATE_SEARCH_QUERY, searchQuery: value});
        }

        // settimout to display loader for 300ms
        setTimeout(() => {
          contextDispatch({
            type: UPDATE_FILTER_LOADER,
            isFilterLoading: false,
          });
        }, 300);
      }
    };

    return (
      <Grid
        data-testid='SearchContainer'
        container
        justifyContent={position || 'flex-end'}
        className={className}
        >
        {renderLeftSideComponent && renderLeftSideComponent()}
        <SearchBar
          handleSearchChange={handleSearchChange}
          lastEvaluatedKey={lastEvaluatedKey}
          tableData={tableData}
          isNewDesign={isNewDesign}
          placeholder={placeholder}
          noRightMargin={noRightMargin}
        />
        {renderRightSideComponent && renderRightSideComponent()}
      </Grid>
    );
  },
);

export default SearchContainer;
