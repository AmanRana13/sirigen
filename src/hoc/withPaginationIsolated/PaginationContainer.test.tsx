import {PAGINATION_TYPE} from 'globals/enums';
import {render} from '../../utilities/test-utils';
import PaginationContainer from './PaginationContainer';

describe('PaginationContainer', () => {
  it('should render with PaginationContainer', () => {
    const PaginationContainerProps = {
      loadingPath: '',
      paginationType: PAGINATION_TYPE.PRIMARY,
      withBorder: true,
      className: '',
      isScrollOnTop: false,
      lastEvaluatedKeyPath: '',
      rowsPerPage: 10,
      tableData: [],
      getData: () => {},
      cacheKey: '',
      onSuccess: () => {},
      onError: () => {},
      componentProps: {},
      WrappedComponent: () => <></>,
      onPageChange: () => {},
      pagePath: '',
      tableDataPath: '',
      searchLastEvaluatedKeyPath: '',
      onSearchSuccess: () => {},
    };

    const {queryByTestId} = render(
      <PaginationContainer {...PaginationContainerProps} />,
    );
    // const element = queryByRole('PaginationContainer');
    const element = queryByTestId(/PaginationContainer/i);

    expect(element).toBeInTheDocument();
  });
});
