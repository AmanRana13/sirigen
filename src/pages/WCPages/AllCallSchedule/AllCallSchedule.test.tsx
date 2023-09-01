import {render} from '../../utilities/test-utils';
import AllCallSchedule from './AllCallSchedule.component';

describe('AllCallSchedule Component', () => {
  test('should render AllCallSchedule component', () => {
    const {queryByTestId} = render(<AllCallSchedule props={jest.fn()} />);
    const element = queryByTestId(/seniorCallSchedule/i);

    expect(element).toBeTruthy()
  });
});