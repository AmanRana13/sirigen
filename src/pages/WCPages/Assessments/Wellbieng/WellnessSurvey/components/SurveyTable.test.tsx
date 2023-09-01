/* eslint-disable max-len */
import {render} from 'utilities/test-utils';
import SurveyTable from './SurveyTable';
import {wellnessTableData} from '_mocks_/wellnessTablesData';

describe('SurveyTable Component', () => {
  test('should render SurveyTable component', () => {
    const {queryByTestId} = render(<SurveyTable data={wellnessTableData} />);
    const element = queryByTestId(/survey-table/i);

    expect(element).toBeInTheDocument();
  });
});
