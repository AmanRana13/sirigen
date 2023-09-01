import {render} from '../../../../../utilities/test-utils';
import {HeartRateSummary} from './HeartRateSummary';

describe('HeartRateSummary', () => {
  test('should render HeartRateSummary', () => {
    const {getByTestId} = render(
      <HeartRateSummary currentState='day' summary='' />,
    );
    const element = getByTestId(/heart-rate-summary/i);

    expect(element).toBeInTheDocument();
  });

  test('should render HeartRateSummary component with summary prop as an object', () => {
    const {getByTestId} = render(
      <HeartRateSummary
        currentState='day'
        summary={{
          data: [],
          loading: false,
          notFound: true,
          subTitle: '',
        }}
      />,
    );
    const element = getByTestId(/heart-rate-summary/i);

    expect(element).toBeInTheDocument();
  });
});
