import {render} from '../../utilities/test-utils';
import SearchBar from './SearchBar';
import React from 'react';

describe('SearchBar', () => {
  it('should render with PaginationContainer', () => {
    const SearchBarProps = {
      handleSearchChange: () => {},
      lastEvaluatedKey: '',
      tableData: [],
    };

    const {queryByTestId} = render(<SearchBar {...SearchBarProps} />);

    const element = queryByTestId(/SearchBar/i);

    expect(element).toBeInTheDocument();
  });
});
