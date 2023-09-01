import {render} from '../../utilities/test-utils';
import SeniorCallScheduler from './SeniorCallScheduler.component';
describe('SeniorCallSchedule Container', () => {
  test('should render SeniorCallScheduler Container', async() => {
    const {queryByTestId} = render(<SeniorCallScheduler props={jest.fn()} />);

    const element = queryByTestId(/SeniorCallSchedulerComponent/i);

    expect(element).toBeTruthy();
  });
});
