import {cIRangeMilsetoneTableMockData} from '_mocks_/cIRangeMilestone.mock';

import {render, screen} from '../../../utilities/test-utils';
import CIRangeMilestones from './CIRangeMilestones.component';
import CIRangeMilestonesTable from './CIRangeMilestonesTable.component';

describe('Testing  CIRangeMilestones Component', () => {
  test('should render CIRangeMilestones Component', () => {
    render(<CIRangeMilestones />);
    const element = screen.getByText(/CI Range Milestones/i);
    expect(element).toBeInTheDocument();
  });
});

describe('Testing  CIRangeMilestonesTable Component', () => {
  test('should render CIRangeMilestonesTable Component', () => {
    render(
      <CIRangeMilestonesTable
        data={cIRangeMilsetoneTableMockData}
        tableHeadersList={[
          'Senior',
          'Type',
          'Milestone Date & Time',
          'Milestone',
          'Last Submitted',
        ]}
        showArrowButton={true}
        noDataMsg='No Pending Messages'
      />,
      {
        initialState: {
          auth: {
            userName: {
              first_name: 'test1',
              last_name: 'test2',
              middle_name: '',
            },
          },
        },
      },
    );
    const element = screen.queryByTestId(/CI-range-milestone-table/i);
    expect(element).toBeInTheDocument();
  });
});
