import {render} from '../../../../../../utilities/test-utils';
import {RespirationActivity} from './RespirationActivity.component';

describe('RespirationActivity Component', () => {
  test('should render RespirationActivity component', () => {
    const {queryByTestId} = render(
      <RespirationActivity
        summary={{data: [], loading: true, notFound: false, subTitle: ''}}
        activityChartData={[]}
        respirationRate={[]}
        minMaxData={[]}
      />,
    );
    const element = queryByTestId(/respiration-activity/i);

    expect(element).toBeInTheDocument();
  });
});
