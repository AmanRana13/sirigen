import React from 'react';

export const UPDATE_FILTER_DATA = 'UPDATE_FILTER_DATA';
export const UPDATE_FILTER_LOADER = 'UPDATE_FILTER_LOADER';
export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const UPDATE_IS_API_SEARCH = 'UPDATE_IS_API_SEARCH';

interface IInitialState {
  filteredData: null | any[];
  isFilterLoading: boolean;
  searchQuery: string | null;
}

interface IAction {
  type: string;
  [value: string]: any;
}

const initialState = {
  filteredData: null,
  isFilterLoading: false,
  searchQuery: '',
};

const PaginationSearchContext = React.createContext<IInitialState>(
  initialState,
);

const PaginationSearchDispatchContext = React.createContext<
  React.Dispatch<IAction>
>(() => null);

function reducer(
  state: IInitialState,
  action: {type: string; [value: string]: any},
) {
  switch (action.type) {
    case UPDATE_FILTER_DATA: {
      return {
        ...state,
        filteredData: action.filteredData
          ? [...action.filteredData]
          : action.filteredData,
      };
    }
    case UPDATE_FILTER_LOADER: {
      return {
        ...state,
        isFilterLoading: action.isFilterLoading,
      };
    }
    case UPDATE_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    }
    default:
      throw new Error();
  }
}

const PaginationSearchProvider = ({children}: any) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<IInitialState, IAction>
  >(reducer, initialState);

  return (
    <PaginationSearchContext.Provider value={state}>
      <PaginationSearchDispatchContext.Provider value={dispatch}>
        {children}
      </PaginationSearchDispatchContext.Provider>
    </PaginationSearchContext.Provider>
  );
};

export {
  PaginationSearchContext,
  PaginationSearchDispatchContext,
  PaginationSearchProvider,
};
