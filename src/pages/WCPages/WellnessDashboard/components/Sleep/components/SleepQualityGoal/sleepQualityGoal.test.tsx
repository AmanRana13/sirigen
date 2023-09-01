import {render} from 'utilities/test-utils';
import SleepQualityGoals from '.';

const props = {
  value: 50,
  sleepGoal: 80,
};

describe('Sleep Quality Component', () => {
  test('should render SleepQualityGoals Component', () => {
    const {getByTestId} = render(<SleepQualityGoals {...props} />);
    const element = getByTestId(/Sleep-quality-goals/i);
    expect(element).toBeInTheDocument();
  });
});
