import {
  render,
  screen,
  fireEvent,
} from '../../../../utilities/test-utils';
import {WellnessIndicatorComponent} from './WellnessIndicator.component';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({status: 'ok', data: 'data'}),
  }),
);

describe('WellnessIndicator component', () => {
  test('should render WellnessIndicator component', async () => {
    render(
      <WellnessIndicatorComponent
        currentHeartRate='-'
        currentBodyHealth={{bmi: '20.9', hydration: '54.7', weight: '167.4'}}
        currentActivityScore={undefined}
        currentSleepScore={undefined}
      />,
    );
    const element = screen.getAllByTestId(/indicator-box/i);
    fireEvent.click(element[0]);
    expect(element[0]).toBeTruthy();
  });
  test('should render WellnessIndicator component', async () => {
    render(
      <WellnessIndicatorComponent
        currentHeartRate='-'
        currentBodyHealth={{bmi: '20.9', hydration: '54.7', weight: '167.4'}}
        currentActivityScore={undefined}
        currentSleepScore={undefined}
      />,
    );

    const element = screen.getByTestId(/wellness-tooltip-box/i);
    fireEvent.click(element);
    expect(element).toBeTruthy();
  });
});
