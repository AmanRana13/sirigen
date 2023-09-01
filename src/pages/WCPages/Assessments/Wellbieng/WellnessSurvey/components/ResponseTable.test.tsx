import {render} from 'utilities/test-utils';
import ResponseTable from './ResponseTable';
import {wellnessTableData} from '_mocks_/wellnessTablesData';

describe('ResponseTable Component', () => {
  test('should render ResponseTable component', () => {
    const {queryByTestId} = render(<ResponseTable data={wellnessTableData} />);
    const element = queryByTestId(/response-table/i);

    expect(element).toBeInTheDocument();
  });
});
