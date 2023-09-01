import {render, screen} from '../../utilities/test-utils';
import { SleepDurationWeekGraph } from './SleepDurationWeekGraph';

describe('SleepDurationweekGraph Component', () => {
  test('should render SleepDurationweekGraph component', () => {
    render(<SleepDurationWeekGraph />)
    const element=screen.getByText('Sun')
expect(element).toBeTruthy()  });
});