import {ACTIVITY_CARD_VARIANT} from 'globals/enums';
import {render} from '../../utilities/test-utils';
import ActivityCard from './ActivityCard.component';

describe('ActivityCard Component', () => {
  test('should render ActivityCard component with activity data', () => {
    const {queryByTestId, queryByText} = render(
      <ActivityCard
        goal='GOAL'
        percentage={55}
        variant={ACTIVITY_CARD_VARIANT.ACTIVITY}
      />,
    );
    const element = queryByTestId(/activity-card/i);
    expect(element).toBeInTheDocument();
    const percentage = queryByText('55');
    expect(percentage).toBeInTheDocument();
    const goal = queryByText('Goal: GOAL');
    expect(goal).toBeInTheDocument();
  });
  test('should render variant title if title not provided', () => {
    const {queryByText} = render(
      <ActivityCard
        goal='GOAL'
        percentage={55}
        variant={ACTIVITY_CARD_VARIANT.ACTIVITY}
      />,
    );
    const element = queryByText(ACTIVITY_CARD_VARIANT.ACTIVITY);
    expect(element).toBeInTheDocument();
  });
  test('should render title if title provided', () => {
    const {queryByText} = render(
      <ActivityCard
        goal='GOAL'
        percentage={55}
        variant={ACTIVITY_CARD_VARIANT.ACTIVITY}
        title='MOCK TITLE'
      />,
    );
    const element = queryByText('MOCK TITLE');
    expect(element).toBeInTheDocument();
  });
});
