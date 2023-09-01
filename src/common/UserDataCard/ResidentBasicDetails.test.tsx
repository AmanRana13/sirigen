import {render} from 'utilities/test-utils';
import ResidentBasicDetails from './ResidentBasicDetails.component ';

describe('Testing ResidentBasicDetails Component', () => {
  test('should render ResidentBasicDetails component', () => {
    const {queryByTestId} = render(
      <ResidentBasicDetails
        ResidentName='TestName'
        location='Delhi'
        timezone='India'
        facility='-'
      />,
    );
    const element = queryByTestId(/resident-basic-details/i);

    expect(element).toBeInTheDocument();
  });
});
