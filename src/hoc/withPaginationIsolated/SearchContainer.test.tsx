import {render} from '../../utilities/test-utils';
import SearchContainer from './SearchContainer';
import React from 'react';

describe('SearchContainer', () => {
  it('should render with PaginationContainer', () => {
    const SearchContainerProps = {
      renderRightSideComponent: () => (<React.Fragment></React.Fragment>),
      searchMethod: () => [],
      lastEvaluatedKeyPath: '',
      getData: () => {},
      onError: () => {},
      onSuccess: () => {},
      onSearchSuccess: () => {},
      tableDataPath: '',
    };

    const {queryByTestId} = render(
      <SearchContainer {...SearchContainerProps} />,
    );

    const element = queryByTestId(/SearchContainer/i);

    expect(element).toBeInTheDocument();
  });
});
