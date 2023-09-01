import {render, screen} from '../../../utilities/test-utils';
import DailyRecapDialog from './DailyRecapDialog';
describe('Daily Dialog Recap', () => {
  test('should render Daily Dialog Recap', () => {
    render(<DailyRecapDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,

            data: {
              heartRateData: [{x: 60, y: 120}],
              rangeMap: {
                high: 80,
                low: 160,
              },
            },
          },
        },
      },
    });

    const element = screen.getByTestId(/DailyRecapDialog/i);

    expect(element).toBeInTheDocument();
  });
});
