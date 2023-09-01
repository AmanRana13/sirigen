import {fireEvent, render, screen} from 'utilities/test-utils';
import ResidentDetailsCard from './ResidentDetailsCard.component ';
import {DASHBOARD_VITALS_TYPE, HEART_RATE_CONDITION} from 'globals/enums';

const props = {
  activityTitle: '120 bpm',
  activityValue: 'Heart Rate',
  condition: HEART_RATE_CONDITION.LOW,
  cardType: DASHBOARD_VITALS_TYPE.WELLNESS,
  onClick: () => {},
};
describe(' ResidentDetailsCard component', () => {
  test('should render ResidentDetailsCard  component', () => {
    const {queryByTestId, queryByText} = render(
      <ResidentDetailsCard {...props} />,
    );
    const element = queryByTestId(/user-data-card/i);
    expect(element).toBeInTheDocument();
    const activityValue = queryByText(/120 bpm/);
    expect(activityValue).toBeInTheDocument();
    const activityTitle = queryByText(/Heart Rate/);
    expect(activityTitle).toBeInTheDocument();
    const cardType = queryByText(/Wellness/);
    expect(cardType).toBeInTheDocument();
    const view = screen.getByText(/View/i);
    expect(view).toBeInTheDocument();
    fireEvent.click(view);
  });
});
