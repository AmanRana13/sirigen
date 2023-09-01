import {render} from '../../../../../utilities/test-utils';
import BodyHealth from './BodyHealth.container';

describe('BodyHealthComponent', () => {
  test('should render BodyHealth component', async () => {
    const {queryByTestId} = render(<BodyHealth />, {
      initialState: {
        wellnessDashboard: {
          currentState: 'day',
          startTime: 1665081000000000000,
          endTime: 1665167399000000000,
          reRender: true,
          sleepStartTime: null,
          sleepEndTime: null,
        },
      },
    });
    const element = await queryByTestId(/body-health-container/i);

    expect(element).toBeInTheDocument();
  });
});
