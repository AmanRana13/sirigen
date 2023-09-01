import {render, screen} from '../../../../utilities/test-utils';
import CountTable from './CountTable.component';
import HolisticTable from './HolisticTable.component';
import {allFormData} from '../../../../_mocks_/holisticAssessmentMocks';

describe('CountTable Component', () => {
  test('should render CountTable component', () => {
    render(<CountTable surveyCount={{}} totalScore={0} />);
    const element = screen.queryByTestId(/countTableComponent/i);
    expect(element).toBeInTheDocument();
  });
});

describe('HolisticTable Component', () => {
  test('should render HolisticTable Component', () => {
    render(
      <HolisticTable
        holisticKey='es'
        label='Emotional Survey'
        count={1}
        setCount={jest.fn()}
        tableData={allFormData.emotionalSurvey}
        setTableData={jest.fn()}
        formError={false}
        isHistory={false}
      />,
    );
    const element = screen.queryByTestId(/holisticTableComponent/i);
    expect(element).toBeInTheDocument();
  });
});
