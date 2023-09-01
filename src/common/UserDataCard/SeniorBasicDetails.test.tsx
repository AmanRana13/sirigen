import {render} from 'utilities/test-utils';
import SeniorBasicDetails from './SeniorBasicDetails.component';

describe('Testing SeniorBasicDetails Component', () => {
  test('should render SeniorBasicDetails component', () => {
    const {queryByTestId} = render(
      <SeniorBasicDetails
        seniorName='TestName'
        location='Delhi'
        timezone='India'
      />,
    );
    const element = queryByTestId(/senior-basic-details/i);

    expect(element).toBeInTheDocument();
  });
});
